import supabase from "../../supabaseClient.js";

export const getCategories = async (req, res) => {
  const query = supabase
    .from("categories")
    .select("*", { count: "exact" })
    .not("name", "in", "(Transfer,Uncategorized)");

  const { data, error, count } = await query;
  if (error) {
    res.status;
    res.send;
  }

  const incomeCategories = data.filter(
    (category) => category.type === "income"
  );
  const expenseCategories = data.filter(
    (category) => category.type === "expense"
  );

  res.send({ data, incomeCategories, expenseCategories, count });
};
