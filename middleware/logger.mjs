import fs from 'fs';
import path from 'path';

const logger = (req, res, next) => {
    const logFilePath = path.join(__appdir, 'logs', 'requests.log');

    const message = `${req.method}  ${req.originalUrl} - ${new Date()}\n`;

    fs.appendFileSync(logFilePath, message);

    next();
};

export default logger;