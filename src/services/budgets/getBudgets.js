import supabase from "../../supabaseClient.js";

// get budgets by month and year
export const getBudgets = async (req, res) => {
  // jan is 1 ( based one `new Date().getMonth() + 1` ), year is new `Date.getFullYear()`
  const { startDate, endDate } = req.query;

  const query = supabase
    .from("budgets")
    .select("*, categories (*, transactions (*))", {
      count: "exact",
    })
    .gte("categories.transactions.date", startDate)
    .lte("categories.transactions.date", endDate);

  const { data, error, count } = await query;
  if (error) {
    return res.send(error);
  }

  // loop through all budgets, combine the transactions from all categories in the budget, then sum up the amount
  const budgets = data.map((budget) => {
    const { categories, ...budgetData } = budget;
    const transactions = categories.reduce((acc, category) => {
      return [...acc, ...category.transactions];
    }, []);

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
      categories: mappedCategories
    };
  });

  res.send({ data: budgets, count });
};
