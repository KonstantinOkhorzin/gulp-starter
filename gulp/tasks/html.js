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

// Обработка HTML
const html = () => {
    return src(path.html.src) //Копируем с папки src html файлы первой вложености
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "HTML",
                message: error.message
            }))
        }))
        .pipe(fileInclude()) // Соединяем html
        .pipe(size({title: "До сжатия"})) // Показывает размер  
        .pipe(htmlmin(app.htmlmin))
        .pipe(size({title: "После сжатия"})) // Показывает размер после сжатия
        .pipe(dest(path.html.dest)); //Копируем в  папку src public
};

module.exports = html;