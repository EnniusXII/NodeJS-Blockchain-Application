import { blockchain } from "../startup.mjs";

const getBlockchain = (req, res, next) => {
    res.status(200).json({success: true, data: blockchain})
};

const createBlock = (req, res, next) => {
    const lastBlock = blockchain.getLastBlockObject();
    const data = req.body

    const currentBlockHash = blockchain.hashBlock(lastBlock.currentHash, data);
    const block = blockchain.createBlock(lastBlock.currentHash, currentBlockHash, data);
    res.status(201).json({success: true, data: block});
};

export {getBlockchain, createBlock}