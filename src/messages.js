import chalk from 'chalk';
import figlet from 'figlet';

const colours = {
  yellow: 'yellow',
  cyan: 'cyan',
  green: 'green',
  red: 'red'
};

const write = (colour, message) => {

  console.log(chalk[colour](message));
};

export const banner = () => {

  write(colours.yellow, figlet.textSync('Basis', { horizontalLayout: 'full' }));
  write(colours.cyan, 'This tool will create a new (web app) project template based on the Basis stack\n');
};

export const status = (message, success = true) => {

  const colour = success ? colours.green : colours.red;

  write(colour, message);
};