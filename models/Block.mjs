export default class Block {
    constructor(timestamp, blockIndex, previousHash, currentHash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.blockIndex = blockIndex;
        this.previousHash = previousHash;
        this.currentHash = currentHash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || +process.env.DIFFICULTY;
    }
}