// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const giftScreen = document.getElementById('gift-screen');
const letterScreen = document.getElementById('letter-screen');
const finalScreen = document.getElementById('final-screen');
const giftBox = document.getElementById('gift-box');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');

// Switch screens with smooth transition
function switchScreen(hideScreen, showScreen) {
    hideScreen.classList.remove('active');
    setTimeout(() => {
        showScreen.classList.add('active');
    }, 400);
}

// Loading complete - show gift screen
function onLoadingComplete() {
    setTimeout(() => {
        switchScreen(loadingScreen, giftScreen);
    }, 3000);
}

// Gift box click handler
function onGiftClick() {
    if (giftBox.classList.contains('opened')) return;

    giftBox.classList.add('opened');

    // Create mini confetti burst when opening gift
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#ffd700', '#ff69b4', '#c41e3a']
        });
    }

    setTimeout(() => {
        switchScreen(giftScreen, letterScreen);
    }, 1000);
}

// Shrink counter for "No" button
let shrinkCount = 0;
const maxShrinks = 5;

// "No" button click handler
function onNoClick(e) {
    e.preventDefault();
    shrinkCount++;

    const scale = Math.max(0.3, 1 - (shrinkCount * 0.15));
    const opacity = Math.max(0.4, 1 - (shrinkCount * 0.12));

    btnNo.style.transform = `scale(${scale})`;
    btnNo.style.opacity = opacity;

    // Shake animation
    btnNo.style.animation = 'none';
    btnNo.offsetHeight;
    btnNo.style.animation = 'shake 0.5s ease';

    // Change button text
    const texts = [
        '<span class="btn-icon">😤</span><span>Không</span>',
        '<span class="btn-icon">🥺</span><span>Thật không?</span>',
        '<span class="btn-icon">😢</span><span>Suy nghĩ lại~</span>',
        '<span class="btn-icon">💔</span><span>Changg ơi...</span>',
        '<span class="btn-icon">💕</span><span>Bấm Có đi mà</span>'
    ];
    btnNo.innerHTML = texts[Math.min(shrinkCount, texts.length - 1)];

    if (shrinkCount >= maxShrinks) {
        btnNo.style.visibility = 'hidden';
    }
}

// "Yes" button click handler
function onYesClick(e) {
    e.preventDefault();

    switchScreen(letterScreen, finalScreen);

    // Launch epic confetti celebration
    setTimeout(() => {
        launchConfetti();
    }, 500);
}

// Epic confetti celebration
function launchConfetti() {
    if (typeof confetti === 'undefined') return;

    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = ['#c41e3a', '#228b22', '#ffd700', '#ff69b4', '#ffffff', '#ff1493'];

    // Initial big burst
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: colors
    });

    // Continuous confetti from sides
    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 30 * (timeLeft / duration);

        // Left side
        confetti({
            particleCount: particleCount,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors: colors
        });

        // Right side
        confetti({
            particleCount: particleCount,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors: colors
        });
    }, 300);

    // Firework bursts
    setTimeout(() => {
        confetti({
            particleCount: 80,
            spread: 360,
            origin: { x: 0.5, y: 0.3 },
            colors: colors,
            startVelocity: 45
        });
    }, 1000);

    setTimeout(() => {
        confetti({
            particleCount: 80,
            spread: 360,
            origin: { x: 0.3, y: 0.4 },
            colors: colors,
            startVelocity: 40
        });
    }, 2000);

    setTimeout(() => {
        confetti({
            particleCount: 80,
            spread: 360,
            origin: { x: 0.7, y: 0.4 },
            colors: colors,
            startVelocity: 40
        });
    }, 3000);
}

// Add shake animation CSS dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-8px) rotate(-5deg); }
        40% { transform: translateX(8px) rotate(5deg); }
        60% { transform: translateX(-8px) rotate(-5deg); }
        80% { transform: translateX(8px) rotate(5deg); }
    }
`;
document.head.appendChild(shakeStyle);

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Start loading
    onLoadingComplete();

    // Event listeners
    giftBox.addEventListener('click', onGiftClick);
    btnYes.addEventListener('click', onYesClick);
    btnNo.addEventListener('click', onNoClick);

    // Touch support
    giftBox.addEventListener('touchend', function(e) {
        e.preventDefault();
        onGiftClick();
    });

    btnYes.addEventListener('touchend', function(e) {
        e.preventDefault();
        onYesClick(e);
    });

    btnNo.addEventListener('touchend', function(e) {
        e.preventDefault();
        onNoClick(e);
    });
});

// Prevent zoom on double tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', function(e) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);
