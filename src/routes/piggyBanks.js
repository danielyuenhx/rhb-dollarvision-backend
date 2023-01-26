import { Router } from "express";
import {
  createPiggyBank,
  getPiggyBanks,
  getPiggyBankById,
  withdrawFunds
} from "../services/piggyBanks/index.js";

const router = Router();

router.get("/", getPiggyBanks);
router.get("/:id", getPiggyBankById);
router.post("/", createPiggyBank);
router.post("/:id/withdraw", withdrawFunds);

export default router;
