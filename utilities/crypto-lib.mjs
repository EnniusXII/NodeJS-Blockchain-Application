import crypto from "crypto";

export const createHashFunction = (stringToHash) => {
    return crypto.createHash("sha256").update(stringToHash).digest("hex");
};