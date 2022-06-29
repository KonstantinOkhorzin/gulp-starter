const pathSrc = "./src";
const pathDest = "./public";

module.exports = {
    root: pathDest,
    html: {
        src: pathSrc + "/*.html", //Копируем с папки src html файлы первой вложености
        watch: pathSrc + "/**/*.html", // Следим за всеми файлами html любой вложености в папке src 
        dest: pathDest  //Копируем в  папку src public
    },
    scss: {
        src: pathSrc + "/scss/style.{scss, sass}", //Копируем с папки src/ папка scss/ файл style
        watch: pathSrc + "/scss/**/*.{scss, sass}", // Следим за всеми файлами scss любой вложености в папке src/scss
        dest: pathDest + "/css" //Копируем в  папку src public в папку css
    },
};