export default class Block {
    constructor(blockIndex, previousHash, currentHash, data) {
        this.blockIndex = blockIndex;
        this.previousHash = previousHash;
        this.currentHash = currentHash;
        this.data = data;
    }
}