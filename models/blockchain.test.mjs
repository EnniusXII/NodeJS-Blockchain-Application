import {describe, it, expect } from "vitest";
import Blockchain from "./Blockchain.mjs";

describe("Blockchain", () => {
    const blockchain = new Blockchain();
    const genesisHash = blockchain.chain[0].currentHash;
    const genesisPreHash = blockchain.chain[0].previousHash;

    it("should contain a genesis block with currentHash Genesis", () => {
        expect(genesisHash).toBe("Genesis")
    });

    it("should contain a genesis block with previousHash 0", () => {
        expect(genesisPreHash).toBe("0")
    });
});