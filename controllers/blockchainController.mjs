import { blockchain } from "../startup.mjs";

const getBlockchain = (req, res, next) => {
    res.status(200).json({success: true, data: blockchain})
};

const createBlock = async (req, res, next) => {
    const previousBlock = blockchain.getLastBlockObject();
    const data = req.body
    const { nonce, difficulty, timestamp } = blockchain.proofOfWork(previousBlock.currentHash, data);

    const currentBlockHash = blockchain.hashBlock(timestamp, previousBlock.currentHash, data, nonce, difficulty);
    const block = blockchain.createBlock(timestamp, previousBlock.currentHash, currentBlockHash, data, nonce, difficulty);

    blockchain.memberNodes.forEach(async(url) => {
        const body = block;
        await fetch(`${url}/api/v1/blockchain/block/broadcast`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
        });
    });
    res.status(201).json({success: true, data: {message: "Block created and distributed", block}});
};

const updateBlockchain = (req, res, next) => {
    const block = req.body;
    const previousBlock = blockchain.getLastBlockObject();
    const hash = previousBlock.currentHash === block.previousHash;
    const index = previousBlock.blockIndex +1 === block.blockIndex;

    if (hash && index) {
        blockchain.chain.push(block);
        res.status(201).json({success: true, data: {message: "Blockchain updated with latest block"}});
    } else {
        res.status(500).json({success: false, data: {message: "Latest block was rejected"}});
    }
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
};

export {getBlockchain, createBlock, syncBlockchain, updateBlockchain}