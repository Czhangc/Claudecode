// =====================================
// NAVIGATION & SECTION MANAGEMENT
// =====================================

// Handle navigation between sections
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section');
        navigateToSection(sectionId);
    });
});

function navigateToSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Crisis banner management
function closeCrisisBanner() {
    const banner = document.getElementById('crisisBanner');
    banner.classList.add('hidden');
    localStorage.setItem('crisisBannerDismissed', 'true');
}

// Check if crisis banner was previously dismissed
window.addEventListener('load', () => {
    const dismissed = localStorage.getItem('crisisBannerDismissed');
    if (dismissed === 'true') {
        document.getElementById('crisisBanner').classList.add('hidden');
    }
});

// =====================================
// CHAT FUNCTIONALITY
// =====================================

let chatHistory = [];

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    // Add user message to chat
    addMessageToChat(message, 'user');
    chatHistory.push({ role: 'user', content: message });

    // Clear input
    input.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Generate AI response after delay
    setTimeout(() => {
        removeTypingIndicator();
        const response = generateAIResponse(message);
        addMessageToChat(response, 'bot');
        chatHistory.push({ role: 'bot', content: response });
        saveChatHistory();
    }, 1500 + Math.random() * 1000);
}

function addMessageToChat(message, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = `<p>${escapeHtml(message)}</p>`;

    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator-container';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-content">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

function generateAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    // Crisis keywords detection
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'want to die', 'hurt myself', 'self harm'];
    if (crisisKeywords.some(keyword => lowerMessage.includes(keyword))) {
        return "I'm really concerned about what you're sharing. Please reach out to a crisis counselor immediately:\n\n• Call or text 988 (Suicide & Crisis Lifeline)\n• Text HELLO to 741741 (Crisis Text Line)\n• Call 911 if you're in immediate danger\n\nYour life matters, and there are people who want to help you right now.";
    }

    // Anxiety-related responses
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried') || lowerMessage.includes('panic')) {
        const anxietyResponses = [
            "I hear that you're feeling anxious. Anxiety can feel overwhelming, but you're not alone in this. Would it help to try a breathing exercise together? You can find one in the Resources section.",
            "It sounds like anxiety is weighing on you right now. Remember that anxiety often lies to us about what might happen. What's one small thing that might help you feel grounded in this moment?",
            "Feeling anxious is really difficult. Have you tried the 5-4-3-2-1 grounding technique? It can help bring you back to the present moment. I can walk you through it if you'd like.",
            "Thank you for sharing that you're feeling anxious. Sometimes naming our feelings is the first step. What do you think is contributing to your anxiety right now?"
        ];
        return anxietyResponses[Math.floor(Math.random() * anxietyResponses.length)];
    }

    // Depression/sadness-related responses
    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('hopeless') || lowerMessage.includes('empty')) {
        const sadnessResponses = [
            "I'm sorry you're feeling this way. Sadness can feel so heavy. Please know that what you're feeling is valid, and it's okay to not be okay sometimes. Is there anything specific that's contributing to how you're feeling?",
            "It takes courage to acknowledge when you're feeling down. Depression can make everything feel difficult, but you're taking a positive step by reaching out. Have you been able to talk to anyone else about how you're feeling?",
            "I hear you, and I want you to know that you're not alone in feeling this way. When you're ready, it might help to reach out to a mental health professional who can provide more personalized support.",
            "Feeling sad or empty is really challenging. Sometimes when we're in these moments, it's hard to see that things can change. But they can. What's one small thing that has brought you even a tiny bit of comfort lately?"
        ];
        return sadnessResponses[Math.floor(Math.random() * sadnessResponses.length)];
    }

    // Stress-related responses
    if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('too much')) {
        const stressResponses = [
            "Feeling overwhelmed is a sign that you're carrying a lot right now. It's okay to acknowledge when things feel like too much. What's one thing you could take off your plate, even temporarily?",
            "Stress can pile up quickly. Remember that you don't have to handle everything at once. Breaking things down into smaller, manageable pieces can help. What feels most urgent to you right now?",
            "I hear that you're feeling stressed. Your feelings are completely valid. Sometimes taking a few minutes for deep breathing or a short walk can help reset our nervous system. Would that be possible for you right now?",
            "Being overwhelmed is exhausting. It's important to remember that it's okay to ask for help and to set boundaries. What support do you have available to you?"
        ];
        return stressResponses[Math.floor(Math.random() * stressResponses.length)];
    }

    // Coping strategies request
    if (lowerMessage.includes('coping') || lowerMessage.includes('strategies') || lowerMessage.includes('help me cope')) {
        return "Here are some evidence-based coping strategies that might help:\n\n1. Deep breathing exercises (try the box breathing: 4 counts in, 4 hold, 4 out, 4 hold)\n2. Grounding techniques like 5-4-3-2-1\n3. Progressive muscle relaxation\n4. Mindful walking or movement\n5. Journaling your thoughts and feelings\n\nYou can find guided exercises for these in the Resources section. Which one would you like to try first?";
    }

    // Mindfulness request
    if (lowerMessage.includes('mindfulness') || lowerMessage.includes('meditation') || lowerMessage.includes('present')) {
        return "Mindfulness is about being present in the current moment without judgment. It can help calm anxiety and reduce stress. Here's a simple practice:\n\nTake a moment to notice:\n• What you can see around you\n• What sounds you can hear\n• How your body feels where you're sitting\n• Your breath moving in and out\n\nYou don't need to change anything—just notice. Even a few minutes of this can help create some space from difficult thoughts and feelings.";
    }

    // Gratitude-related
    if (lowerMessage.includes('grateful') || lowerMessage.includes('gratitude') || lowerMessage.includes('thankful')) {
        return "Gratitude can be a powerful practice, even during difficult times. It's not about dismissing your struggles, but about creating balance. What are you grateful for today? Even small things count—a warm cup of tea, a kind word, sunlight through a window.";
    }

    // Sleep issues
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired')) {
        return "Sleep difficulties can really impact our mental health, and mental health struggles can affect our sleep—it's a challenging cycle. Some things that might help: maintaining a consistent sleep schedule, limiting screen time before bed, creating a calming bedtime routine, and avoiding caffeine in the afternoon. If sleep issues persist, it's worth discussing with a healthcare provider.";
    }

    // Trauma-related
    if (lowerMessage.includes('trauma') || lowerMessage.includes('ptsd') || lowerMessage.includes('flashback')) {
        return "Trauma can have profound effects, and healing is absolutely possible with the right support. While I can offer some general coping strategies, trauma work is best done with a licensed therapist trained in trauma-informed care, such as EMDR or trauma-focused CBT. You deserve professional support to process what you've been through. Would you like information about finding a trauma-informed therapist?";
    }

    // Relationship issues
    if (lowerMessage.includes('relationship') || lowerMessage.includes('friend') || lowerMessage.includes('family') || lowerMessage.includes('partner')) {
        return "Relationship challenges can be really painful. Healthy relationships require good communication, boundaries, and mutual respect. It's okay to have conflicts, but how we navigate them matters. Have you been able to express how you're feeling to the other person? Sometimes therapy—either individual or couples/family therapy—can provide helpful tools.";
    }

    // Positive expressions
    if (lowerMessage.includes('better') || lowerMessage.includes('good') || lowerMessage.includes('happy') || lowerMessage.includes('great')) {
        const positiveResponses = [
            "I'm glad to hear things are feeling better for you! It's wonderful when we can recognize positive moments. What do you think has contributed to this shift?",
            "That's great to hear! Celebrating the good moments, even small ones, is important. Keep noticing what's helping you feel this way.",
            "I'm happy for you! Progress isn't always linear, but these better moments are valuable. How does it feel to notice this positive change?"
        ];
        return positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
    }

    // Default empathetic responses
    const defaultResponses = [
        "Thank you for sharing that with me. I'm here to listen. Can you tell me more about what you're experiencing?",
        "I hear you. What you're going through sounds difficult. How long have you been feeling this way?",
        "It's important that you're expressing how you feel. Sometimes just putting our experiences into words can help. What would feel most supportive for you right now?",
        "I appreciate you opening up about this. Everyone's journey is different, and your feelings are valid. What do you think you need most in this moment?",
        "Thank you for trusting me with this. While I can provide support and coping strategies, please remember that talking with a licensed therapist can provide more personalized help. How can I best support you today?",
        "I'm listening. What you're sharing matters. Is there a particular aspect of what you're experiencing that feels most challenging right now?",
        "It sounds like you're going through a lot. Remember to be gentle with yourself. What's one small thing that might bring you a little comfort today?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

function quickResponse(message) {
    document.getElementById('chatInput').value = message;
    sendMessage();
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function clearChat() {
    if (confirm('Are you sure you want to clear the conversation? This cannot be undone.')) {
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.innerHTML = `
            <div class="message bot-message">
                <div class="message-content">
                    <p>Hello, I'm here to listen and support you. This is a safe space where you can share what's on your mind. How are you feeling today?</p>
                </div>
            </div>
        `;
        chatHistory = [];
        localStorage.removeItem('chatHistory');
    }
}

function saveChatHistory() {
    try {
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    } catch (e) {
        console.error('Failed to save chat history:', e);
    }
}

function loadChatHistory() {
    try {
        const saved = localStorage.getItem('chatHistory');
        if (saved) {
            chatHistory = JSON.parse(saved);
            const messagesContainer = document.getElementById('chatMessages');
            messagesContainer.innerHTML = '';

            // Always start with bot greeting
            addMessageToChat("Hello, I'm here to listen and support you. This is a safe space where you can share what's on your mind. How are you feeling today?", 'bot');

            // Add saved messages
            chatHistory.forEach(msg => {
                addMessageToChat(msg.content, msg.role);
            });
        }
    } catch (e) {
        console.error('Failed to load chat history:', e);
    }
}

// =====================================
// JOURNAL FUNCTIONALITY
// =====================================

let journalEntries = [];

function showNewEntryModal() {
    document.getElementById('journalModal').classList.add('active');
    document.getElementById('journalTitle').value = '';
    document.getElementById('journalContent').value = '';
}

function closeJournalModal() {
    document.getElementById('journalModal').classList.remove('active');
}

function usePrompt(prompt) {
    showNewEntryModal();
    document.getElementById('journalTitle').value = prompt;
    document.getElementById('journalContent').focus();
}

function saveJournalEntry() {
    const title = document.getElementById('journalTitle').value.trim();
    const content = document.getElementById('journalContent').value.trim();

    if (!content) {
        alert('Please write something before saving.');
        return;
    }

    const entry = {
        id: Date.now(),
        title: title || 'Untitled Entry',
        content: content,
        date: new Date().toISOString()
    };

    journalEntries.unshift(entry);
    saveJournalEntries();
    renderJournalEntries();
    closeJournalModal();
}

function deleteJournalEntry(id) {
    if (confirm('Are you sure you want to delete this entry? This cannot be undone.')) {
        journalEntries = journalEntries.filter(entry => entry.id !== id);
        saveJournalEntries();
        renderJournalEntries();
    }
}

function renderJournalEntries() {
    const container = document.getElementById('journalEntries');

    if (journalEntries.length === 0) {
        container.innerHTML = '<p class="empty-state">No journal entries yet. Start writing to track your journey.</p>';
        return;
    }

    container.innerHTML = journalEntries.map(entry => `
        <div class="journal-entry">
            <div class="entry-header">
                <h3 class="entry-title">${escapeHtml(entry.title)}</h3>
                <span class="entry-date">${formatDate(entry.date)}</span>
            </div>
            <div class="entry-content">${escapeHtml(entry.content)}</div>
            <div class="entry-actions">
                <button class="entry-btn delete" onclick="deleteJournalEntry(${entry.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function saveJournalEntries() {
    try {
        localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
    } catch (e) {
        console.error('Failed to save journal entries:', e);
    }
}

function loadJournalEntries() {
    try {
        const saved = localStorage.getItem('journalEntries');
        if (saved) {
            journalEntries = JSON.parse(saved);
            renderJournalEntries();
        }
    } catch (e) {
        console.error('Failed to load journal entries:', e);
    }
}

// =====================================
// MOOD TRACKER FUNCTIONALITY
// =====================================

let moodHistory = [];

function logMood(mood, emoji) {
    const moodEntry = {
        mood: mood,
        emoji: emoji,
        timestamp: new Date().toISOString()
    };

    moodHistory.unshift(moodEntry);
    saveMoodHistory();
    renderMoodHistory();

    // Visual feedback
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.closest('.mood-btn').classList.add('selected');

    // Show confirmation message
    setTimeout(() => {
        addMessageToChat(`Mood logged: ${mood}. Remember, it's okay to feel however you're feeling. Your emotions are valid.`, 'bot');
    }, 500);
}

function renderMoodHistory() {
    const container = document.getElementById('moodList');

    if (moodHistory.length === 0) {
        container.innerHTML = '<p class="empty-state">Start tracking your mood to see patterns over time.</p>';
        return;
    }

    // Show last 10 entries
    const recentMoods = moodHistory.slice(0, 10);

    container.innerHTML = recentMoods.map(entry => `
        <div class="mood-item">
            <div class="mood-item-left">
                <span class="mood-item-emoji">${entry.emoji}</span>
                <span class="mood-item-label">${capitalizeFirst(entry.mood)}</span>
            </div>
            <span class="mood-item-date">${formatDate(entry.timestamp)}</span>
        </div>
    `).join('');
}

function saveMoodHistory() {
    try {
        localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
    } catch (e) {
        console.error('Failed to save mood history:', e);
    }
}

function loadMoodHistory() {
    try {
        const saved = localStorage.getItem('moodHistory');
        if (saved) {
            moodHistory = JSON.parse(saved);
            renderMoodHistory();
        }
    } catch (e) {
        console.error('Failed to load mood history:', e);
    }
}

// =====================================
// BREATHING EXERCISE
// =====================================

let breathingInterval;

function startBreathingExercise() {
    const modal = document.getElementById('breathingModal');
    modal.classList.add('active');

    const textElement = document.getElementById('breathingText');
    const circle = document.getElementById('breathingCircle');

    let phase = 0;
    const phases = [
        { text: 'Breathe In', duration: 4000 },
        { text: 'Hold', duration: 4000 },
        { text: 'Breathe Out', duration: 4000 },
        { text: 'Hold', duration: 4000 }
    ];

    function updatePhase() {
        textElement.textContent = phases[phase].text;
        phase = (phase + 1) % phases.length;
    }

    updatePhase();
    breathingInterval = setInterval(updatePhase, 4000);
}

function closeBreathingExercise() {
    const modal = document.getElementById('breathingModal');
    modal.classList.remove('active');
    if (breathingInterval) {
        clearInterval(breathingInterval);
    }
}

// =====================================
// UTILITY FUNCTIONS
// =====================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// =====================================
// INITIALIZATION
// =====================================

window.addEventListener('load', () => {
    loadChatHistory();
    loadJournalEntries();
    loadMoodHistory();

    console.log('%c🌿 Healing Space', 'font-size: 20px; color: #4a6fa5; font-weight: bold;');
    console.log('%cYour journey to healing is valid and important.', 'font-size: 14px; color: #666; font-style: italic;');
});

// Close modals when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            if (breathingInterval) {
                clearInterval(breathingInterval);
            }
        }
    });
});
