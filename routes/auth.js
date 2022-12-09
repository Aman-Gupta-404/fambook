import express from "express";
import { authenticateRefreshTOken } from "../controllers/auth.js";
const router = express.Router();

router.get('/gettoken', authenticateRefreshTOken);

export default router;