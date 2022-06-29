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
        src: pathSrc + "/scss/*.{scss, sass}", //Копируем с папки src scss файлы первой вложености
        watch: pathSrc + "/scss/**/*.{scss, sass}", // Следим за всеми файлами scss любой вложености в папке src/scss
        dest: pathDest + "/css" //Копируем в  папку src public в папку css
    },
    js: {
        src: pathSrc + "/js/*.js", //Копируем с папки src js файлы первой вложености
        watch: pathSrc + "/js/**/*.js", // Следим за всеми файлами js любой вложености в папке src/js
        dest: pathDest + "/js" //Копируем в  папку src public в папку js
    },
};