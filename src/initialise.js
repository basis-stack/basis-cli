import del from 'del';

import { status } from './messages';

export default answers => (

  new Promise((resolve, reject) => {

    const pathsToNuke = ['.git', 'docs', '.codeclimate.yml', '.coveralls.yml', '.travis.yml', 'appveyor.yml', 'upgrade_deps.sh'];

    if (!answers.includeTests) {

      pathsToNuke.push('test/server');
    }

    del(pathsToNuke.map(p => `${answers.targetPath}/${p}`)).then(() => {

      // TODO: Swap out basis for given app name, and tweak package.json & config

      status('Initialised');
      resolve();
    });
  })
);