import gulp from "gulp";

// Конфигурация
import path from "../config/path.js";


//Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";


// Обработка ICONS
const icons = () => {
    return gulp.src(path.icons.src) //Копируем с папки src/icons файлы любой вложености
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "ICONS",
                message: error.message
            }))
        }))
        .pipe(gulp.dest(path.icons.dest)); //Копируем в  папку public
};

export default icons;