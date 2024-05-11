import { blockchain } from "../startup.mjs";

const getBlockchain = (req, res, next) => {
    res.status(200).json({success: true, data: blockchain})
};

const createBlock = (req, res, next) => {
    res.status(201).json({success: true, data: "Post block funkar"})
};

export {getBlockchain, createBlock}