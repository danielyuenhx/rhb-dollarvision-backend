import "dotenv/config";
import express from "express";
import cors from "cors";
import supabase from "./supabaseClient.js";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send(supabase);
});

// all transactions
app.get("/transactions", async (req, res) => {
  let query = supabase
    .from("transactions")
    .select("*, categories (*), wallets (*)", { count: "exact" });

  const { filter, startDate, endDate, walletId, categoryIds } = req.query;
  const filters = filter && filter.split(",");

  if (filters && filters.includes("date") && startDate && endDate) {
    query = query.lte("date", endDate).gte("date", startDate);
  }
  if (filters && filters.includes("wallet") && walletId) {
    query = query.eq("wallet_id", walletId);
  }
  if (filters && filters.includes("category") && categoryIds) {
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
  res.send({ data, count });
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
