import gulp from "gulp";

// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";


//Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import imagemin from "gulp-imagemin";
import gulpIf from "gulp-if";


// Обработка ICONS
const icons = () => {
    return gulp.src(path.icons.src) //Копируем с папки src/icons файлы любой вложености
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "ICONS",
                message: error.message
            }))
        }))
        .pipe(gulpIf(app.isProd, imagemin(app.imagemin))) //Оптимизируем картинку
        .pipe(gulp.dest(path.icons.dest)); //Копируем в  папку public
};

export default icons;