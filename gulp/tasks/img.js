import gulp from "gulp";

// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";


//Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import imagemin from "gulp-imagemin";
import webp from "gulp-webp";
import gulpIf from "gulp-if";



// Обработка IMG
const img = () => {
    return gulp.src(path.img.src) //Копируем с папки src/img файлы любой вложености
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "IMG",
                message: error.message
            }))
        }))
        .pipe(gulpIf(app.isProd, webp()))
        .pipe(gulp.dest(path.img.dest)) //Копируем в  папку public
        .pipe(gulp.src(path.img.src))
        .pipe(gulpIf(app.isProd, imagemin(app.imagemin))) //Оптимизируем картинку
        .pipe(gulp.dest(path.img.dest)); //Копируем в  папку public
};

export default img;