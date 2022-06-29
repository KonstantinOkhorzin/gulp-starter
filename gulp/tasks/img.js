const { src, dest} = require("gulp");

// Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");


//Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const webp = require("gulp-webp");



// Обработка IMG
const img = () => {
    return src(path.img.src) //Копируем с папки src/img файлы любой вложености
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "IMG",
                message: error.message
            }))
        }))
        .pipe(newer(path.img.dest)) //Фильтрует изображения чтобы повторно не оптимизировать
        .pipe(webp())
        .pipe(dest(path.img.dest)) //Копируем в  папку public
        .pipe(src(path.img.src))
        .pipe(newer(path.img.dest)) //Фильтрует изображения чтобы повторно не оптимизировать
        .pipe(imagemin(app.imagemin)) //Оптимизируем картинку
        .pipe(dest(path.img.dest)); //Копируем в  папку public
};

module.exports = img;