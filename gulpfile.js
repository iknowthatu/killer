const gulp = require('gulp');
const child_process = require('child_process');

gulp.task('clear-dist', (cb) => {
  child_process.execSync('rm -rf dist/*');
  cb();
});

gulp.task('webpack', (cb) => {
  child_process.exec('npm run build')
    .on('exit', (code, signal) => {
      console.log('webpack exit with code: ', code);
      console.log('webpack exit with signal: ', signal);
      cb();
    })
    .stdout.on('data', chunk => {
      console.log(chunk);
    });
});

gulp.task('copy-images', () => {
  return gulp.src('./src/assets/images/*')
    .pipe(gulp.dest('./dist/app/images'));
});

gulp.task('copy-audio', () => {
  return gulp.src('./src/assets/audio/*')
    .pipe(gulp.dest('./dist/app/audio'));
});

gulp.task('copy-data', () => {
  return gulp.src('./src/assets/data/*')
    .pipe(gulp.dest('./dist/app/data'));
});

gulp.task('copy-manifest', () => {
  return gulp.src('./src/manifest.json')
    .pipe(gulp.dest('./dist/app'));
});

gulp.task('default', [
  'clear-dist',
  'copy-manifest',
  'copy-images',
  'copy-audio',
  'copy-data',
  'webpack'
]);

function pack(browserName, cb) {
  let fileExt = browserName === 'opera' ? 'nex' : 'crx';
  let command = `${browserName} --pack-extension=./dist/app --pack-extension-key=./non_commit_files/packed/${browserName}/killer.pem\
    && cp ./dist/app.${fileExt} ./release/${browserName}/killer.${fileExt}\
    && mv ./dist/app.${fileExt} ./non_commit_files/packed/${browserName}/killer.${fileExt}`;

  child_process.exec(command).on('exit', (code, signal) => {
      console.log(`packing for ${browserName} was finished`);
      cb();
    }).stdout.on('data', chunk => {
      console.log(chunk);
    });
}

gulp.task('pack-for-opera', (cb) => {
  pack('opera', cb);
});

gulp.task('pack-for-chrome', (cb) => {
  pack('chrome', cb);
});

gulp.task('pack-for-chromium', (cb) => {
  pack('chromium-browser', cb);
});

gulp.task('release-unpacked', (cb) => {
  let command = `cp -r ./dist/app ./release/unpacked/`;

  child_process.execSync(command);
  cb();
});

gulp.task('pack-release', [
  'pack-for-opera',
  'pack-for-chrome',
  'pack-for-chromium'
]);

gulp.task('release', [
  'pack-release',
  'release-unpacked'
]);
