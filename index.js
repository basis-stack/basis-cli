#!/usr/bin/env node

import clear from 'clear';

import { banner, status } from './src/messages';
import { getArgs, getAnswers } from './src/userInput';
import download from './src/download';
import initialise from './src/initialise';

clear();
banner();

const args = getArgs();

getAnswers(args._)
  .then(download)
  .then(initialise)
  .then(() => {

    status('Complete\n');
  })
  .catch((err) => {

    status(`Failed: ${err.message}\n`, false);
  });