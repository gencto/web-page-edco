document.addEventListener("DOMContentLoaded", function() {

    const languageSwitcher = document.querySelector(".language");
    const languageSwitcherMob = document.querySelector(".setting");
    const languageOptions = document.querySelector(".language-options");
    const languageOptionsMob = document.querySelector(".language-options-mob");
    const currentLanguage = document.querySelector(".current-language");

    const mobMenuSwitcher = document.querySelector(".menu-title");
    const mobMenuField = document.querySelector(".menu__subBox");
    const mobMenuItems = document.querySelectorAll(".menu__subBox .link");

    
    
    // Функция загрузки перевода для выбранного языка
    const loadLanguage = async (lang) => {
        try {
            const response = await fetch(`./languages/${lang}.json`);
            const translations = await response.json();
            document.querySelectorAll("[data-translate]").forEach(el => {
                const key = el.getAttribute("data-translate");
                el.textContent = translations[key];
                el.placeholder = translations[key];
            });
        } catch (error) {
            console.error("Error loading language:", error);
        }
    };

    // Функция переключения отображения списка языков
    const toggleLanguageOptions = (event) => {
        languageOptions.style.display = languageOptions.style.display === "block" ? "none" : "block";
    };

    const toggleLanguageOptionsMob = (event) => {
        languageOptionsMob.style.display = languageOptionsMob.style.display === "block" ? "none" : "block";
    };

    // Функция переключения языка и сохранения в localStorage
    const switchLanguage = (lang) => {
        localStorage.setItem("selectedLanguage", lang);
        currentLanguage.textContent = lang === "uk" ? "Ukr" : "Eng"; // Обновляем отображаемый язык
        loadLanguage(lang).then(() => {
            languageOptions.style.display = "none";
        });
    };

    // Получаем выбранный язык из localStorage или устанавливаем по умолчанию
    const selectedLanguage = localStorage.getItem("selectedLanguage") || "uk";
    currentLanguage.textContent = selectedLanguage === "uk" ? "Ukr" : "Eng";
    loadLanguage(selectedLanguage);

    languageSwitcher.addEventListener("click", toggleLanguageOptions);
    languageSwitcherMob.addEventListener("click", toggleLanguageOptionsMob);

    languageOptions.addEventListener("click", (event) => {
        if (event.target.getAttribute("data-lang")) {
            switchLanguage(event.target.getAttribute("data-lang"));
        }
    });

    languageOptionsMob.addEventListener("click", (event) => {
        if (event.target.getAttribute("data-lang")) {
            switchLanguage(event.target.getAttribute("data-lang"));
        }
    });

    // Закрытие выпадающего списка при клике вне его области
    document.addEventListener("click", (event) => {
        if (!languageSwitcher.contains(event.target)) {
            languageOptions.style.display = "none";
        }
    });

    // Закрытие выпадающего списка при клике вне его области
    document.addEventListener("click", (event) => {
        if (!languageSwitcherMob.contains(event.target)) {
            languageOptionsMob.style.display = "none";
        }
    });

    // Функция переключения отображения списка мобильного меню
    const toggleMobMenuOptions = () => {
        mobMenuField.style.display = mobMenuField.style.display === "block" ? "none" : "block";
    };



    mobMenuSwitcher.addEventListener("click", toggleMobMenuOptions);


    //перевіряємо на якому пристрої відкрито сторінку
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.body.classList.add('_touch');//для тач-скрінов

                mobMenuItems.forEach( i => {
                     i.addEventListener("click", toggleMobMenuOptions);
                });

                // Закрытие выпадающего списка мобильного меню при клике вне его области
                document.addEventListener("click", (event) => {
                    if (!mobMenuSwitcher.contains(event.target)) {
                        mobMenuField.style.display = "none";
                    }
                });

      } else {
        document.body.classList.add('pc');//для пк-скрінов
    }

    //плавне прокручування
    const menuLinks = document.querySelectorAll('div[data-goto]');
    if (menuLinks.length > 0) {
        menuLinks.forEach (element => {
            element.addEventListener('click', onMenuLinkCkick);
        });

        function onMenuLinkCkick (e) {
            const menuLink = e.target;
            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;
                window.scrollTo ({
                    top: gotoBlockValue,
                    behavior: 'smooth'
                });
                e.preventDefault();

            }
        }
    }

    const returnBtn = document.querySelector('.return__btn');

    document.addEventListener('scroll', function () {
        if (scrollY >= 100) {
            returnBtn.classList.remove('hidden');
        }else{
            returnBtn.classList.add('hidden');
        };
    });

    returnBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    })


});
