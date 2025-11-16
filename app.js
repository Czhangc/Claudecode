// Kids Story App - Interactive Stories with Animations

// Story database with multiple themed stories
const stories = {
    'magic-garden': {
        title: 'The Magic Garden',
        pages: [
            {
                illustration: '🌸',
                background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)',
                text: 'Once upon a time, there was a <span class="interactive-element" data-sound="sparkle">magical garden 🌟</span>',
                interactive: true
            },
            {
                illustration: '🦋',
                background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)',
                text: 'Beautiful <span class="interactive-element" data-sound="flutter">butterflies 🦋</span> danced in the sunshine!',
                interactive: true
            },
            {
                illustration: '🌈',
                background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)',
                text: 'A <span class="interactive-element" data-sound="rainbow">rainbow 🌈</span> appeared over the flowers!',
                interactive: true
            },
            {
                illustration: '🌺',
                background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)',
                text: 'The flowers smiled and the garden was happy! The End 💖',
                interactive: false
            }
        ]
    },
    'space-adventure': {
        title: 'Space Adventure',
        pages: [
            {
                illustration: '🚀',
                background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)',
                text: 'Blast off! <span class="interactive-element" data-sound="rocket">Rocket 🚀</span> zooms into space!',
                interactive: true
            },
            {
                illustration: '🌟',
                background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)',
                text: 'Look at all the twinkling <span class="interactive-element" data-sound="twinkle">stars ⭐</span>',
                interactive: true
            },
            {
                illustration: '👽',
                background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)',
                text: 'We meet a friendly <span class="interactive-element" data-sound="hello">alien 👽</span> who waves hello!',
                interactive: true
            },
            {
                illustration: '🌍',
                background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)',
                text: 'Time to fly back home to Earth 🌍! What an adventure!',
                interactive: false
            }
        ]
    },
    'ocean-friends': {
        title: 'Ocean Friends',
        pages: [
            {
                illustration: '🐠',
                background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)',
                text: 'Deep in the blue ocean, a <span class="interactive-element" data-sound="bubble">colorful fish 🐠</span> swims by!',
                interactive: true
            },
            {
                illustration: '🐙',
                background: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)',
                text: 'An <span class="interactive-element" data-sound="splash">octopus 🐙</span> waves all eight arms!',
                interactive: true
            },
            {
                illustration: '🐢',
                background: 'linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)',
                text: 'A wise old <span class="interactive-element" data-sound="calm">turtle 🐢</span> swims slowly past.',
                interactive: true
            },
            {
                illustration: '🌊',
                background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)',
                text: 'All the ocean friends play together in the waves! 🌊 The End!',
                interactive: false
            }
        ]
    },
    'forest-animals': {
        title: 'Forest Friends',
        pages: [
            {
                illustration: '🦊',
                background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)',
                text: 'In the forest, a <span class="interactive-element" data-sound="fox">clever fox 🦊</span> explores!',
                interactive: true
            },
            {
                illustration: '🐻',
                background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)',
                text: 'A big friendly <span class="interactive-element" data-sound="bear">bear 🐻</span> waves hello!',
                interactive: true
            },
            {
                illustration: '🦉',
                background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)',
                text: 'A wise <span class="interactive-element" data-sound="owl">owl 🦉</span> hoots from a tall tree!',
                interactive: true
            },
            {
                illustration: '🌳',
                background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)',
                text: 'All the forest friends live happily among the trees! 🌳',
                interactive: false
            }
        ]
    },
    'rainbow-kingdom': {
        title: 'Rainbow Kingdom',
        pages: [
            {
                illustration: '🌈',
                background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)',
                text: 'Welcome to the <span class="interactive-element" data-sound="rainbow">Rainbow Kingdom 🌈</span>!',
                interactive: true
            },
            {
                illustration: '🦄',
                background: 'linear-gradient(135deg, #FFE66D 0%, #A78BFA 100%)',
                text: 'A magical <span class="interactive-element" data-sound="magic">unicorn 🦄</span> gallops by!',
                interactive: true
            },
            {
                illustration: '👑',
                background: 'linear-gradient(135deg, #A78BFA 0%, #FF9F1C 100%)',
                text: 'The rainbow <span class="interactive-element" data-sound="crown">crown 👑</span> sparkles!',
                interactive: true
            },
            {
                illustration: '✨',
                background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE5F0 100%)',
                text: 'Everything sparkles with rainbow magic! ✨ The End!',
                interactive: false
            }
        ]
    },
    'dinosaur-day': {
        title: 'Dinosaur Day',
        pages: [
            {
                illustration: '🦕',
                background: 'linear-gradient(135deg, #E8FFE0 0%, #A8D5A8 100%)',
                text: 'A friendly <span class="interactive-element" data-sound="dino">dinosaur 🦕</span> says hello!',
                interactive: true
            },
            {
                illustration: '🦖',
                background: 'linear-gradient(135deg, #FFE5F0 0%, #FFB3D9 100%)',
                text: 'ROAR! Here comes a <span class="interactive-element" data-sound="roar">T-Rex 🦖</span>!',
                interactive: true
            },
            {
                illustration: '🥚',
                background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)',
                text: 'Look! Baby dinos hatching from <span class="interactive-element" data-sound="crack">eggs 🥚</span>!',
                interactive: true
            },
            {
                illustration: '🌋',
                background: 'linear-gradient(135deg, #E8FFE0 0%, #A8D5A8 100%)',
                text: 'The dinosaurs live happily by the volcano! 🌋 The End!',
                interactive: false
            }
        ]
    }
};

// Sound effects (using Web Audio API for simple sounds)
const sounds = {
    sparkle: { freq: 800, duration: 200 },
    flutter: { freq: 600, duration: 150 },
    rainbow: { freq: 700, duration: 300 },
    rocket: { freq: 400, duration: 400 },
    twinkle: { freq: 900, duration: 150 },
    hello: { freq: 500, duration: 200 },
    bubble: { freq: 650, duration: 200 },
    splash: { freq: 350, duration: 250 },
    calm: { freq: 450, duration: 300 },
    fox: { freq: 550, duration: 200 },
    bear: { freq: 300, duration: 300 },
    owl: { freq: 750, duration: 250 },
    magic: { freq: 850, duration: 300 },
    crown: { freq: 950, duration: 250 },
    dino: { freq: 400, duration: 350 },
    roar: { freq: 200, duration: 400 },
    crack: { freq: 600, duration: 150 }
};

// Current story state
let currentStory = null;
let currentPage = 0;
let musicPlaying = false;

// Audio context for sound effects
let audioContext = null;

// Initialize audio context
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Play sound effect
function playSound(soundType) {
    initAudio();
    const sound = sounds[soundType];
    if (!sound) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = sound.freq;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + sound.duration / 1000);
}

// Background music toggle
function toggleMusic() {
    const bgMusic = document.getElementById('bg-music');
    const musicIcon = document.getElementById('music-icon');
    const musicText = document.getElementById('music-text');

    if (!musicPlaying) {
        // Note: Background music file may not exist, this is placeholder functionality
        // In production, you'd have actual music files
        musicPlaying = true;
        musicIcon.textContent = '🔇';
        musicText.textContent = 'Music Off';
    } else {
        musicPlaying = false;
        musicIcon.textContent = '🔊';
        musicText.textContent = 'Music On';
    }
}

// Open story reader
function openStory(storyId) {
    currentStory = stories[storyId];
    currentPage = 0;

    if (!currentStory) {
        console.error('Story not found:', storyId);
        return;
    }

    // Create story reader HTML
    const readerHTML = `
        <div class="story-reader active" id="story-reader">
            <div class="story-content">
                <div class="story-header">
                    <button class="back-btn" onclick="closeStory()">⬅ Back</button>
                    <h2 style="color: #333; font-size: clamp(1.5rem, 4vw, 2.5rem);">${currentStory.title}</h2>
                </div>
                <div class="story-page" id="story-page">
                    <!-- Page content will be inserted here -->
                </div>
                <div class="page-nav">
                    <button class="nav-btn" id="prev-btn" onclick="previousPage()">⬅ Previous</button>
                    <button class="nav-btn" id="next-btn" onclick="nextPage()">Next ➡</button>
                </div>
            </div>
        </div>
    `;

    // Add reader to page
    document.body.insertAdjacentHTML('beforeend', readerHTML);

    // Show first page
    showPage(0);
}

// Close story reader
function closeStory() {
    const reader = document.getElementById('story-reader');
    if (reader) {
        reader.remove();
    }
    currentStory = null;
    currentPage = 0;
}

// Show specific page
function showPage(pageIndex) {
    if (!currentStory || pageIndex < 0 || pageIndex >= currentStory.pages.length) {
        return;
    }

    currentPage = pageIndex;
    const page = currentStory.pages[pageIndex];
    const storyPage = document.getElementById('story-page');

    // Update page content
    storyPage.innerHTML = `
        <div class="page-illustration" style="background: ${page.background};">
            <span class="story-icon">${page.illustration}</span>
        </div>
        <p class="page-text">${page.text}</p>
    `;

    // Add click handlers to interactive elements
    if (page.interactive) {
        const interactiveElements = storyPage.querySelectorAll('.interactive-element');
        interactiveElements.forEach(element => {
            element.addEventListener('click', function() {
                const soundType = this.dataset.sound;
                if (soundType) {
                    playSound(soundType);
                }

                // Add random animation
                const animations = ['spin-animation', 'pulse-animation', 'wiggle-animation'];
                const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

                this.classList.add(randomAnimation);
                setTimeout(() => {
                    this.classList.remove(randomAnimation);
                }, 1000);
            });
        });
    }

    // Update navigation buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    prevBtn.disabled = pageIndex === 0;
    nextBtn.disabled = pageIndex === currentStory.pages.length - 1;

    if (pageIndex === currentStory.pages.length - 1) {
        nextBtn.textContent = '🏠 Home';
        nextBtn.onclick = closeStory;
    } else {
        nextBtn.textContent = 'Next ➡';
        nextBtn.onclick = nextPage;
    }

    // Add entrance animation
    storyPage.style.animation = 'none';
    setTimeout(() => {
        storyPage.style.animation = 'fadeIn 0.5s ease';
    }, 10);
}

// Navigate to next page
function nextPage() {
    if (currentPage < currentStory.pages.length - 1) {
        showPage(currentPage + 1);
    }
}

// Navigate to previous page
function previousPage() {
    if (currentPage > 0) {
        showPage(currentPage - 1);
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    console.log('Kids Story App Loaded! 🎉');

    // Add subtle background animations to story cards
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (currentStory) {
        if (e.key === 'ArrowRight') {
            nextPage();
        } else if (e.key === 'ArrowLeft') {
            previousPage();
        } else if (e.key === 'Escape') {
            closeStory();
        }
    }
});

// Prevent text selection on repeated clicks (better for kids)
document.addEventListener('selectstart', function(e) {
    if (e.target.closest('.story-card') || e.target.closest('.interactive-element')) {
        e.preventDefault();
    }
});
