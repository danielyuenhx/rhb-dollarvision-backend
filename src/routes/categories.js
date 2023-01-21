import { Router } from "express";
import { createCategory, getCategories } from "../services/categories/index.js";

const router = Router();

router.get("/", getCategories);
router.post("/", createCategory);

export default router;
