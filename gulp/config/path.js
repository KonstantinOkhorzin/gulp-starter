const pathSrc = "./src";
const pathDest = "./public";

module.exports = {
    root: pathDest,
    html: {
        src: pathSrc + "/*.html",
        watch: pathSrc + "/**/*.html",
        dest: pathDest
    }
};