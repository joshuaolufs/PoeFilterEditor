const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const uglifycss = require("gulp-uglifycss");
const del = require("del");
const sass = require('gulp-sass');
const streamqueue = require('streamqueue');
const gzip = require('gulp-gzip');
const compression = require('compression');
const browserSync = require("browser-sync").create();

const scripts = require("./scripts");
const styles = require("./styles");

var devMode = false;

gulp.task("html", function() {
    gulp.src("./src/html/**/*.html")
        .pipe(gulp.dest("./dist/"))
        /*.pipe(gzip({extension: 'gz'}))
        .pipe(gulp.dest("./dist/"))*/
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("css", function() {
    var cssRaw = gulp.src(styles["css"])
        .pipe(uglifycss());
    var cssFromSass = gulp.src(styles["scss"])
        .pipe(sass({outputStyle: 'compressed'}));
    
    return streamqueue({objectMode: true},
                       cssFromSass, 
                       cssRaw)
        .pipe(concat("allStyles.min.css"))
        .pipe(gulp.dest("./dist/css"))
        /*.pipe(gzip({extension: 'gz'}))
        .pipe(gulp.dest("./dist/css"))*/
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("js", function() {
    var jsMin = gulp.src(scripts["min"]);
    
    var jsOther = gulp.src(scripts["other"])
        .pipe(uglify());
    
    return streamqueue({objectMode: true},
                       jsMin, 
                       jsOther)
        .pipe(concat("allScripts.min.js"))
        .pipe(gulp.dest("./dist/js"))
        /*.pipe(gzip({extension: 'gz'}))
        .pipe(gulp.dest("./dist/js"))*/
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("fonts", function() {
    gulp.src(["./src/fonts/**/*.eot", 
              "./src/fonts/**/*.svg", 
              "./src/fonts/**/*.ttf", 
              "./src/fonts/**/*.woff", 
              "./src/fonts/**/*.woff2"])
    .pipe(gulp.dest("./dist/fonts"))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task("images", function() {
    gulp.src(["./src/images/**/*.*"])
    .pipe(gulp.dest("./dist/images"))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task("sounds", function() {
    gulp.src(["./src/sounds/**/*.*"])
    .pipe(gulp.dest("./dist/sounds"))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task("clean", function() {
    return del('./dist/**', {read: false});
});

gulp.task("build", ['clean'], function() {
    gulp.start(["css", "js", "html", "fonts", "images", "sounds"]);
});


gulp.task("browser-sync", function() {
    browserSync.init(null, {
        open: false,
        server: {
            baseDir: "dist",
            middleware: compression()
        }/*,
        httpModule: 'http2',
        https: true*/
    });
});

gulp.task("rundev", function() {
    devMode = true;
    gulp.start(["build", "browser-sync"]);
    gulp.watch(["./src/css/**/*.css", "./src/css/**/*.scss"], ["css"]);
    gulp.watch(["./src/js/**/*.js"], ["js"]);
    gulp.watch(["./src/html/**/*.html"], ["html"]);
    gulp.watch(["./src/fonts/**/*.*"], ["fonts"]);
});