import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/wallets", routes.wallets);
app.use("/transactions", routes.transactions);

app.get("/", (req, res) => {
  "welcome to rhb dollarvision api";
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
