import inquirer from 'inquirer';
import minimist from 'minimist';

const validateText = (value, message) => {

  const isValid = value.length && !value.includes(' ') && !value.includes('\'');

  return isValid ? true : message;
};

const getQuestions = () => ([
  {
    name: 'appName',
    type: 'input',
    message: 'App name',
    filter: value => value.toLowerCase(),
    validate: value => validateText(value, 'Please enter an application name without spaces or special characters')
  },
  {
    name: 'targetPath',
    type: 'input',
    message: 'Target directory',
    default: answers => answers.appName,
    validate: value => validateText(value, 'Please enter a target directory without spaces or special characters')
  },
  {
    name: 'includeTests',
    type: 'confirm',
    message: 'Include source tests ?',
    default: false
  }
]);

export const getArgs = () => minimist(process.argv.slice(2));
export const getAnswers = () => inquirer.prompt(getQuestions());