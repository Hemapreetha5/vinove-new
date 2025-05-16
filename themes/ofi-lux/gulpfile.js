const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
const projectPath = 'app/scss/templates/project';

gulp.task('sass', function(){
    return gulp.src("app/scss/**/*.scss").
        pipe(sourcemaps.init()).
        pipe(sass({includePaths : ['./scss/']})).
        pipe(sourcemaps.write('map/')).
        pipe(gulp.dest("dist/output")).
        pipe(browserSync.stream());
    
});
gulp.task('copy', function() {
    return gulp.src("dist/output/**").
        pipe(gulp.dest(projectPath));
});
gulp.task('serve',function(){
     browserSync.init({
         server: "./dist"
     });
     gulp.watch('app/scss/**/*.scss',gulp.series('sass'));
     gulp.watch('dist/*.html').on('change', browserSync.reload);
 });

 gulp.task('start', gulp.series('sass','copy','serve'));