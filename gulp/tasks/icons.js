const { src, dest} = require("gulp");

// Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");


//Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");



// Обработка ICONS
const icons = () => {
    return src(path.icons.src) //Копируем с папки src/icons файлы любой вложености
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "ICONS",
                message: error.message
            }))
        }))
        .pipe(newer(path.icons.dest)) //Фильтрует изображения чтобы повторно не оптимизировать
        .pipe(imagemin(app.imagemin)) //Оптимизируем картинку
        .pipe(dest(path.icons.dest)); //Копируем в  папку public
};

module.exports = icons;