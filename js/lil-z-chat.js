/**
 * HARNESS Project - Lil Z Chat & Knowledge Base
 * Interactive AI Companion Logic
 * Extracted from index.html
 */

// ===== LIL Z RESPONSE GENERATOR =====
function generateLilZResponse(question) {
    const lowerQuestion = question.toLowerCase();

    console.log('🐾 Generating response for:', question);

    // Validate question
    if (!question || typeof question !== 'string') {
        console.error('🐾 Invalid question:', question);
        return getDefaultResponse();
    }

    // Check if knowledge base exists
    if (typeof LIL_Z_KNOWLEDGE === 'undefined' || !LIL_Z_KNOWLEDGE) {
        console.error('🐾 LIL_Z_KNOWLEDGE not defined!');
        return getDefaultResponse();
    }

    // Search through knowledge base
    for (const [category, data] of Object.entries(LIL_Z_KNOWLEDGE)) {
        if (!data || !data.keywords || !data.responses) continue;

        // Check if question matches keywords
        const matchesKeyword = data.keywords.some(keyword => lowerQuestion.includes(keyword));

        if (matchesKeyword) {
            // Find best matching response
            for (const response of data.responses) {
                if (!response || !response.topic || !response.answer) continue;

                const topicWords = response.topic.toLowerCase().split(' ');
                if (topicWords.some(word => lowerQuestion.includes(word))) {
                    console.log('🐾 Found matching response:', response.topic);
                    return `<strong>${response.topic}</strong><br><br>${response.answer}`;
                }
            }
            // Return first response if no specific match
            const firstResponse = data.responses[0];
            if (firstResponse && firstResponse.topic && firstResponse.answer) {
                console.log('🐾 Using first response from category:', category);
                return `<strong>${firstResponse.topic}</strong><br><br>${firstResponse.answer}`;
            }
        }
    }

    // Default helpful response
    console.log('🐾 Using default response');
    return getDefaultResponse();
}

function getDefaultResponse() {
    return `<strong>Hey! I'm Lil Z, your guide through the HARNESS Project! 🌟</strong><br><br>
        I can help you with:<br><br>
        🦠 <strong>HIV & U=U</strong> - Understanding transmission, treatment, and living fearlessly<br>
        💊 <strong>PrEP & PEP</strong> - Prevention before and after exposure<br>
        💊 <strong>Doxy-PEP</strong> - Preventing bacterial STIs<br>
        🧪 <strong>Testing</strong> - When, how often, and what to expect<br>
        🛡️ <strong>Barriers</strong> - Condoms, dental dams, and safer sex strategies<br>
        💬 <strong>Communication</strong> - Scripts for disclosure, consent, and boundaries<br>
        📱 <strong>App navigation</strong> - Getting the most from HARNESS<br><br>
        What would you like to know? Ask me anything! 💪✨`;
}

// ===== LIL Z CHAT INTERFACE =====
function openLilZChat(context = 'general') {
    // Check if createModal function exists
    if (typeof createModal !== 'function') {
        console.error('🐾 Lil Z Error: createModal function not found!');
        // Fallback or alert? Let's check if it is defined globally or we need to add it helper here.
        // It was defined at the end of index.html script block usually.
        // We will assume createModal is available or we should include it.
        // For safety, let's include the helper if missing at the bottom of this file or separate utils.
    }

    // Use context-appropriate avatars
    let headerAvatar = LIL_Z_AVATARS.getAvatar('professional');
    let welcomeAvatar = LIL_Z_AVATARS.getAvatar('greeting');

    if (context === 'welcome') {
        headerAvatar = LIL_Z_AVATARS.getAvatar('excited');
        welcomeAvatar = LIL_Z_AVATARS.getAvatar('excited');
    } else if (context === 'educator') {
        headerAvatar = LIL_Z_AVATARS.getAvatar('professional');
        welcomeAvatar = LIL_Z_AVATARS.getAvatar('teaching');
    }

    console.log('🐾 Opening Lil Z chat with context:', context);

    const chatHTML = `
        <div class="lil-z-chat-companion">
            <div class="lil-z-chat-header">
                <div class="lil-z-avatar">
                    <img src="${headerAvatar}" alt="Lil Z" class="avatar-img">
                </div>
                <div class="lil-z-title">
                    <h3>Lil Z</h3>
                    <p class="lil-z-subtitle">Your Sexual Health Expert & Personal Guide</p>
                </div>
            </div>
            
            <div class="lil-z-messages" id="lil-z-messages">
                <div class="lil-z-message bot-message">
                    <div class="message-avatar">
                        <img src="${welcomeAvatar}" alt="Lil Z" class="avatar-img">
                    </div>
                    <div class="message-content">
                        <p><strong>Hey there! I'm Lil Z! 👋</strong></p>
                        <p>I'm your personal guide through the HARNESS Project. Think of me as your knowledgeable friend who's here to answer questions about sexual health, prevention, and navigating this platform.</p>
                        <p><strong>I can help you with:</strong></p>
                        <ul class="topic-list">
                            <li>🦠 HIV prevention & education (PrEP, PEP, U=U)</li>
                            <li>💊 Doxy-PEP & STI prevention</li>
                            <li>🧪 Testing guidance</li>
                            <li>🛡️ Barrier methods & SafER sex</li>
                            <li>💬 Communication scripts</li>
                            <li>📱 Using the HARNESS app</li>
                        </ul>
                        <p><strong>What would you like to know?</strong> 🌟</p>
                    </div>
                </div>
            </div>
            
            <div class="lil-z-suggestions" id="lil-z-suggestions">
                <button class="suggestion-chip" onclick="askLilZ('What is PrEP?')">What is PrEP?</button>
                <button class="suggestion-chip" onclick="askLilZ('Tell me about U=U')">What is U=U?</button>
                <button class="suggestion-chip" onclick="askLilZ('How do I use this app?')">How to use app</button>
                <button class="suggestion-chip" onclick="askLilZ('How often should I test?')">Testing frequency</button>
            </div>
            
            <div class="lil-z-input-container">
                <input 
                    type="text" 
                    class="lil-z-input" 
                    id="lil-z-input" 
                    placeholder="Ask Lil Z anything..."
                    onkeypress="handleLilZEnter(event)"
                >
                <button class="lil-z-send-btn" onclick="sendLilZMessage()">
                    <span class="send-icon">➤</span>
                </button>
            </div>
            
            <div class="lil-z-footer">
                <small>💡 Educational information only. Always consult healthcare providers for medical advice.</small>
                <div class="lil-z-version-info">
                    <small>📋 Based on CDC ${LIL_Z_VERSION.guidelinesVersion.cdc.prep} Guidelines | Last updated: ${LIL_Z_VERSION.lastUpdated}</small>
                </div>
            </div>
        </div>
    `;

    // Check for createModal again or define it?
    // It's safer to rely on it being present, or we can inline it if we want to be independent.
    // The original script had createModal defined separately. 
    // We'll trust the main utils or this script's footer.
    if (typeof createModal === 'function') {
        const modal = createModal(chatHTML);
        document.body.appendChild(modal);
    } else {
        console.error('createModal is not defined');
    }
}

// ===== LIL Z CHAT FUNCTIONS =====
function askLilZ(question) {
    const input = document.getElementById('lil-z-input');
    if (input) {
        input.value = question;
        sendLilZMessage();
    }
}

function handleLilZEnter(event) {
    if (event.key === 'Enter') {
        sendLilZMessage();
    }
}

function sendLilZMessage() {
    const input = document.getElementById('lil-z-input');
    const question = input.value.trim();

    if (!question) return;

    // Add user message
    addLilZMessage(question, 'user');
    input.value = '';

    // Hide suggestions after first message
    const suggestions = document.getElementById('lil-z-suggestions');
    if (suggestions) suggestions.style.display = 'none';

    // Generate response with slight delay for natural feel
    setTimeout(() => {
        const response = generateLilZResponse(question);
        addLilZMessage(response, 'bot');
    }, 600);
}

function addLilZMessage(message, type) {
    const container = document.getElementById('lil-z-messages');
    if (!container) {
        console.error('🐾 Lil Z Error: Messages container not found');
        return;
    }

    // Validate message
    if (!message || message === 'undefined' || typeof message === 'undefined') {
        console.error('🐾 Lil Z Error: Invalid message:', message);
        message = '<strong>Oops!</strong><br><br>Something went wrong. Please try asking your question again! 💪';
    }

    // Select avatar based on message type and content
    let avatarSrc;
    if (type === 'user') {
        // User avatar (friendly face)
        avatarSrc = LIL_Z_AVATARS.getAvatar('friendly');
    } else {
        // Lil Z responses - vary based on message content
        const messageLower = message.toLowerCase();

        // Context-based avatar selection
        if (messageLower.includes('congratulations') || messageLower.includes('great job') || messageLower.includes('🎉')) {
            avatarSrc = LIL_Z_AVATARS.getAvatar('celebrating');
        } else if (messageLower.includes('help') || messageLower.includes('support') || messageLower.includes('here for you')) {
            avatarSrc = LIL_Z_AVATARS.getAvatar('supportive');
        } else if (messageLower.includes('prep') || messageLower.includes('pep') || messageLower.includes('condom')) {
            avatarSrc = LIL_Z_AVATARS.getAvatar('teaching');
        } else if (messageLower.includes('confidence') || messageLower.includes('power') || messageLower.includes('boss')) {
            avatarSrc = LIL_Z_AVATARS.getAvatar('confident');
        } else if (messageLower.includes('scared') || messageLower.includes('worried') || messageLower.includes('anxious')) {
            avatarSrc = LIL_Z_AVATARS.getAvatar('supportive');
        } else {
            // Use random avatar for variety
            avatarSrc = LIL_Z_AVATARS.getRandom();
        }
    }

    console.log('🐾 Adding message:', { type, messagePreview: message.substring(0, 50) });

    const messageDiv = document.createElement('div');
    messageDiv.className = `lil-z-message ${type}-message fade-in`;
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <img src="${avatarSrc}" alt="${type === 'user' ? 'You' : 'Lil Z'}" class="avatar-img">
        </div>
        <div class="message-content">
            ${message}
        </div>
    `;

    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

// ===== LIL Z FLOATING BUTTON (for all pages) =====
function addLilZFloatingButton() {
    const existingButton = document.getElementById('lil-z-float-btn');
    if (existingButton) {
        console.log('🐾 Lil Z floating button already exists');
        return; // Don't add duplicate
    }

    const floatingBtn = document.createElement('div');
    floatingBtn.id = 'lil-z-float-btn';
    floatingBtn.className = 'lil-z-floating-btn';
    floatingBtn.innerHTML = `
        <img src="${LIL_Z_AVATARS.getAvatar('cool')}" alt="Ask Lil Z" class="lil-z-float-avatar">
        <div class="lil-z-float-tooltip">Ask Lil Z!</div>
    `;
    floatingBtn.onclick = () => openLilZChat('general');

    document.body.appendChild(floatingBtn);
    console.log('🐾 Lil Z floating button added to page');
}

// ===== LIL Z STYLES =====
const lilZStyles = document.createElement('style');
lilZStyles.textContent = `
    /* Floating Button */
    .lil-z-floating-btn {
        position: fixed;
        bottom: 90px; /* Above bottom nav (which is ~60-70px tall) */
        right: 20px;
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #00BDBD, #FFB627);
        border-radius: 50%;
        box-shadow: 0 4px 20px rgba(0, 189, 189, 0.4);
        cursor: pointer;
        z-index: 9999;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px;
        animation: pulse 2s infinite;
    }
    
    .lil-z-floating-btn:hover {
        transform: scale(1.1) translateY(-3px);
        box-shadow: 0 6px 30px rgba(0, 189, 189, 0.6);
    }
    
    .lil-z-float-avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid white;
    }
    
    .lil-z-float-tooltip {
        position: absolute;
        bottom: 80px;
        right: 0;
        background: #2C3E50;
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        white-space: nowrap;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
    
    .lil-z-float-tooltip::after {
        content: '';
        position: absolute;
        bottom: -6px;
        right: 20px;
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #2C3E50;
    }
    
    .lil-z-floating-btn:hover .lil-z-float-tooltip {
        opacity: 1;
    }
    
    @keyframes pulse {
        0%, 100% { box-shadow: 0 4px 20px rgba(0, 189, 189, 0.4); }
        50% { box-shadow: 0 4px 30px rgba(255, 182, 39, 0.6); }
    }
    
    /* Chat Interface */
    .lil-z-chat-companion {
        max-width: 600px;
        width: 95%;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
        background: white;
        border-radius: 16px;
        overflow: hidden;
    }
    
    .lil-z-chat-header {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 20px;
        background: linear-gradient(135deg, #00BDBD, #FFB627);
        color: white;
    }
    
    .lil-z-avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid rgba(255,255,255,0.8);
        background: white;
        flex-shrink: 0;
    }
    
    .lil-z-avatar .avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .lil-z-title h3 {
        margin: 0;
        font-size: 22px;
        font-weight: 700;
        font-family: 'Bree Serif', serif;
    }
    
    .lil-z-subtitle {
        margin: 4px 0 0;
        font-size: 13px;
        opacity: 0.95;
        font-weight: 500;
    }
    
    .lil-z-messages {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        background: #F5F7FA;
        min-height: 300px;
        max-height: 400px;
    }
    
    .lil-z-message {
        display: flex;
        gap: 12px;
        margin-bottom: 16px;
        animation: fadeIn 0.3s ease;
    }
    
    .message-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        flex-shrink: 0;
        overflow: hidden;
        border: 2px solid #e0e0e0;
        background: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .message-avatar .avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .bot-message {
        flex-direction: row;
    }
    
    .user-message {
        flex-direction: row-reverse;
    }
    
    .message-content {
        background: white;
        padding: 12px 16px;
        border-radius: 16px;
        max-width: 80%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        line-height: 1.6;
        font-size: 14px;
    }
    
    .user-message .message-content {
        background: linear-gradient(135deg, #00BDBD, #FFB627);
        color: white;
    }
    
    .message-content strong {
        display: block;
        margin-bottom: 8px;
        font-size: 15px;
    }
    
    .topic-list {
        margin: 12px 0;
        padding-left: 20px;
    }
    
    .topic-list li {
        margin: 6px 0;
    }
    
    .lil-z-suggestions {
        padding: 12px 20px;
        background: white;
        border-top: 1px solid #E0E6ED;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }
    
    .suggestion-chip {
        padding: 8px 16px;
        background: #E8F4F8;
        border: 1px solid #00BDBD;
        border-radius: 20px;
        font-size: 13px;
        color: #00BDBD;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: 'Bree Serif', serif;
        font-weight: 500;
    }
    
    .suggestion-chip:hover {
        background: #00BDBD;
        color: white;
        transform: translateY(-2px);
    }
    
    .lil-z-input-container {
        display: flex;
        gap: 8px;
        padding: 16px 20px;
        background: white;
        border-top: 1px solid #E0E6ED;
    }
    
    .lil-z-input {
        flex: 1;
        padding: 12px 16px;
        border: 2px solid #E0E6ED;
        border-radius: 24px;
        font-family: inherit;
        font-size: 14px;
        transition: border-color 0.2s ease;
    }
    
    .lil-z-input:focus {
        outline: none;
        border-color: #00BDBD;
    }
    
    .lil-z-send-btn {
        width: 44px;
        height: 44px;
        background: linear-gradient(135deg, #00BDBD, #FFB627);
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.2s ease;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .lil-z-send-btn:hover {
        transform: scale(1.1);
    }
    
    .send-icon {
        color: white;
        font-size: 20px;
        font-weight: bold;
    }
    
    .lil-z-footer {
        padding: 12px 20px;
        background: #FFF9E6;
        text-align: center;
        color: #7F8C8D;
        font-size: 12px;
        line-height: 1.4;
    }
    
    .lil-z-version-info {
        margin-top: 6px;
        padding-top: 6px;
        border-top: 1px solid rgba(0,0,0,0.1);
        font-size: 11px;
        color: #95A5A6;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @media (max-width: 640px) {
        .lil-z-floating-btn {
            width: 70px;
            height: 70px;
            bottom: 20px;
            right: 20px;
        }
        
        .lil-z-avatar {
            width: 80px;
            height: 80px;
        }
        
        .message-avatar {
            width: 50px;
            height: 50px;
        }
        
        .lil-z-chat-companion {
            width: 100%;
            max-height: 90vh;
        }
        
        .message-content {
            max-width: 75%;
            font-size: 13px;
        }
        
        .suggestion-chip {
            font-size: 12px;
            padding: 6px 12px;
        }
    }
`;
document.head.appendChild(lilZStyles);

// Auto-add floating button on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addLilZFloatingButton);
} else {
    addLilZFloatingButton();
}

// Global Modal Helper (if not present)
if (typeof createModal === 'undefined') {
    window.createModal = function (content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6);
            backdrop-filter: blur(4px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 20px;
        `;
        modal.innerHTML = `
            <div style="position: relative; max-width: 600px; width: 100%;">
                <button onclick="this.closest('.modal-overlay').remove()" 
                        style="position: absolute; top: -40px; right: 0; background: white; 
                               border: none; width: 36px; height: 36px; border-radius: 50%; 
                               cursor: pointer; font-size: 20px; z-index: 10001; 
                               box-shadow: 0 2px 8px rgba(0,0,0,0.2);">✕</button>
                ${content}
            </div>
        `;
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
        return modal;
    };
}
