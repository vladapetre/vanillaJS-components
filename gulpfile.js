var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var watch = require('gulp-watch');

// gulp.task('pack-js', function () {	
// 	return gulp.src(['assets/js/vendor/*.js', 'assets/js/main.js', 'assets/js/module*.js'])
// 		.pipe(concat('bundle.js'))
// 		.pipe(gulp.dest('public/build/js'));
// });

gulp.task('pack-css', function () {
    return watch('src/css/*.css', function () {
        gulp.src(['src/css/*.css'])
            .pipe(concat('jsPlugin.css'))
            .pipe(minify())
            .pipe(cleanCss())
            .pipe(gulp.dest('dist/css'));
    })
});

gulp.task('default', ['pack-css']);