import express from "express";
import { getBlockchain, createBlock } from "../controllers/blockchainController.mjs";

const router = express.Router();

router.route("/").get(getBlockchain);
router.route("/mine").post(createBlock);

export default router;