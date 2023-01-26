import supabase from "../../supabaseClient.js";

export const createPiggyBank = async (req, res) => {
  const { name, description, walletId, total, perMonth, initialDeposit } =
    req.body;

  const { data, error } = await supabase
    .from("piggy_banks")
    .insert({
      name,
      description,
      wallet_id: walletId,
      total,
      paid: initialDeposit,
      per_month: perMonth,
    })
    .select("*");

  if (error) return res.status(500).send({ error });

  res.send({ data: data[0] });
};
