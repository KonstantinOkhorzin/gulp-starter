const isProd = process.argv.includes("--production");
const isDev = !isProd;
// Настройки плагинов
export default {
    isProd: isProd,
    isDev: isDev,
    htmlmin: {
        collapseWhitespace: isProd //Сжимаем html
    },
    webpack: {
        mode: isProd ? "production" : "development" 
    },
    imagemin: {
        verbose: true //Показывает размер до и после оптимизации
    }
};