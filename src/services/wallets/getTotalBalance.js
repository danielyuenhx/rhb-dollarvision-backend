import { getTotalExpense, getTotalIncome } from "../../helpers.js";
import supabase from "../../supabaseClient.js";

export const getTotalBalance = async (req, res) => {
  // get all transactions before a certain date and can be filtered by walletId
  const { endDate, walletId } = req.query;

  let walletsQuery = supabase.from("wallets").select("*");
  let transactionsQuery = supabase
    .from("transactions")
    .select("*, categories (type)");

  if (endDate) {
    transactionsQuery = transactionsQuery.lte("date", endDate);
  }
  if (walletId) {
    transactionsQuery = transactionsQuery.eq("wallet_id", walletId);
    walletsQuery = walletsQuery.eq("id", walletId);
  }

  const [
    { data: walletsData, error: walletsError },
    { data: transactionsData, error: transactionsError },
  ] = await Promise.all([await walletsQuery, await transactionsQuery]);

  if (walletsError || transactionsError) {
    res.status;
    res.send;
  }

  const totalWalletInitialBalance = +walletsData
    .reduce((acc, wallet) => {
      return acc + wallet.initial_balance;
    }, 0)
    .toFixed(2);

  const totalIncome = getTotalIncome(transactionsData);
  const totalExpense = getTotalExpense(transactionsData);
  const totalBalance = +(
    totalWalletInitialBalance +
    totalIncome -
    totalExpense
  ).toFixed(2);

  res.send({ totalBalance });
};
