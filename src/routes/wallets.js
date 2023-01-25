import { Router } from 'express';
import {
  createWallet,
  getTotalBalance,
  getWallets,
  updateWallet,
} from '../services/wallets/index.js';

const router = Router();

router.get('/', getWallets);
router.get('/totalBalance', getTotalBalance);
router.post('/', createWallet);
router.put('/:id', updateWallet);

export default router;
