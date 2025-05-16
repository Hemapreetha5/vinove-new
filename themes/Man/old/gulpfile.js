const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
/*const projecttemplate = 'priips_morganstanley';*/ /*Project foldername */

gulp.task('sass', function(){
    return gulp.src("app/scss/**/*.scss").
        pipe(sourcemaps.init()).
        pipe(sass({includePaths : ['./scss/']})).
        pipe(sourcemaps.write('map/')).
        pipe(gulp.dest("dist/output")).
        pipe(browserSync.stream());
});

gulp.task('serve',function(){
     browserSync.init({
         server: "./dist"
     });
     gulp.watch('app/scss/**/*.scss',gulp.series('sass'));
     gulp.watch('dist/*.html').on('change', browserSync.reload);
 });

 

 gulp.task('start', gulp.series('sass','serve'));