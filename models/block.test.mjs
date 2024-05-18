import {describe, it, expect } from "vitest";
import Block from "./Block.mjs";

describe("Block", () => {
    const block = new Block();

    describe("Properties", () => {
        it("should have a timestamp property", () => {
            expect(block).toHaveProperty("timestamp");
        });

        it("should have a blockIndex property", () => {
            expect(block).toHaveProperty("blockIndex");
        });

        it("should have a previousHash property", () => {
            expect(block).toHaveProperty("previousHash");
        });

        it("should have a currentHash property", () => {
            expect(block).toHaveProperty("currentHash");
        });

        it("should have a data property", () => {
            expect(block).toHaveProperty("data");
        });

        it("should have a nonce property", () => {
            expect(block).toHaveProperty("nonce");
        });

        it("should have a difficulty property", () => {
            expect(block).toHaveProperty("difficulty");
        });
    });
})