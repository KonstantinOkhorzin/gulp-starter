import gulp from "gulp";

// Конфигурация
import path from "../config/path.js";


//Плагины
import plumber from "gulp-plumber";
import notify from "gulp-notify";


const fonts = () => {
    return gulp.src(path.fonts.src) //Копируем с папки src/fonts 
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "FONTS",
                message: error.message
            }))
        }))
        .pipe(gulp.dest(path.fonts.dest)); //Копируем в  папку public
};

export default fonts;


