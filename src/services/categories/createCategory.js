import supabase from "../../supabaseClient.js";

export const createCategory = async (req, res) => {
  const { name, type, color } = req.body;

  const { data, error } = await supabase
    .from("categories")
    .insert({
      name,
      type,
      color,
    })
    .select("*");

  if (error) {
    res.status;
    res.send;
  }

  res.send({ data });
};
