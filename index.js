import clear from 'clear';

import { banner } from './src/messages';
import { getCurrentDirectoryBase } from './src/fsUtils';
import { getArgs, getAnswers } from './src/userInput';
import download from './src/download';

clear();
banner();

const args = getArgs();
const basePath = getCurrentDirectoryBase();

getAnswers(basePath).then((answers) => {

  download(answers.targetPath);
});