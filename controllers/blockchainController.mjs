import { blockchain } from "../startup.mjs";

const getBlockchain = (req, res, next) => {
    res.status(200).json({success: true, data: blockchain})
};

const createBlock = (req, res, next) => {
    const previousHash = "0000"
    const currentHash = "1111"
    const data = req.body

    const block = blockchain.createBlock(previousHash, currentHash, data)
    res.status(201).json({success: true, data: block})
};

export {getBlockchain, createBlock}