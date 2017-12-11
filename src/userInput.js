import inquirer from 'inquirer';
import minimist from 'minimist';

const validateText = (value, message) => {

  const isValid = value.length && !value.includes(' ') && !value.includes('\'');

  return isValid ? true : message;
};

const getQuestions = (args) => {

  const questions = [{
    name: 'appName',
    type: 'input',
    message: 'App name',
    filter: value => value.toLowerCase(),
    default: answers => (args.length > 0 ? args[0] : ''),
    validate: value => validateText(value, 'Please enter an application name without spaces or special characters')
  }, {
    name: 'targetPath',
    type: 'input',
    message: 'Target directory',
    default: answers => answers.appName,
    validate: value => validateText(value, 'Please enter a target directory without spaces or special characters')
  }, {
    name: 'appType',
    type: 'list',
    message: 'App Type',
    choices: [
      { name: 'API + Client)', value: 'full', short: 'API+CLIENT' },
      { name: 'API only', value: 'api', short: 'API' },
      { name: 'Client only', value: 'client', short: 'CLIENT' }
    ]
  }, {
    name: 'includeTests',
    type: 'confirm',
    message: 'Include (sample) unit tests ?',
    default: false
  }];

  return questions;
};

export const getArgs = () => minimist(process.argv.slice(2));
export const getAnswers = args => inquirer.prompt(getQuestions(args));