import supabase from "../../supabaseClient.js";

export const getPiggyBankById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("piggy_banks")
    .select("*")
    .eq("id", id)
    .limit(1);

  if (error) {
    res.status(500).send({ error });
  }

  res.send({ data: data[0] });
};
