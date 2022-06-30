import gulp from "gulp";

// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";


//Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import newer from "gulp-newer";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";


// Обработка FONTS
const fonts = () => {
    return gulp.src(path.fonts.src) //Копируем с папки src/fonts 
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "FONTS",
                message: error.message
            }))
        }))
        // .pipe(newer(path.fonts.dest)) //Фильтрует уже готовые шрифты
        // .pipe(fonter(app.fonter)) //Конвертирует в woff
        // .pipe(gulp.dest(path.fonts.dest)) //Копируем в  папку public
        // .pipe(ttf2woff2()) //Конвертирует в woff2(Не работает!!!!)
        .pipe(gulp.dest(path.fonts.dest)); //Копируем в  папку public
};

export default fonts;