import supabase from "../../supabaseClient.js";

export const createWallet = async (req, res) => {
  const { name, initialBalance } = req.body;

  const { data, error } = await supabase
    .from("wallets")
    .insert({
      name,
      initial_balance: initialBalance,
    })
    .select("*");

  if (error) {
    res.status;
    res.send;
  }

  res.send(data);
};
