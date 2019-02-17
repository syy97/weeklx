var gulp = require("gulp");
var concat = require("gulp-concat");
var cssmin = require("gulp-clean-css");
var jsmin = require("gulp-uglify");
var sass = require("gulp-sass");
var webserver = require("gulp-webserver");
//启动服务
gulp.task("webserver", function() {
    return gulp.src("./")
        .pipe(webserver({
            open: true,
            port: 8081,
            livereload: true
        }))
})

//编译sass
gulp.task("sass", function() {
    return gulp.src("./src/css/*.scss")
        .pipe(sass()) //编译
        .pipe(gulp.dest("./src/css"))
})

//合并压缩
gulp.task("css", function() {
    return gulp.src("./src/css/*.scss")
        .pipe(concat("main.css")) //合并
        .pipe(cssmin()) //css压缩
        .pipe(gulp.dest("./dist/css"))

})

//编译js
gulp.task("js", function() {
    return gulp.src("./src/js/*.js")
        .pipe(concat("build.js"))
        .pipe(jsmin())
        .pipe(gulp.dest("./dist/js"))
})

//监听sass
gulp.task("watch", function() {
    return gulp.watch("./src/css/*.css", gulp.series("sass", "css"));
})

//开发命令
gulp.task("dev", gulp.series("sass", "webserver", "watch"))

//线上命令
gulp.task("build", gulp.parallel("js", "css"))