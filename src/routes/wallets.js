import { Router } from "express";
import { getAllWallets, getTotalBalance } from "../services/wallets/index.js";

const router = Router();

router.get("/", getAllWallets);
router.get("/totalBalance", getTotalBalance);

export default router;
