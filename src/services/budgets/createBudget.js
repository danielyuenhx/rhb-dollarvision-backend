import supabase from "../../supabaseClient.js";

export const createBudget = async (req, res) => {
  // categoryIds -> [1, 2, 3]
  const { name, description, limit, categoryIds } = req.body;

  const { data, error } = await supabase
    .from("budgets")
    .insert({
      name,
      description,
      limit,
    })
    .select("*");

  if (error) return res.status(500).send({ error });

  const budgetId = data[0].id;
  const budgetCategories = categoryIds.map((categoryId) => {
    return {
      budget_id: budgetId,
      category_id: categoryId,
    };
  });

  const { data: budgetCategoriesData, budgetCategoriesError } = await supabase
    .from("budgets_categories")
    .insert(budgetCategories)
    .select("*");

  if (error) return res.status(500).send({ budgetCategoriesError });

  res.send({ data, budgetCategoriesData });
};
