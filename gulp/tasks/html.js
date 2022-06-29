const { src, dest} = require("gulp");

// Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");

//Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const fileInclude = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");
const size = require("gulp-size");
const webpHtml = require("gulp-webp-html");


// Обработка HTML
const html = () => {
    return src(path.html.src) //Копируем с папки src html файлы первой вложености
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "HTML",
                message: error.message
            }))
        }))
        .pipe(fileInclude()) //Соединяем html
        .pipe(webpHtml()) //Создает обвертку для изображения
        .pipe(size({title: "До сжатия HTML"})) //Показывает размер до сжатия
        .pipe(htmlmin(app.htmlmin)) //Сжимаем html
        .pipe(size({title: "После сжатия HTML"})) //Показывает размер после сжатия
        .pipe(dest(path.html.dest)); //Копируем в  папку public
};

module.exports = html;