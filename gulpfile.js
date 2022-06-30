import gulp from "gulp";
import browserSync from "browser-sync";

// Конфигурация
import path from "./gulp/config/path.js";
import app from "./gulp/config/app.js";

//Задачи
import clear from './gulp/tasks/clear.js';
import html from './gulp/tasks/html.js';
import scss from './gulp/tasks/scss.js';
import js from './gulp/tasks/js.js';
import img from './gulp/tasks/img.js';
import icons from './gulp/tasks/icons.js';
import fonts from './gulp/tasks/fonts.js';

// Сервер
const server = () => {
    browserSync.init({
        server: {
            baseDir: path.root
        },
        notify: false,
        port: 3000,
    });
};

// Наблюдение
const watcher = () => {
    gulp.watch(path.html.watch, html).on("all", browserSync.reload);
    gulp.watch(path.scss.watch, scss).on("all", browserSync.reload);
    gulp.watch(path.js.watch, js).on("all", browserSync.reload);
    gulp.watch(path.img.watch, img).on("all", browserSync.reload);
    gulp.watch(path.icons.watch, icons).on("all", browserSync.reload);
    gulp.watch(path.fonts.watch, fonts).on("all", browserSync.reload);  
};

const build = gulp.series(
    clear,
    gulp.parallel(html, scss, js, img, icons, fonts));

const dev = gulp.series(
    build,
    gulp.parallel(watcher, server));

// Задачи
export { html };
export { scss };
export { js };
export { img };
export { icons };
export { fonts };

// Сборка
export default app.isProd ? build : dev;

//Запуск 
// Режим разроботки npm start
// Режим продакшина npm run build