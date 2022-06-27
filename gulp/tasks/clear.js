const del = require("del");

// Конфигурация
const path = require("../config/path.js");

// Очистка public перед каждым запуском
const clear = () => {
    return del(path.root);
};

module.exports = clear;