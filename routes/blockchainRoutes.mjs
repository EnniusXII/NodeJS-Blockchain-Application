import express from "express";
import { getBlockchain, createBlock, syncBlockchain } from "../controllers/blockchainController.mjs";

const router = express.Router();

router.route("/").get(getBlockchain);
router.route("/mine").post(createBlock);
router.route("/concensus").get(syncBlockchain);

export default router;