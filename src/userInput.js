import inquirer from 'inquirer';
import minimist from 'minimist';

const validateText = (value, message) => {

  const isValid = value.length && !value.includes(' ') && !value.includes('\'');

  return isValid ? true : message;
};

const getQuestions = defaultDirectory => ([
  {
    name: 'appName',
    type: 'input',
    message: 'App name:',
    validate: value => validateText(value, 'Please enter an application name without spaces or special characters')
  },
  {
    name: 'targetPath',
    type: 'input',
    message: 'Target directory:',
    default: defaultDirectory,
    validate: value => validateText(value, 'Please enter a target directory without spaces or special characters')
  }
]);

export const getArgs = () => minimist(process.argv.slice(2));
export const getAnswers = defaultDirectory => inquirer.prompt(getQuestions(defaultDirectory));