function tabs(tabSelector, tabContentSelector, tabsParentSelector, tabActiveClass, tabContentActiveClass) {
    const tabs = document.querySelectorAll(tabSelector);
    const tabsContent = document.querySelectorAll(tabContentSelector);
    const tabsParent = document.querySelector(tabsParentSelector);

    // Сначало удаляем все классы активности
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.remove(tabContentActiveClass);
        });

        tabs.forEach(item => {
            item.classList.remove(tabActiveClass);
        });
    }

    //Добавляем классы активности выбранному элементу по умолчанию на первом
    function showTabContent(i = 0) {
        tabsContent[i].classList.add(tabContentActiveClass);
        tabs[i].classList.add(tabActiveClass);
    }

    hideTabContent();
    showTabContent();

    //Вешаем событие на родителя для того что элементы могут быть динамическими
    tabsParent.addEventListener('click', (e) => {
        const target = e.target; // помещаем для удобства target в переменную
        if (target && target.classList.contains(tabSelector.slice(1)) || target.parentElement.classList.contains(tabSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target === item || target.parentElement === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

tabs('.tab', '.tab-content', '.tabs', 'tab_active', 'tab-content_active');