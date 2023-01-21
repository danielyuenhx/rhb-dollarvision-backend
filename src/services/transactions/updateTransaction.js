import supabase from "../../supabaseClient.js";

export const updateTransaction = async (req, res) => {
  const transactionId = req.params.id;
  const { walletId, date, categoryId, description, amount } = req.body;

  let params = {};
  if (walletId) params.wallet_id = walletId;
  if (date) params.date = date;
  if (categoryId) params.category_id = categoryId;
  if (description) params.description = description;
  if (amount) params.amount = amount;

  const { data, error } = await supabase
    .from("transactions")
    .update(params)
    .eq("id", transactionId)
    .select(`*, categories (*), wallets (*)`);

  if (error) {
    res.status;
    res.send;
  }

  res.send({ data });
};
