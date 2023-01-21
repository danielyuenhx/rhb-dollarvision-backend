export const getTotalIncome = (transactions) => {
  return +transactions
    .reduce((acc, transaction) => {
      if (transaction.categories.type === "income") {
        return acc + transaction.amount;
      }
      return acc;
    }, 0)
    .toFixed(2);
};

export const getTotalExpense = (transactions) => {
  return +transactions
    .reduce((acc, transaction) => {
      if (transaction.categories.type === "expense") {
        return acc + transaction.amount;
      }
      return acc;
    }, 0)
    .toFixed(2);
};
