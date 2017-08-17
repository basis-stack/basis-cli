import CLI from 'clui';
import clone from 'git-clone';

import { status } from './messages';

const Spinner = CLI.Spinner;
const getBasis = targetPath => (

  new Promise((resolve, reject) => {

    // resolve();

    const gitUrl = 'https://github.com/warebrained/basis.git';

    clone(gitUrl, targetPath, {}, (err) => {

      if (err === undefined) {

        resolve();
      } else {

        reject(err);
      }
    });
  })
);

const finalise = (spinner, err) => {

  spinner.stop();

  if (err !== undefined) {

    status(`Template clone failed: ${err.message}`, false);
  } else {

    status('Template cloned');
  }
};

export default targetPath => (

  new Promise((resolve, reject) => {

    console.log();
    const spinner = new Spinner('Downloading Basis template from Github...');
    spinner.start();

    getBasis(targetPath).then(() => {

      finalise(spinner);
      resolve();
    })
    .catch((err) => {

      finalise(spinner, err);
      reject(err);
    });
  })
);