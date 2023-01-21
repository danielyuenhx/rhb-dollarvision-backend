import { getTotalExpense, getTotalIncome } from "../../helpers.js";
import supabase from "../../supabaseClient.js";

export const getTransactionsByFilters = async (req, res) => {
  const { startDate, endDate, walletId, categoryIds } = req.query;
  let query = supabase
    .from("transactions")
    .select("*, categories (*), wallets (*)", { count: "exact" });

  if (startDate && endDate) {
    query = query.lte("date", endDate).gte("date", startDate);
  }
  if (walletId) {
    query = query.eq("wallet_id", walletId);
  }
  if (categoryIds) {
    query = query.in("category_id", categoryIds.split(","));
  }

  query = query
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  const { data, error, count } = await query;
  if (error) {
    res.status;
    res.send;
  }

  const totalIncome = getTotalIncome(data);
  const totalExpense = getTotalExpense(data);
  const nettChange = +(totalIncome - totalExpense).toFixed(2);

  res.send({ data, count, totalIncome, totalExpense, nettChange });
};
