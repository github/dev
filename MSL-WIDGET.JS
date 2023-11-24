let isChatOpen = false;

function toggleChatContainer() {
    const chatContainer = document.getElementById("chat-container");
    chatContainer.style.display = isChatOpen ? "none" : "block";
    isChatOpen = !isChatOpen;
}

function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") {
        return;
    }

    displayMessage(userInput, "user");

    // Simulate a delay before the chatbot responds (adjust the delay time if needed)
    setTimeout(() => {
        simulateBotTyping();
        setTimeout(() => {
            const response = generateResponse(userInput);
            displayMessage(response, "bot");
            hideBotTypingIndicator();
            document.getElementById("user-input").value = ""; // Clear the input field

            // Scroll to the bottom after a short delay
            setTimeout(() => {
                const chatMessages = document.getElementById("chat-messages");
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 100); // Adjust the delay time if needed

        }, 300); // Adjust the delay time for the typing effect
    }, 300); // 1000 milliseconds (1 second) delay before the bot starts typing
} 

function simulateBotTyping() {
    const botTypingIndicator = document.createElement("div");
    botTypingIndicator.textContent = "Bot is typing...";
    botTypingIndicator.classList.add("bot", "typing-indicator");
    const chatMessages = document.getElementById("chat-messages");
    chatMessages.appendChild(botTypingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideBotTypingIndicator() {
    const botTypingIndicator = document.querySelector(".bot.typing-indicator");
    if (botTypingIndicator) {
        botTypingIndicator.remove();
    }
} 
 
function generateResponse(userQuery) {
    const helpContent = {
        'Eva': { answer: 'Yes! that\'s me' }, 
        'art wall': { href: '/category/art-wall', answer: 'Our art wall category includes a variety of beautiful artworks. Check it out!' },
        'security': { href: '/category/security', answer: 'Explore our security category for advanced security solutions.' },
        'headphones': { href: '/category/headphones', answer: 'Discover high-quality headphones for an immersive audio experience.' },
        'self care': { href: '/category/self-care', answer: 'Take care of yourself with our self-care products. Browse the collection!' },
        'electronics': { href: '/category/electronics', answer: 'Explore the latest electronics and gadgets in our electronics category.' },
        'gaming': { href: '/category/gaming', answer: 'Level up your gaming experience with our gaming products. Check them out!' },
        'all products': { href: '/products', answer: 'View all our products in one place. Find what you need!' },
        'faq': { href: '/faq', answer: 'Visit our FAQ page for answers to commonly asked questions.' },
        'shipping information': { href: '/shipping-infor', answer: 'Find detailed information about shipping on our shipping information page.' },
        'refund & returns': { href: '/refund-policy', answer: 'Learn about our refund and returns policy. Your satisfaction is our priority!' },
        'contact us': { href: '/contact', answer: 'Reach out to us! Contact our customer support for assistance.' },
        'payment options': { href: '/payment-options', answer: 'Check out our flexible payment options for a convenient shopping experience.' },
        'same day delivery': { href: '/same-day-delivery', answer: 'Experience same-day delivery on select products. Terms and conditions apply.' },
        'track order': { href: '/track-shipment', answer: 'Track the status of your order with our easy-to-use tracking system.' },
        'about us': { href: '/about-us', answer: 'Learn more about us and our commitment to providing quality products and services.' },
        'privacy policy': { href: '/privacy', answer: 'Your privacy matters. Read our privacy policy for details on how we handle your information.' },
        'black friday': { answer: 'Celebrate Black Friday with us! Enjoy a 50% discount on selected items and get free shipping on your order. Don’t miss out on these incredible deals!' },
        '50% off': { answer: 'Enjoy a 50% discount on selected items! This special offer is part of our Black Friday celebration. Shop now and save big!' },
        'free shipping': { answer: 'Great news! We\'re offering free shipping on all orders as part of our Black Friday promotion. Don’t miss out – shop now!' },
        'best sellers': { href: '/electronics', answer: 'Explore our best-selling products and find the most popular items among our customers.' },
        'new arrivals': { href: '/products', answer: 'Discover the latest additions to our product catalog. Check out our new arrivals and stay updated with the trends.' },
        'how to return an item': { href: '/refund-policy', answer: 'Need to return an item? Follow our simple return process to ensure a hassle-free return.' },
        'order status': { href: '/track-shipement', answer: 'Check the current status of your order by visiting our order status page. Stay updated on your purchase!' },
        'how to contact customer support': { href: '/contact', answer: 'Have a question or need assistance? Contact our customer support team, and we’ll be happy to help.' },
        // Add more relevant keywords and their responses
        // ...
        'change shipping address': { href: '/shipping-infor', answer: 'To change your shipping address after placing an order, please contact our customer support at support@mysmartlife.ca as soon as possible. Changes may not be possible once the order is processed.' },
        'international shipping': { answer: 'Yes, we offer international shipping to many countries. During the checkout process, you can select your country to see if we deliver to your location. Keep in mind that international shipping may have additional fees and longer delivery times.' }, 
        'lost package': { answer: 'If you believe your package is lost or missing, please contact our customer support at support@mysmartlife.ca with your order details. We will initiate an investigation with the shipping carrier to locate your package and provide a resolution.' },
        'delivery delays': { answer: 'Delivery delays may occur due to factors such as weather conditions, customs processing, or other unforeseen circumstances. If you experience a significant delay, please contact our customer support for assistance.' },  
        'order late': { answer: "We understand the anticipation of tracking your order. Some tracking numbers may take a bit of time to update due to logistical processes. We want to assure you that everything is under control. Kindly be patient during this process. Your order is safe with us, and we're working diligently to provide accurate updates." },
        'tracking delay': { answer: "If your order tracking is delayed, don't worry! Tracking numbers may take some time to update due to logistical processes. We assure you that your order is safe, and we're working diligently to provide accurate updates. Thank you for your patience." },
        'hey': { answer: 'Hello! How can I assist you today?' },
        'hi': { answer: 'Hi there! How can I help you?' },
        'hello': { answer: 'Hello! Welcome, how may I assist you?' },
        'need help': { answer: "Absolutely! I'm here to help. What do you need assistance with?" },
        'by': { answer: 'Goodbye! If you have any more questions, feel free to ask.' },
        'see you': { answer: 'See you later! If you need further assistance, don’t hesitate to reach out.' },
        'later': { answer: 'Goodbye for now! If you have more questions later, feel free to come back.' },
        'thank you': { answer: "You're welcome! If you need anything else, feel free to ask." },
    };
 
    let bestMatch = null;
    let bestScore = 0;

    for (const [keyword, data] of Object.entries(helpContent)) {
        // Check if the keyword is a non-empty string
        if (typeof keyword === 'string' && keyword.trim() !== '') {
            const score = getScore(userQuery, keyword);
            if (score > bestScore) {
                bestMatch = { keyword, data, score };
                bestScore = score;
            }
        }
    }

    if (bestMatch) {
        // Add a threshold to ensure the match is relevant enough
        if (bestScore >= 0.5) {
            const { data } = bestMatch;
            const { href, answer } = data;
            let linkMessage = '';

            if (href) {
                linkMessage = `Please follow this <a style="color:red;" href="${href}" target="_blank">link</a>.`;
            }
 
            return `${answer} ${linkMessage}`;
        } else {
            // If the score is below a certain threshold, consider it not relevant enough
            return "I'm sorry, I couldn't find information related to your query. Please try asking in a different way or check our FAQ for more assistance.";
        }
    } else {
        return "I'm sorry, I couldn't find information related to your query. Please try asking in a different way or check our FAQ for more assistance.";
    }
} 

function getScore(userInput, keyword) {
    const queryWords = userInput.split(/\s+/);
    const matchCount = queryWords.filter(word => new RegExp(`\\b${word}\\b`, 'i').test(keyword)).length;
    return matchCount;
}

function displayMessage(message, sender) {
    const chatContainer = document.getElementById("chat-container");
    const chatMessages = chatContainer.querySelector("#chat-messages");

    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container", sender);

    const messageDiv = document.createElement("div");
    const timestamp = getTimestamp();
    messageDiv.innerHTML = `<p>${message}</p><span class="message-time">${timestamp}</span>`;
    messageDiv.classList.add("message");
    messageContainer.appendChild(messageDiv);

    chatMessages.appendChild(messageContainer);

    // Use a short delay before scrolling to the bottom
    setTimeout(() => {
        const isTouchDevice = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

        if (isTouchDevice) {
            chatContainer.scrollTo({
                top: chatContainer.scrollHeight,
                behavior: 'smooth'
            });
        } else {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, 50); // Adjust the delay time if needed
} 

  
// Add an event listener for the "keydown" event on the input field
document.getElementById("user-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}); 
  
function getTimestamp() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
  // Function to show the welcome message
    function showWelcomeMessage() {
        const welcomeMessage = document.getElementById("welcome-message");
        welcomeMessage.style.display = "block";
    }

    // Function to hide the welcome message
    function hideWelcomeMessage() {
        const welcomeMessage = document.getElementById("welcome-message");
        welcomeMessage.style.display = "none";
    }

    // Initial check and show the welcome message if no messages are present
    window.addEventListener("load", function () {
        const chatMessages = document.getElementById("chat-messages");
        if (chatMessages.children.length === 0) {
            showWelcomeMessage();
        }
    }); 