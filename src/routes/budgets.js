import { Router } from "express";
import { getBudgetById, getBudgets } from "../services/budgets/index.js";

const router = Router();

router.get("/", getBudgets);
router.get("/:id", getBudgetById);

export default router;
