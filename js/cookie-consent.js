// Cookie Consent Banner
// Automatically adds a cookie consent banner to the page
// Created: January 2026

(function () {
    'use strict';

    // Check if consent has already been given
    const consentGiven = localStorage.getItem('harness_cookie_consent');

    if (!consentGiven) {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', showCookieBanner);
        } else {
            showCookieBanner();
        }
    }

    function showCookieBanner() {
        // Create banner HTML
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.innerHTML = `
            <style>
                #cookie-consent-banner {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(135deg, #00BDBD, #F6CC00);
                    color: white;
                    padding: 20px;
                    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.2);
                    z-index: 10000;
                    font-family: 'Bree Serif', sans-serif;
                    animation: slideUp 0.5s ease-out;
                }
                
                @keyframes slideUp {
                    from {
                        transform: translateY(100%);
                    }
                    to {
                        transform: translateY(0);
                    }
                }
                
                #cookie-consent-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    flex-wrap: wrap;
                }
                
                #cookie-consent-text {
                    flex: 1;
                    min-width: 300px;
                }
                
                #cookie-consent-text h3 {
                    margin: 0 0 10px 0;
                    font-size: 1.3em;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
                }
                
                #cookie-consent-text p {
                    margin: 0;
                    font-size: 0.95em;
                    line-height: 1.5;
                    opacity: 0.95;
                }
                
                #cookie-consent-text a {
                    color: white;
                    text-decoration: underline;
                    font-weight: 600;
                }
                
                #cookie-consent-buttons {
                    display: flex;
                    gap: 15px;
                    flex-wrap: wrap;
                }
                
                .cookie-btn {
                    padding: 12px 30px;
                    border: none;
                    border-radius: 25px;
                    font-family: 'Bree Serif', sans-serif;
                    font-size: 1em;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-weight: 600;
                }
                
                #cookie-accept {
                    background: white;
                    color: #00BDBD;
                }
                
                #cookie-accept:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                }
                
                #cookie-decline {
                    background: rgba(255, 255, 255, 0.2);
                    color: white;
                    border: 2px solid white;
                }
                
                #cookie-decline:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
                
                @media (max-width: 768px) {
                    #cookie-consent-content {
                        flex-direction: column;
                        text-align: center;
                    }
                    
                    #cookie-consent-buttons {
                        justify-content: center;
                        width: 100%;
                    }
                    
                    .cookie-btn {
                        flex: 1;
                        min-width: 120px;
                    }
                }
            </style>
            
            <div id="cookie-consent-content">
                <div id="cookie-consent-text">
                    <h3>🍪 We Use Cookies</h3>
                    <p>
                        We use cookies to enhance your experience and understand how you use our site. 
                        By clicking "Accept", you consent to our use of cookies. 
                        <a href="legal/cookies.html" target="_blank">Learn more</a> | 
                        <a href="legal/privacy.html" target="_blank">Privacy Policy</a>
                    </p>
                </div>
                <div id="cookie-consent-buttons">
                    <button id="cookie-accept" class="cookie-btn">Accept Cookies</button>
                    <button id="cookie-decline" class="cookie-btn">Decline</button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        // Add event listeners
        document.getElementById('cookie-accept').addEventListener('click', function () {
            acceptCookies();
        });

        document.getElementById('cookie-decline').addEventListener('click', function () {
            declineCookies();
        });
    }

    function acceptCookies() {
        localStorage.setItem('harness_cookie_consent', 'accepted');
        localStorage.setItem('harness_cookie_consent_date', new Date().toISOString());
        hideBanner();

        // Enable analytics or other tracking here if needed
        console.log('Cookie consent accepted');
    }

    function declineCookies() {
        localStorage.setItem('harness_cookie_consent', 'declined');
        localStorage.setItem('harness_cookie_consent_date', new Date().toISOString());
        hideBanner();

        // Disable analytics or other tracking here
        console.log('Cookie consent declined');
    }

    function hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            // Check if animation style is already injected, if not adding inline here strictly for the exit animation
            // The main styles are injected with the HTML
            banner.style.transition = 'transform 0.5s ease-out';
            banner.style.transform = 'translateY(100%)';

            setTimeout(function () {
                banner.remove();
            }, 500);
        }
    }
})();
