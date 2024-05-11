import express from "express";
import dotenv from "dotenv";
import router from "./routes/blockchainRoutes.mjs";

dotenv.config({ path: "./config/config.env"});

const app = express();

app.use(express.json());
app.use("/api/v1/blockchain", router)

const PORT = process.env.PORT || 5010;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));