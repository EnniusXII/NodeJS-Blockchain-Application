import Block from "./Block.mjs";
import { createHashFunction } from "../utilities/crypto-lib.mjs";

export default class Blockchain {
    constructor() {
        this.chain = [];
        this.createBlock("0", "Genesis", [])
    };

    createBlock(previousHash, currentHash, data) {

        const block = new Block(
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

    hashBlock(previousHash, currentBlockData){
        const stringToHash = previousHash + JSON.stringify(currentBlockData);
        return createHashFunction(stringToHash);
    };
}