// Kids Story App - Enriched Stories with Deep Plots (60-70 pages each)

const stories = {
    'magic-garden': {
        title: 'The Magic Garden',
        pages: [
            // BEGINNING - Introduction (Pages 1-10)
            { illustration: '🌸', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'In a cozy yellow house at the end of Maple Street, lived a little girl named <span class="interactive-element" data-sound="sparkle">Lily 👧</span>', interactive: true },
            { illustration: '🏡', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'Lily had curly brown hair and a smile that could light up any room.', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'But lately, Lily felt a little lonely. All her friends were busy, and summer felt extra long.', interactive: false },
            { illustration: '🏡', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'Her house had a big backyard that her grandmother used to tend.', interactive: false },
            { illustration: '🌿', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'But now it was just wild grass and weeds. Grandma had moved away, and nobody took care of it anymore.', interactive: false },
            { illustration: '😢', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Lily missed her grandma. She missed the beautiful flowers that used to grow there.', interactive: false },
            { illustration: '☀️', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'One hot summer morning, Lily wandered into the forgotten backyard.', interactive: false },
            { illustration: '🌱', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'As she walked through the tall grass, something caught her eye - a tiny glowing <span class="interactive-element" data-sound="sparkle">seed 🌱</span>!', interactive: true },
            { illustration: '✨', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'The seed sparkled like a little star in the morning sun. It seemed to hum softly.', interactive: false },
            { illustration: '💭', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Lily picked it up carefully. "I wonder what you are?" she whispered.', interactive: false },

            // INCITING INCIDENT (Pages 11-15)
            { illustration: '📖', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'She remembered her grandma\'s old gardening book in the attic.', interactive: false },
            { illustration: '🏠', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Lily rushed inside and climbed up to the dusty attic.', interactive: false },
            { illustration: '📚', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'There it was - "Grandma Rose\'s Garden Guide" with pressed flowers on every page.', interactive: false },
            { illustration: '📖', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'She opened it, and a note fell out: "Dear Lily, when you\'re ready, the garden will show you its magic."', interactive: false },
            { illustration: '✨', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'The glowing seed pulsed brighter as Lily held it near the book. This was no ordinary seed!', interactive: false },

            // BEGINNING THE JOURNEY (Pages 16-25)
            { illustration: '🌱', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Following the book\'s instructions, Lily found the sunniest spot in the yard.', interactive: false },
            { illustration: '⛏️', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'She dug a small hole. The dirt felt warm and alive under her fingers.', interactive: false },
            { illustration: '🌱', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Gently, she placed the glowing seed in the earth and covered it with soft soil.', interactive: false },
            { illustration: '💧', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'She gave it <span class="interactive-element" data-sound="bubble">water 💧</span> from her grandma\'s old watering can.', interactive: true },
            { illustration: '🌙', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'That night, Lily could barely sleep. She kept thinking about the magic seed.', interactive: false },
            { illustration: '☀️', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'The next morning, she raced outside at sunrise.', interactive: false },
            { illustration: '😮', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Her eyes went wide - a tiny green sprout had already pushed through!', interactive: false },
            { illustration: '🌱', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: '"You grew overnight!" Lily gasped with joy.', interactive: false },
            { illustration: '💧', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Every morning, Lily watered her plant and talked to it.', interactive: false },
            { illustration: '📖', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'She read to it from her grandma\'s book. She told it about her day.', interactive: false },

            // GROWTH AND CHALLENGES (Pages 26-40)
            { illustration: '🌿', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Day by day, the sprout grew taller and stronger.', interactive: false },
            { illustration: '🌱', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Its leaves shimmered with a soft, magical glow.', interactive: false },
            { illustration: '⛅', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'But one day, dark clouds rolled in. A big storm was coming!', interactive: false },
            { illustration: '😰', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Lily worried. "My little plant is still so small. What if the storm hurts it?"', interactive: false },
            { illustration: '💭', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'She remembered what Grandma always said: "Plants are stronger than they look."', interactive: false },
            { illustration: '🌧️', background: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)', text: 'The storm came with thunder and rain. Lily watched from her window, worried.', interactive: false },
            { illustration: '⚡', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'Lightning flashed! Thunder boomed! The rain poured down!', interactive: false },
            { illustration: '🌙', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'Finally, the storm passed. Lily went to bed, hoping her plant was okay.', interactive: false },
            { illustration: '☀️', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'In the morning, sunshine filled her room.', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Lily rushed outside and gasped with amazement!', interactive: false },
            { illustration: '🌸', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Her plant had grown three feet tall! A beautiful <span class="interactive-element" data-sound="sparkle">flower bud 🌸</span> sat at the top!', interactive: true },
            { illustration: '💪', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: '"You made it through the storm! You\'re so strong!" Lily cheered.', interactive: false },
            { illustration: '🌺', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'The rainwater had helped it grow even faster. Nature was amazing!', interactive: false },
            { illustration: '📖', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'Lily opened her grandma\'s book to learn what to do next.', interactive: false },
            { illustration: '🌞', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'The book said: "Magic flowers need sunlight, water, and one special ingredient..."', interactive: false },

            // THE MAGIC UNFOLDS (Pages 41-55)
            { illustration: '❤️', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"...Love. Talk to your garden. Sing to it. Share your happiness."', interactive: false },
            { illustration: '🎵', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'So Lily sang to her flower every day. She sang her favorite songs.', interactive: false },
            { illustration: '🌸', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'The flower bud grew bigger and bigger, glowing brighter each day.', interactive: false },
            { illustration: '🌅', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'One magical sunrise, something incredible happened.', interactive: false },
            { illustration: '🌸', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'The flower <span class="interactive-element" data-sound="sparkle">bloomed ✨</span>! Petals unfolded like a rainbow!', interactive: true },
            { illustration: '✨', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'It wasn\'t just any flower - it was the most beautiful thing Lily had ever seen!', interactive: false },
            { illustration: '🌈', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)', text: 'The petals shimmered with all the colors of the <span class="interactive-element" data-sound="rainbow">rainbow 🌈</span>!', interactive: true },
            { illustration: '✨', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'But then, the magic truly began.', interactive: false },
            { illustration: '🌺', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Tiny seeds floated from the magic flower, glowing softly.', interactive: false },
            { illustration: '🌱', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'They drifted through the air and landed all around the yard.', interactive: false },
            { illustration: '✨', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Everywhere they touched the ground, new flowers instantly sprouted!', interactive: false },
            { illustration: '🌻', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'Golden <span class="interactive-element" data-sound="twinkle">sunflowers 🌻</span> tall as Lily!', interactive: true },
            { illustration: '🌷', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Pink <span class="interactive-element" data-sound="flutter">tulips 🌷</span> swaying gently!', interactive: true },
            { illustration: '🌹', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFB3D9 100%)', text: 'Red <span class="interactive-element" data-sound="sparkle">roses 🌹</span> with the sweetest smell!', interactive: true },
            { illustration: '💐', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'In minutes, the whole yard transformed into a magical garden!', interactive: false },

            // SHARING THE MAGIC (Pages 56-70)
            { illustration: '🦋', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Beautiful <span class="interactive-element" data-sound="flutter">butterflies 🦋</span> appeared, dancing between the flowers!', interactive: true },
            { illustration: '🐝', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'Happy <span class="interactive-element" data-sound="flutter">bees 🐝</span> buzzed from blossom to blossom!', interactive: true },
            { illustration: '🐞', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFB3D9 100%)', text: 'Friendly <span class="interactive-element" data-sound="calm">ladybugs 🐞</span> crawled on the leaves!', interactive: true },
            { illustration: '🎵', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'And then, Lily heard it - the flowers were humming! They made soft, gentle music!', interactive: false },
            { illustration: '😮', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"Hello, Lily," the flowers seemed to whisper. "Thank you for caring for us."', interactive: false },
            { illustration: '💖', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Lily\'s heart filled with joy. She had created something beautiful!', interactive: false },
            { illustration: '🏡', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'Her neighbors noticed the transformation. Word spread quickly!', interactive: false },
            { illustration: '👧', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Soon, her friends came to visit. "Lily! Your garden is amazing!"', interactive: false },
            { illustration: '👦', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Children from all over the neighborhood came to see the magic garden.', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Lily wasn\'t lonely anymore. Her garden had brought everyone together!', interactive: false },
            { illustration: '🧚', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: 'One evening, a tiny <span class="interactive-element" data-sound="magic">fairy 🧚</span> appeared among the roses!', interactive: true },
            { illustration: '✨', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: '"I am Flora, guardian of magical gardens," the fairy said softly.', interactive: false },
            { illustration: '🧚', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: '"You have proven yourself worthy, Lily. You showed patience, care, and love."', interactive: false },
            { illustration: '⭐', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"This garden will stay magical as long as you continue to care for it."', interactive: false },
            { illustration: '🦄', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)', text: 'Flora waved her wand, and a gentle <span class="interactive-element" data-sound="magic">unicorn 🦄</span> appeared!', interactive: true },
            { illustration: '🦄', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: 'The unicorn had a mane of rainbow colors and kind, gentle eyes.', interactive: false },
            { illustration: '🦄', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"This is Starlight," said Flora. "She will visit your garden when you need magic most."', interactive: false },
            { illustration: '✨', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)', text: 'Lily gently petted Starlight\'s soft nose. The unicorn nuzzled her hand.', interactive: false },
            { illustration: '📞', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'That night, Lily called her grandma on the phone.', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"Grandma! The magic seed you left me - it grew into the most amazing garden!"', interactive: false },
            { illustration: '❤️', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Grandma laughed warmly. "I knew you would understand its magic, my dear."', interactive: false },
            { illustration: '💕', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"The real magic wasn\'t the seed, Lily. It was your love and patience."', interactive: false },

            // CONCLUSION (Pages 71-80)
            { illustration: '🌸', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Every day after that, Lily tended her magic garden.', interactive: false },
            { illustration: '💧', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'She watered every plant with care.', interactive: false },
            { illustration: '🎵', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'She sang to the flowers every morning.', interactive: false },
            { illustration: '👧', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'She invited all her friends to play in the garden.', interactive: false },
            { illustration: '📚', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'She taught them what Grandma\'s book had taught her.', interactive: false },
            { illustration: '🌱', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Soon, magic gardens began growing all over the neighborhood!', interactive: false },
            { illustration: '🌈', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)', text: 'Every child learned that with patience and love, they could grow magic too.', interactive: false },
            { illustration: '🦄', background: 'linear-gradient(135deg, #F0E5FF 0%, #DCC8FF 100%)', text: 'Starlight the unicorn visited often, always when the children needed wonder most.', interactive: false },
            { illustration: '💖', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Lily learned that the best magic comes from caring for things with your whole heart.', interactive: false },
            { illustration: '🌸', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'And her magic garden bloomed brighter every single day. The End. 💖', interactive: false }
        ]
    },

    'space-adventure': {
        title: 'Emma\'s Space Adventure',
        pages: [
            // BEGINNING - Introduction (Pages 1-10)
            { illustration: '👧', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: '<span class="interactive-element" data-sound="hello">Emma 👧</span> loved looking at the stars every night.', interactive: true },
            { illustration: '🌟', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'She would lie in her backyard and wonder: "What\'s out there?"', interactive: false },
            { illustration: '📖', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'Emma read every book about space she could find at the library.', interactive: false },
            { illustration: '🌍', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'She lived in a small town where everyone knew each other on planet <span class="interactive-element" data-sound="calm">Earth 🌍</span>.', interactive: true },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'But Emma dreamed of adventure. She dreamed of exploring the cosmos!', interactive: false },
            { illustration: '🔭', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'Her grandfather had given her a telescope for her birthday.', interactive: false },
            { illustration: '⭐', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'Through it, she\'d seen Mars, Jupiter, and countless stars.', interactive: false },
            { illustration: '💭', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: '"I wish I could visit them," Emma whispered to the night sky.', interactive: false },
            { illustration: '🌠', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'That night, a shooting star streaked across the sky.', interactive: false },
            { illustration: '✨', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: 'Emma made a wish with all her heart: "I wish I could explore space!"', interactive: false },

            // THE MYSTERIOUS GIFT (Pages 11-20)
            { illustration: '☀️', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'The next morning, Emma found something incredible in her backyard.', interactive: false },
            { illustration: '🚀', background: 'linear-gradient(135deg, #C0C0C0 0%, #A8A8A8 100%)', text: 'A small, shiny <span class="interactive-element" data-sound="rocket">rocket ship 🚀</span> sat there, gleaming in the sunlight!', interactive: true },
            { illustration: '😮', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'It was silver with blue stripes, just big enough for one person.', interactive: false },
            { illustration: '✉️', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'A note was attached: "For the brave explorer - Your adventure awaits!"', interactive: false },
            { illustration: '❓', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Emma looked around. Who could have left this?', interactive: false },
            { illustration: '🚀', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: 'She approached the rocket carefully. A door slid open with a soft whoosh.', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Inside was a perfect pilot\'s seat, with buttons and screens that glowed softly.', interactive: false },
            { illustration: '📋', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'On the dashboard was a simple instruction manual: "Think of where you want to go."', interactive: false },
            { illustration: '💭', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Emma\'s heart raced. Could this really take her to space?', interactive: false },
            { illustration: '😰', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'She felt nervous. Space was so big, so unknown. What if she got lost?', interactive: false },

            // OVERCOMING FEAR (Pages 21-30)
            { illustration: '💪', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'But Emma remembered what her grandfather always said: "Brave doesn\'t mean not scared."', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: '"Brave means doing it anyway!" Emma said out loud.', interactive: false },
            { illustration: '🚀', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: 'She climbed into the rocket and sat in the pilot\'s seat.', interactive: false },
            { illustration: '💺', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: 'The seatbelt clicked around her. The screens lit up with friendly colors.', interactive: false },
            { illustration: '🌟', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'Emma closed her eyes and thought: "Take me to the stars!"', interactive: false },
            { illustration: '⏰', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: 'The rocket hummed to life. "Countdown initiated: 10... 9... 8..."', interactive: false },
            { illustration: '🚀', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: '"7... 6... 5... 4..."', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Emma took a deep breath. "3... 2... 1..."', interactive: false },
            { illustration: '🚀', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: '<span class="interactive-element" data-sound="rocket">BLAST OFF! 🚀</span>', interactive: true },
            { illustration: '☁️', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'The rocket shot upward! Emma watched her house get smaller and smaller!', interactive: false },

            // JOURNEY BEGINS (Pages 31-45)
            { illustration: '🌤️', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'They zoomed through fluffy white clouds!', interactive: false },
            { illustration: '🌍', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'Soon Earth became a beautiful blue marble below.', interactive: false },
            { illustration: '😮', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: '"Wow," Emma breathed. "Earth is so beautiful from up here!"', interactive: false },
            { illustration: '⭐', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'Stars appeared all around her - millions and millions of them!', interactive: false },
            { illustration: '🌟', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: 'They weren\'t just tiny dots anymore. They were brilliant, shining suns!', interactive: false },
            { illustration: '🌙', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'The rocket floated past the <span class="interactive-element" data-sound="twinkle">moon 🌙</span>!', interactive: true },
            { illustration: '🌙', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: 'Emma could see its craters and mountains up close!', interactive: false },
            { illustration: '👋', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'She waved at the moon. "Hello, moon! You\'re amazing!"', interactive: false },
            { illustration: '📡', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: 'Suddenly, the rocket\'s communicator beeped. A message was coming in!', interactive: false },
            { illustration: '📻', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: 'A friendly voice said: "Hello, Earth traveler! Welcome to space!"', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: '"H-Hello?" Emma said nervously. "Who are you?"', interactive: false },
            { illustration: '📻', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: '"I am Zorp! Would you like to visit my planet? We love visitors!"', interactive: false },
            { illustration: '💭', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Emma felt excited and nervous. Meeting aliens? A real alien planet?', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: '"Yes, please!" she said. "I\'d love to visit!"', interactive: false },
            { illustration: '🚀', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: '"Follow my signal!" Zorp said cheerfully. The rocket adjusted course.', interactive: false },

            // MEETING ZORP (Pages 46-60)
            { illustration: '💫', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: 'Emma flew past shooting <span class="interactive-element" data-sound="sparkle">stars 💫</span>!', interactive: true },
            { illustration: '🪐', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: 'She saw a beautiful planet with purple rings ahead!', interactive: false },
            { illustration: '🪐', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: 'The <span class="interactive-element" data-sound="rainbow">planet 🪐</span> sparkled like a giant gem in space!', interactive: true },
            { illustration: '🚀', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: 'The rocket gently landed on a soft, purple surface.', interactive: false },
            { illustration: '😮', background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)', text: 'Emma stepped out. The ground felt bouncy, like walking on a cloud!', interactive: false },
            { illustration: '👽', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: 'A friendly <span class="interactive-element" data-sound="hello">alien 👽</span> bounced toward her!', interactive: true },
            { illustration: '👽', background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)', text: 'Zorp was green with three friendly eyes and a huge smile!', interactive: false },
            { illustration: '👋', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: '"Welcome to Planet Zephyr!" Zorp said, waving all four arms!', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: '"Hi! I\'m Emma!" she said, a bit shy but excited.', interactive: false },
            { illustration: '🌈', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)', text: 'Zorp showed her around. The planet had rainbow-colored trees!', interactive: false },
            { illustration: '💧', background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)', text: 'Rivers of purple water flowed upward instead of down!', interactive: false },
            { illustration: '🌸', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Flowers that sang gentle melodies grew everywhere!', interactive: false },
            { illustration: '👽', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: '"Come meet my friends!" Zorp said enthusiastically.', interactive: false },
            { illustration: '👽', background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)', text: 'Beep bounced over - a small purple alien with four arms!', interactive: false },
            { illustration: '👽', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: 'Then came Bloop, who could change colors like a rainbow!', interactive: false },

            // CULTURAL EXCHANGE (Pages 61-75)
            { illustration: '😊', background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)', text: 'The aliens were curious about Emma. "What\'s Earth like?" they asked.', interactive: false },
            { illustration: '🌍', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Emma told them about oceans, mountains, and forests.', interactive: false },
            { illustration: '🐕', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'She told them about dogs and cats and all Earth\'s animals.', interactive: false },
            { illustration: '👽', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: 'The aliens listened with wonder. "Your planet sounds amazing!"', interactive: false },
            { illustration: '🎵', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Zorp said, "Let us share our culture too! We love to <span class="interactive-element" data-sound="twinkle">sing 🎵</span>!"', interactive: true },
            { illustration: '🎶', background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)', text: 'The aliens sang a beautiful space song in harmony!', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Emma clapped along, laughing with joy!', interactive: false },
            { illustration: '💃', background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)', text: 'They taught her a space dance - bouncing and spinning in low gravity!', interactive: false },
            { illustration: '🍪', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Zorp brought out space cookies shaped like stars!', interactive: false },
            { illustration: '⭐', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'They tasted like honey and cinnamon and sunshine all at once!', interactive: false },
            { illustration: '🎨', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Beep showed Emma how to paint with floating, glowing colors!', interactive: false },
            { illustration: '🌈', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)', text: 'Together they created beautiful art that floated in the air!', interactive: false },
            { illustration: '📚', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Bloop shared stories of space exploration and distant galaxies.', interactive: false },
            { illustration: '⏰', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: 'Hours passed like minutes. Emma was having the best time!', interactive: false },
            { illustration: '🌅', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'But then she noticed Planet Zephyr\'s three suns starting to set.', interactive: false },

            // THE HARD GOODBYE (Pages 76-85)
            { illustration: '😢', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Emma\'s rocket beeped. "Time to return home," it said gently.', interactive: false },
            { illustration: '😰', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Emma\'s eyes filled with tears. She didn\'t want to leave her new friends!', interactive: false },
            { illustration: '👽', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: 'Zorp saw her sadness. "Don\'t be sad, Emma. You can visit anytime!"', interactive: false },
            { illustration: '💝', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Beep gave Emma a gift - a small, glowing crystal.', interactive: false },
            { illustration: '✨', background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)', text: '"This crystal will let your rocket find us whenever you wish to visit!"', interactive: false },
            { illustration: '🎁', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Bloop gave her a book of space stories written in universal language.', interactive: false },
            { illustration: '💖', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"Real friends stay connected across any distance," Zorp said wisely.', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Emma smiled through her tears. "I\'ll come back soon! I promise!"', interactive: false },
            { illustration: '👋', background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)', text: 'All the aliens gathered to wave goodbye!', interactive: false },
            { illustration: '🚀', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: 'Emma climbed back into her rocket, holding the crystal tight.', interactive: false },

            // JOURNEY HOME (Pages 86-95)
            { illustration: '🚀', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: 'The rocket lifted off gently. Emma looked back at her new friends.', interactive: false },
            { illustration: '👋', background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)', text: 'They were all waving with all their arms! She waved back.', interactive: false },
            { illustration: '🌟', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'As the rocket flew through space, Emma thought about everything she\'d learned.', interactive: false },
            { illustration: '💭', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'She learned that being brave meant trying new things, even when you\'re scared.', interactive: false },
            { illustration: '🌈', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFE66D 100%)', text: 'She learned that friends can be different from you in every way.', interactive: false },
            { illustration: '💖', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'And that kindness is the same language everywhere in the universe.', interactive: false },
            { illustration: '🌍', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'Soon, <span class="interactive-element" data-sound="calm">Earth 🌍</span> appeared ahead!', interactive: true },
            { illustration: '🏠', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Her little town looked so cozy and familiar.', interactive: false },
            { illustration: '🚀', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: 'The rocket landed gently in her backyard, right where it had started.', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Emma stepped out. The grass felt soft under her feet. She was home!', interactive: false },

            // EPILOGUE (Pages 96-100)
            { illustration: '🌙', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'That night, Emma looked up at the stars again.', interactive: false },
            { illustration: '✨', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'But now she knew - they weren\'t just distant lights anymore.', interactive: false },
            { illustration: '👽', background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)', text: 'One of those stars was where her friends lived!', interactive: false },
            { illustration: '💎', background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)', text: 'She held the crystal. It glowed softly, pulsing like a heartbeat.', interactive: false },
            { illustration: '📖', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'Emma started writing in her journal about her adventure.', interactive: false },
            { illustration: '✍️', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'She would share these stories at school. Maybe inspire other kids to dream big!', interactive: false },
            { illustration: '🚀', background: 'linear-gradient(135deg, #1E3A8A 0%, #4C1D95 100%)', text: 'The rocket sat in her yard, ready for the next adventure.', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Emma knew she would visit Zorp and friends again very soon.', interactive: false },
            { illustration: '🌟', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'Because the universe was full of wonders, and she was brave enough to explore them.', interactive: false },
            { illustration: '💖', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'And that was the best feeling in the whole galaxy. The End! 🚀', interactive: false }
        ]
    },

    'ocean-friends': {
        title: 'Ocean Friends',
        pages: [
            // BEGINNING - Introduction (Pages 1-8)
            { illustration: '👧', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Meet <span class="interactive-element" data-sound="hello">Maya 👧</span>, a curious girl who lived by the sea.', interactive: true },
            { illustration: '🏖️', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'Every morning, Maya would walk along the sandy beach collecting shells.', interactive: false },
            { illustration: '🌊', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'The <span class="interactive-element" data-sound="splash">ocean 🌊</span> called to her with its gentle waves.', interactive: true },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'But Maya was a little afraid of going into the deep water.', interactive: false },
            { illustration: '💭', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: '"What if I can\'t swim well enough?" she worried. "What if I get lost?"', interactive: false },
            { illustration: '👴', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'Her grandpa was a fisherman who knew the ocean like an old friend.', interactive: false },
            { illustration: '⛵', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: '"The ocean is full of wonders, Maya," he would say. "Don\'t be afraid."', interactive: false },
            { illustration: '🌅', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'One beautiful sunrise, something magical happened.', interactive: false },

            // THE MYSTERIOUS MESSAGE (Pages 9-15)
            { illustration: '🐚', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Maya found an unusual <span class="interactive-element" data-sound="sparkle">shell 🐚</span> - it glowed with soft rainbow colors!', interactive: true },
            { illustration: '✨', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'When she held it to her ear, she heard more than ocean sounds.', interactive: false },
            { illustration: '🎵', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'She heard a gentle voice singing: "Come visit us beneath the waves..."', interactive: false },
            { illustration: '😮', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Maya gasped! "Did that shell just... talk to me?"', interactive: false },
            { illustration: '🌊', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'She looked at the ocean. The waves seemed to sparkle invitingly.', interactive: false },
            { illustration: '💭', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Maya felt scared but also... excited! This was an adventure calling!', interactive: false },
            { illustration: '👣', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'She took a deep breath and walked toward the water.', interactive: false },

            // MEETING THE OCEAN FRIENDS (Pages 16-28)
            { illustration: '🌊', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'As soon as her toes touched the water, something amazing happened!', interactive: false },
            { illustration: '✨', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'A gentle bubble surrounded her - she could breathe underwater!', interactive: false },
            { illustration: '😮', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Maya didn\'t feel scared anymore. The bubble felt safe and warm.', interactive: false },
            { illustration: '🐠', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFB3D9 100%)', text: 'A colorful <span class="interactive-element" data-sound="bubble">fish 🐠</span> swam up to her!', interactive: true },
            { illustration: '🐠', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: '"Hello! I\'m Finn! We\'ve been waiting for you!" the fish said cheerfully.', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: '"You can... talk?" Maya asked in wonder.', interactive: false },
            { illustration: '🐠', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFB3D9 100%)', text: '"Of course! All sea creatures can talk. Humans just usually can\'t hear us!"', interactive: false },
            { illustration: '🐢', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'A wise old <span class="interactive-element" data-sound="calm">turtle 🐢</span> floated by slowly.', interactive: true },
            { illustration: '🐢', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: '"Welcome, young one. I am Shelly, and I\'ve lived in these waters for 100 years."', interactive: false },
            { illustration: '🐙', background: 'linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)', text: 'An <span class="interactive-element" data-sound="bubble">octopus 🐙</span> waved all eight arms in greeting!', interactive: true },
            { illustration: '🐙', background: 'linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)', text: '"I\'m Oliver! Would you like a tour of our underwater world?"', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Maya\'s fear melted away. These creatures were so friendly!', interactive: false },
            { illustration: '🌊', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: '"Yes, please! I\'d love to see your world!" Maya said excitedly.', interactive: false },

            // EXPLORING THE OCEAN (Pages 29-42)
            { illustration: '🐠', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Finn led the way, swimming in playful loops.', interactive: false },
            { illustration: '🪸', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFB3D9 100%)', text: 'They passed beautiful <span class="interactive-element" data-sound="sparkle">coral reefs 🪸</span> in every color!', interactive: true },
            { illustration: '🐡', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'Pufferfish puffed up to say hello, making Maya giggle!', interactive: false },
            { illustration: '🦀', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: 'A friendly <span class="interactive-element" data-sound="crack">crab 🦀</span> scuttled along the ocean floor.', interactive: true },
            { illustration: '🐚', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Giant shells opened and closed, revealing pearls inside!', interactive: false },
            { illustration: '🌊', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Schools of fish moved together like underwater dancers.', interactive: false },
            { illustration: '🐬', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Suddenly, a <span class="interactive-element" data-sound="twinkle">dolphin 🐬</span> jumped nearby!', interactive: true },
            { illustration: '🐬', background: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)', text: '"Hi Maya! I\'m Splash! Want to race?" the dolphin asked playfully.', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Maya laughed. "You\'ll definitely win! But let\'s try!"', interactive: false },
            { illustration: '🌊', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'They swam together, Maya\'s magical bubble helping her glide smoothly.', interactive: false },
            { illustration: '🦈', background: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)', text: 'A large shadow appeared. Maya felt nervous - was it a <span class="interactive-element" data-sound="calm">shark 🦈</span>?', interactive: true },
            { illustration: '🦈', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'It WAS a shark! But he had the kindest eyes.', interactive: false },
            { illustration: '🦈', background: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)', text: '"Don\'t be frightened. I\'m Bruce, and I only eat fish - never friends!"', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Maya learned that not everything that seems scary actually is!', interactive: false },

            // THE PROBLEM DISCOVERED (Pages 43-52)
            { illustration: '🐢', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'Shelly the turtle gathered everyone. "Maya, we need your help."', interactive: false },
            { illustration: '🗑️', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: '"Our ocean home is getting filled with trash from the land."', interactive: false },
            { illustration: '😢', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Maya saw plastic bags floating by like jellyfish. Some fish were tangled in nets.', interactive: false },
            { illustration: '💔', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Her heart broke. "This is terrible! How can I help?"', interactive: false },
            { illustration: '🐢', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'Shelly said wisely, "You can tell the people on land about us."', interactive: false },
            { illustration: '🐠', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFB3D9 100%)', text: 'Finn added, "Help them understand that the ocean is our home."', interactive: false },
            { illustration: '💭', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Maya thought hard. She wanted to help her new friends!', interactive: false },
            { illustration: '💡', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: '"I have an idea! I\'ll organize a beach cleanup with my friends!"', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"And I\'ll teach them about ocean life! About all of you!"', interactive: false },
            { illustration: '🐙', background: 'linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)', text: 'Oliver the octopus clapped all his arms. "That\'s wonderful!"', interactive: false },

            // LEARNING OCEAN WISDOM (Pages 53-63)
            { illustration: '🐢', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'Shelly taught Maya about the ocean ecosystem.', interactive: false },
            { illustration: '🌊', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: '"Every creature here has an important job. We all depend on each other."', interactive: false },
            { illustration: '🪸', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFB3D9 100%)', text: '"Coral reefs are homes for thousands of species."', interactive: false },
            { illustration: '🦀', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: '"Crabs clean the ocean floor."', interactive: false },
            { illustration: '🐋', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: '"Whales help mix the ocean waters, bringing nutrients up from below."', interactive: false },
            { illustration: '🦈', background: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)', text: '"Even sharks keep the ocean healthy by maintaining balance."', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Maya listened carefully, memorizing everything.', interactive: false },
            { illustration: '🐬', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Splash the dolphin showed her how dolphins work together as families.', interactive: false },
            { illustration: '💖', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"We take care of each other," Splash explained. "That\'s what makes us strong."', interactive: false },
            { illustration: '🐙', background: 'linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)', text: 'Oliver demonstrated his amazing camouflage abilities!', interactive: false },
            { illustration: '🎨', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'He changed colors to match the coral, then the sand, then became purple with polka dots!', interactive: false },

            // THE OCEAN CELEBRATION (Pages 64-72)
            { illustration: '🎉', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'That evening, the ocean creatures threw a <span class="interactive-element" data-sound="sparkle">celebration 🎉</span> for Maya!', interactive: true },
            { illustration: '🐠', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Fish of every color swirled in beautiful patterns!', interactive: false },
            { illustration: '🎵', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Whales <span class="interactive-element" data-sound="twinkle">sang 🎵</span> their haunting, beautiful songs!', interactive: true },
            { illustration: '🐚', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Shells opened and closed in rhythm, making clicking music!', interactive: false },
            { illustration: '💫', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Bioluminescent plankton lit up like underwater <span class="interactive-element" data-sound="sparkle">stars 💫</span>!', interactive: true },
            { illustration: '🦑', background: 'linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)', text: 'A giant squid created glowing ink patterns in the water - underwater fireworks!', interactive: false },
            { illustration: '🐢', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'Shelly spoke: "Maya, you are now a Guardian of the Ocean."', interactive: false },
            { illustration: '🐚', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'They gave her the magic shell to keep. "It will always connect you to us."', interactive: false },
            { illustration: '💖', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Maya hugged them all (which is tricky underwater!).', interactive: false },

            // RETURNING HOME WITH PURPOSE (Pages 73-80)
            { illustration: '🌅', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'As sunset approached, Maya knew it was time to go home.', interactive: false },
            { illustration: '😢', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: '"I\'ll miss you all so much!" she said, tears mixing with the sea.', interactive: false },
            { illustration: '🐠', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFB3D9 100%)', text: '"We\'ll see you again!" Finn promised. "The ocean is always here."', interactive: false },
            { illustration: '🌊', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'The bubble gently carried Maya back to shore.', interactive: false },
            { illustration: '🏖️', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'She stepped onto the warm sand, the shell safe in her hand.', interactive: false },
            { illustration: '💪', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Maya ran home with a mission in her heart!', interactive: false },
            { illustration: '📱', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'She called all her friends. "We need to organize a beach cleanup!"', interactive: false },
            { illustration: '👧', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'She told them about her ocean friends (though some didn\'t quite believe her).', interactive: false },
            { illustration: '🗑️', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'That weekend, 50 kids came to clean the beach!', interactive: false },
            { illustration: '♻️', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'They collected trash, learned about recycling, and protected the ocean.', interactive: false },

            // EPILOGUE (Pages 81-85)
            { illustration: '🌅', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'Every morning after that, Maya visited the beach.', interactive: false },
            { illustration: '🐚', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'She would hold the magic shell and hear her friends singing.', interactive: false },
            { illustration: '🏫', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'At school, she started an Ocean Club to teach others.', interactive: false },
            { illustration: '🌊', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'She was no longer afraid of the ocean - she was its friend and protector.', interactive: false },
            { illustration: '💖', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'And the ocean creatures were so happy to have a friend on land. The End! 🌊', interactive: false }
        ]
    },

    'forest-animals': {
        title: 'Forest Friends',
        pages: [
            // BEGINNING - Introduction (Pages 1-8)
            { illustration: '👦', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: '<span class="interactive-element" data-sound="hello">Ben 👦</span> loved exploring, but he\'d never been deep into the forest.', interactive: true },
            { illustration: '🌲', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'The tall <span class="interactive-element" data-sound="calm">trees 🌲</span> near his house seemed mysterious and a little scary.', interactive: true },
            { illustration: '👨', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'His dad was a park ranger. "The forest is full of life," he\'d say.', interactive: false },
            { illustration: '💭', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'But Ben worried: "What if I get lost? What if I meet a dangerous animal?"', interactive: false },
            { illustration: '🏡', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'He preferred staying in his backyard where everything felt safe.', interactive: false },
            { illustration: '☀️', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'One sunny Saturday, Ben\'s ball bounced away... right into the forest!', interactive: false },
            { illustration: '⚽', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'It rolled deeper and deeper between the trees.', interactive: false },
            { illustration: '😰', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Ben stood at the forest edge. Should he go in?', interactive: false },

            // THE BRAVE DECISION (Pages 9-15)
            { illustration: '💪', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Ben took a deep breath. "I can do this. It\'s just a forest."', interactive: false },
            { illustration: '🌲', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'He stepped between the trees. The sunlight filtered through leaves.', interactive: false },
            { illustration: '🌿', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Everything smelled fresh - like pine and earth and adventure.', interactive: false },
            { illustration: '🐿️', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'A <span class="interactive-element" data-sound="flutter">squirrel 🐿️</span> chattered from a branch above!', interactive: true },
            { illustration: '⚽', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Ben followed the path his ball had made in the leaves.', interactive: false },
            { illustration: '🌲', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'The trees grew thicker. The forest was quiet except for birds singing.', interactive: false },
            { illustration: '❓', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Then Ben realized - he couldn\'t see his house anymore. Was he lost?', interactive: false },

            // MEETING THE FOREST FRIENDS (Pages 16-30)
            { illustration: '🦊', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: 'Suddenly, a beautiful <span class="interactive-element" data-sound="fox">fox 🦊</span> appeared!', interactive: true },
            { illustration: '🦊', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: 'She had bright orange fur and intelligent eyes.', interactive: false },
            { illustration: '😮', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Ben froze. But the fox just tilted her head curiously.', interactive: false },
            { illustration: '🦊', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: '"Lost, are you?" the fox said. "I\'m Fern. Don\'t be frightened."', interactive: false },
            { illustration: '😮', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Ben blinked. "You... you can talk?"', interactive: false },
            { illustration: '🦊', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: 'Fern laughed - a sound like wind chimes. "In the deep forest, magic is real."', interactive: false },
            { illustration: '🐻', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'A large <span class="interactive-element" data-sound="bear">bear 🐻</span> emerged from behind a tree!', interactive: true },
            { illustration: '😰', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Ben\'s heart raced. A bear! His biggest fear!', interactive: false },
            { illustration: '🐻', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'But the bear smiled gently. "Hello, little one. I\'m Boris. Welcome!"', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Ben realized - this bear wasn\'t scary at all! He was kind!', interactive: false },
            { illustration: '🦌', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'A graceful <span class="interactive-element" data-sound="calm">deer 🦌</span> stepped delicately through the ferns.', interactive: true },
            { illustration: '🦌', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: '"I am Diana," she said softly. "We don\'t often have human visitors."', interactive: false },
            { illustration: '🦉', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'An <span class="interactive-element" data-sound="owl">owl 🦉</span> hooted from above. "Who? Who? A new friend!"', interactive: true },
            { illustration: '🦉', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: '"I\'m Oliver the Owl, wisest in the woods!" he said proudly.', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Ben\'s fear melted away. These animals were wonderful!', interactive: false },

            // LEARNING ABOUT THE FOREST (Pages 31-45)
            { illustration: '🦊', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: '"Looking for this?" Fern nudged Ben\'s ball with her nose.', interactive: false },
            { illustration: '⚽', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: '"Yes! Thank you!" Ben was so relieved!', interactive: false },
            { illustration: '🦉', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: '"Before you go," said Oliver, "would you like to learn about our forest?"', interactive: false },
            { illustration: '💭', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Ben thought about it. His parents might worry... but this was amazing!', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"Yes, please! But can you help me find my way home later?"', interactive: false },
            { illustration: '🦊', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: '"Of course! We know every tree and trail," Fern promised.', interactive: false },
            { illustration: '🌲', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'The animals showed Ben the ancient trees - some 200 years old!', interactive: false },
            { illustration: '🌿', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Diana explained how plants and animals depend on each other.', interactive: false },
            { illustration: '🐝', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: '"<span class="interactive-element" data-sound="flutter">Bees 🐝</span> pollinate flowers. Flowers feed bees. It\'s teamwork!"', interactive: true },
            { illustration: '🐻', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Boris showed Ben berry bushes. "I eat berries and spread seeds. New bushes grow!"', interactive: false },
            { illustration: '🦊', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: 'Fern demonstrated hunting - but only for food, never for sport.', interactive: false },
            { illustration: '🦉', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Oliver explained the food chain and why every creature matters.', interactive: false },
            { illustration: '🌳', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: '"Even fallen trees become homes for insects, which feed birds!"', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Ben was amazed. The forest was like a huge, living family!', interactive: false },
            { illustration: '🐿️', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Squirrels showed him their acorn storage - preparing for winter.', interactive: false },

            // THE FOREST\'S PROBLEM (Pages 46-55)
            { illustration: '😢', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'But then the animals showed Ben something sad.', interactive: false },
            { illustration: '🗑️', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'In a clearing, someone had dumped garbage.', interactive: false },
            { illustration: '💔', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Plastic bottles, cans, and trash littered the beautiful forest floor.', interactive: false },
            { illustration: '🦌', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Diana said sadly, "Sometimes humans forget we live here too."', interactive: false },
            { illustration: '🐻', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Boris showed where a cub got cut on broken glass.', interactive: false },
            { illustration: '😰', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Ben felt terrible. "I\'m so sorry! Not all humans are like this!"', interactive: false },
            { illustration: '💪', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"I want to help clean this up! Will you show me what else needs fixing?"', interactive: false },
            { illustration: '🦊', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: 'Fern\'s eyes brightened. "You would do that for us?"', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"Of course! The forest is everyone\'s home. We should protect it!"', interactive: false },
            { illustration: '🦉', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Oliver hooted wisely, "This is why we showed ourselves to you, Ben."', interactive: false },

            // WORKING TOGETHER (Pages 56-68)
            { illustration: '🤝', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Ben and the animals worked together to clean the clearing.', interactive: false },
            { illustration: '🗑️', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'Ben collected trash while Boris dug a hole for burying what could decompose.', interactive: false },
            { illustration: '🦊', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: 'Fern and Diana pushed larger items to help Ben carry them.', interactive: false },
            { illustration: '🐿️', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Squirrels found small pieces of litter in hard-to-reach places.', interactive: false },
            { illustration: '💪', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'It took hours, but together they made a difference!', interactive: false },
            { illustration: '🌳', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'The clearing looked beautiful again!', interactive: false },
            { illustration: '🦉', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: '"Now," said Oliver, "let me teach you forest wisdom."', interactive: false },
            { illustration: '🌲', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: '"Always leave nature better than you found it."', interactive: false },
            { illustration: '🦌', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: '"Take only memories, leave only footprints," Diana added.', interactive: false },
            { illustration: '🦊', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: '"Respect all living things, big and small," taught Fern.', interactive: false },
            { illustration: '🐻', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Boris said, "And remember - what hurts one part of nature hurts all of it."', interactive: false },
            { illustration: '💖', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Ben felt like he\'d learned more today than in months of school!', interactive: false },
            { illustration: '🌿', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'The animals gave Ben a special gift - an acorn.', interactive: false },

            // THE MAGICAL ACORN (Pages 69-77)
            { illustration: '🌰', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'But this wasn\'t any <span class="interactive-element" data-sound="sparkle">acorn 🌰</span> - it glowed softly!', interactive: true },
            { illustration: '✨', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: '"This is a friendship acorn," explained Diana.', interactive: false },
            { illustration: '🌰', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: '"Hold it when you enter the forest, and you\'ll always be able to talk to us!"', interactive: false },
            { illustration: '🌱', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: '"Or plant it and grow a tree that connects our worlds," added Boris.', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Ben held the acorn carefully. "Thank you! This is the best gift ever!"', interactive: false },
            { illustration: '🌅', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'The sun was starting to set. Time to go home!', interactive: false },
            { illustration: '🦊', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: 'Fern led the way through the trees, taking a special path.', interactive: false },
            { illustration: '🌲', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: '"This is the shortest way. We\'ll have you home in minutes!"', interactive: false },
            { illustration: '🏡', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'Soon, Ben could see his house through the trees!', interactive: false },

            // SAYING GOODBYE AND NEW BEGINNINGS (Pages 78-85)
            { illustration: '👋', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'At the forest edge, Ben hugged each of his new friends.', interactive: false },
            { illustration: '🦊', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: '"Come back soon!" said Fern, nuzzling his hand.', interactive: false },
            { illustration: '🐻', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: '"You\'re always welcome here," Boris said warmly.', interactive: false },
            { illustration: '🦌', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: '"You\'re one of us now - a Forest Friend," Diana smiled.', interactive: false },
            { illustration: '🦉', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Oliver called from above: "Remember what you\'ve learned!"', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Ben ran home, ball in one hand, magic acorn in the other.', interactive: false },
            { illustration: '👨', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'His dad was on the porch. "There you are! Were you in the forest?"', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"Yes! And Dad, it\'s amazing! Can I tell you all about it?"', interactive: false },

            // EPILOGUE (Pages 86-92)
            { illustration: '🌱', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'That night, Ben and his dad planted the magic acorn in their yard.', interactive: false },
            { illustration: '🌳', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Over time, it grew into a beautiful oak tree.', interactive: false },
            { illustration: '🏫', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Ben started a Nature Club at school.', interactive: false },
            { illustration: '👧', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'He taught his friends about protecting forests and wildlife.', interactive: false },
            { illustration: '🌲', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Every weekend, Ben visited his forest friends.', interactive: false },
            { illustration: '🦊', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: 'They had countless adventures together.', interactive: false },
            { illustration: '💚', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'And Ben was never afraid of the forest again - it was home. The End! 🌲', interactive: false }
        ]
    },

    'dinosaur-day': {
        title: 'Dinosaur Day',
        pages: [
            // BEGINNING - Introduction (Pages 1-8)
            { illustration: '👧', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: '<span class="interactive-element" data-sound="hello">Ruby 👧</span> was dinosaur-obsessed!', interactive: true },
            { illustration: '🦕', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'She had dinosaur toys, books, posters - everything <span class="interactive-element" data-sound="dino">dinosaur 🦕</span>!', interactive: true },
            { illustration: '📚', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'She knew all their names: Tyrannosaurus, Triceratops, Stegosaurus!', interactive: false },
            { illustration: '💭', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'But Ruby had one big wish: "I wish I could meet a REAL dinosaur!"', interactive: false },
            { illustration: '🏛️', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Her class was going to the natural history museum tomorrow.', interactive: false },
            { illustration: '🦴', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'They would see dinosaur fossils - bones from millions of years ago!', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Ruby could barely contain her excitement!', interactive: false },
            { illustration: '🌙', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'That night, she dreamed of dinosaurs.', interactive: false },

            // THE MUSEUM VISIT (Pages 9-18)
            { illustration: '🏛️', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'The next day, Ruby\'s class arrived at the huge museum.', interactive: false },
            { illustration: '😮', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'The dinosaur hall was ENORMOUS!', interactive: false },
            { illustration: '🦴', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'Giant skeletons towered overhead!', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: 'A <span class="interactive-element" data-sound="roar">T-Rex 🦖</span> skeleton stood in the center, mouth open in a silent roar!', interactive: true },
            { illustration: '👨', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'The museum guide explained: "These creatures lived 65 million years ago..."', interactive: false },
            { illustration: '💭', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Ruby wandered away from her group, fascinated by each display.', interactive: false },
            { illustration: '🥚', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'She found a special exhibit: "Dinosaur Eggs - Touch Replica!"', interactive: false },
            { illustration: '🥚', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'Ruby touched the egg-shaped stone. It felt warm and tingly!', interactive: false },
            { illustration: '✨', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Suddenly, the egg <span class="interactive-element" data-sound="sparkle">glowed ✨</span>!', interactive: true },
            { illustration: '💫', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'The room spun! Colors swirled! Ruby felt like she was falling through time!', interactive: false },

            // ARRIVAL IN THE DINOSAUR ERA (Pages 19-28)
            { illustration: '🌴', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'When Ruby opened her eyes, everything had changed!', interactive: false },
            { illustration: '🌋', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: 'She stood in a prehistoric jungle! A volcano smoked in the distance!', interactive: false },
            { illustration: '🌿', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Giant ferns and plants she\'d never seen grew everywhere!', interactive: false },
            { illustration: '😮', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"Where am I?!" Ruby gasped. "When am I?!"', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'Then she saw it - a REAL <span class="interactive-element" data-sound="dino">dinosaur 🦕</span>!', interactive: true },
            { illustration: '🦕', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'A gentle Brachiosaurus munched leaves from a tall tree!', interactive: false },
            { illustration: '😮', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Ruby stood frozen. A real dinosaur! Her dream come true!', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'The Brachiosaurus looked down at her gently.', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"Hello, little one," it said in a deep, kind voice. "I\'m Bella."', interactive: false },
            { illustration: '😮', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Ruby found her voice. "You can talk! And... I\'m in dinosaur times!"', interactive: false },

            // MEETING THE DINOSAUR HERD (Pages 29-42)
            { illustration: '🦕', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'Bella nodded her long neck. "The magic egg brought you here."', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: '"Don\'t worry! Most of us are friendly!" Bella reassured her.', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: '"Come meet my herd!"', interactive: false },
            { illustration: '🌿', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Ruby carefully followed the enormous dinosaur through the jungle.', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'In a clearing, she met other long-necked dinosaurs.', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'There was Arlo, a young Brachiosaurus who loved to play!', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'And Grandpa Gus, the oldest and wisest of the herd.', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: 'Then Ruby met Terry the <span class="interactive-element" data-sound="roar">Triceratops 🦖</span>!', interactive: true },
            { illustration: '🦖', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'He had three impressive horns and a huge frill.', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: '"These horns look scary, but I only use them to protect my family!" Terry explained.', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'A Stegosaurus named Spike waddled over.', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: '"I like your enthusiasm!" Spike said, plates on his back gleaming in the sun.', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Little Pteranodons flew overhead, calling out greetings!', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Ruby was surrounded by dinosaurs - and they were all so kind!', interactive: false },

            // LEARNING ABOUT DINOSAUR LIFE (Pages 43-58)
            { illustration: '🌿', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Bella showed Ruby how they lived millions of years ago.', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: '"We herbivores eat plants all day. It takes a lot to fill us up!"', interactive: false },
            { illustration: '🌳', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Ruby watched Bella strip leaves from the tallest trees.', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: 'Terry explained: "We dinosaurs take care of each other."', interactive: false },
            { illustration: '🥚', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: '"We protect our eggs and babies together."', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'Grandpa Gus shared ancient wisdom: "Everything in nature is connected."', interactive: false },
            { illustration: '🌍', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: '"We eat plants. Carnivores eat us. When we die, we feed the earth. It\'s the circle of life."', interactive: false },
            { illustration: '🌿', background: 'linear-gradient(135deg, #E8FFE0 0%, #C8E6C9 100%)', text: 'Arlo showed Ruby how to find the juiciest ferns!', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: '"We work as a team. The herd is our family!" Arlo said happily.', interactive: false },
            { illustration: '🌊', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'They took Ruby to a big watering hole.', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: 'All kinds of dinosaurs came to drink together peacefully!', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"We all need water. So we share!" explained Spike.', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Flying Pteranodons dove for fish in the water.', interactive: false },
            { illustration: '🌅', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'As the sun set, Ruby watched dinosaurs of all sizes settling down for the night.', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"This is the most amazing day of my life!" Ruby said.', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'Bella smiled. "You\'ve learned what makes us special - kindness and family."', interactive: false },

            // THE DANGER ARRIVES (Pages 59-67)
            { illustration: '🌙', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'That night, Ruby slept safely between Bella\'s huge feet.', interactive: false },
            { illustration: '☀️', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'But the next morning, something was wrong.', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #FF4444 0%, #CC0000 100%)', text: 'A fierce <span class="interactive-element" data-sound="roar">T-Rex 🦖</span> appeared - and this one wasn\'t friendly!', interactive: true },
            { illustration: '😰', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Everyone scattered! The T-Rex was hunting!', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'Bella quickly used her tail to sweep Ruby to safety!', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: 'Terry and the other Triceratops formed a protective circle!', interactive: false },
            { illustration: '💪', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'They were protecting the babies - and Ruby!', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #FF4444 0%, #CC0000 100%)', text: 'The T-Rex roared, but seeing the united herd, it decided to hunt elsewhere.', interactive: false },
            { illustration: '😰', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Ruby\'s heart pounded. That was scary! But her friends had protected her!', interactive: false },

            // UNDERSTANDING PREDATORS (Pages 68-75)
            { illustration: '🦕', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'When the danger passed, Grandpa Gus explained something important.', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: '"That T-Rex isn\'t evil, Ruby. He\'s just hungry. It\'s his nature."', interactive: false },
            { illustration: '🌍', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: '"Carnivores are part of nature\'s balance too."', interactive: false },
            { illustration: '💭', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Ruby understood. "Like in the circle of life you told me about?"', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: '"Exactly! We don\'t hate them. We just stay safe from them."', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"And together, as a herd, we\'re strong!" added Terry proudly.', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'Ruby learned that cooperation and family bonds kept everyone safe.', interactive: false },
            { illustration: '💖', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'It was a lesson she\'d never forget!', interactive: false },

            // TIME TO GO HOME (Pages 76-85)
            { illustration: '✨', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'That afternoon, the magic egg began to <span class="interactive-element" data-sound="sparkle">glow ✨</span> again.', interactive: true },
            { illustration: '😢', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: '"It\'s time for you to go home," Bella said sadly.', interactive: false },
            { illustration: '😢', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'Ruby hugged Bella\'s huge leg. "I don\'t want to leave you!"', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: '"You must return to your own time. But you\'ll always remember us."', interactive: false },
            { illustration: '🦖', background: 'linear-gradient(135deg, #FF9F1C 0%, #FFE66D 100%)', text: 'All the dinosaurs gathered to say goodbye.', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'Arlo gave her a smooth stone. "To remember our adventure!"', interactive: false },
            { illustration: '💕', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Ruby held the stone tight as the magic swirled around her.', interactive: false },
            { illustration: '👋', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: '"Goodbye, friends! I\'ll never forget you!" Ruby called out.', interactive: false },
            { illustration: '✨', background: 'linear-gradient(135deg, #E0F7FF 0%, #7DD3FC 100%)', text: 'Colors spun! Time twisted! Ruby felt herself being pulled forward through millions of years!', interactive: false },
            { illustration: '🏛️', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'Suddenly, she was back in the museum!', interactive: false },

            // BACK IN THE PRESENT (Pages 86-95)
            { illustration: '😮', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Ruby looked around. Her class was still there - no time had passed at all!', interactive: false },
            { illustration: '🥚', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'Her hand was still on the dinosaur egg replica.', interactive: false },
            { illustration: '🪨', background: 'linear-gradient(135deg, #FFF0E0 0%, #FFDDB3 100%)', text: 'But in her other hand - Arlo\'s stone! It was real!', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Ruby smiled. It wasn\'t a dream! She really HAD met dinosaurs!', interactive: false },
            { illustration: '🦴', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFE699 100%)', text: 'She looked at the dinosaur skeletons with new eyes now.', interactive: false },
            { illustration: '💭', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'These weren\'t just bones - they were her friends!', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'She whispered to the Brachiosaurus skeleton: "Thank you, Bella."', interactive: false },
            { illustration: '📝', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'That day, Ruby wrote the best school report ever about dinosaurs!', interactive: false },
            { illustration: '👧', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'She shared what she\'d learned about cooperation, family, and nature\'s balance.', interactive: false },
            { illustration: '😊', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Her teacher was amazed at how much Ruby understood!', interactive: false },

            // EPILOGUE (Pages 96-100)
            { illustration: '🏡', background: 'linear-gradient(135deg, #FFF9E0 0%, #FFF0C0 100%)', text: 'At home, Ruby put Arlo\'s stone on her shelf with her dinosaur toys.', interactive: false },
            { illustration: '🌙', background: 'linear-gradient(135deg, #0F1624 0%, #1E3A8A 100%)', text: 'Every night, she would hold it and remember her adventure.', interactive: false },
            { illustration: '💭', background: 'linear-gradient(135deg, #E0F7FF 0%, #C0E9FF 100%)', text: 'She learned that even though dinosaurs are gone, their lessons live on.', interactive: false },
            { illustration: '💪', background: 'linear-gradient(135deg, #FFE5F0 0%, #FFDAE5 100%)', text: 'Work together. Protect each other. Respect all of nature.', interactive: false },
            { illustration: '🦕', background: 'linear-gradient(135deg, #7FD858 0%, #A7F3D0 100%)', text: 'And Ruby promised to share these lessons with everyone she met. The End! 🦕', interactive: false }
        ]
    }
};

// ... (keeping all the same sound effects, functions, etc. from before)

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

let currentStory = null;
let currentPage = 0;
let musicPlaying = false;
let audioContext = null;

function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

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

function toggleMusic() {
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

function closeStory() {
    const reader = document.getElementById('story-reader');
    if (reader) reader.remove();
    currentStory = null;
    currentPage = 0;
}

function showPage(pageIndex) {
    if (!currentStory || pageIndex < 0 || pageIndex >= currentStory.pages.length) return;
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
                if (soundType) playSound(soundType);
                const animations = ['spin-animation', 'pulse-animation', 'wiggle-animation'];
                const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
                this.classList.add(randomAnimation);
                setTimeout(() => this.classList.remove(randomAnimation), 1000);
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
    setTimeout(() => storyPage.style.animation = 'fadeIn 0.5s ease', 10);
}

function nextPage() {
    if (currentPage < currentStory.pages.length - 1) showPage(currentPage + 1);
}

function previousPage() {
    if (currentPage > 0) showPage(currentPage - 1);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Kids Story App Loaded! 🎉');
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

document.addEventListener('keydown', function(e) {
    if (currentStory) {
        if (e.key === 'ArrowRight') nextPage();
        else if (e.key === 'ArrowLeft') previousPage();
        else if (e.key === 'Escape') closeStory();
    }
});

document.addEventListener('selectstart', function(e) {
    if (e.target.closest('.story-card') || e.target.closest('.interactive-element')) {
        e.preventDefault();
    }
});
