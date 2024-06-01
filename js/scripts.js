document.addEventListener("DOMContentLoaded", function() {
    const languageSwitcher = document.querySelector(".language");
    const languageOptions = document.querySelector(".language-options");
    const currentLanguage = document.querySelector(".current-language");
    
    // Функция загрузки перевода для выбранного языка
    const loadLanguage = async (lang) => {
        try {
            const response = await fetch(`./languages/${lang}.json`);
            const translations = await response.json();
            document.querySelectorAll("[data-translate]").forEach(el => {
                const key = el.getAttribute("data-translate");
                el.textContent = translations[key];
            });
        } catch (error) {
            console.error("Error loading language:", error);
        }
    };

    // Функция переключения отображения списка языков
    const toggleLanguageOptions = () => {
        languageOptions.style.display = languageOptions.style.display === "block" ? "none" : "block";
    };

    // Функция переключения языка и сохранения в localStorage
    const switchLanguage = (lang) => {
        localStorage.setItem("selectedLanguage", lang);
        currentLanguage.textContent = lang === "uk" ? "Ukr" : "Eng"; // Обновляем отображаемый язык
        loadLanguage(lang);
        languageOptions.style.display = "none";
    };

    // Получаем выбранный язык из localStorage или устанавливаем по умолчанию
    const selectedLanguage = localStorage.getItem("selectedLanguage") || "uk";
    currentLanguage.textContent = selectedLanguage === "uk" ? "Ukr" : "Eng";
    loadLanguage(selectedLanguage);

    languageSwitcher.addEventListener("click", toggleLanguageOptions);

    languageOptions.addEventListener("click", (event) => {
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
});
