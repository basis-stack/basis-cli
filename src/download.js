import CLI from 'clui';
import clone from 'git-clone';
import figures from 'figures';

import { status } from './messages';

const Spinner = CLI.Spinner;
const getBasis = (targetPath) => {

  const gitUrl = 'https://github.com/warebrained/basis.git';

  return new Promise((resolve, reject) => {

    clone(gitUrl, targetPath, {}, (err) => {

      if (err === undefined) {

        resolve();
      } else {

        reject(err);
      }
    });
  });
};

const finalise = (spinner, err) => {

  spinner.stop();

  if (err !== undefined) {

    status(`\n${figures.cross} Failed: ${err.message}\n`, false);
  } else {

    status(`\n${figures.tick} Done\n`);
  }
};

export default (targetPath) => {

  const spinner = new Spinner('Downloading Basis template from Github...');
  spinner.start();

  getBasis(targetPath).then(() => { finalise(spinner); })
                      .catch((err) => { finalise(spinner, err); });
};