import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/budgets", routes.budgets);
app.use("/categories", routes.categories);
app.use("/piggy_banks", routes.piggyBanks);
app.use("/transactions", routes.transactions);
app.use("/wallets", routes.wallets);

app.get("/", (req, res) => {
  res.send("welcome to rhb dollarvision api");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
