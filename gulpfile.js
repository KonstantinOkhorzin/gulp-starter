const { watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();

// Конфигурация
const path = require("./gulp/config/path.js");

//Задачи
const clear = require('./gulp/tasks/clear.js');
const html = require('./gulp/tasks/html.js');
const scss = require('./gulp/tasks/scss.js');
const js = require('./gulp/tasks/js.js');

// Сервер
const server = () => {
    browserSync.init({
        server: {
            baseDir: path.root
        }
    });
};

// Наблюдение
const watcher = () => {
    watch(path.html.watch, html).on("all", browserSync.reload);
    watch(path.scss.watch, scss).on("all", browserSync.reload);
    watch(path.js.watch, js).on("all", browserSync.reload);  
};

// Задачи
exports.html = html;
exports.scss = scss;
exports.js = js;

// Сборка
exports.dev = series(
    clear,
    parallel(html, scss, js),
    parallel(watcher, server));