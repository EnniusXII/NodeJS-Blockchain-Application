import fs from 'fs';
import path from 'path';

export const errorHandler = (err, req, res, next) => {
    const filePath = path.join(__appdir, 'logs', 'error.log');
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Internal Server Error';

    const message = `Request: ${req.method} ${req.originalUrl} - ${new Date()}\n ${err.message}\n`;

    fs.appendFileSync(filePath, message);

    res.status(err.statusCode).json({success: err.success, message: err.message});
};

export default errorHandler;