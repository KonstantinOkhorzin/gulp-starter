const { watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();

// Конфигурация
const path = require("./gulp/config/path.js");

//Задачи
const clear = require('./gulp/tasks/clear.js');
const html = require('./gulp/tasks/html.js');

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
    watch(path.html.watch, html).on("all", browserSync.reload); // за файлами html любой вложености, задача html которую нужно запускать при изменении файлов
};

// Задачи
exports.html = html;
exports.watch = watcher;
exports.clear = clear;

// Сборка
exports.dev = series(clear, html, parallel(watcher, server));