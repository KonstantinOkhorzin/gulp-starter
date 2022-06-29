const { src, dest} = require("gulp");

// Конфигурация
const path = require("../config/path.js");


//Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const size = require("gulp-size");
const shorthand = require("gulp-shorthand");
const groupCssMediaQueries = require("gulp-group-css-media-queries");
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");


// Обработка SCSS
const scss = () => {
    return src(path.scss.src, { sourcemaps: true }) //Копируем с папки src/ папка scss/ файл style
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "SCSS",
                message: error.message
            }))
        }))
        .pipe(sassGlob()) //Чтобы сократить подключение scss файлов в style.scss
        .pipe(sass()) //Для работы sass
        .pipe(autoprefixer()) //Добавляем свойства с вендорными префиксами для совместимость со старыми браузерами
        .pipe(shorthand()) //Обьединям свойства которые поддерживают сокращение
        .pipe(groupCssMediaQueries()) //Групируем медиа выражения
        .pipe(size({ title: "style.css"})) //Показывает размер до сжатия
        .pipe(dest(path.scss.dest, { sourcemaps: true })) //Копируем в  папку src public создаем не сжатый дубль
        .pipe(rename( {suffix: ".min"})) //Переименовываем файл
        .pipe(csso()) //Сжимаем файл
        .pipe(size({ title: "style.min.css"})) //Показывает размер после сжатия
        .pipe(dest(path.scss.dest, { sourcemaps: true })); //Копируем в  папку src public
};

module.exports = scss;