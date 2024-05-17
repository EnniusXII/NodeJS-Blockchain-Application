import express from "express";
import { getBlockchain, createBlock, syncBlockchain, updateBlockchain } from "../controllers/blockchainController.mjs";

const router = express.Router();

router.route("/").get(getBlockchain);
router.route("/mine").post(createBlock);
router.route("/concensus").get(syncBlockchain);
router.route("/block/broadcast").post(updateBlockchain);

export default router;