/**
 * HARNESS Project - Lil Z Chat & Knowledge Base
 * Interactive AI Companion Logic
 * Extracted from toolkit.html
 */

// ===== LIL Z VERSION & GUIDELINES TRACKING =====
const LIL_Z_VERSION = {
    version: '2.0.0',
    lastUpdated: '2026-01-24',
    guidelinesVersion: {
        cdc: {
            prep: '2024', // CDC PrEP Guidelines (Updated 2024)
            pep: '2024', // CDC PEP Guidelines (Updated 2024)
            doxypep: '2024', // CDC Doxy-PEP Guidelines (Published June 2024)
            testing: '2024', // CDC HIV Testing Guidelines
            sti: '2024' // CDC STI Treatment Guidelines
        },
        who: '2024', // WHO Guidelines
        lastReview: '2026-01-24',
        nextReview: '2026-07-24' // Review every 6 months
    },
    checkForUpdates: function () {
        const today = new Date();
        const nextReview = new Date(this.guidelinesVersion.nextReview);

        if (today >= nextReview) {
            console.warn('[LIL Z] ⚠️ Guidelines review is due! Check for updates at:');
            console.warn('• CDC PrEP: https://www.cdc.gov/hiv/risk/prep/');
            console.warn('• CDC PEP: https://www.cdc.gov/hiv/risk/pep/');
            console.warn('• CDC Doxy-PEP: https://www.cdc.gov/std/doxypep/');
            console.warn('• CDC Testing: https://www.cdc.gov/hiv/testing/');
            console.warn('• CDC STI Treatment: https://www.cdc.gov/std/treatment-guidelines/');
            return false; // Needs update
        }
        return true; // Up to date
    },
    getVersionInfo: function () {
        return `<strong>Lil Z Knowledge Base</strong><br>
                Version: ${this.version}<br>
                Last Updated: ${this.lastUpdated}<br>
                Guidelines: CDC ${this.guidelinesVersion.cdc.prep} (PrEP), CDC ${this.guidelinesVersion.cdc.doxypep} (Doxy-PEP)<br>
                Next Review: ${this.guidelinesVersion.nextReview}`;
    }
};

// Auto-check on load
LIL_Z_VERSION.checkForUpdates();

// ===== LIL Z AVATAR LIBRARY =====
// Using harness.png as avatar until custom avatars are created
const LIL_Z_AVATARS = {
    // Core avatars - placeholder paths (will fallback to main)
    cool: 'images/avatars/lil-z-cool.png',           // Confident vibes (with sunglasses)
    excited: 'images/avatars/lil-z-excited.png',     // Welcoming energy (arms wide)
    hello: 'images/avatars/lil-z-hello.png',         // International greeting
    portrait: 'images/avatars/lil-z-portrait.png',   // Friendly face
    headshot: 'images/avatars/lil-z-headshot.png',   // Professional educator
    help: 'images/avatars/lil-z-help.png',           // Ready to assist (with tools)
    presenting: 'images/avatars/lil-z-presenting.png', // Explaining concepts
    highfive: 'images/avatars/lil-z-highfive.png',   // Celebrating wins
    support: 'images/avatars/lil-z-support.png',     // Caring and empathetic

    // Fallback to existing harness logo
    main: 'https://www.genspark.ai/api/files/s/j2wOdpNK',                      // Default HARNESS logo

    // Get avatar based on context
    getAvatar: function (context = 'default') {
        const contextMap = {
            'welcome': this.excited,
            'greeting': this.hello,
            'teaching': this.presenting,
            'helpful': this.help,
            'supportive': this.support,
            'celebrating': this.highfive,
            'confident': this.cool,
            'professional': this.headshot,
            'friendly': this.portrait,
            'default': this.portrait
        };

        // Return context-specific avatar, or fall back to main if file doesn't exist
        return contextMap[context] || this.main;
    },

    // Get random avatar for variety
    getRandom: function () {
        const avatarList = [
            this.cool, this.excited, this.hello, this.portrait,
            this.headshot, this.help, this.presenting, this.highfive, this.support
        ];
        return avatarList[Math.floor(Math.random() * avatarList.length)];
    },

    // Preload avatar with fallback to main if it doesn't exist
    loadWithFallback: function (avatarPath) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(avatarPath);
            img.onerror = () => resolve(this.main); // Fallback to main avatar
            img.src = avatarPath;
        });
    }
};

// ===== AVATAR FALLBACK SYSTEM =====
(function setupAvatarFallbacks() {
    Object.keys(LIL_Z_AVATARS).forEach(key => {
        if (typeof LIL_Z_AVATARS[key] === 'string') {
            const avatarPath = LIL_Z_AVATARS[key];
            const img = new Image();
            img.onerror = () => {
                LIL_Z_AVATARS[key] = LIL_Z_AVATARS.main;
            };
            img.src = avatarPath;
        }
    });
})();

// ===== LIL Z PERSONALITY & KNOWLEDGE =====
const LIL_Z_PERSONALITY = {
    name: "Lil Z",
    role: "Sexual Health Expert & Your Personal Guide",
    tone: "friendly, knowledgeable, non-judgmental, empowering",
    expertise: [
        "HIV prevention & education",
        "PrEP, PEP, and Doxy-PEP guidance",
        "SafER sex strategies",
        "Communication & consent scripts",
        "HARNESS app navigation",
        "Sexual health empowerment"
    ]
};

// ===== LIL Z KNOWLEDGE BASE =====
const LIL_Z_KNOWLEDGE = {
    hiv: {
        keywords: ['hiv', 'aids', 'virus', 'infection', 'transmission', 'undetectable', 'u=u', 'viral load', 'cd4', 'art', 'antiretroviral'],
        responses: [
            { topic: 'What is HIV?', answer: 'HIV (Human Immunodeficiency Virus) is a virus that attacks the body\'s immune system, specifically CD4 cells (T cells). Here\'s the empowering truth: with proper treatment (ART - Antiretroviral Therapy), people with HIV can live long, healthy lives and cannot transmit the virus sexually when they\'re undetectable. This is called U=U - Undetectable = Untransmittable! Modern medicine has transformed HIV from a death sentence to a manageable chronic condition. 💪✨' },
            { topic: 'U=U (Undetectable = Untransmittable)', answer: 'U=U is one of the most revolutionary discoveries in HIV prevention! When someone living with HIV takes their medication consistently and maintains an undetectable viral load (less than 200 copies/mL), they CANNOT sexually transmit HIV to their partners. Zero risk. This has been proven by major studies (PARTNER, PARTNER2, Opposites Attract) involving thousands of couples and over 100,000 condomless sex acts. Science is powerful! 🎉💉' },
            { topic: 'How is HIV transmitted?', answer: 'HIV is transmitted through: 1) <strong>Unprotected anal or vaginal sex</strong> (receptive anal sex is highest risk), 2) <strong>Sharing needles/syringes</strong> for drugs, hormones, or steroids, 3) <strong>Mother to child</strong> during pregnancy, birth, or breastfeeding (preventable with treatment!), 4) <strong>Blood transfusions</strong> (extremely rare in countries with screened blood). Good news: HIV is NOT transmitted through kissing, hugging, sharing food/drinks, toilet seats, mosquitoes, or casual contact. Knowledge is protection! 🛡️' },
            { topic: 'HIV Risk Hierarchy', answer: 'Understanding risk helps you make informed choices!<br><br><strong>Highest Risk:</strong><br>• Receptive anal sex without condoms/PrEP<br>• Sharing needles<br><br><strong>Medium Risk:</strong><br>• Insertive anal sex without protection<br>• Receptive vaginal sex without protection<br><br><strong>Lower Risk:</strong><br>• Insertive vaginal sex<br>• Oral sex (very low but not zero)<br><br><strong>No Risk:</strong><br>• Kissing, touching, mutual masturbation<br>• Sex with someone who is U=U<br>• Sex with condoms + PrEP (layered protection!)<br><br>Layer your prevention like a boss! 🛡️🛡️🛡️' },
            { topic: 'What is ART (Antiretroviral Therapy)?', answer: 'ART is life-changing medication for people living with HIV! It works by blocking HIV from copying itself, allowing your immune system to recover and stay strong. Benefits: 1) Achieves undetectable viral load (U=U!), 2) Prevents AIDS, 3) Allows long, healthy life, 4) Prevents transmission to partners & babies. Modern ART is usually 1-3 pills daily with minimal side effects. Start early, stay consistent, thrive! 💊✨' }
        ]
    },
    prep: {
        keywords: ['prep', 'pre-exposure', 'prevention', 'daily pill', 'truvada', 'descovy', 'before exposure', 'cabotegravir', 'apretude', 'injectable'],
        responses: [
            { topic: 'What is PrEP?', answer: 'PrEP (Pre-Exposure Prophylaxis) is a game-changer! It\'s medication that prevents HIV infection BEFORE exposure. When taken consistently, PrEP reduces the risk of getting HIV from sex by about 99% and from injection drug use by about 74%. Available as: 1) <strong>Daily pills</strong> (Truvada, Descovy - taken every day), 2) <strong>On-demand/2-1-1</strong> (2 pills 2-24 hrs before, 1 pill 24 hrs after, 1 pill 48 hrs after), 3) <strong>Injectable Cabotegravir (Apretude)</strong> (shot every 2 months). Think of it as your daily shield! 🛡️💊' },
            { topic: 'Who should consider PrEP?', answer: 'PrEP is for anyone who wants extra HIV protection! Especially recommended if you: 1) Have an HIV-positive sexual partner (not U=U yet), 2) Have multiple sexual partners or anonymous partners, 3) Don\'t always use condoms consistently, 4) Have recently had bacterial STIs (syphilis, gonorrhea, chlamydia), 5) Share needles/syringes, 6) Have a partner who injects drugs or has unknown HIV status. But honestly? <strong>Anyone who wants protection can talk to their doctor about PrEP.</strong> You deserve to feel fearless! ⚡✨' },
            { topic: 'How effective is PrEP?', answer: 'PrEP is incredibly effective when taken as prescribed! 📊<br><br><strong>Daily Pills:</strong> About 99% effective for HIV prevention from sex. Reaches maximum protection in: 7 days for anal sex, 21 days for vaginal sex.<br><br><strong>On-Demand (2-1-1):</strong> 86% effective, but only studied for anal sex.<br><br><strong>Injectable (Apretude):</strong> 69% MORE effective than daily pills!<br><br>The secret? <strong>CONSISTENCY!</strong> Take it daily (or follow 2-1-1 protocol), and you\'re protected. Missed doses = reduced protection. Set alarms, use pill organizers, link it to daily routines. You\'ve got this! 📅✅' },
            { topic: 'PrEP Side Effects', answer: 'Most people have NO side effects or only mild ones that go away! 💪<br><br><strong>Common (first few weeks):</strong><br>• Nausea, diarrhea, headache, fatigue<br>• Usually resolve within 2-4 weeks<br><br><strong>Rare but monitored:</strong><br>• Kidney function changes (monitored every 3-6 months)<br>• Bone density decrease (rare, stabilizes over time)<br><br><strong>Pro tip:</strong> Take with food if you get nausea! And remember: side effects don\'t mean it\'s not working. Give your body 2-4 weeks to adjust. Your healthcare provider will monitor you regularly. 🩺✅' },
            { topic: 'PrEP Cost & Access', answer: 'PrEP should be FREE or very affordable! Here\'s how: 🎯<br><br><strong>Insurance:</strong> Most plans cover PrEP 100% under ACA<br><br><strong>Manufacturer programs:</strong><br>• Gilead Advancing Access (co-pay cards, free if uninsured)<br>• No-cost PrEP for eligible patients<br><br><strong>Find PrEP near you:</strong><br>• PleasePrEPMe.org<br>• GetYourPrEP.com<br>• Local health department/community clinics<br>• Telehealth (Nurx, MISTR, Folx, etc.)<br><br><strong>Even if uninsured</strong>, you can likely get PrEP for free through patient assistance programs. Don\'t let cost stop you! 💰✅' }
        ]
    },
    pep: {
        keywords: ['pep', 'post-exposure', 'emergency', '72 hours', 'after exposure', 'morning after', 'exposed', 'emergency hiv'],
        responses: [
            { topic: 'What is PEP?', answer: 'PEP (Post-Exposure Prophylaxis) is <strong>emergency HIV prevention</strong> taken AFTER a potential exposure. ⏰🚨<br><br><strong>Timeline:</strong> Must start within 72 hours (3 days) - the sooner, the better! Ideally within 24 hours for maximum effectiveness.<br><br><strong>Treatment:</strong> 28-day course of HIV medications (usually 1-3 pills daily).<br><br><strong>Think of it like:</strong> The "morning after pill" for HIV prevention. But remember - PEP is for emergencies, NOT regular prevention. If you need PEP more than once, talk to your doctor about PrEP instead! Time matters, so act FAST! ⚡🏥' },
            { topic: 'When should I take PEP?', answer: 'Get PEP immediately if you: 🚨<br><br>1) <strong>Had condomless sex</strong> with someone who might have HIV or unknown status<br>2) <strong>Condom broke</strong> during sex<br>3) <strong>Shared needles/syringes</strong><br>4) <strong>Were sexually assaulted</strong><br>5) <strong>Occupational exposure</strong> (healthcare, first responder)<br><br><strong>START WITHIN 72 HOURS</strong> - Ideally within 24 hours! Don\'t wait to test the other person first - time is critical!<br><br><strong>Where to go:</strong> ER, sexual health clinic, primary care, Planned Parenthood. They can start you immediately. 🏥💨' },
            { topic: 'PEP effectiveness', answer: 'PEP is <strong>highly effective</strong> when started quickly and taken consistently for all 28 days! 💪<br><br><strong>Effectiveness:</strong> Reduces HIV risk by more than 80% when started within 72 hours.<br><br><strong>Keys to success:</strong><br>1) Start as soon as possible (within 24-72 hours)<br>2) Take EVERY dose for full 28 days<br>3) Don\'t skip or stop early<br>4) Follow up with HIV testing at 6 weeks, 3 months, 6 months<br><br><strong>Side effects?</strong> Similar to PrEP - usually mild and temporary. Don\'t let nausea stop you! Your health is worth it. 💊✅' },
            { topic: 'PEP vs PrEP - What\'s the difference?', answer: 'Both prevent HIV, but timing is everything! ⏰<br><br><strong>PEP (After exposure):</strong><br>• Emergency prevention<br>• Start within 72 hours AFTER exposure<br>• Take for 28 days<br>• For one-time exposures<br><br><strong>PrEP (Before exposure):</strong><br>• Ongoing prevention<br>• Take daily (or on-demand) BEFORE exposure<br>• Long-term protection<br>• For ongoing risk reduction<br><br><strong>Pro tip:</strong> If you\'ve needed PEP more than once, or have ongoing HIV risk, consider switching to PrEP for continuous protection! Talk to your doctor. 🛡️✨' }
        ]
    },
    doxypep: {
        keywords: ['doxy', 'doxypep', 'doxy-pep', 'doxycycline', 'sti', 'bacterial', 'syphilis', 'chlamydia', 'gonorrhea', 'morning after'],
        responses: [
            { topic: 'What is Doxy-PEP?', answer: 'Doxy-PEP (Doxycycline Post-Exposure Prophylaxis) is the <strong>newest tool</strong> in your prevention toolkit! 🦠💊<br><br>It\'s a dose of antibiotic (doxycycline 200mg) taken within 24-72 hours after sex to prevent bacterial STIs:<br>• <strong>Syphilis</strong> (up to 87% reduction)<br>• <strong>Chlamydia</strong> (up to 88% reduction)<br>• <strong>Gonorrhea</strong> (about 55% reduction)' },
            { topic: 'How do I take Doxy-PEP?', answer: 'Simple protocol! 📋💊<br><br><strong>Dose:</strong> 200mg doxycycline (usually 2 pills of 100mg each)<br><br><strong>When:</strong> Within 24-72 hours after sex (ideally within 24 hours)<br><br><strong>How often:</strong> No more than once per day (even if you have sex multiple times)<br><br><strong>With:</strong> Food and plenty of water to prevent nausea' },
            { topic: 'Does Doxy-PEP prevent HIV?', answer: 'NO - Doxy-PEP does NOT prevent HIV! 🚫<br><br><strong>For comprehensive protection:</strong> Use Doxy-PEP + PrEP + condoms! Layer your prevention like a boss. 🛡️🛡️🛡️' },
            { topic: 'Who should use Doxy-PEP?', answer: 'CDC recommends Doxy-PEP for gay/bi men and trans women, and anyone with a recent bacterial STI. Talk to your healthcare provider about whether it\'s right for you! 💬✅' }
        ]
    },
    testing: {
        keywords: ['test', 'testing', 'window period', 'results', 'screening', 'how often', 'when', 'frequency', 'sti test', 'hiv test', 'blood test'],
        responses: [
            { topic: 'How often should I test?', answer: 'Testing frequency depends on your risk! 🧪<br><br><strong>Every 3 months:</strong> High risk activity<br><strong>Every 6 months:</strong> Moderate sexual activity<br><strong>Annually:</strong> Minimum for all sexually active people' },
            { topic: 'Window period explained', answer: 'The window period is the time between HIV exposure and when a test can detect it. For most lab tests, it\'s 18-45 days. Follow up at 90 days for full confidence. ⏳' },
            { topic: 'Positive test result - what now?', answer: 'First: breathe. You\'ve got this. 💙 Most STIs are curable with simple antibiotics. If HIV positive, modern ART allows a long, healthy life and prevents transmission (U=U). Start treatment early and thrive! 💪✨' }
        ]
    },
    condoms: {
        keywords: ['condom', 'barrier', 'protection', 'latex', 'safe sex', 'safer sex', 'dental dam', 'gloves', 'lube', 'lubricant', 'polyurethane', 'internal condom', 'female condom'],
        responses: [
            { topic: 'Condom effectiveness', answer: 'When used correctly and consistently, condoms are 98% effective for HIV and many other STIs! 🛡️📊 The secret is using them EVERY TIME and using them CORRECTLY.' },
            { topic: 'How to use condoms correctly', answer: '1) Check expiration, 2) Pinch tip, 3) Roll down to base, 4) ADD LUBE (water or silicone-based)! Practice makes perfect. 🎓🛡️' }
        ]
    },
    stis: {
        keywords: ['sti', 'std', 'sexually transmitted', 'herpes', 'hsv', 'hpv', 'warts', 'genital warts', 'hepatitis', 'trichomoniasis', 'trich', 'mpox', 'monkeypox', 'scabies', 'crabs', 'pubic lice'],
        responses: [
            { topic: 'Common STIs overview', answer: 'STIs are common - most people get one in their lifetime! Most have NO symptoms, so regular testing is the only way to know. 🩺✅' },
            { topic: 'Herpes (HSV) facts', answer: 'Herpes is incredibly common (HSV-1: 67%, HSV-2: 11%) and manageable with antiviral meds. It\'s just a skin condition—not a moral failure! 💙✨' }
        ]
    },
    relationships: {
        keywords: ['relationship', 'partner', 'dating', 'open relationship', 'polyamory', 'monogamy', 'jealousy', 'trust', 'cheating', 'agreement', 'boundaries', 'negotiate'],
        responses: [
            { topic: 'Relationship structures', answer: 'Monogamy, open relationships, polyamory—there\'s no one "right" way! The key is clear communication and mutual consent. 💬✨' },
            { topic: 'Building sexual agreements', answer: 'Agreements = clarity = less drama! Discuss condom use, testing frequency, and emotional boundaries. Revisit every 3-6 months. 💪💙' }
        ]
    },
    mental_health: {
        keywords: ['anxiety', 'depression', 'mental health', 'stress', 'shame', 'stigma', 'self-care', 'therapy', 'support', 'emotional', 'feelings', 'wellness'],
        responses: [
            { topic: 'Sexual health stigma', answer: 'Stigma is real, but YOU are not defined by it! Taking care of your health is brave and responsible. 💙✨' },
            { topic: 'Dealing with diagnosis anxiety', answer: 'Waiting for results is hard. Practice self-care, avoid Dr. Google, and remember: most things are treatable or manageable. You\'re not alone! 💚🛡️' }
        ]
    },
    communication: {
        keywords: ['talk', 'communicate', 'conversation', 'disclosure', 'tell', 'share', 'status', 'consent', 'boundaries', 'permission'],
        responses: [
            { topic: 'Starting a sexual health conversation', answer: 'Try: "Before we go further, I\'d love to talk about sexual health. When were you last tested?" Being direct shows confidence. 💬✨' },
            { topic: 'Disclosing HIV status', answer: 'Try: "I\'m HIV-positive and undetectable (U=U), which means I can\'t transmit the virus. I\'m on treatment and my health is great!" Your status doesn\'t define you. 💎' }
        ]
    },
    navigation: {
        keywords: ['how to use', 'navigate', 'app', 'features', 'where', 'find', 'help', 'guide', 'tour', 'what can'],
        responses: [
            { topic: 'How to use the HARNESS app', answer: 'Explore the MATCH Journey, build Agreements, get daily Affirmations, and deep-dive into our Visual Library. We\'re here to empower you! 📱🎉' }
        ]
    },
    general: {
        keywords: ['help', 'support', 'scared', 'nervous', 'anxious', 'worried', 'afraid', 'confused'],
        responses: [
            { topic: 'You\'re not alone', answer: 'Ask questions, seek information, take control. I\'m here to guide you every step of the way. You deserve care and respect. 💪✨' }
        ]
    }
};

// ===== LIL Z RESPONSE GENERATOR =====
function generateLilZResponse(question) {
    const lowerQuestion = question.toLowerCase();

    if (!question || typeof question !== 'string') return getDefaultResponse();

    if (typeof LIL_Z_KNOWLEDGE === 'undefined' || !LIL_Z_KNOWLEDGE) return getDefaultResponse();

    for (const [category, data] of Object.entries(LIL_Z_KNOWLEDGE)) {
        if (!data || !data.keywords || !data.responses) continue;

        const matchesKeyword = data.keywords.some(keyword => lowerQuestion.includes(keyword));

        if (matchesKeyword) {
            for (const response of data.responses) {
                if (!response || !response.topic || !response.answer) continue;
                const topicWords = response.topic.toLowerCase().split(' ');
                if (topicWords.some(word => lowerQuestion.includes(word))) {
                    return `<strong>${response.topic}</strong><br><br>${response.answer}`;
                }
            }
            const firstResponse = data.responses[0];
            if (firstResponse) return `<strong>${firstResponse.topic}</strong><br><br>${firstResponse.answer}`;
        }
    }
    return getDefaultResponse();
}

function getDefaultResponse() {
    return `<strong>Hey! I'm Lil Z, your guide through the HARNESS Project! 🌟</strong><br><br>
        I can help you with:<br><br>
        🦠 <strong>HIV & U=U</strong> - Understanding transmission and treatment<br>
        💊 <strong>PrEP & PEP</strong> - Prevention before and after exposure<br>
        🧪 <strong>Testing</strong> - Guidance and frequency<br>
        🛡️ <strong>Barriers</strong> - Condoms and safer sex strategies<br>
        💬 <strong>Communication</strong> - Disclosure and consent scripts<br><br>
        What would you like to know? 💪✨`;
}

// ===== LIL Z CHAT INTERFACE =====
function openLilZChat(context = 'general') {
    if (typeof createModal !== 'function') {
        console.error('🐾 Lil Z Error: createModal function not found!');
        alert('Lil Z is still loading... Please wait a moment.');
        return;
    }

    let headerAvatar = LIL_Z_AVATARS.getAvatar('professional');
    let welcomeAvatar = LIL_Z_AVATARS.getAvatar('greeting');

    if (context === 'welcome') {
        headerAvatar = LIL_Z_AVATARS.getAvatar('excited');
        welcomeAvatar = LIL_Z_AVATARS.getAvatar('excited');
    }

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
                        <p>I'm your personal guide through the HARNESS Project. I can help with:</p>
                        <ul class="topic-list">
                            <li>🦠 HIV prevention & education (PrEP, PEP, U=U)</li>
                            <li>💊 Doxy-PEP & STI prevention</li>
                            <li>🧪 Testing guidance</li>
                            <li>🛡️ Barrier methods & SafER sex</li>
                            <li>💬 Communication scripts</li>
                        </ul>
                        <p><strong>What would you like to know?</strong> 🌟</p>
                    </div>
                </div>
            </div>
            <div class="lil-z-suggestions" id="lil-z-suggestions">
                <button class="suggestion-chip" onclick="askLilZ('What is PrEP?')">What is PrEP?</button>
                <button class="suggestion-chip" onclick="askLilZ('Tell me about U=U')">What is U=U?</button>
                <button class="suggestion-chip" onclick="askLilZ('How often should I test?')">Testing frequency</button>
            </div>
            <div class="lil-z-input-container">
                <input type="text" class="lil-z-input" id="lil-z-input" placeholder="Ask Lil Z anything..." onkeypress="handleLilZEnter(event)">
                <button class="lil-z-send-btn" onclick="sendLilZMessage()"><span class="send-icon">➤</span></button>
            </div>
            <div class="lil-z-footer">
                <small>💡 Educational info only. Consult healthcare providers for medical advice.</small>
                <div class="lil-z-version-info">
                    <small>📋 Based on CDC ${LIL_Z_VERSION.guidelinesVersion.cdc.prep} Guidelines | Last updated: ${LIL_Z_VERSION.lastUpdated}</small>
                </div>
            </div>
        </div>
    `;

    const modal = createModal(chatHTML);
    document.body.appendChild(modal);
}

// ===== LIL Z FUNCTIONS =====
function askLilZ(question) {
    const input = document.getElementById('lil-z-input');
    if (input) {
        input.value = question;
        sendLilZMessage();
    }
}

function handleLilZEnter(event) {
    if (event.key === 'Enter') sendLilZMessage();
}

function sendLilZMessage() {
    const input = document.getElementById('lil-z-input');
    const question = input.value.trim();
    if (!question) return;
    addLilZMessage(question, 'user');
    input.value = '';
    const suggestions = document.getElementById('lil-z-suggestions');
    if (suggestions) suggestions.style.display = 'none';
    setTimeout(() => {
        const response = generateLilZResponse(question);
        addLilZMessage(response, 'bot');
    }, 600);
}

function addLilZMessage(message, type) {
    const container = document.getElementById('lil-z-messages');
    if (!container) return;

    let avatarSrc = (type === 'user') ? LIL_Z_AVATARS.getAvatar('friendly') : LIL_Z_AVATARS.getRandom();

    const messageDiv = document.createElement('div');
    messageDiv.className = `lil-z-message ${type}-message fade-in`;
    messageDiv.innerHTML = `
        <div class="message-avatar"><img src="${avatarSrc}" alt="${type}" class="avatar-img"></div>
        <div class="message-content">${message}</div>
    `;
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

function addLilZFloatingButton() {
    if (document.getElementById('lil-z-float-btn')) return;
    const floatingBtn = document.createElement('div');
    floatingBtn.id = 'lil-z-float-btn';
    floatingBtn.className = 'lil-z-floating-btn';
    floatingBtn.innerHTML = `
        <img src="${LIL_Z_AVATARS.getAvatar('cool')}" alt="Ask Lil Z" class="lil-z-float-avatar">
        <div class="lil-z-float-tooltip">Ask Lil Z!</div>
    `;
    floatingBtn.onclick = () => openLilZChat('general');
    document.body.appendChild(floatingBtn);
}

// ===== LIL Z STYLES =====
const lilZStyles = document.createElement('style');
lilZStyles.textContent = `
    .lil-z-floating-btn { position: fixed; bottom: 90px; right: 20px; width: 80px; height: 80px; background: linear-gradient(135deg, #00BDBD, #FFB627); border-radius: 50%; box-shadow: 0 4px 20px rgba(0, 189, 189, 0.4); cursor: pointer; z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 4px; animation: pulse 2s infinite; }
    .lil-z-float-avatar { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 3px solid white; }
    .lil-z-float-tooltip { position: absolute; bottom: 85px; right: 0; background: #2C3E50; color: white; padding: 8px 16px; border-radius: 8px; font-size: 14px; opacity: 0; transition: opacity 0.3s; pointer-events: none; white-space: nowrap; }
    .lil-z-floating-btn:hover .lil-z-float-tooltip { opacity: 1; }
    @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
    .lil-z-chat-companion { max-width: 500px; width: 90vw; background: white; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; max-height: 80vh; }
    .lil-z-chat-header { background: linear-gradient(135deg, #00BDBD, #FFB627); color: white; padding: 15px; display: flex; align-items: center; gap: 15px; }
    .lil-z-avatar { width: 80px; height: 80px; border-radius: 50%; overflow: hidden; border: 2px solid white; background: white; }
    .lil-z-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .lil-z-messages { flex: 1; overflow-y: auto; padding: 15px; background: #f8f9fa; min-height: 300px; }
    .lil-z-message { display: flex; gap: 10px; margin-bottom: 12px; }
    .bot-message { flex-direction: row; }
    .user-message { flex-direction: row-reverse; }
    .message-avatar { width: 50px; height: 50px; border-radius: 50%; overflow: hidden; border: 1px solid #ddd; }
    .message-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .message-content { background: white; padding: 10px 15px; border-radius: 12px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); max-width: 80%; font-size: 14px; line-height: 1.5; }
    .user-message .message-content { background: #00BDBD; color: white; }
    .lil-z-input-container { padding: 15px; border-top: 1px solid #eee; display: flex; gap: 10px; }
    .lil-z-input { flex: 1; padding: 10px 15px; border: 1px solid #ddd; border-radius: 20px; outline: none; }
    .lil-z-send-btn { background: #00BDBD; border: none; width: 40px; height: 40px; border-radius: 50%; color: white; cursor: pointer; }
    .lil-z-footer { padding: 10px; background: #fef9e7; font-size: 11px; text-align: center; color: #7f8c8d; }
`;
document.head.appendChild(lilZStyles);

// MODAL HELPER
if (typeof createModal === 'undefined') {
    window.createModal = function (content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:10000;padding:20px;';
        modal.innerHTML = `
            <div style="position: relative; max-width: 600px; width: 100%;">
                <button onclick="this.closest('.modal-overlay').remove()" style="position:absolute;top:-40px;right:0;background:white;border:none;width:30px;height:30px;border-radius:50%;cursor:pointer;">✕</button>
                ${content}
            </div>
        `;
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
        return modal;
    };
}

// AUTO-INIT
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addLilZFloatingButton);
} else {
    addLilZFloatingButton();
}
