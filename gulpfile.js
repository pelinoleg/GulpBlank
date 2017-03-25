var gulp = require('gulp');
var	stylus = require('gulp-stylus');
var	browserSync = require('browser-sync');
var	pug = require('gulp-pug');
var notify = require("gulp-notify");
var autoprefixer = require('gulp-autoprefixer');
var SourceMap = require('gulp-sourcemaps');
var rename = require("gulp-rename");
var htmlbeautify = require('gulp-html-beautify');
var wiredep = require('wiredep').stream;
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var clean = require('gulp-clean');
var image = require('gulp-image');
var cache = require('gulp-cache');
var gulpsync = require('gulp-sync')(gulp);
var zip = require('gulp-zip');


// Compile stylus,add prefixes, minify css, reload browser and notify
gulp.task( 'stylus', function(){
  return gulp.src('app/stylus/*.styl') // source folder
  .pipe(SourceMap.init())
  .pipe( stylus().on( 'error', notify.onError({
      message: "<%= error.message %>",
      title  : "Stylus Error!"
    }))
	) // error notification
	.pipe(autoprefixer(['last 10 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // add prefix
	.pipe(rename('style.css'))
	.pipe(SourceMap.write('.')) //Create source map
  .pipe(gulp.dest('app/css')) //destination folder
	.pipe(browserSync.reload({stream: true})) // browser reload styles
  // .pipe(notify('Stylus compiled')); // uncomment this line for "success" notify
});


// Компилируем Pug в HTML и перегружаем страницу
gulp.task('pug', function(){
	return gulp.src('app/pug/*.pug') // source folder
	.pipe(pug({pretty: true})) //compile pug
	.pipe(gulp.dest('app')) // destination folder
	.pipe(browserSync.reload({stream: true}) ) // browser refresh
});


// подключаем стили и скрипты автоматом котоорые были установлены через bower
// bower i --save magnific-popup
// -save для добавления в dependencies (очень важно)
gulp.task('bower', function () {
  gulp.src('app/pug/includes/_head.pug')
    .pipe(wiredep({
      directory: "app/libs",
			'ignorePath': '../../'
    }))
    .pipe(gulp.dest('app/pug/includes'));
});



// formate html
gulp.task('htmlbeautify', function() {
  gulp.src('app/*.html')
    .pipe(htmlbeautify({
		    "indent_size": 4,
		}))
    .pipe(gulp.dest('app'))
});


// refresh browser
gulp.task('browser-sync', function(){
	browserSync({
		server:{
			baseDir: 'app'
		},
		notify: false
	})
});

//delete "dist" map
gulp.task('clean', function() {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

//compress image and copy to dist/img
gulp.task('image', function () {
  return gulp.src('app/img/*')
    .pipe(cache(image()))
    .pipe(gulp.dest('dist/img'));
});

// copy fonts to dist
gulp.task('copyfonts', function() {
   return gulp.src('app/fonts//**/*.*')
   .pipe(gulp.dest('dist/fonts'));
});

// create archive for build (map "dist")
gulp.task('zip', () =>
    gulp.src('dist/**/*')
        .pipe(zip('build.zip'))
        .pipe(gulp.dest('./'))
);

//запускаем все команды чтоб прошлись по файлам, потом мониторим все изменения.
gulp.task('default', ['stylus', 'pug', 'bower', 'htmlbeautify', 'browser-sync'], function() {
  gulp.watch('app/stylus/**/*.styl', ['stylus']); //watch stylus files
  gulp.watch('app/pug/**/*.pug', ['pug']); //watch pug files
  gulp.watch('bower.json', ['bower']); //watch if install scripts with bower
  gulp.watch('app/*.html', ['htmlbeautify']); //watch html files and beautify
});

//comppile stylus and pug, add bower components in files and beautify html
gulp.task('compile', gulpsync.sync(['stylus', 'pug', 'bower', 'htmlbeautify']), function() {});


// build project in "dist map"
gulp.task('build', gulpsync.sync(['clean', 'image', 'copyfonts']), function () {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest('dist'))
    // .pipe(notify('malatoc'));
});
