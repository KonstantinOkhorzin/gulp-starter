// Настройки плагинов

module.exports = {
    htmlmin: {
        collapseWhitespace: true //Сжимаем html
    },
    webpack: {
        mode: "development" 
    },
    imagemin: {
        verbose: true //Показывает размер до и после оптимизации
    },
    fonter: {
        formats: ["woff"] //Конвертирует в указанный формат(woff2 не поддерживает)
    }
};