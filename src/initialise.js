import del from 'del';
import jsonfile from 'jsonfile';
import replace from 'replace-in-file';

import { status } from './messages';

const cleanFiles = (answers) => {

  const pathsToNuke = ['.git', 'docs', '.codeclimate.yml', '.coveralls.yml',
    '.travis.yml', 'appveyor.yml', 'upgrade_deps.sh',
    'LICENSE', 'README.md', 'packages', 'TODO', 'lerna.json', 'add', 'yarn.lock'];

  if (!answers.includeTests) {

    pathsToNuke.push('test/server');
  }

  return new Promise((resolve, reject) => {

    del(pathsToNuke.map(p => `${answers.targetPath}/${p}`))
      .then(() => { resolve(answers); })
      .catch((err) => { reject(err); });
  });
};

const tweakPackageJson = answers => (

  new Promise((resolve, reject) => {

    const packageFilePath = `${answers.targetPath}/package.json`;
    const appName = answers.appName;
    const basisText = 'basis';
    const babelNodeText = 'babel-node';
    const packageSpecsText = 'packages/**/*Spec.js ';

    jsonfile.readFile(packageFilePath, (readError, packageJson) => {

      if (readError) { reject(readError); }

      const outputPackageJson = Object.assign(packageJson);
      delete outputPackageJson.description;
      delete outputPackageJson.repository;
      delete outputPackageJson.keywords;
      delete outputPackageJson.author;
      delete outputPackageJson.bugs;
      delete outputPackageJson.homepage;
      delete outputPackageJson.scripts['publish-coverage'];
      delete outputPackageJson.private;
      delete outputPackageJson.workspaces;
      outputPackageJson.name = answers.appName;
      outputPackageJson.scripts.start = outputPackageJson.scripts.start.replace(basisText, appName)
                                                                       .replace(babelNodeText, 'node');
      outputPackageJson.scripts.dev = outputPackageJson.scripts.dev.replace(basisText, appName)
                                                                   .replace(babelNodeText, 'node');
      outputPackageJson.scripts.prod = outputPackageJson.scripts.prod.replace(basisText, appName);
      outputPackageJson.scripts.test = outputPackageJson.scripts.test.replace(packageSpecsText, '');
      outputPackageJson.scripts.coverage = outputPackageJson.scripts.coverage.replace(packageSpecsText, '');

      jsonfile.writeFile(packageFilePath, outputPackageJson, { spaces: 2 }, (writeError) => {

        if (writeError) { reject(writeError); }

        resolve(answers);
      });
    });
  })
);

const cleanConfig = (answers) => {

  const replaceOptions = {

    files: `${answers.targetPath}/config/settings.default.js`,
    from: /basis/g,
    to: answers.appName
  };

  return new Promise((resolve, reject) => {

    replace(replaceOptions)
      .then((changedFiles) => { resolve(answers); })
      .catch((error) => { reject(error); });
  });
};

const notify = answers => (

  new Promise((resolve, reject) => {

    status('Initialised');
    resolve(answers);
  })
);

export default answers => (

  cleanFiles(answers)
    .then(tweakPackageJson)
    .then(cleanConfig)
    .then(notify)
);