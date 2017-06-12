var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
// var browserSync = require("browser-sync");
var notify = require("gulp-notify");
var pug = require("gulp-pug");
var prettify = require('gulp-prettify')
var csscomb = require('gulp-csscomb');
var beautify = require('gulp-beautify');

// gulp.task('default', ['sass', 'browser-sync', 'pug', 'watch']);
gulp.task('default', ['sass', 'pug', 'beautify', 'watch']);

//sassとpugの監視をして変換処理させる
gulp.task('watch', () => {
    gulp.watch(['./sass/**'], () => {
        gulp.start(['sass']);
    });
    gulp.watch(['./pug/**'], () => {
        gulp.start(['pug']);
    });
    gulp.watch(['./js_/index.js'], () => {
        gulp.start(['beautify']);
    });
});

//ブラウザ表示
// gulp.task('browser-sync', () => {
//     browserSync({
//         server: {
//             baseDir: "./"   //サーバとなるrootディレクトリ
//         }
//     });
//     //ファイルの監視
//     //以下のファイルが変わったらリロードする
// 	gulp.watch("./js/**/*.js",     ['reload']);
//     gulp.watch("./*.html",         ['reload']);
// });

//sassをcssに変換
gulp.task("sass", () => {
	gulp.src("./sass/**/*scss")
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
		.pipe(sass())
        .pipe(csscomb())
		.pipe(gulp.dest("./css"))
        //reloadせずにinjectする
        // .pipe(browserSync.stream())
});

//pugをhtmlに変換
gulp.task("pug", () => {
    var pugOpt = {
        pretty: true
    }
    var prtOpt = {
        indent_char: "\t",
        indent_size: 1
    }
    gulp.src("./pug/**/*.pug")
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(pug(pugOpt))
        .pipe(prettify(prtOpt))
        .pipe(gulp.dest("./"))
});

gulp.task("beautify", () => {
    var opt = {
        indent_size: 1,
        indent_with_tabs: true
    }
    gulp.src("./js_/index.js")
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(beautify(opt))
        .pipe(gulp.dest("./js"))
});

//ブラウザリロード処理
// gulp.task('reload', () => {
//     browserSync.reload();
// });
