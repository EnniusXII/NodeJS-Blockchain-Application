import Block from "./Block.mjs";
import { createHashFunction } from "../utilities/crypto-lib.mjs";

export default class Blockchain {
    constructor() {
        this.chain = [];
        this.memberNodes = [];
        this.nodeUrl = process.argv[3];
        this.createBlock(Date.now(), "0", "Genesis", [], 32, process.env.DIFFICULTY)
    };

    createBlock(timestamp, previousHash, currentHash, data, nonce, difficulty) {

        const block = new Block(
            timestamp,
            this.chain.length +1, 
            previousHash, 
            currentHash, 
            data,
            nonce,
            difficulty
        );

        this.chain.push(block);
        return block;
    };

    getLastBlockObject() {
        return this.chain.at(-1)
    };

    hashBlock(timestamp, previousHash, currentBlockData, nonce, difficulty){
        const stringToHash = timestamp.toString() + previousHash + JSON.stringify(currentBlockData) + nonce + difficulty;
        return createHashFunction(stringToHash);
    };

    proofOfWork(previousHash, data) {
        const lastBlock = this.getLastBlockObject();
        let difficulty, hash, timestamp;
        let nonce = 0;

        do {
            nonce++
            timestamp = Date.now()

            difficulty = this.difficultyAdjustment(lastBlock, timestamp)
            hash = this.hashBlock(timestamp, previousHash, data, nonce, difficulty)
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty))

        return { nonce, difficulty, timestamp }
    }

    difficultyAdjustment(lastBlock, timestamp) {
        const MINE_RATE = process.env.MINE_RATE;
        let { difficulty } = lastBlock;

        if (difficulty < 1) return 1;

        return timestamp - lastBlock.timestamp > MINE_RATE ? +difficulty - 1 : +difficulty + 1
    }

    validateBlockchain(blockchain) {
        let isValid = true;

        for(let i = 2; i < blockchain.length; i++){
            const currentBlock = blockchain[i];
            const previousBlock = blockchain[i - 1];

            const hash = this.hashBlock(
                currentBlock.timestamp, 
                currentBlock.previousHash, 
                currentBlock.data,
                currentBlock.nonce,
                currentBlock.difficulty
            );

            if(hash !== currentBlock.currentHash) isValid = false;
            if(currentBlock.previousHash !== previousBlock.currentHash) isValid = false;
        }

        return isValid;
    }
}