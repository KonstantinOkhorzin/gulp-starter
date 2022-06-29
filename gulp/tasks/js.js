const { src, dest} = require("gulp");

// Конфигурация
const path = require("../config/path.js");
const app = require("../config/app.js");


//Плагины
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const babel = require("gulp-babel");
const webpack = require("webpack-stream");



// Обработка JS
const js = () => {
    return src(path.js.src, { sourcemaps: true }) //Копируем с папки src js файлы первой вложености
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "JS",
                message: error.message
            }))
        }))
        .pipe(babel()) //Преобразовываем код в старый формат
        .pipe(webpack(app.webpack))
        .pipe(dest(path.js.dest, { sourcemaps: true })); //Копируем в  папку src public
};

module.exports = js;