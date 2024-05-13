import Block from "./Block.mjs";

export default class Blockchain {
    constructor() {
        this.chain = [];
    }

    createBlock(previousHash, currentHash, data) {

        const block = new Block(
            this.chain.length +1, 
            previousHash, 
            currentHash, 
            data
        );

        this.chain.push(block);
        return block;
    }    
}