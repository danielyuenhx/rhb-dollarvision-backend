import { Router } from "express";
import {
  getPiggyBanks,
  getPiggyBankById,
} from "../services/piggyBanks/index.js";

const router = Router();

router.get("/", getPiggyBanks);
router.get("/:id", getPiggyBankById);

export default router;
