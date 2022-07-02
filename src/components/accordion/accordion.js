"use strict";

// Accordion
const accordionsArray = document.querySelectorAll('[data-accordions]'); //получаем коллекцию
//проверяем их наличие
if (accordionsArray.length) {
    // получение обычных спойлеров
    // переводим коллекцию в массив, фильтруем
    const accordionsRegular = Array.from(accordionsArray).filter( item => {
        // ищем атрибуты data-accordions без параметров, преобразовуем в массив
        return !item.dataset.accordions.split(",")[0];
    });
    // инициализация обычных спойлеров
    if (accordionsRegular.length) {
        initAccordions(accordionsRegular);
    }



    // получение спойлеров с медиа запросами
    const accordionsMedia = Array.from(accordionsArray).filter( item => {
        // ищем атрибуты data-accordions c параметрами(ширина), преобразовуем в массив
        return item.dataset.accordions.split(",")[0];
    });

    // инициализация спойлеров с медиа запросами
    // делаем проверку на наличие
    if (accordionsMedia.length) {
        // создаём пустой массив
        const breakpointsArray = [];
        // перебераем массив с медиа запросами
        accordionsMedia.forEach(item => {
            // получаем строку с параметрами каждого объекта
            const params = item.dataset.accordions;
            // создаём пустой объект
            const breakpoint = {};
            // преабразовуем строку params в массив paramsArray
            const paramsArray = params.split(",");
            // получаем парамерты (ширина)
            breakpoint.value = paramsArray[0];
            // получаем парамерты (min/max, по умолчанию max)
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
            // присваиваем в параметры объект
            breakpoint.item = item;
            // объект передаём в массив
            breakpointsArray.push(breakpoint);
        });

        // получаем уникальные брейк поинты (на случай одинаковых условий для спойлеров(коробок))
        // переделываем массив breakpointsArray
        let mediaQueries = breakpointsArray.map( item => {
            // собираем строку с медиа запросом
            return `(${item.type}-width: ${item.value}px),${item.value},${item.type}`;
        });
        //присваиваем строку в переменную(массив), фильтруем
        mediaQueries = mediaQueries.filter((item, i, arr) => {
            //возвращаем уникальные значения
            return arr.indexOf(item) === i;
        });
        
        // работа с каждым брейкпоинтом
        //пробегаемся 
        mediaQueries.forEach(breakpoint => {
            //получаем строку и преобразовуем её в массив
            const paramsArray = breakpoint.split(",");
            // получаем первый параметр - ширина
            const mediaBreakpoint = paramsArray[1];
            // получаем парамерт min/max
            const mediaType = paramsArray[2];
            // метод (слушает ширину єкрана) который будет отрабатывать, 
            // если сработал брейкпоинт,  в скобках строка которую собирали
            const matchMedia = window.matchMedia(paramsArray[0]);

            // объект с нужными условиями
            // собираем объекты с нужными условиями
            const accordionsArray = breakpointsArray.filter(item => {
                // проверяем совпадают условия брейкпоинт и тип брейкпоинта
                if (item.value === mediaBreakpoint && item.type === mediaType) {
                    // если совпадают берём в массив
                    return true;
                }
            });

            // инициализация
            // запускаем при событии 
            matchMedia.addEventListener('change', () => {
                initAccordions(accordionsArray, matchMedia);
            });
            // просто запускаем, чтобы отработала при загрузке страницы
            initAccordions(accordionsArray, matchMedia);
        });
    }
}

// Функция инициализации
// передаем массив и медиазапрос(по умолчанию false)
function initAccordions(accordionsArray, matchMedia = false) {
    // делаем проверку
    accordionsArray.forEach(accordionsBlock => {
        // если медиазапрос не равно false, то присваиваем имя объекту
        accordionsBlock = matchMedia ? accordionsBlock.item : accordionsBlock;
        // если брейкпоинт сработал 
        if (matchMedia.matches || !matchMedia) {
            // добавляем класс
            accordionsBlock.classList.add('_init');
            // отвечает за контентную часть
            initAccordionBody(accordionsBlock);
            accordionsBlock.addEventListener("click", setAccordionAction);
        } else {
            accordionsBlock.classList.remove('_init');
            initAccordionBody(accordionsBlock, false);
            accordionsBlock.removeEventListener("click", setAccordionAction);
        }
    });
}


// работа с контетом
function initAccordionBody(accordionsBlock, hideAccordionBody = true) {
    // получаем все заголовки спойлеров 
    const accordionTitle = accordionsBlock.querySelectorAll('[data-accordion]');
    // проверяем их наличие
    if (accordionTitle.length) {
        // пробегаемся по каждому
        accordionTitle.forEach(accordionTitle => {
            if (hideAccordionBody) {
                // убираем tabindex, чтобы можно было кликать табом
                accordionTitle.removeAttribute('tabindex');
                // если у заголовка нет класса _active
                if (!accordionTitle.classList.contains('_active')) {
                    // тогда мы скрываем контентную часть (следующий элемент после заголовка)
                    // бывает, что спойлер показывают сразу
                    accordionTitle.nextElementSibling.hidden = true;
                }
            } else {
                // для брейкпоинтов (превращаем спойлер в обычный блок)
                accordionTitle.setAttribute('tabindex', '-1');
                accordionTitle.nextElementSibling.hidden = false;
            }
        });
    }
}

// функция выполняется при клике на заголовок (делегирование событий)
function setAccordionAction(e) {
    // получаем нажатый объект
    const el = e.target;
    // проверяем на наличие атрибута data-accordion
    if (el.hasAttribute('data-accordion') || el.closest('[data-accordion]')) {
        // получаем кнопку
        const accordionTitle = el.hasAttribute('data-accordion') ? el : el.closest('[data-accordion]');
        // получаем родительский блок
        const accordionsBlock = accordionTitle.closest('[data-accordions]');
        // проверка, нужно ли добавлять функционал аккордиона
        const oneaccordion = accordionsBlock.hasAttribute('data-one-accordion') ? true : false;
        // проверяем, есть ли внутри объекта _slide
        if (!accordionsBlock.querySelectorAll('._slide').length) {
            // проверка на функционал аккордиона
            // если есть data-one-accordion и у нажатой кнопки есть _active
            if (oneaccordion && !accordionTitle.classList.contains('_active')) {
                // все остальные спойлеры скрыть
                hideAccordionBody(accordionsBlock);
            }
            accordionTitle.classList.toggle('_active');
            _slideToggle(accordionTitle.nextElementSibling, 500);
        }
        e.preventDefault();
    }
}

// функция для аккордиона
function hideAccordionBody(accordionsBlock) {
    // получаем открытый спойлер
    const accordionActiveTitle = accordionsBlock.querySelector('[data-accordion]._active');
    if (accordionActiveTitle) {
        // убираем класс
        accordionActiveTitle.classList.remove('_active');
        // скрываем все элементы
        _slideUp(accordionActiveTitle.nextElementSibling, 500);
    }
}


// SlideToggle

let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
};

let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
};

let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration);
    } else {
        return _slideUp(target, duration);
    }
};

/*
Для родителя спойлера пишем атрибут data-accordions
Для заголовков (кнопки) спойлера пишем атрибут data-accordion
Если нужно включать/выключать работу спойлеров на разных экранов 
пишем параметры ширины и типа брейкпоинта
Например:
data-accordions="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-accordions="768,min" - спойлеры будут работать только на экранах больше или равно 768px
Если нужно что бы в блоке открывался только один спойлер добавляем атрибут data-one-accordion
*/