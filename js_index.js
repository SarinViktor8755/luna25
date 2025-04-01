   // Инициализация при загрузке страницы
        document.addEventListener('DOMContentLoaded', function() {
            updateInfo();
            updateEventsInfo();
            animateNameLetters();
            startHeartAnimation();
            initSlideshow();
            lazyLoadImages();
            createFloatingElements();
            setupScrollListener();
            setupNavbarScroll();
            showAllTexts(); // Добавляем вызов функции для показа всех текстов
        });

        // Показать все тексты под фотографиями
        function showAllTexts() {
            const texts = document.querySelectorAll('.anniversary-text');
            texts.forEach(text => {
                text.style.opacity = '1';
                text.style.transform = 'translateY(0)';
            });
        }

        // Функции для модального окна
   // В функции openModal
function openModal(imgSrc, text) {
    const modal = document.getElementById('modalOverlay');
    const modalImg = document.getElementById('modalImage');
    const modalText = document.getElementById('modalText');
    const navbar = document.querySelector('.navbar');
    
    modalImg.src = imgSrc;
    modalText.textContent = text;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    navbar.style.opacity = '0';
    navbar.style.pointerEvents = 'none';
    navbar.style.transition = 'opacity 0.3s ease';
    
    // Добавляем обработчик клика на само изображение
    modalImg.onclick = function(e) {
        e.stopPropagation(); // Предотвращаем всплытие, чтобы клик на фото не закрывал окно
        closeModal();
    };
    
    createConfetti();
}

// Модифицируем обработчик модального окна
document.getElementById('modalOverlay').onclick = function(e) {
    // Закрываем только если клик не на содержимом модалки
    if (e.target === this) {
        closeModal();
    }
};
// Измененная функция closeModal
function closeModal() {
    const modal = document.getElementById('modalOverlay');
    const navbar = document.querySelector('.navbar');
    
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    navbar.style.opacity = '1';
    navbar.style.pointerEvents = 'auto';
    
    // Удаляем обработчик, чтобы не накапливались
    const modalImg = document.getElementById('modalImage');
    modalImg.onclick = null;
}

        // Закрытие модального окна при нажатии ESC
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeModal();
            }
        });

        // Создание плавающих элементов фона
        function createFloatingElements() {
            const container = document.querySelector('.floating-elements');
            const colors = ['rgba(255, 204, 0, 0.1)', 'rgba(255, 102, 153, 0.1)', 'rgba(174, 17, 203, 0.1)', 'rgba(75, 98, 137, 0.1)'];
            
            for (let i = 0; i < 8; i++) {
                const element = document.createElement('div');
                element.className = 'floating-element';
                
                const size = Math.random() * 100 + 50;
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                const delay = Math.random() * 8;
                const duration = Math.random() * 10 + 10;
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                element.style.width = `${size}px`;
                element.style.height = `${size}px`;
                element.style.top = `${posY}%`;
                element.style.left = `${posX}%`;
                element.style.animationDelay = `${delay}s`;
                element.style.animationDuration = `${duration}s`;
                element.style.backgroundColor = color;
                
                container.appendChild(element);
            }
        }

        // Функция создания сердечек
        function createHeart() {
            const heart = document.createElement('div');
            const heartTypes = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💖', '💗', '💓', '💞', '💕'];
            heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
            heart.classList.add('heart-bubble');
            
            const colors = ['#ff6699', '#ff3366', '#ff0066', '#ff99cc', '#ff66b3', '#ffcc00', '#ff9933'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            heart.style.color = randomColor;
            
            const x = Math.random() * window.innerWidth;
            heart.style.left = `${x}px`;
            heart.style.bottom = '0';
            
            const size = Math.random() * 20 + 40;
            heart.style.fontSize = `${size}px`;
            
            // Анимация горизонтального движения
            heart.style.transform = `translateX(${Math.random() * 100 - 50}px)`;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }

        // Запускаем создание сердечек
        function startHeartAnimation() {
            createHeart();
            const nextInterval = Math.random() * 300 + 100;
            setTimeout(startHeartAnimation, nextInterval);
        }

        // Создание конфетти
        function createConfetti() {
            const colors = ['#ffcc00', '#ff6699', '#66ccff', '#99ff66', '#ff9933'];
            
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                const color = colors[Math.floor(Math.random() * colors.length)];
                const size = Math.random() * 10 + 5;
                const left = Math.random() * 100;
                const animationDuration = Math.random() * 3 + 2;
                
                confetti.style.backgroundColor = color;
                confetti.style.width = `${size}px`;
                confetti.style.height = `${size}px`;
                confetti.style.left = `${left}%`;
                confetti.style.animationDuration = `${animationDuration}s`;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, animationDuration * 1000);
            }
        }

        // Анимация букв имени "Валерия"
        function animateNameLetters() {
            const name = "Валерия";
            const nameLettersContainer = document.getElementById('name-letters');
            
            name.split('').forEach((letter, index) => {
                const span = document.createElement('span');
                span.className = 'letter';
                span.textContent = letter;
                span.style.animation = `snake 2s ${index * 0.2}s infinite ease-in-out`;
                nameLettersContainer.appendChild(span);
            });
        }

        // Слайд-шоу
        function initSlideshow() {
            const slideshow = document.getElementById('slideshow');
            let currentIndex = 0;

            function showNextImage() {
                const currentImage = slideshow.querySelector('.active');
                if (currentImage) {
                    currentImage.classList.remove('active');
                }

                currentIndex = (currentIndex + 1) % slideshow.children.length;
                const nextImage = slideshow.children[currentIndex];
                nextImage.classList.add('active');
            }

            setInterval(showNextImage, 3000);
        }

        // Ленивая загрузка изображений с анимацией появления
        function lazyLoadImages() {
            const lazyImages = [].slice.call(document.querySelectorAll('img[loading="lazy"], img[data-src]'));
            
            if ('IntersectionObserver' in window) {
                const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            const lazyImage = entry.target;
                            
                            // Загружаем изображение
                            if (lazyImage.dataset.src) {
                                lazyImage.src = lazyImage.dataset.src;
                                delete lazyImage.dataset.src;
                            }
                            
                            // Удаляем placeholder
                            const placeholder = lazyImage.nextElementSibling;
                            if (placeholder && placeholder.classList.contains('placeholder')) {
                                setTimeout(() => {
                                    placeholder.style.opacity = '0';
                                    setTimeout(() => {
                                        placeholder.remove();
                                    }, 500);
                                }, 300);
                            }
                            
                            // Добавляем класс loaded для плавного появления
                            lazyImage.onload = function() {
                                lazyImage.classList.add('loaded');
                            };
                            
                            lazyImageObserver.unobserve(lazyImage);
                        }
                    });
                }, {
                    rootMargin: '200px 0px'
                });

                lazyImages.forEach(function(lazyImage) {
                    lazyImageObserver.observe(lazyImage);
                });
            } else {
                // Fallback для браузеров без поддержки IntersectionObserver
                lazyImages.forEach(function(lazyImage) {
                    if (lazyImage.dataset.src) {
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.onload = function() {
                            lazyImage.classList.add('loaded');
                        };
                    }
                });
            }
        }
        
        // Закрытие меню при клике на пункт (для мобильных)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                const navbar = document.getElementById('navbarNav');
                if (navbar.classList.contains('show')) {
                    $('.navbar-toggler').click(); // Закрываем меню
                }
            });
        });

        // Настройка прокрутки для кнопки "Наверх"
        function setupScrollListener() {
            const backToTopButton = document.getElementById('backToTop');
            
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
            });
            
            backToTopButton.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Изменение навбара при прокрутке
        function setupNavbarScroll() {
            const navbar = document.querySelector('.navbar');
            
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }

        // Расчет возраста и прогресс-баров
        const birthDate = new Date('2025-03-14T10:15:00');

        function calculateAge(birthDate) {
            const now = new Date();
            let years = now.getFullYear() - birthDate.getFullYear();
            let months = now.getMonth() - birthDate.getMonth();
            let days = now.getDate() - birthDate.getDate();
            let hours = now.getHours() - birthDate.getHours();
            let minutes = now.getMinutes() - birthDate.getMinutes();
            let seconds = now.getSeconds() - birthDate.getSeconds();
            
            if (seconds < 0) {
                minutes--;
                seconds += 60;
            }
            if (minutes < 0) {
                hours--;
                minutes += 60;
            }
            if (hours < 0) {
                days--;
                hours += 24;
            }
            if (days < 0) {
                months--;
                days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
            }
            if (months < 0) {
                years--;
                months += 12;
            }
            
            return { years, months, days, hours, minutes, seconds };
        }

        // Расчет дней до дня рождения (исправленная версия)
        function getDaysUntilBirthday(birthday) {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Устанавливаем время на начало дня
            
            // Получаем день рождения в текущем году
            let nextBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
            
            // Если день рождения в этом году уже прошел, берем следующий год
            if (today > nextBirthday) {
                nextBirthday = new Date(today.getFullYear() + 1, birthday.getMonth(), birthday.getDate());
            }
            
            // Разница в миллисекундах
            const diffTime = nextBirthday - today;
            
            // Переводим в дни (округляем вверх)
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            return diffDays;
        }

        // Расчет дней до различных событий
        function calculateDaysToEvents(birthDate) {
            const now = new Date();
            const currentYear = now.getFullYear();
            
            // Используем новую функцию для дня рождения
            const daysToBirthday = getDaysUntilBirthday(birthDate);
            
            // До 5 лет
            const fiveYearsDate = new Date(birthDate.getFullYear() + 5, birthDate.getMonth(), birthDate.getDate());
            const daysTo5Years = Math.floor((fiveYearsDate - now) / (1000 * 60 * 60 * 24));
            
            // До школы (7 лет)
            const schoolDate = new Date(birthDate.getFullYear() + 7, 8, 1); // 1 сентября через 7 лет
            const daysToSchool = Math.floor((schoolDate - now) / (1000 * 60 * 60 * 24));
            
            // До 10 лет
            const tenYearsDate = new Date(birthDate.getFullYear() + 10, birthDate.getMonth(), birthDate.getDate());
            const daysTo10Years = Math.floor((tenYearsDate - now) / (1000 * 60 * 60 * 24));
            
            // До 18 лет
            const eighteenYearsDate = new Date(birthDate.getFullYear() + 18, birthDate.getMonth(), birthDate.getDate());
            const daysTo18Years = Math.floor((eighteenYearsDate - now) / (1000 * 60 * 60 * 24));
            
            // До пенсии (женщины - 60 лет)
            const retirementDate = new Date(birthDate.getFullYear() + 60, birthDate.getMonth(), birthDate.getDate());
            const daysToRetirement = Math.floor((retirementDate - now) / (1000 * 60 * 60 * 24));
            
            return {
                daysToBirthday,
                daysTo5Years,
                daysToSchool,
                daysTo10Years,
                daysTo18Years,
                daysToRetirement
            };
        }

        // Обновление прогресс-бара с учетом наступивших событий
        function updateProgressBar(barId, daysRemaining, totalDays, eventName) {
            const progressBar = document.getElementById(barId);
            const container = progressBar.parentElement;
            const textElement = container.previousElementSibling;
            
            // Если событие уже прошло (дни отрицательные)
            if (daysRemaining <= 0) {
                // Устанавливаем соответствующий текст для каждого события
                switch(barId) {
                    case 'progressBarSchool':
                        textElement.innerHTML = `<span class="emoji">📚</span> Школа: <span class="highlight">Уже в школе!</span>`;
                        break;
                    case 'progressBar5':
                        textElement.innerHTML = `<span class="emoji">🎈</span> 5 лет: <span class="highlight">Уже исполнилось!</span>`;
                        break;
                    case 'progressBar10':
                        textElement.innerHTML = `<span class="emoji">🌟</span> 10 лет: <span class="highlight">Уже есть!</span>`;
                        break;
                    case 'progressBar18':
                        textElement.innerHTML = `<span class="emoji">🎉</span> 18 лет: <span class="highlight">Уже взрослый!</span>`;
                        break;
                    case 'progressBarRetirement':
                        textElement.innerHTML = `<span class="emoji">👵</span> Пенсия: <span class="highlight">Поздравляю, бабушка!</span>`;
                        break;
                    case 'progressBarYear':
                        textElement.innerHTML = `<span class="emoji">🎂</span> День рождения: <span class="highlight">Сегодня!</span>`;
                        break;
                    default:
                        textElement.innerHTML = textElement.innerHTML.replace("До", "Уже");
                }
                
                // Устанавливаем полный прогресс и зеленый цвет
                progressBar.style.width = '100%';
                container.classList.add('complete');
                
                // Создаем конфетти для празднования
                if (barId === 'progressBarYear') {
                    createConfetti();
                }
            } else {
                // Рассчитываем процент выполнения
                const percentage = 100 - (daysRemaining / totalDays * 100);
                progressBar.style.width = `${percentage}%`;
                container.classList.remove('complete');
                
                // Восстанавливаем оригинальный текст если событие еще не наступило
                switch(barId) {
                    case 'progressBarSchool':
                        textElement.innerHTML = `<span class="emoji">📚</span> До школы: <span class="highlight">${daysRemaining} дней</span>`;
                        break;
                    case 'progressBar5':
                        textElement.innerHTML = `<span class="emoji">🎈</span> До 5-летия: <span class="highlight">${daysRemaining} дней</span>`;
                        break;
                    case 'progressBar10':
                        textElement.innerHTML = `<span class="emoji">🌟</span> До 10-летия: <span class="highlight">${daysRemaining} дней</span>`;
                        break;
                    case 'progressBar18':
                        textElement.innerHTML = `<span class="emoji">🎉</span> До 18-летия: <span class="highlight">${daysRemaining} дней</span>`;
                        break;
                    case 'progressBarRetirement':
                        textElement.innerHTML = `<span class="emoji">👵</span> До пенсии: <span class="highlight">${daysRemaining} дней</span>`;
                        break;
                    case 'progressBarYear':
                        textElement.innerHTML = `<span class="emoji">🎂</span> До дня рождения: <span class="highlight">${daysRemaining} дней</span>`;
                        break;
                }
            }
        }

        // Обновление информации о днях до событий
        function updateEventsInfo() {
            const events = calculateDaysToEvents(birthDate);
            
            // До следующего дня рождения
            updateProgressBar('progressBarYear', events.daysToBirthday, 365, 'До дня рождения');
            
            // До 5 лет
            updateProgressBar('progressBar5', events.daysTo5Years, 5 * 365, 'До 5-летия');
            
            // До школы
            updateProgressBar('progressBarSchool', events.daysToSchool, 7 * 365, 'До школы');
            
            // До 10 лет
            updateProgressBar('progressBar10', events.daysTo10Years, 10 * 365, 'До 10-летия');
            
            // До 18 лет
            updateProgressBar('progressBar18', events.daysTo18Years, 18 * 365, 'До 18-летия');
            
            // До пенсии (60 лет для женщин)
            updateProgressBar('progressBarRetirement', events.daysToRetirement, 60 * 365, 'До пенсии');
            
            // Обновляем каждую минуту
            setTimeout(updateEventsInfo, 60000);
        }

        function updateInfo() {
            const age = calculateAge(birthDate);
            document.getElementById('age').innerHTML = `<span class="emoji">👶</span> Возраст ребенка: <span class="highlight"><br>${age.years} лет, ${age.months} месяцев, ${age.days} дней</span><br>${age.hours} часов, ${age.minutes} минут, ${age.seconds} сек`;
            
            // Обновляем каждую секунду
            setTimeout(updateInfo, 1000);
        }