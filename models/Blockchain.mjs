export default class Blockchain {
    constructor() {
        this.chain = [];
    }

    createBlock(previousHash, currentHash, data) {
        const block = {
            blockIndex: this.chain.length +1,
            previousHash: previousHash,
            currentHash, currentHash,
            data,
        };

        this.chain.push(block);
        return block;
    }    
}