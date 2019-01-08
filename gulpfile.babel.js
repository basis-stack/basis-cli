import babel from 'gulp-babel';
import chalk from 'chalk';
import del from 'del';
import eslint from 'gulp-eslint';
import fs from 'fs';
import gulp from 'gulp';
import jsonfile from 'jsonfile';
import print from 'gulp-print';

const logMessagePrefix = '         +  ';
const writeFilePrefix = 'Writing ';
const sourceFiles = ['./index.js', './src/**/*.js'];
const buildPath = 'dist';
const writeFileMessage = filepath => ` ${writeFilePrefix}${filepath}`;

const logMessage = (action, context) => {

  console.log(`${logMessagePrefix}${action}${chalk.magenta(context)}`);
};

/* Clean existing build & package artifacts */
gulp.task('clean', (cb) => {

  del([buildPath]).then((paths) => {

    logMessage('Deleted ', paths.join('; '));
    cb();
  });
});

/* Prepare build directory */
gulp.task('prepare:build', (cb) => {

  fs.mkdirSync(buildPath);
  cb();
});

/* Prepare package.json for the npm package */
gulp.task('create:package-json', (cb) => {

  const fileName = 'package.json';

  jsonfile.readFile(`./${fileName}`, (readError, packageJson) => {

    if (readError) { throw readError; }

    const outputPackageJson = Object.assign(packageJson);
    delete outputPackageJson.devDependencies;
    delete outputPackageJson.scripts;

    const pathName = `${buildPath}/${fileName}`;
    logMessage(writeFilePrefix, pathName);

    jsonfile.writeFile(pathName, outputPackageJson, { spaces: 2 }, (writeError) => {

      if (writeError) { throw writeError; }
      cb();
    });
  });
});

/* Compile app */
gulp.task('compile', () => (

  gulp.src(sourceFiles, { base: '.' })
      .pipe(babel())
      .pipe(gulp.dest(buildPath))
      .pipe(print(writeFileMessage))
));

/* Lint */
gulp.task('lint', () => (

  gulp.src(sourceFiles)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError())
));

/* Build entire solution */
gulp.task('build',
          gulp.series('clean', 'prepare:build', 'lint',
                      gulp.parallel(['create:package-json', 'compile'])));

/* Default gulp task */
gulp.task('default', gulp.series('build'));