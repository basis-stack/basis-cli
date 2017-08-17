import chalk from 'chalk';
import figlet from 'figlet';

const colours = {
  yellow: 'yellow',
  blue: 'blue',
  green: 'green'
};

const write = (colour, message) => {

  console.log(chalk[colour](message));
};

export const banner = () => {

  write(colours.yellow, figlet.textSync('Basis', { horizontalLayout: 'full' }));
  write(colours.blue, 'This tool will create a new (web app) project template based on the Basis stack\n');
};

export const status = () => {

  /* */
};