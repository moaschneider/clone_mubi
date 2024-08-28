const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');

// Caminhos dos arquivos
const paths = {
    images: 'src/images/**/*',
    distImages: 'dist/images',
    styles: 'src/styles/*.scss',
    distStyles: 'dist/css',
    html: '*.html'
};


function styles(){
    return gulp.src(paths.styles)
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest(paths.distStyles));
}

function images(){
    return gulp.src(paths.images,  { encoding: false })
        .pipe(newer(paths.distImages)) // Processa apenas imagens novas ou modificadas
        .pipe(imagemin([
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 })
        ]))
        .pipe(gulp.dest(paths.distImages));
}

function reloadImages(){
    return gulp.series(images);
}

exports.default = gulp.parallel(styles, images);

exports.watch = function(){
    gulp.watch(paths.styles, styles);
    gulp.watch(paths.images, images);
    gulp.watch(paths.html, reloadImages());
};