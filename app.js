// Kids Story App - Interactive Stories with Animations

// Story database with multiple themed stories (50 pages each)
const stories = {
    'magic-garden': {
        title: 'The Magic Garden',
        pages: [
            { illustration: '🌸', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Once there was a little girl named <span class="interactive-element" data-sound="sparkle">Lily 👧</span>', interactive: true },
            { illustration: '🏡', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'She lived in a small <span class="interactive-element" data-sound="calm">house 🏡</span> with a big backyard.', interactive: true },
            { illustration: '🌱', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'One day, she found a tiny <span class="interactive-element" data-sound="flutter">seed 🌱</span> sparkling in the grass!', interactive: true },
            { illustration: '✨', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'The seed glowed with <span class="interactive-element" data-sound="sparkle">magic ✨</span>!', interactive: true },
            { illustration: '🌸', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Lily planted the seed in her garden.', interactive: false },
            { illustration: '💧', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'She gave it <span class="interactive-element" data-sound="bubble">water 💧</span> every day.', interactive: true },
            { illustration: '☀️', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'The warm <span class="interactive-element" data-sound="twinkle">sun ☀️</span> shone down on it.', interactive: true },
            { illustration: '🌱', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Soon, a little sprout appeared!', interactive: false },
            { illustration: '🌿', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'The sprout grew bigger and bigger!', interactive: false },
            { illustration: '🌸', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Then one morning, a beautiful <span class="interactive-element" data-sound="sparkle">flower 🌸</span> bloomed!', interactive: true },
            { illustration: '✨', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'But this was no ordinary flower - it was magical!', interactive: false },
            { illustration: '🌺', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'More <span class="interactive-element" data-sound="rainbow">flowers 🌺</span> started to grow all around!', interactive: true },
            { illustration: '🌻', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'There were <span class="interactive-element" data-sound="twinkle">sunflowers 🌻</span>!', interactive: true },
            { illustration: '🌷', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'And pretty <span class="interactive-element" data-sound="flutter">tulips 🌷</span>!', interactive: true },
            { illustration: '🌹', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFB3D9 100%)', text: 'And sweet-smelling <span class="interactive-element" data-sound="sparkle">roses 🌹</span>!', interactive: true },
            { illustration: '🦋', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'The flowers attracted beautiful <span class="interactive-element" data-sound="flutter">butterflies 🦋</span>!', interactive: true },
            { illustration: '🦋', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: 'Purple butterflies danced in the air!', interactive: false },
            { illustration: '🦋', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'Yellow butterflies twirled and swirled!', interactive: false },
            { illustration: '🐝', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'Busy <span class="interactive-element" data-sound="flutter">bees 🐝</span> came to visit!', interactive: true },
            { illustration: '🐞', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFB3D9 100%)', text: 'Little <span class="interactive-element" data-sound="calm">ladybugs 🐞</span> crawled on the leaves!', interactive: true },
            { illustration: '🌈', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)', text: 'Then something amazing happened! A <span class="interactive-element" data-sound="rainbow">rainbow 🌈</span> appeared!', interactive: true },
            { illustration: '✨', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'The rainbow touched the garden with magic!', interactive: false },
            { illustration: '🌸', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'The flowers began to sing!', interactive: false },
            { illustration: '🎵', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: '"La la la!" sang the flowers. <span class="interactive-element" data-sound="twinkle">🎵</span>', interactive: true },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Lily was so happy! She danced with joy!', interactive: false },
            { illustration: '🧚', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: 'Suddenly, a tiny <span class="interactive-element" data-sound="magic">fairy 🧚</span> appeared!', interactive: true },
            { illustration: '✨', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: '"Hello, Lily!" said the fairy. "Thank you for caring for the magic garden!"', interactive: false },
            { illustration: '🧚', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: 'The fairy waved her wand!', interactive: false },
            { illustration: '⭐', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '<span class="interactive-element" data-sound="sparkle">Stars ⭐</span> sparkled everywhere!', interactive: true },
            { illustration: '🌟', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'The garden glowed brighter and brighter!', interactive: false },
            { illustration: '🦄', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)', text: 'A gentle <span class="interactive-element" data-sound="magic">unicorn 🦄</span> walked into the garden!', interactive: true },
            { illustration: '🦄', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: 'The unicorn had a shimmering horn!', interactive: false },
            { illustration: '🌈', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)', text: 'Its mane was rainbow colored!', interactive: false },
            { illustration: '🦄', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"You may ride on my back," said the unicorn.', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'Lily climbed onto the unicorn!', interactive: false },
            { illustration: '🦄', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'They flew through the magical garden!', interactive: false },
            { illustration: '🌸', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'They flew over the singing flowers!', interactive: false },
            { illustration: '🌳', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'They flew past the talking <span class="interactive-element" data-sound="calm">trees 🌳</span>!', interactive: true },
            { illustration: '☁️', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'They flew up to the soft <span class="interactive-element" data-sound="flutter">clouds ☁️</span>!', interactive: true },
            { illustration: '🌈', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)', text: 'They slid down the rainbow!', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Lily laughed and laughed!', interactive: false },
            { illustration: '🌸', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'When they landed, the fairy was waiting.', interactive: false },
            { illustration: '🧚', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: '"This garden will always be magical," said the fairy.', interactive: false },
            { illustration: '✨', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"As long as you care for it with love!"', interactive: false },
            { illustration: '💖', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Lily promised to always take care of her garden!', interactive: false },
            { illustration: '🌺', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Every day she watered the flowers.', interactive: false },
            { illustration: '☀️', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'And every day the garden grew more beautiful!', interactive: false },
            { illustration: '🦋', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'The butterflies visited every morning!', interactive: false },
            { illustration: '🌈', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)', text: 'And the rainbow always shone above!', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Lily and her magic garden lived happily! The End! 💖', interactive: false }
        ]
    },
    'space-adventure': {
        title: 'Space Adventure',
        pages: [
            { illustration: '👧', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Meet <span class="interactive-element" data-sound="hello">Emma 👧</span>, a brave little astronaut!', interactive: true },
            { illustration: '🚀', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'Emma had a shiny <span class="interactive-element" data-sound="rocket">rocket 🚀</span>!', interactive: true },
            { illustration: '🌍', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'She lived on planet <span class="interactive-element" data-sound="calm">Earth 🌍</span>.', interactive: true },
            { illustration: '🌟', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'But Emma dreamed of visiting the <span class="interactive-element" data-sound="twinkle">stars 🌟</span>!', interactive: true },
            { illustration: '🚀', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: 'One day, Emma got into her rocket.', interactive: false },
            { illustration: '⭐', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: '"Today I will explore space!" she said.', interactive: false },
            { illustration: '🚀', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: 'Emma buckled her seatbelt tight.', interactive: false },
            { illustration: '⏰', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: '"10... 9... 8... 7... 6..."', interactive: false },
            { illustration: '🚀', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: '"5... 4... 3... 2... 1..."', interactive: false },
            { illustration: '🚀', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: '<span class="interactive-element" data-sound="rocket">BLAST OFF! 🚀</span>', interactive: true },
            { illustration: '☁️', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'The rocket flew through the clouds!', interactive: false },
            { illustration: '🌤️', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Higher and higher it went!', interactive: false },
            { illustration: '🌍', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'Emma looked down at Earth getting smaller.', interactive: false },
            { illustration: '✨', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: 'Soon she was in space!', interactive: false },
            { illustration: '⭐', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'Stars twinkled all around her!', interactive: false },
            { illustration: '🌟', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: '"Wow!" said Emma. "Space is beautiful!"', interactive: false },
            { illustration: '🌙', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'Emma flew past the <span class="interactive-element" data-sound="twinkle">moon 🌙</span>!', interactive: true },
            { illustration: '🌙', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: 'The moon was round and bright!', interactive: false },
            { illustration: '👋', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'Emma waved hello to the moon!', interactive: false },
            { illustration: '💫', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: 'Then she saw shooting <span class="interactive-element" data-sound="sparkle">stars 💫</span>!', interactive: true },
            { illustration: '✨', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: 'They zoomed past her rocket!', interactive: false },
            { illustration: '🪐', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: 'Emma spotted a beautiful <span class="interactive-element" data-sound="rainbow">planet 🪐</span> with rings!', interactive: true },
            { illustration: '🚀', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: 'She flew closer to see it better!', interactive: false },
            { illustration: '🪐', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: 'The planet was purple and sparkly!', interactive: false },
            { illustration: '👽', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: 'Suddenly, a friendly <span class="interactive-element" data-sound="hello">alien 👽</span> appeared!', interactive: true },
            { illustration: '👽', background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)', text: 'The alien had three eyes and was green!', interactive: false },
            { illustration: '👋', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: '"Hello!" said the alien. "I am Zorp!"', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)', text: '"Hello Zorp! I am Emma!" she replied.', interactive: false },
            { illustration: '👽', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: '"Would you like to visit my planet?" asked Zorp.', interactive: false },
            { illustration: '🚀', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: '"Yes please!" said Emma excitedly!', interactive: false },
            { illustration: '🪐', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: 'They landed on the purple planet!', interactive: false },
            { illustration: '✨', background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)', text: 'Everything on the planet sparkled!', interactive: false },
            { illustration: '🌈', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)', text: 'There were rainbow-colored <span class="interactive-element" data-sound="rainbow">trees 🌈</span>!', interactive: true },
            { illustration: '🎈', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'And floating <span class="interactive-element" data-sound="flutter">bubbles 🎈</span>!', interactive: true },
            { illustration: '👽', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: 'Zorp introduced Emma to his alien friends!', interactive: false },
            { illustration: '👽', background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)', text: 'There was Beep, who had four arms!', interactive: false },
            { illustration: '👽', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: 'And Bloop, who could change colors!', interactive: false },
            { illustration: '🎵', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'The aliens sang Emma a space <span class="interactive-element" data-sound="twinkle">song 🎵</span>!', interactive: true },
            { illustration: '💃', background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)', text: 'They all danced together in zero gravity!', interactive: false },
            { illustration: '🍪', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Zorp shared space cookies with Emma!', interactive: false },
            { illustration: '⭐', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'The cookies were shaped like stars and tasted like honey!', interactive: false },
            { illustration: '⏰', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: 'After a while, Emma checked the time.', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: '"I should go home now," said Emma.', interactive: false },
            { illustration: '👽', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: '"Come back soon!" said all the aliens.', interactive: false },
            { illustration: '🚀', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: 'Emma got back in her rocket.', interactive: false },
            { illustration: '👋', background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)', text: 'She waved goodbye to her new friends!', interactive: false },
            { illustration: '🚀', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: 'The rocket zoomed back through space!', interactive: false },
            { illustration: '🌍', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'Soon Emma could see <span class="interactive-element" data-sound="calm">Earth 🌍</span> again!', interactive: true },
            { illustration: '🏠', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'She landed safely back home!', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Emma smiled, thinking about her space adventure! The End! 🚀', interactive: false }
        ]
    },
    'ocean-friends': {
        title: 'Ocean Friends',
        pages: [
            { illustration: '👦', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Meet <span class="interactive-element" data-sound="hello">Sam 👦</span>, who loved the ocean!', interactive: true },
            { illustration: '🏖️', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'One day, Sam went to the <span class="interactive-element" data-sound="calm">beach 🏖️</span>.', interactive: true },
            { illustration: '🌊', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'The <span class="interactive-element" data-sound="splash">waves 🌊</span> splashed gently.', interactive: true },
            { illustration: '🐚', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Sam found a beautiful <span class="interactive-element" data-sound="sparkle">shell 🐚</span>!', interactive: true },
            { illustration: '✨', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'The shell sparkled in the sunlight!', interactive: false },
            { illustration: '🐚', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'When Sam held it to his ear...', interactive: false },
            { illustration: '🌊', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'He could hear the ocean singing!', interactive: false },
            { illustration: '✨', background: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)', text: 'Suddenly, the shell glowed with magic!', interactive: false },
            { illustration: '💫', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Whoosh! Sam could breathe underwater!', interactive: false },
            { illustration: '🌊', background: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)', text: 'He dove into the ocean!', interactive: false },
            { illustration: '🐠', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Right away, a <span class="interactive-element" data-sound="bubble">fish 🐠</span> swam up to him!', interactive: true },
            { illustration: '🐠', background: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)', text: 'The fish was orange and blue and very colorful!', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: '"Hello! I am Finn the Fish!" said the fish.', interactive: false },
            { illustration: '🐠', background: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)', text: '"Would you like to meet my ocean friends?"', interactive: false },
            { illustration: '👦', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: '"Yes please!" said Sam excitedly!', interactive: false },
            { illustration: '🐠', background: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)', text: 'Finn swam deeper into the ocean.', interactive: false },
            { illustration: '🌊', background: 'linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)', text: 'Sam followed, swimming like a fish!', interactive: false },
            { illustration: '🐙', background: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)', text: 'They met <span class="interactive-element" data-sound="splash">Oliver the Octopus 🐙</span>!', interactive: true },
            { illustration: '🐙', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: 'Oliver had eight long arms!', interactive: false },
            { illustration: '👋', background: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)', text: 'He waved all eight arms at once!', interactive: false },
            { illustration: '🎨', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"I am an artist!" said Oliver proudly.', interactive: false },
            { illustration: '🐙', background: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)', text: 'Oliver showed Sam his underwater paintings!', interactive: false },
            { illustration: '🌈', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)', text: 'They were beautiful rainbow colors!', interactive: false },
            { illustration: '🐢', background: 'linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)', text: 'Next they met <span class="interactive-element" data-sound="calm">Shelly the Turtle 🐢</span>!', interactive: true },
            { illustration: '🐢', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Shelly was very old and very wise.', interactive: false },
            { illustration: '📚', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: '"I have lived in the ocean for 100 years!" said Shelly.', interactive: false },
            { illustration: '🐢', background: 'linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)', text: '"I know all the ocean stories!"', interactive: false },
            { illustration: '📖', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'Shelly told Sam about the ocean treasures.', interactive: false },
            { illustration: '🐚', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'About secret caves filled with shells!', interactive: false },
            { illustration: '💎', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'And hidden gems that sparkle!', interactive: false },
            { illustration: '🐬', background: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)', text: 'Suddenly, a <span class="interactive-element" data-sound="flutter">dolphin 🐬</span> jumped by!', interactive: true },
            { illustration: '🐬', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: '"Hi everyone! I am Dolly the Dolphin!"', interactive: false },
            { illustration: '🎵', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Dolly loved to sing and dance!', interactive: false },
            { illustration: '🐬', background: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)', text: 'She did flips and spins in the water!', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Sam clapped and cheered!', interactive: false },
            { illustration: '🦈', background: 'linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)', text: 'Then they saw a big shadow!', interactive: false },
            { illustration: '😮', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Sam was a little scared!', interactive: false },
            { illustration: '🦈', background: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)', text: 'But it was just Sammy the Shark!', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: '"Don\'t worry! I am a friendly shark!" said Sammy.', interactive: false },
            { illustration: '🦈', background: 'linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)', text: '"I protect all the little fish!"', interactive: false },
            { illustration: '🐠', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'All the fish loved Sammy!', interactive: false },
            { illustration: '🎉', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"Let\'s have a party!" suggested Dolly.', interactive: false },
            { illustration: '🎊', background: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)', text: 'All the ocean friends agreed!', interactive: false },
            { illustration: '🎵', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'They sang underwater songs!', interactive: false },
            { illustration: '💃', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'They danced in the ocean currents!', interactive: false },
            { illustration: '✨', background: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)', text: 'The ocean sparkled with joy!', interactive: false },
            { illustration: '🌅', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'Soon the sun began to set.', interactive: false },
            { illustration: '🏠', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'It was time for Sam to go home.', interactive: false },
            { illustration: '🐠', background: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)', text: '"Come visit us again!" said all his ocean friends.', interactive: false },
            { illustration: '🌊', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Sam swam back to shore with wonderful memories! The End! 🌊', interactive: false }
        ]
    },
    'forest-animals': {
        title: 'Forest Friends',
        pages: [
            { illustration: '🌲', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Deep in the green <span class="interactive-element" data-sound="calm">forest 🌲</span>...', interactive: true },
            { illustration: '🌳', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Where tall trees touched the sky...', interactive: false },
            { illustration: '🦊', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Lived <span class="interactive-element" data-sound="fox">Freddy the Fox 🦊</span>!', interactive: true },
            { illustration: '🦊', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Freddy had bright orange fur!', interactive: false },
            { illustration: '🦊', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'And a big bushy tail!', interactive: false },
            { illustration: '☀️', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'One sunny morning, Freddy woke up.', interactive: false },
            { illustration: '🦊', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: '"Today I will explore the forest!" he said.', interactive: false },
            { illustration: '🌲', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'He walked through the tall trees.', interactive: false },
            { illustration: '🌸', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'He smelled the pretty <span class="interactive-element" data-sound="flutter">flowers 🌸</span>.', interactive: true },
            { illustration: '🦋', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Butterflies flew past him!', interactive: false },
            { illustration: '🐿️', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Suddenly, he heard a sound! "Help! Help!"', interactive: false },
            { illustration: '🦊', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Freddy ran to see who needed help!', interactive: false },
            { illustration: '🐿️', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'It was <span class="interactive-element" data-sound="flutter">Sally the Squirrel 🐿️</span>!', interactive: true },
            { illustration: '🐿️', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'She was stuck in a tree!', interactive: false },
            { illustration: '😢', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: '"I climbed too high!" cried Sally.', interactive: false },
            { illustration: '🦊', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: '"Don\'t worry! I will help you!" said Freddy.', interactive: false },
            { illustration: '🤔', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'But the tree was too tall for Freddy!', interactive: false },
            { illustration: '💭', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Freddy thought hard about what to do.', interactive: false },
            { illustration: '🐻', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: '"I know! I will ask my friend <span class="interactive-element" data-sound="bear">Barry the Bear 🐻</span>!"', interactive: true },
            { illustration: '🦊', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Freddy ran to find Barry!', interactive: false },
            { illustration: '🐻', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Barry was eating honey from a tree!', interactive: false },
            { illustration: '🍯', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: '"Mmm, this honey is delicious!" said Barry.', interactive: false },
            { illustration: '🦊', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: '"Barry! We need your help!" said Freddy.', interactive: false },
            { illustration: '🐻', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: '"Of course! What happened?" asked Barry.', interactive: false },
            { illustration: '🦊', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Freddy explained about Sally!', interactive: false },
            { illustration: '🐻', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: '"I am tall and strong! I can help!" said Barry.', interactive: false },
            { illustration: '🌲', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'They ran back to the tall tree!', interactive: false },
            { illustration: '🐿️', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Sally was still stuck!', interactive: false },
            { illustration: '🐻', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Barry stood on his back legs!', interactive: false },
            { illustration: '🐻', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'He reached up high!', interactive: false },
            { illustration: '🐿️', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Sally climbed onto Barry\'s paw!', interactive: false },
            { illustration: '🐻', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Gently, Barry lowered her down!', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"Hooray! I am safe!" cheered Sally!', interactive: false },
            { illustration: '🐿️', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: '"Thank you so much!" said Sally.', interactive: false },
            { illustration: '🦉', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: 'Just then, <span class="interactive-element" data-sound="owl">Oliver the Owl 🦉</span> flew down!', interactive: true },
            { illustration: '🦉', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: '"I saw everything from my tree!" said Oliver.', interactive: false },
            { illustration: '🦉', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: '"You are all such good friends!"', interactive: false },
            { illustration: '💡', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: '"I have an idea!" said Oliver wisely.', interactive: false },
            { illustration: '🦉', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: '"Let\'s have a friendship party!"', interactive: false },
            { illustration: '🎉', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"Yes!" everyone shouted happily!', interactive: false },
            { illustration: '🐰', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'More forest friends came to join!', interactive: false },
            { illustration: '🦌', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Danny the Deer brought berries!', interactive: false },
            { illustration: '🦝', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Rosie the Raccoon brought acorns!', interactive: false },
            { illustration: '🎵', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'They all sang forest songs!', interactive: false },
            { illustration: '💃', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'They danced between the trees!', interactive: false },
            { illustration: '🌙', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'As the moon rose high...', interactive: false },
            { illustration: '⭐', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'And the stars came out...', interactive: false },
            { illustration: '🦊', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Freddy smiled at all his friends.', interactive: false },
            { illustration: '💖', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"Friends help friends!" said Freddy.', interactive: false },
            { illustration: '🌲', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'And they all lived happily in the forest! The End! 🌲', interactive: false }
        ]
    },
    'rainbow-kingdom': {
        title: 'Rainbow Kingdom',
        pages: [
            { illustration: '👸', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Meet Princess <span class="interactive-element" data-sound="sparkle">Rose 👸</span>!', interactive: true },
            { illustration: '🏰', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: 'She lived in a beautiful <span class="interactive-element" data-sound="magic">castle 🏰</span>!', interactive: true },
            { illustration: '🌈', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)', text: 'In the magical <span class="interactive-element" data-sound="rainbow">Rainbow Kingdom 🌈</span>!', interactive: true },
            { illustration: '✨', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: 'Everything in the kingdom was colorful!', interactive: false },
            { illustration: '🌈', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)', text: 'The sky had seven rainbow colors!', interactive: false },
            { illustration: '🌸', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'The flowers bloomed in every color!', interactive: false },
            { illustration: '🦋', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Even the butterflies had rainbow wings!', interactive: false },
            { illustration: '👸', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'One day, Princess Rose woke up early.', interactive: false },
            { illustration: '😮', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: 'Something was wrong!', interactive: false },
            { illustration: '☁️', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'The kingdom was grey!', interactive: false },
            { illustration: '😢', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'All the colors were gone!', interactive: false },
            { illustration: '👸', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"Oh no!" cried Princess Rose.', interactive: false },
            { illustration: '🔍', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: '"I must find the missing colors!"', interactive: false },
            { illustration: '👸', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: 'She put on her brave princess dress!', interactive: false },
            { illustration: '🗺️', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'She looked at her magic map!', interactive: false },
            { illustration: '✨', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)', text: 'The map showed where the colors went!', interactive: false },
            { illustration: '🦄', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: 'Her friend <span class="interactive-element" data-sound="magic">Unity the Unicorn 🦄</span> came!', interactive: true },
            { illustration: '🦄', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)', text: '"I will help you!" said Unity.', interactive: false },
            { illustration: '👸', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Rose climbed onto Unity\'s back!', interactive: false },
            { illustration: '🦄', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: 'They flew into the sky!', interactive: false },
            { illustration: '☁️', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'First, they flew to the Cloud Mountains!', interactive: false },
            { illustration: '⛰️', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'The mountains were tall and white!', interactive: false },
            { illustration: '🔴', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFB3D9 100%)', text: 'There, they found the color <span class="interactive-element" data-sound="sparkle">RED 🔴</span>!', interactive: true },
            { illustration: '✨', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFB3D9 100%)', text: '"Yay! We found red!" cheered Rose!', interactive: false },
            { illustration: '🧡', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Next, they searched for <span class="interactive-element" data-sound="twinkle">ORANGE 🧡</span>!', interactive: true },
            { illustration: '🌅', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'They found it at the Sunset Valley!', interactive: false },
            { illustration: '💛', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'Then they looked for <span class="interactive-element" data-sound="sparkle">YELLOW 💛</span>!', interactive: true },
            { illustration: '☀️', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'It was hiding behind the Sun!', interactive: false },
            { illustration: '💚', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Next was <span class="interactive-element" data-sound="calm">GREEN 💚</span>!', interactive: true },
            { illustration: '🌳', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'They found green in the Emerald Forest!', interactive: false },
            { illustration: '💙', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Then they searched for <span class="interactive-element" data-sound="bubble">BLUE 💙</span>!', interactive: true },
            { illustration: '🌊', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Blue was playing in the ocean!', interactive: false },
            { illustration: '💜', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: 'Next was <span class="interactive-element" data-sound="magic">PURPLE 💜</span>!', interactive: true },
            { illustration: '🌸', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: 'Purple was in the Lavender Fields!', interactive: false },
            { illustration: '👸', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"We almost have all the colors!" said Rose!', interactive: false },
            { illustration: '🦄', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: '"Just one more to find!" said Unity!', interactive: false },
            { illustration: '❤️', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'The last color was <span class="interactive-element" data-sound="sparkle">PINK ❤️</span>!', interactive: true },
            { illustration: '🌸', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Where could pink be?', interactive: false },
            { illustration: '💭', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Princess Rose thought hard!', interactive: false },
            { illustration: '👑', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)', text: 'Then she remembered her <span class="interactive-element" data-sound="crown">crown 👑</span>!', interactive: true },
            { illustration: '✨', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Her crown was pink!', interactive: false },
            { illustration: '👸', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"Pink was with me all along!"', interactive: false },
            { illustration: '🌈', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)', text: 'Now they had all seven colors!', interactive: false },
            { illustration: '✨', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: 'Princess Rose held them high!', interactive: false },
            { illustration: '🌈', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)', text: 'The colors flew back to the kingdom!', interactive: false },
            { illustration: '✨', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Red, orange, yellow, green, blue, purple, and pink!', interactive: false },
            { illustration: '🏰', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)', text: 'The Rainbow Kingdom was colorful again!', interactive: false },
            { illustration: '🎉', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Everyone celebrated!', interactive: false },
            { illustration: '👸', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: 'Princess Rose saved the day!', interactive: false },
            { illustration: '🌈', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)', text: 'And the kingdom stayed colorful forever! The End! 🌈', interactive: false }
        ]
    },
    'dinosaur-day': {
        title: 'Dinosaur Day',
        pages: [
            { illustration: '🌋', background: 'linear-gradient(135deg, #E8FFE0 0%, #A8D5A8 100%)', text: 'Long, long ago, near a big <span class="interactive-element" data-sound="roar">volcano 🌋</span>...', interactive: true },
            { illustration: '🌴', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Where palm trees grew tall...', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #E8FFE0 0%, #A8D5A8 100%)', text: 'Lived <span class="interactive-element" data-sound="dino">Danny the Dinosaur 🦕</span>!', interactive: true },
            { illustration: '🦕', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Danny was a gentle, long-necked dinosaur!', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #E8FFE0 0%, #A8D5A8 100%)', text: 'He loved to eat leaves from tall trees!', interactive: false },
            { illustration: '☀️', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'One sunny morning, Danny woke up!', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: '"Today is a special day!" he thought.', interactive: false },
            { illustration: '🎂', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'It was his birthday!', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #E8FFE0 0%, #A8D5A8 100%)', text: '"I wonder if my friends remembered?"', interactive: false },
            { illustration: '🌴', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Danny walked through the jungle!', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFB3D9 100%)', text: 'He saw his friend <span class="interactive-element" data-sound="roar">Tina the T-Rex 🦖</span>!', interactive: true },
            { illustration: '🦖', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFB3D9 100%)', text: 'Tina had short arms but big teeth!', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'But Tina was friendly!', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFB3D9 100%)', text: '"Hi Danny!" roared Tina happily!', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #E8FFE0 0%, #A8D5A8 100%)', text: '"Hi Tina! Do you know what day it is?"', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFB3D9 100%)', text: '"Hmm, let me think..." said Tina.', interactive: false },
            { illustration: '💭', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Tina pretended to think hard!', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFB3D9 100%)', text: '"Is it... Tuesday?" she asked.', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Danny felt a little sad.', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #E8FFE0 0%, #A8D5A8 100%)', text: '"Never mind," he said quietly.', interactive: false },
            { illustration: '🌴', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Danny walked on through the jungle.', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'He met Terry the Triceratops!', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Terry had three big horns!', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #E8FFE0 0%, #A8D5A8 100%)', text: '"Hi Terry! Do you know what day it is?"', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: '"Hmm... is it Leaf-Eating Day?" asked Terry.', interactive: false },
            { illustration: '😢', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Danny felt even sadder.', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #E8FFE0 0%, #A8D5A8 100%)', text: '"My friends forgot my birthday!" he thought.', interactive: false },
            { illustration: '🌴', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Danny walked slowly home.', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'His long neck drooped down.', interactive: false },
            { illustration: '🏔️', background: 'linear-gradient(135deg, #E8FFE0 0%, #A8D5A8 100%)', text: 'He walked past the big rocks.', interactive: false },
            { illustration: '🌳', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'He walked past the tall trees.', interactive: false },
            { illustration: '🏠', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'Finally, he reached his cave home.', interactive: false },
            { illustration: '😮', background: 'linear-gradient(135deg, #E8FFE0 0%, #A8D5A8 100%)', text: 'But wait! What was that sound?', interactive: false },
            { illustration: '🎉', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '<span class="interactive-element" data-sound="sparkle">"SURPRISE! 🎉"</span>', interactive: true },
            { illustration: '😊', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'All his friends were there!', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFB3D9 100%)', text: 'Tina the T-Rex!', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Terry the Triceratops!', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #E8FFE0 0%, #A8D5A8 100%)', text: 'And many more dinosaur friends!', interactive: false },
            { illustration: '🎂', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'They made a huge birthday cake!', interactive: false },
            { illustration: '🥚', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'Made from <span class="interactive-element" data-sound="crack">special eggs 🥚</span>!', interactive: true },
            { illustration: '🎈', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'There were colorful balloons!', interactive: false },
            { illustration: '🎁', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'And presents wrapped in leaves!', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: '"You remembered!" cried Danny happily!', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFB3D9 100%)', text: '"Of course!" laughed Tina!', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: '"We were just pretending!" said Terry!', interactive: false },
            { illustration: '🎵', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'They all sang "Happy Birthday!"', interactive: false },
            { illustration: '🎂', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Danny blew out his candles!', interactive: false },
            { illustration: '🍰', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'Everyone ate delicious cake!', interactive: false },
            { illustration: '💃', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'They danced the dinosaur dance!', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #E8FFE0 0%, #A8D5A8 100%)', text: 'It was the best birthday ever! The End! 🦕', interactive: false }
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

    const readerHTML = `
        <div class="story-reader active" id="story-reader">
            <div class="story-content">
                <div class="story-header">
                    <button class="back-btn" onclick="closeStory()">⬅ Back</button>
                    <h2 style="color: #333; font-size: clamp(1.5rem, 4vw, 2.5rem);">${currentStory.title}</h2>
                </div>
                <div class="story-page" id="story-page"></div>
                <div class="page-nav">
                    <button class="nav-btn" id="prev-btn" onclick="previousPage()">⬅ Previous</button>
                    <span id="page-number" style="font-size: 1.2rem; font-weight: bold; color: #666;"></span>
                    <button class="nav-btn" id="next-btn" onclick="nextPage()">Next ➡</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', readerHTML);
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
    const pageNumber = document.getElementById('page-number');

    storyPage.innerHTML = `
        <div class="page-illustration" style="background: ${page.background};">
            <span class="story-icon">${page.illustration}</span>
        </div>
        <p class="page-text">${page.text}</p>
    `;

    pageNumber.textContent = `${pageIndex + 1} / ${currentStory.pages.length}`;

    if (page.interactive) {
        const interactiveElements = storyPage.querySelectorAll('.interactive-element');
        interactiveElements.forEach(element => {
            element.addEventListener('click', function() {
                const soundType = this.dataset.sound;
                if (soundType) {
                    playSound(soundType);
                }

                const animations = ['spin-animation', 'pulse-animation', 'wiggle-animation'];
                const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

                this.classList.add(randomAnimation);
                setTimeout(() => {
                    this.classList.remove(randomAnimation);
                }, 1000);
            });
        });
    }

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

// Prevent text selection on repeated clicks
document.addEventListener('selectstart', function(e) {
    if (e.target.closest('.story-card') || e.target.closest('.interactive-element')) {
        e.preventDefault();
    }
});
