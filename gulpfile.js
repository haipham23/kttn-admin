const gulp = require('gulp');
const babel = require('gulp-babel');
const log = require('fancy-log');
const babelify = require('babelify');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const del = require('del');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const server = require('gulp-develop-server');
const runSequence = require('run-sequence');
const buffer = require('vinyl-buffer');
const rename = require('gulp-rename');
const inject = require('gulp-inject-string');
const moduleImporter = require('sass-module-importer');


const isProd = process.env.NODE_ENV === 'production';

const paths = {
  scripts: {
    main: './client/js/index.js',
    watch: './client/js/**',
    to: './public/javascripts'
  },
  styles: {
    main: './client/scss/index.scss',
    watch: './client/scss/**',
    to: './public/stylesheets'
  }
};

const options = {
  server: {
    path: './app.js',
    execArgv: [ '--harmony' ]
  }
};

const JS_FILE_NAME = 'index.js';
const CSS_FILE_NAME = 'styles.css';


gulp.task('scripts', () => {
  browserify({ entries: paths.scripts.main })
    .transform('babelify', {
      ignore: /.spec./,
      presets: ['env', 'react']
    })
   .bundle()
   .pipe(source(JS_FILE_NAME))
   .pipe(gulpif(isProd, buffer()))
   .pipe(gulpif(isProd, uglify().on('error', log)))
   .pipe(gulp.dest(paths.scripts.to));
});


// compile all sass files
gulp.task('styles', () => {
  return gulp.src(paths.styles.main)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass({ outputStyle: 'compressed', importer: moduleImporter() }))
    .pipe(autoprefixer({ browsers: ['last 3 version'] }))
    .pipe(plumber.stop())
    .pipe(rename(CSS_FILE_NAME))
    .pipe(gulp.dest(paths.styles.to))
});

gulp.task('inject', () => {
  const CSS_PATH = '\n    <link rel="stylesheet" href="/stylesheets/' + CSS_FILE_NAME + '" />';
  const JS_PATH = '\n    <script src="/javascripts/' + JS_FILE_NAME + '"></script>';

  return gulp.src('./views/layout.hbs.tpl')
    .pipe(inject.after('<!-- inject:css -->', CSS_PATH))
    .pipe(inject.after('<!-- inject:js -->', JS_PATH))
    .pipe(rename('layout.hbs'))
    .pipe(gulp.dest('views'));
});

// cleanup tmp files
gulp.task('clean', (cb) => {
  return del(['public/javascripts/**', 'public/stylesheets/**'], cb);
});

gulp.task('server:start', () => {
  server.listen(options.server);
});

gulp.task('default', () => {
  runSequence('clean', ['styles', 'scripts'], 'inject', 'server:start', () => {
    gulp.watch(paths.scripts.watch, ['scripts']);
    gulp.watch(paths.styles.watch, ['styles']);
  })
});

// build to production
gulp.task('build', (cb) => {
  runSequence('clean', ['styles', 'scripts'], 'inject', cb);
});


// When an error occurs, display in red and beep
function onError(err) {
  log(err.message);
  this.emit('end');
}
