import del from "del";

// Конфигурация
import path from "../config/path.js";

// Очистка public перед каждым запуском
const clear = () => {
    return del(path.root);
};

export default clear;