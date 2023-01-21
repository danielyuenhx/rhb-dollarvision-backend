import "dotenv/config";
import express from "express";
import cors from "cors";
import supabase from "./supabaseClient.js";
import routes from "./routes/index.js";

const app = express();
app.use(cors());

app.use("/wallets", routes.wallets);
app.use("/transactions", routes.transactions);

app.get("/", (req, res) => {
  res.send(supabase);
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
