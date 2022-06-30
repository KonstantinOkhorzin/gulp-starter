import gulp from "gulp";

// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";

//Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import fileInclude from "gulp-file-include";
import htmlmin from "gulp-htmlmin";
import size from "gulp-size";
import gulpIf from "gulp-if";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";


// Обработка HTML
const html = () => {
    return gulp.src(path.html.src) //Копируем с папки src html файлы первой вложености
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "HTML",
                message: error.message
            }))
        }))
        .pipe(fileInclude()) //Соединяем html
        .pipe(gulpIf(app.isProd, webpHtmlNosvg())) //Создает обвертку для изображения
        .pipe(gulpIf(app.isProd, versionNumber({
            'value': '%DT%',
            'append': {
                'key': '_v',
                'cover': 0,
                'to': [
                    'css',
                    'js',
                ]
            },
            'output': {
                'file': 'gulp/version.json'
            }
        })))
        .pipe(gulpIf(app.isProd, size({title: "До сжатия HTML"}))) //Показывает размер до сжатия
        .pipe(htmlmin(app.htmlmin)) //Сжимаем html
        .pipe(gulpIf(app.isProd, size({title: "После сжатия HTML"}))) //Показывает размер после сжатия
        .pipe(gulp.dest(path.html.dest)); //Копируем в папку public
};

export default html;