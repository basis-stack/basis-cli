import CLI from 'clui';
import clone from 'git-clone';

import { status } from './messages';

const Spinner = CLI.Spinner;
const getBasis = targetPath => (

  new Promise((resolve, reject) => {

    const gitUrl = 'https://github.com/basis-stack/basis.git';

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

export default answers => (

  new Promise((resolve, reject) => {

    console.log();
    const spinner = new Spinner('Downloading Basis template from Github...');
    spinner.start();

    getBasis(answers.targetPath).then(() => {

      finalise(spinner);
      resolve(answers);
    })
    .catch((err) => {

      finalise(spinner, err);
      reject(err);
    });
  })
);