import fs from 'fs';
import path from 'path';
import ErrorResponse from './ErrorResponseModel.mjs';

const writeFileToJson = (folderName, fileName, data) => {
  try {
    const filePath = path.join(__appdir, folderName, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data));
  } catch (error) {
    throw new ErrorResponse(`Write to file failed: ${error.message}`, 500)
  }
};

export default writeFileToJson;
