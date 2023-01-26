import supabase from "../../supabaseClient.js";

export const getPiggyBanks = async (req, res) => {
  const query = supabase.from("piggy_banks").select("*", { count: "exact" });

  const { data, error, count } = await query;

  if (error) {
    return res.status(500).send({ error });
  }

  res.send({ data, count });
};
