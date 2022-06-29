const { src, dest} = require("gulp");

// Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");


//Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");



// Обработка JS
const img = () => {
    return src(path.img.src) //Копируем с папки src js файлы первой вложености
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "IMG",
                message: error.message
            }))
        }))
        .pipe(newer(path.img.dest)) //Фильтрует изображения чтобы повторно не оптимизировать
        .pipe(imagemin(app.imagemin)) //Оптимизируем картинку
        .pipe(dest(path.img.dest)); //Копируем в  папку src public
};

module.exports = img;