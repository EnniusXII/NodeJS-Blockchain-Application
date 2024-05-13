import Block from "./Block.mjs";
import { createHashFunction } from "../utilities/crypto-lib.mjs";

export default class Blockchain {
    constructor() {
        this.chain = [];
        this.createBlock(Date.now(), "0", "Genesis", [])
    };

    createBlock(timestamp, previousHash, currentHash, data) {

        const block = new Block(
            timestamp,
            this.chain.length +1, 
            previousHash, 
            currentHash, 
            data
        );

        this.chain.push(block);
        return block;
    };

    getLastBlockObject() {
        return this.chain.at(-1)
    };

    hashBlock(timestamp, previousHash, currentBlockData){
        const stringToHash = timestamp.toString() + previousHash + JSON.stringify(currentBlockData);
        return createHashFunction(stringToHash);
    };
}