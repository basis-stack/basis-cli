import fs from 'fs';
import path from 'path';

export const getCurrentDirectoryBase = () => path.basename(process.cwd());

export const directoryExists = (filePath) => {

  try {

    return fs.statSync(filePath)
             .isDirectory();
  } catch (err) {

    return false;
  }
};