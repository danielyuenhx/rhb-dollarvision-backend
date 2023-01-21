import supabase from "../../supabaseClient.js";

export const createTransaction = async (req, res) => {
  const { walletId, date, categoryId, description, amount } = req.body;

  const { data, error } = await supabase
    .from("transactions")
    .insert({
      wallet_id: walletId,
      date,
      category_id: categoryId,
      description,
      amount,
    })
    .select(`*, categories (*), wallets (*)`);

  if (error) {
    res.status;
    res.send;
  }

  res.send(data);
};
