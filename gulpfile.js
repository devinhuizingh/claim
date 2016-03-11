/* File: gulpfile.js */

// grab our packages
var autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    gulp   = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    image = require('gulp-image'),
    imagemin = require('gulp-imagemin'),
    mainBowerFiles = require('main-bower-files'),
    minifyCss = require('gulp-cssnano'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

gulp.task('everything', function() {
  gulp.run('app');
  gulp.run('images');
  gulp.run('vendor');
  gulp.run('views');
  gulp.run('styles');
})

// concatenate all application javascript into 'public'
gulp.task('app', function() {
    var files = [
        '!src/app/*.spec.js',
        '!src/app/**/*.spec.js',
        '!src/app/shared/**/*.spec.js',
        'src/app/*.module.js',
        'src/app/**/*.module.js',
        'src/app/shared/*.module.js',
        'src/app/*.js',
        'src/app/**/*.js',
        'src/app/shared/*.module.js'
    ];
    return gulp.src(files)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

// move images to 'dist'
gulp.task('images', function() {
    files = [
        'src/images/*.png',
        'src/images/*.jpg',
        'src/images/favicon.ico'
    ];
    gulp.src(files)
        .pipe(image({
          pngquant: true,
          optipng: false,
          zopflipng: true,
          advpng: true,
          jpegRecompress: true,
          jpegoptim: true,
          mozjpeg: true,
          gifsicle: true,
          svgo: true
        }))
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaces: true }))
        .pipe(gulp.dest('dist/images'));

    return gulp.src('src/images/*.svg')
        .pipe(gulp.dest('dist/images'))
        .pipe(connect.reload());
});

// concatenate and minify .scss files
gulp.task('styles', function() {
    return gulp.src('src/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({onError: function(e) { console.log(e); } }))
        .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
        .pipe(concat('styles.css'))
        .pipe(minifyCss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

// concatenate all vendor files into 'dist'
gulp.task('vendor', function() {
    gulp.src(mainBowerFiles())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/js'));

    var vendors = [
        
    ];

    var fonts = [
        
    ];

    gulp.src(vendors)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('dist/css'));

    return gulp.src(fonts)
        .pipe(gulp.dest('dist/fonts'))
        .pipe(connect.reload());
});

// add all html into 'dist'
gulp.task('views', function() {
    gulp.src('src/index.html')
        //.pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));

    gulp.src(['!src/index.html', 'src/app/**/*.html'])
        //.pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/views'))
        .pipe(connect.reload());
});

gulp.task('serve', function() {
    return connect.server({
        livereload: true,
        root: 'dist'
    });
});

// watch for file changes
gulp.task('watch', function() {
    // recommend not watching images, minification is sluggish
    gulp.watch(['src/app/*.js', 'src/app/**/*.js', 'src/app/shared/**/*.js'], ['app']);
    gulp.watch(['src/index.html', 'src/app/**/*.html', 'src/app/shared/**/*.html'], ['views']);
    gulp.watch(['src/styles/**/*.scss', 'src/styles/*.scss'], ['styles']);
});
