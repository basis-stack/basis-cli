import clear from 'clear';

import { banner, status } from './src/messages';
import { getCurrentDirectoryBase } from './src/fsUtils';
import { getArgs, getAnswers } from './src/userInput';
import download from './src/download';
import initialise from './src/initialise';

clear();
banner();

// const args = getArgs();
// const basePath = getCurrentDirectoryBase();

getAnswers().then((answers) => {

  download(answers.targetPath).then(() => {

    initialise(answers).then(() => {

      status('Complete\n');
    });
  })
  .catch(() => {

    status('Failed\n', false);
  });
});