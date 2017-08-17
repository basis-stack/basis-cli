import babel from 'gulp-babel';
import chalk from 'chalk';
import del from 'del';
import eslint from 'gulp-eslint';
import fs from 'fs';
import gulp from 'gulp';
import jsonfile from 'jsonfile';
import runSequence from 'run-sequence';
import print from 'gulp-print';

// import replace from 'gulp-replace';
// import rename from 'gulp-rename';
// import merge from 'merge-stream';
// import filter from 'gulp-filter';
// import concat from 'gulp-concat';
// import webpack from 'webpack';
// import util from 'gulp-util';
// import sass from 'gulp-sass';
// import install from 'gulp-install';
// import extReplace from 'gulp-ext-replace';
// import tar from 'gulp-tar';
// import gzip from 'gulp-gzip';
// import chmod from 'gulp-chmod';

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
gulp.task('prepare:build', ['clean'], (cb) => {

  fs.mkdirSync(buildPath);
  cb();
});

// /* Prepare package.json for the npm package */
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
gulp.task('build', ['prepare:build'], (cb) => {

  runSequence('lint',
              ['compile', 'create:package-json'],
              cb);
});

// /* Install runtime dependencies */
// gulp.task('install:runtime-dependencies', () => (

//   gulp.src(`${config.paths.build}/package.json`)
//       .pipe(install())
// ));

// /* Package build artifacts */
// gulp.task('package', ['install:runtime-dependencies', 'copy:server-scripts'], () => {

//   const packageFileName = `${envSettings.default.appName}.package.tar`;
//   logMessage('Creating ', `${config.paths.package}/${packageFileName}`);

//   return gulp.src(`${config.paths.build}/**/*`)
//             .pipe(tar(packageFileName))
//             .pipe(gzip())
//             .pipe(gulp.dest(config.paths.package));
// });

/* Default gulp task */
gulp.task('default', ['build'], (cb) => {

});