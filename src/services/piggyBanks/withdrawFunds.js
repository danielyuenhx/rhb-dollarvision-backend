import supabase from "../../supabaseClient.js";

export const withdrawFunds = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  const { data, error } = await supabase
    .from("piggy_banks")
    .select("paid")
    .eq("id", id)
    .limit(1);

  if (error) return res.status(500).send({ error });

  const newAmount = data[0].paid - amount;

  const { data: updatedData, error: updateError } = await supabase
    .from("piggy_banks")
    .update({ paid: newAmount })
    .eq("id", id)
    .select("*");

  if (updateError) return res.status(500).send({ updateError });

  res.send({ data: updatedData[0] });
};
