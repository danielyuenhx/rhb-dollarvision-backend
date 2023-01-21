import { Router } from "express";
import { createWallet, getAllWallets, getTotalBalance } from "../services/wallets/index.js";

const router = Router();

router.get("/", getAllWallets);
router.get("/totalBalance", getTotalBalance);
router.post("/", createWallet)

export default router;
