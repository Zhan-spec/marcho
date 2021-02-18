const { src, dest, watch, parallel, series } = require('gulp');      /*для работы src*/

const scss          = require('gulp-sass');
const concat        = require('gulp-concat');
const autoprefixer  = require('gulp-autoprefixer');
const uglify        = require('gulp-uglify');
const imagemin      = require('gulp-imagemin');
const del           = require('del');
const browserSync   = require('browser-sync').create();

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'src/'
    },
    notify: false /* убрать уведомления в правом верхнем углу браузера о выполнении действий browsersync*/
  })
}

function styles() {
  return src('src/scss/style.scss')
    .pipe(scss({outputStyle: 'compressed'}))  /* expanded | compressed */
    .pipe(concat('style.min.css'))  /* указываем название файла после конвератции */
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions'],
      grid: true
    }))
    .pipe(dest('src/css'))   /* путь для выходного файла style.css*/
    .pipe(browserSync.stream())  /* stream - выполняется только добавление стилей без перезагрузки страницы 
                                  reload - выполняется перезагрузка страницы */ 
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
    'node_modules/rateyo/src/jquery.rateyo.js',
    'src/js/main.js'
  ])
  .pipe(concat('main.min.js'))
  .pipe(uglify())   /* для минификации js файлов */ 
  .pipe(dest('src/js'))
  .pipe(browserSync.stream())  /* для js нужна презагрузка страницы */
}

function images() {
  return src('src/images/**/*.*')
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
  ]))
  .pipe(dest('dist/images'))
}

function build() {
  return src([
    'src/**/*.html',
    'src/css/style.min.css',
    'src/js/main.min.js'
  ], {base: 'src'})
  .pipe(dest('dist'))
}

function cleanDist() {
  return del('dist')
}

function watching() {
  watch(['src/scss/**/*.scss'], styles);
  watch(['src/js/**/*.js', '!src/js/main.min.js'], scripts);
  /* следить за измеенниямии в 'src/js/--.js' но не следить за файлом '!src/js/main.min.js*/
  watch(['src/**/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;   /* для запуска function styles() */
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;  /* для запуска function watching */
exports.images = images;
//exports.build = build;   /*  если запускаем build сразу для удаления dist, сжатия картинок и копирования файлов из src в dist то измользуем build с series*/
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);

exports.default = parallel(styles, scripts, browsersync, watching);