import { getTotalExpense, getTotalIncome } from "../../helpers.js";
import supabase from "../../supabaseClient.js";

export const getTotalBalance = async (req, res) => {
  // get all transactions before a certain date and can be filtered by walletId
  const { startDate, endDate, walletId } = req.query;

  let walletsQuery = supabase.from("wallets").select("*");
  let transactionsQueryEndDate = supabase
    .from("transactions")
    .select("*, categories (type)");
  let transactionsQueryStartDate = supabase
    .from("transactions")
    .select("*, categories (type)");

  if (startDate) {
    transactionsQueryStartDate = transactionsQueryStartDate.lt(
      "date",
      startDate
    );
  }
  if (endDate) {
    transactionsQueryEndDate = transactionsQueryEndDate.lte("date", endDate);
  }
  if (walletId) {
    transactionsQueryStartDate = transactionsQueryStartDate.eq(
      "wallet_id",
      walletId
    );
    transactionsQueryEndDate = transactionsQueryEndDate.eq(
      "wallet_id",
      walletId
    );
    walletsQuery = walletsQuery.eq("id", walletId);
  }

  const [
    { data: walletsData, error: walletsError },
    { data: transactionsDataStartDate, error: transactionsStartDateError },
    { data: transactionsDataEndDate, error: transactionsEndDateError },
  ] = await Promise.all([
    await walletsQuery,
    await transactionsQueryStartDate,
    await transactionsQueryEndDate,
  ]);

  if (walletsError || transactionsStartDateError || transactionsEndDateError) {
    return res.status(500).send({ error });
  }

  const totalWalletInitialBalance = +walletsData
    .reduce((acc, wallet) => {
      return acc + wallet.initial_balance;
    }, 0)
    .toFixed(2);

  const totalIncome = getTotalIncome(transactionsDataEndDate);
  const totalExpense = getTotalExpense(transactionsDataEndDate);
  const totalBalance = +(
    totalWalletInitialBalance +
    totalIncome -
    totalExpense
  ).toFixed(2);

  const totalIncomePrevMonth = getTotalIncome(transactionsDataStartDate);
  const totalExpensePrevMonth = getTotalExpense(transactionsDataStartDate);
  const totalBalancePrevMonth = +(
    totalWalletInitialBalance +
    totalIncomePrevMonth -
    totalExpensePrevMonth
  ).toFixed(2);

  res.send({
    data: totalBalance,
    totalBalancePrevMonth: totalBalancePrevMonth,
  });
};
