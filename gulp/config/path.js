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
        src: pathSrc + "/sass/*.{scss, sass}", //Копируем с папки src scss файлы первой вложености
        watch: pathSrc + "/sass/**/*.{scss, sass}", // Следим за всеми файлами scss любой вложености в папке src/scss
        dest: pathDest + "/css" //Копируем в  папку public в папку css
    },
    js: {
        src: pathSrc + "/js/*.js", //Копируем с папки src js файлы первой вложености
        watch: pathSrc + "/js/**/*.js", // Следим за всеми файлами js любой вложености в папке src/js
        dest: pathDest + "/js" //Копируем в  папку public в папку js
    },
    img: {
        src: pathSrc + "/img/**/*.{png,jpg,jpeg,gif,svg,ico}", //Копируем с папки src/img файлы любой вложености
        watch: pathSrc + "/img/**/*.{png,jpg,jpeg,gif,svg,ico}", // Следим за всеми файлами  любой вложености в папке src/img
        dest: pathDest + "/img" //Копируем в  папку public в папку img
    },
    icons: {
        src: pathSrc + "/icons/**/*.{png,jpg,jpeg,gif,svg,ico}", //Копируем с папки src/icons файлы любой вложености
        watch: pathSrc + "/icons/**/*.{png,jpg,jpeg,gif,svg,ico}", // Следим за всеми файлами  любой вложености в папке src/icons
        dest: pathDest + "/icons" //Копируем в  папку public в папку icons
    },
    fonts: {
        src: pathSrc + "/fonts/*.{eot,ttf,otf,otf,ttc,woff,woff2,svg}", //Копируем с папки src/fonts
        watch: pathSrc + "/fonts/*.{eot,ttf,otf,otf,ttc,woff,woff2,svg}", //Следим за файлами первой вложености в папке src/fonts
        dest: pathDest + "/fonts" //Копируем в  папку public в папку fonts
    },
};