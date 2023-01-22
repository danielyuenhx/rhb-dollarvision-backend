import supabase from "../../supabaseClient.js";

export const getBudgetById = async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate } = req.query;
  const { data, error } = await supabase
    .from("budgets")
    .select(
      "*, categories (*, transactions (*, wallets (id, name), categories (id, name, color)))",
      {
        count: "exact",
      }
    )
    .eq("id", id)
    .gte("categories.transactions.date", startDate)
    .lte("categories.transactions.date", endDate)
    .limit(1);

  if (error) {
    res.status(500).send({ error });
  }

  // loop through all budgets, combine the transactions from all categories in the budget, then sum up the amount
  const budgets = data.map((budget) => {
    const { categories, ...budgetData } = budget;

    // sort transactions by date desc
    const transactions = categories
      .reduce((acc, category) => {
        return [...acc, ...category.transactions];
      }, [])
      .sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });

    const totalExpense = +transactions
      .reduce((acc, transaction) => {
        return acc + transaction.amount;
      }, 0)
      .toFixed(2);

    const percentage = +((totalExpense / budgetData.limit) * 100).toFixed(2);

    // return categories only with id, name, and color
    const mappedCategories = categories.map(({ id, name, color }) => {
      return { id, name, color };
    });

    return {
      ...budgetData,
      totalExpense,
      percentage,
      categories: mappedCategories,
      transactions,
    };
  });

  res.send({ data: budgets[0] });
};
