import { writeFile } from 'fs/promises';
import path from 'path';
import ErrorResponse from './ErrorResponseModel.mjs';

const writeFileToJson = async (folderName, fileName, data) => {
  try {
    const filePath = path.join(__appdir, folderName, fileName);
    await writeFile(filePath, JSON.stringify(data));
  } catch (error) {
    throw new ErrorResponse(`Write to file failed: ${error.message}`, 500)
  }
};

export default writeFileToJson;
