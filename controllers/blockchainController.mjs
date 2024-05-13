import { blockchain } from "../startup.mjs";

const getBlockchain = (req, res, next) => {
    res.status(200).json({success: true, data: blockchain})
};

const createBlock = (req, res, next) => {
    const lastBlock = blockchain.getLastBlockObject();
    const data = req.body
    const timestamp = Date.now();

    const currentBlockHash = blockchain.hashBlock(timestamp, lastBlock.currentHash, data);
    const block = blockchain.createBlock(timestamp, lastBlock.currentHash, currentBlockHash, data);
    res.status(201).json({success: true, data: block});
};

export {getBlockchain, createBlock}