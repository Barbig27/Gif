// ===== LANHGNE NOEL WEBSITE =====

(function() {
    'use strict';

    // ===== CONFIGURATION =====
    const CONFIG = {
        snowflakeCount: 50,
        confettiCount: 100,
        heartCount: 20,
        starCount: 5,
        cuteQuotes: [
            '"Dễ thương này là thật đó nha"',
            '"Không cần làm gì cả, vẫn dễ thương"',
            '"Noel hợp với bạn ghê"'
        ],
        gameFeedbacks: [
            'Ui, gần trúng rồi!',
            'Giỏi ghê ✨',
            'Sao này sáng ghê luôn',
            'Thêm xíu nữa thôi!'
        ],
        hoverMessages: [
            'Noel thích hợp để dễ thương',
            'Trời lạnh nhưng mood ổn',
            'Ở đây có Noel nè 🎄'
        ]
    };

    // ===== STATE =====
    let gameStars = 0;
    let gameUnlocked = false;
    let profileItemsRevealed = 0;

    // ===== INIT =====
    document.addEventListener('DOMContentLoaded', function() {
        initLoadingScreen();
        initSnow();
        initCustomCursor();
        initGiftBox();
        initMapStops();
        initCutePage();
        initProfilePage();
        initGamePage();
        initLetterPage();
        initEndPage();
        initCharacterHover();
        initSecretModal();
    });

    // ===== LOADING SCREEN =====
    function initLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (!loadingScreen) {
            initIntroPage();
            return;
        }

        // Đợi progress bar chạy xong (2.5s) + thêm chút delay
        setTimeout(function() {
            loadingScreen.classList.add('hidden');

            // Bắt đầu animation intro sau khi loading ẩn
            setTimeout(function() {
                initIntroPage();
            }, 300);
        }, 3000);
    }

    // ===== SNOW EFFECT =====
    function initSnow() {
        const container = document.getElementById('snowContainer');
        if (!container) return;

        for (let i = 0; i < CONFIG.snowflakeCount; i++) {
            createSnowflake(container);
        }
    }

    function createSnowflake(container) {
        const snowflake = document.createElement('div');
        snowflake.className = 'lanhgne-snowflake';
        snowflake.textContent = '❄';
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = (Math.random() * 3 + 4) + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        snowflake.style.fontSize = (Math.random() * 10 + 8) + 'px';
        snowflake.style.opacity = Math.random() * 0.5 + 0.3;
        container.appendChild(snowflake);
    }

    // ===== CUSTOM CURSOR =====
    function initCustomCursor() {
        const cursor = document.getElementById('customCursor');
        if (!cursor) return;

        // Only enable on non-touch devices
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            document.addEventListener('mousemove', function(e) {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });

            document.addEventListener('mousedown', function() {
                cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
            });

            document.addEventListener('mouseup', function() {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        }
    }

    // ===== PAGE NAVIGATION =====
    window.goToPage = function(pageId) {
        const pages = document.querySelectorAll('.lanhgne-page');
        pages.forEach(function(page) {
            page.classList.remove('active');
        });

        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');

            // Trigger page-specific animations
            if (pageId === 'pageCute') {
                initCuteQuote();
            } else if (pageId === 'pageEnd') {
                initConfetti();
                initHearts();
            }
        }
    };

    window.restartJourney = function() {
        // Reset state
        gameStars = 0;
        gameUnlocked = false;
        profileItemsRevealed = 0;

        // Reset UI
        const starCount = document.getElementById('starCount');
        if (starCount) starCount.textContent = '0';

        const gameIntro = document.getElementById('gameIntro');
        const gameArea = document.getElementById('gameArea');
        const gameComplete = document.getElementById('gameComplete');
        if (gameIntro) gameIntro.style.display = 'block';
        if (gameArea) gameArea.classList.remove('active');
        if (gameComplete) gameComplete.classList.remove('active');

        const profileResult = document.getElementById('profileResult');
        if (profileResult) profileResult.classList.remove('visible');

        // Reset profile cards
        const profileCards = document.querySelectorAll('.lanhgne-profile__card-item');
        profileCards.forEach(function(card) {
            card.classList.remove('flipped');
        });

        // Reset profile progress
        const progressBar = document.getElementById('profileProgressBar');
        const progressCount = document.getElementById('profileProgressCount');
        if (progressBar) progressBar.style.width = '0%';
        if (progressCount) progressCount.textContent = '0';

        // Clear sparkles
        const sparklesContainer = document.getElementById('resultSparkles');
        if (sparklesContainer) sparklesContainer.innerHTML = '';

        const envelope = document.getElementById('envelope');
        const letterPaper = document.getElementById('letterPaper');
        if (envelope) envelope.classList.remove('hidden');
        if (letterPaper) letterPaper.classList.remove('visible');

        // Reset letter lines
        const letterLines = document.querySelectorAll('.lanhgne-letter__line');
        letterLines.forEach(function(line) {
            line.classList.remove('visible');
        });

        const letterWish = document.querySelector('.lanhgne-letter__wish');
        if (letterWish) letterWish.classList.remove('visible');

        const letterBtn = document.querySelector('.lanhgne-letter__paper .lanhgne-btn');
        if (letterBtn) letterBtn.classList.remove('visible');

        // Reset map stop 4
        const stop4 = document.querySelector('.lanhgne-map__stop[data-stop="4"]');
        if (stop4) {
            stop4.classList.add('lanhgne-map__stop--locked');
            stop4.classList.remove('lanhgne-map__stop--unlocked');
        }

        // Reset intro text
        const introTexts = document.querySelectorAll('.lanhgne-intro__text p');
        introTexts.forEach(function(text) {
            text.classList.remove('visible');
        });

        // Reset gift box
        const giftBox = document.getElementById('giftBox');
        if (giftBox) giftBox.classList.remove('open');

        // Go to first page
        goToPage('pageIntro');

        // Restart intro animation
        setTimeout(function() {
            animateIntroText();
        }, 500);
    };

    // ===== INTRO PAGE =====
    function initIntroPage() {
        animateIntroText();
    }

    function animateIntroText() {
        const texts = document.querySelectorAll('.lanhgne-text-appear');
        texts.forEach(function(text) {
            const delay = parseInt(text.getAttribute('data-delay')) || 0;
            setTimeout(function() {
                text.classList.add('visible');
            }, delay);
        });
    }

    // ===== GIFT BOX =====
    function initGiftBox() {
        const giftBox = document.getElementById('giftBox');
        if (!giftBox) return;

        giftBox.addEventListener('click', function() {
            giftBox.classList.add('open');
            setTimeout(function() {
                goToPage('pageMap');
            }, 800);
        });
    }

    // ===== MAP STOPS =====
    function initMapStops() {
        const stops = document.querySelectorAll('.lanhgne-map__stop');
        stops.forEach(function(stop) {
            stop.addEventListener('click', function() {
                const isLocked = stop.classList.contains('lanhgne-map__stop--locked');
                if (isLocked && !gameUnlocked) {
                    // Show locked message
                    const lock = stop.querySelector('.lanhgne-map__stop-lock');
                    if (lock) {
                        lock.style.animation = 'none';
                        lock.offsetHeight; // Trigger reflow
                        lock.style.animation = 'lanhgne-shake 0.5s ease';
                    }
                    return;
                }

                const target = stop.getAttribute('data-target');
                if (target) {
                    goToPage(target);
                }
            });
        });
    }

    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes lanhgne-shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);

    // ===== CUTE PAGE =====
    function initCutePage() {
        initCuteQuote();
    }

    function initCuteQuote() {
        const quoteEl = document.getElementById('cuteQuote');
        if (!quoteEl) return;

        const randomQuote = CONFIG.cuteQuotes[Math.floor(Math.random() * CONFIG.cuteQuotes.length)];
        quoteEl.textContent = randomQuote;
    }

    // ===== PROFILE PAGE =====
    function initProfilePage() {
        const cards = document.querySelectorAll('.lanhgne-profile__card-item');
        cards.forEach(function(card) {
            card.addEventListener('click', function() {
                if (!card.classList.contains('flipped')) {
                    card.classList.add('flipped');
                    profileItemsRevealed++;
                    updateProfileProgress();
                    checkProfileComplete();
                }
            });
        });
    }

    function updateProfileProgress() {
        const progressBar = document.getElementById('profileProgressBar');
        const progressCount = document.getElementById('profileProgressCount');

        if (progressBar) {
            const percent = (profileItemsRevealed / 6) * 100;
            progressBar.style.width = percent + '%';
        }

        if (progressCount) {
            progressCount.textContent = profileItemsRevealed;
        }
    }

    function checkProfileComplete() {
        if (profileItemsRevealed >= 6) {
            const result = document.getElementById('profileResult');
            if (result) {
                setTimeout(function() {
                    result.classList.add('visible');
                    createResultSparkles();
                }, 500);
            }
        }
    }

    function createResultSparkles() {
        const container = document.getElementById('resultSparkles');
        if (!container) return;

        const sparkles = ['✨', '⭐', '🌟', '💫'];

        for (let i = 0; i < 15; i++) {
            setTimeout(function() {
                const sparkle = document.createElement('span');
                sparkle.className = 'lanhgne-profile__result-sparkle';
                sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
                sparkle.style.left = (Math.random() * 100) + '%';
                sparkle.style.bottom = '0';
                sparkle.style.animationDelay = (Math.random() * 0.5) + 's';
                container.appendChild(sparkle);

                setTimeout(function() {
                    if (sparkle.parentNode) {
                        sparkle.remove();
                    }
                }, 2000);
            }, i * 100);
        }
    }

    // ===== GAME PAGE =====
    function initGamePage() {
        const startBtn = document.getElementById('startGameBtn');
        const goToLetterBtn = document.getElementById('goToLetterBtn');

        if (startBtn) {
            startBtn.addEventListener('click', startGame);
        }

        if (goToLetterBtn) {
            goToLetterBtn.addEventListener('click', function() {
                goToPage('pageLetter');
            });
        }
    }

    function startGame() {
        const intro = document.getElementById('gameIntro');
        const area = document.getElementById('gameArea');

        if (intro) intro.style.display = 'none';
        if (area) area.classList.add('active');

        gameStars = 0;
        updateStarCount();
        spawnStars();
    }

    function spawnStars() {
        const field = document.getElementById('gameField');
        if (!field) return;

        field.innerHTML = '';

        for (let i = 0; i < CONFIG.starCount; i++) {
            const star = document.createElement('div');
            star.className = 'lanhgne-game__star';
            star.textContent = '⭐';
            star.style.left = (Math.random() * 80 + 10) + '%';
            star.style.top = (Math.random() * 80 + 10) + '%';
            star.style.animationDelay = (Math.random() * 2) + 's';

            star.addEventListener('click', function() {
                collectStar(star);
            });

            // Touch support
            star.addEventListener('touchstart', function(e) {
                e.preventDefault();
                collectStar(star);
            });

            field.appendChild(star);
        }
    }

    function collectStar(star) {
        if (!star.parentNode) return;

        // Animate star collection
        star.style.transform = 'scale(2)';
        star.style.opacity = '0';
        star.style.transition = 'all 0.3s ease';

        setTimeout(function() {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, 300);

        gameStars++;
        updateStarCount();
        showFeedback();

        if (gameStars >= CONFIG.starCount) {
            completeGame();
        }
    }

    function updateStarCount() {
        const countEl = document.getElementById('starCount');
        if (countEl) {
            countEl.textContent = gameStars;
        }
    }

    function showFeedback() {
        const feedback = document.getElementById('gameFeedback');
        if (!feedback) return;

        const randomFeedback = CONFIG.gameFeedbacks[Math.floor(Math.random() * CONFIG.gameFeedbacks.length)];
        feedback.textContent = randomFeedback;
        feedback.style.animation = 'none';
        feedback.offsetHeight;
        feedback.style.animation = 'lanhgne-popup 0.5s ease';
    }

    function completeGame() {
        gameUnlocked = true;

        const area = document.getElementById('gameArea');
        const complete = document.getElementById('gameComplete');

        setTimeout(function() {
            if (area) area.classList.remove('active');
            if (complete) complete.classList.add('active');

            // Unlock stop 4 on map
            const stop4 = document.querySelector('.lanhgne-map__stop[data-stop="4"]');
            if (stop4) {
                stop4.classList.remove('lanhgne-map__stop--locked');
                stop4.classList.add('lanhgne-map__stop--unlocked');
            }
        }, 500);
    }

    // ===== LETTER PAGE =====
    function initLetterPage() {
        const envelope = document.getElementById('envelope');
        const paper = document.getElementById('letterPaper');

        if (envelope) {
            envelope.addEventListener('click', function() {
                openLetter();
            });
        }

        const goToEndBtn = document.getElementById('goToEndBtn');
        if (goToEndBtn) {
            goToEndBtn.addEventListener('click', function() {
                goToPage('pageEnd');
            });
        }
    }

    function openLetter() {
        const envelope = document.getElementById('envelope');
        const paper = document.getElementById('letterPaper');

        if (envelope) envelope.classList.add('hidden');
        if (paper) {
            paper.classList.add('visible');
            animateLetterContent();
        }
    }

    function animateLetterContent() {
        const lines = document.querySelectorAll('.lanhgne-letter__line');
        lines.forEach(function(line) {
            const delay = parseInt(line.getAttribute('data-delay')) || 0;
            setTimeout(function() {
                line.classList.add('visible');
            }, delay);
        });

        const wish = document.querySelector('.lanhgne-letter__wish');
        if (wish) {
            const wishDelay = parseInt(wish.getAttribute('data-delay')) || 5000;
            setTimeout(function() {
                wish.classList.add('visible');
            }, wishDelay);
        }

        const btn = document.getElementById('goToEndBtn');
        if (btn) {
            const btnDelay = parseInt(btn.getAttribute('data-delay')) || 6000;
            setTimeout(function() {
                btn.classList.add('visible');
            }, btnDelay);
        }
    }

    // ===== END PAGE =====
    function initEndPage() {
        // Confetti and hearts will be created when page is shown
    }

    function initConfetti() {
        const container = document.getElementById('confettiContainer');
        if (!container) return;

        container.innerHTML = '';
        const colors = ['#e74c3c', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6', '#e91e63'];

        for (let i = 0; i < CONFIG.confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'lanhgne-confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = (Math.random() * 3) + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';

            // Random shapes
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            } else {
                confetti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
            }

            container.appendChild(confetti);
        }
    }

    function initHearts() {
        const container = document.getElementById('heartsContainer');
        if (!container) return;

        container.innerHTML = '';
        const hearts = ['❤️', '💕', '💖', '💗', '🫶'];

        for (let i = 0; i < CONFIG.heartCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'lanhgne-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = (Math.random() * 5) + 's';
            heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
            heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
            container.appendChild(heart);
        }
    }

    // ===== CHARACTER HOVER =====
    function initCharacterHover() {
        const characters = document.querySelectorAll('.lanhgne-character-img');

        characters.forEach(function(char) {
            char.addEventListener('mouseenter', function() {
                showHoverMessage(char);
            });
        });
    }

    function showHoverMessage(element) {
        // Remove existing hover message
        const existing = document.querySelector('.lanhgne-hover-msg');
        if (existing) existing.remove();

        const msg = document.createElement('div');
        msg.className = 'lanhgne-hover-msg';
        msg.textContent = CONFIG.hoverMessages[Math.floor(Math.random() * CONFIG.hoverMessages.length)];
        msg.style.cssText = `
            position: absolute;
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255,255,255,0.95);
            color: #333;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.85rem;
            white-space: nowrap;
            box-shadow: 0 3px 15px rgba(0,0,0,0.2);
            animation: lanhgne-float 2s ease-in-out infinite;
            z-index: 100;
        `;

        element.style.position = 'relative';
        element.parentNode.style.position = 'relative';
        element.parentNode.appendChild(msg);

        setTimeout(function() {
            if (msg.parentNode) {
                msg.remove();
            }
        }, 2000);
    }

    // ===== SECRET MODAL =====
    function initSecretModal() {
        const trigger = document.getElementById('secretTrigger');
        const modal = document.getElementById('secretModal');
        const closeBtn = document.getElementById('closeSecretBtn');
        const overlay = modal ? modal.querySelector('.lanhgne-secret-modal__overlay') : null;

        if (trigger && modal) {
            trigger.addEventListener('click', function() {
                modal.classList.add('visible');
            });
        }

        if (closeBtn && modal) {
            closeBtn.addEventListener('click', function() {
                modal.classList.remove('visible');
            });
        }

        if (overlay && modal) {
            overlay.addEventListener('click', function() {
                modal.classList.remove('visible');
            });
        }
    }

})();
