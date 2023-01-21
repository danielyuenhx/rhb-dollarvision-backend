import { Router } from "express";
import {
  createTransaction,
  getTransactionsByFilters,
  updateTransaction,
} from "../services/transactions/index.js";

const router = Router();

router.get("/", getTransactionsByFilters);
router.post("/", createTransaction);
router.put("/:id", updateTransaction);

export default router;
