export default class Block {
    constructor(blockIndex, previousHash, currentHash, data) {
        this.timestamp = Date.now();
        this.blockIndex = blockIndex;
        this.previousHash = previousHash;
        this.currentHash = currentHash;
        this.data = data;
    }
}