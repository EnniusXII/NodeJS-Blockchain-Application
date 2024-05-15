import express from "express";
import dotenv from "dotenv";
import BlockchainRouter from "./routes/blockchainRoutes.mjs";
import memberRouter from "./routes/memberRoutes.mjs";

dotenv.config({ path: "./config/config.env"});

const app = express();

app.use(express.json());
app.use("/api/v1/blockchain", BlockchainRouter)
app.use("/api/v1/members", memberRouter)

const PORT = process.argv[2];

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));