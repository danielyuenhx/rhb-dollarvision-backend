import { getTotalExpense, getTotalIncome } from "../../helpers.js";
import supabase from "../../supabaseClient.js";

const groupTransactionsByCategoryTypeAndSort = (transactions, type) => {
  const transactionsGroupedByCategory = transactions
    .filter((transaction) => transaction.categories.type === type)
    .reduce((acc, transaction) => {
      const { categories } = transaction;
      const { id, name } = categories;
      if (acc[id]) {
        acc[id].amount = +(acc[id].amount + transaction.amount).toFixed(2);
        acc[id].count += 1;
      } else {
        acc[id] = {
          id,
          name,
          amount: +transaction.amount.toFixed(2),
          count: 1,
        };
      }
      return acc;
    }, {});

  // sort categories by highest amount
  return Object.values(transactionsGroupedByCategory).sort(
    (a, b) => b.amount - a.amount
  );
};

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

  const incomeTransactionsGroupedByCategoryAndSorted =
    groupTransactionsByCategoryTypeAndSort(data, "income");
  const expenseTransactionsGroupedByCategoryAndSorted =
    groupTransactionsByCategoryTypeAndSort(data, "expense");

  const uncategorizedTransactions = data.filter(
    (transaction) => transaction.categories.name === "Uncategorized"
  );

  res.send({
    data,
    count,
    totalIncome,
    totalExpense,
    nettChange,
    incomeTransactionsGroupedByCategoryAndSorted,
    expenseTransactionsGroupedByCategoryAndSorted,
    uncategorizedTransactions,
  });
};
