import { blockchain } from "../startup.mjs";

const getBlockchain = (req, res, next) => {
    res.status(200).json({success: true, data: blockchain})
};

const createBlock = (req, res, next) => {
    const previousBlock = blockchain.getLastBlockObject();
    const data = req.body
    const { nonce, difficulty, timestamp } = blockchain.proofOfWork(previousBlock.currentHash, data);
    console.log(previousBlock);

    const currentBlockHash = blockchain.hashBlock(timestamp, previousBlock.currentHash, data, nonce, difficulty);
    const block = blockchain.createBlock(timestamp, previousBlock.currentHash, currentBlockHash, data, nonce, difficulty);
    res.status(201).json({success: true, data: block});
};

const syncBlockchain = (req, res, next) => {
    const currentLength = blockchain.chain.length;
    let maxLength = currentLength;
    let longestChain = null;

    blockchain.memberNodes.forEach(async(member) => {
        const response = await fetch(`${member}/api/v1/blockchain`);

        if(response.ok) {
            const result = await response.json();

            if(result.data.chain.length > maxLength) {
                maxLength = result.data.chain.length;
                longestChain = result.data.chain;
            }

            if(!longestChain || (longestChain && !blockchain.validateBlockchain(longestChain))) {
                console.log("Chain is now syncronizing");
            } else {
                blockchain.chain = longestChain
            }
        }
    })

    res.status(200).json({success: true, data: {message: "Sync complete"}});
}
export {getBlockchain, createBlock, syncBlockchain}