import gulp from "gulp";

// Конфигурация
import path from "../config/path.js";
import app from "../config/app.js";


//Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import babel from "gulp-babel";
import webpack from "webpack-stream";
import gulpIf from "gulp-if";



// Обработка JS
const js = () => {
    return gulp.src(path.js.src, { sourcemaps: app.isDev }) //Копируем с папки src js файлы первой вложености
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "JS",
                message: error.message
            }))
        }))
        .pipe(gulpIf(app.isProd, babel())) //Преобразовываем код в старый формат
        .pipe(webpack(app.webpack))
        .pipe(gulp.dest(path.js.dest, { sourcemaps: app.isDev })); //Копируем в  папку public
};

export default js;