export default class Block {
    constructor(timestamp, blockIndex, previousHash, currentHash, data, difficulty) {
        this.timestamp = timestamp;
        this.blockIndex = blockIndex;
        this.previousHash = previousHash;
        this.currentHash = currentHash;
        this.data = data;
        this.difficulty = difficulty || +process.env.DIFFICULTY;
    }
}