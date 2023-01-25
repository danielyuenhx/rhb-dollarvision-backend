import { Router } from "express";
import { createBudget, getBudgetById, getBudgets } from "../services/budgets/index.js";

const router = Router();

router.post("/", createBudget);
router.get("/", getBudgets);
router.get("/:id", getBudgetById);

export default router;
