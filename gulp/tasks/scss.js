import gulp from "gulp";

// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";


//Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import rename from "gulp-rename";
import size from "gulp-size";
import shorthand from "gulp-shorthand";
import groupCssMediaQueries from "gulp-group-css-media-queries";
import sassGlob from "gulp-sass-glob";
import webpCss from "gulp-webpcss";
import gulpIf from "gulp-if";

const sass = gulpSass(dartSass);

// Обработка SCSS
const scss = () => {
    return gulp.src(path.scss.src, { sourcemaps: app.isDev }) //Копируем с папки src scss файлы первой вложености
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "SCSS",
                message: error.message
            }))
        }))
        .pipe(sassGlob()) //Чтобы сократить подключение scss файлов в style.scss
        .pipe(sass()) //Для работы sass
        .pipe(gulpIf(app.isProd, webpCss(
            {
                webpClass: ".webp",
                noWebpClass: ".no-webp"
            }
        ))) //Преобразовывет изображенние bg в webp формат
        .pipe(gulpIf(app.isProd, autoprefixer())) //Добавляем свойства с вендорными префиксами для совместимость со старыми браузерами
        .pipe(gulpIf(app.isProd, shorthand())) //Обьединям свойства которые поддерживают сокращение
        .pipe(groupCssMediaQueries()) //Групируем медиа выражения
        .pipe(gulpIf(app.isProd, size({ title: "style.css"}))) //Показывает размер до сжатия
        .pipe(rename( {suffix: ".min"})) //Переименовываем файл
        .pipe(gulpIf(app.isProd, csso())) //Сжимаем файл
        .pipe(gulpIf(app.isProd, size({ title: "style.min.css"}))) //Показывает размер после сжатия
        .pipe(gulp.dest(path.scss.dest, { sourcemaps: app.isDev })); //Копируем в  папку public
};

export default scss;