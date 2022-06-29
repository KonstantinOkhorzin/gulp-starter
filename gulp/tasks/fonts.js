const { src, dest} = require("gulp");

// Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");


//Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const newer = require("gulp-newer");
const fonter = require("gulp-fonter");
const ttf2woff2 = require("gulp-ttf2woff2");


// Обработка FONTS
const fonts = () => {
    return src(path.fonts.src) //Копируем с папки src/fonts 
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "FONTS",
                message: error.message
            }))
        }))
        .pipe(newer(path.fonts.dest)) //Фильтрует уже готовые шрифты
        .pipe(fonter(app.fonter)) //Конвертирует в woff
        .pipe(dest(path.fonts.dest)) //Копируем в  папку public
        .pipe(ttf2woff2()) //Конвертирует в woff2(Не работает!!!!)
        .pipe(dest(path.fonts.dest)); //Копируем в  папку public
};

module.exports = fonts;