import { Router } from "express";
import { createWallet, getTotalBalance, getWallets } from "../services/wallets/index.js";

const router = Router();

router.get("/", getWallets);
router.get("/totalBalance", getTotalBalance);
router.post("/", createWallet)

export default router;
