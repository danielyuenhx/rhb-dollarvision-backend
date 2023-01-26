import { Router } from "express";
import {
  createPiggyBank,
  getPiggyBanks,
  getPiggyBankById,
} from "../services/piggyBanks/index.js";

const router = Router();

router.get("/", getPiggyBanks);
router.get("/:id", getPiggyBankById);
router.post("/", createPiggyBank);

export default router;
