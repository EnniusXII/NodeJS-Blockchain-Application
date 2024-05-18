import express from "express";
import dotenv from "dotenv";
import BlockchainRouter from "./routes/blockchainRoutes.mjs";
import memberRouter from "./routes/memberRoutes.mjs";
import logger from "./middleware/logger.mjs";
import path from 'path'
import { fileURLToPath } from 'url'
import ErrorResponse from "./utilities/ErrorResponseModel.mjs";
import errorHandler from "./middleware/errorHandler.mjs";

dotenv.config({ path: "./config/config.env"});

const app = express();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
global.__appdir = dirname;

if (process.env.NODE_ENV === 'development') {
    app.use(logger);
};

app.use(express.json());
app.use("/api/v1/blockchain", BlockchainRouter);
app.use("/api/v1/members", memberRouter);

app.all('*', (req, res, next) => {
    next(new ErrorResponse(`Could not find ${req.originalUrl}`, 404));
  });

app.use(errorHandler);

const PORT = process.argv[2];

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));