import { blockchain } from "../startup.mjs";

const getBlockchain = (req, res, next) => {
    res.status(200).json({success: true, data: blockchain})
};

const createBlock = (req, res, next) => {
    const lastBlock = blockchain.getLastBlockObject();
    const data = req.body
    const { nonce, difficulty, timestamp } = blockchain.proofOfWork(lastBlock.currentHash, data);

    const currentBlockHash = blockchain.hashBlock(timestamp, lastBlock.currentHash, data, nonce, difficulty);
    const block = blockchain.createBlock(timestamp, lastBlock.currentHash, currentBlockHash, data, difficulty);
    res.status(201).json({success: true, data: block});
};

export {getBlockchain, createBlock}