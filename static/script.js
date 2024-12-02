document.addEventListener("DOMContentLoaded", () => {
    const chatbox = document.getElementById("chatbox");
    const messagebox = document.getElementById("messagebox");
    const sendButton = document.getElementById("send-button");
    const topDiv = document.querySelector(".top");

    // Function to generate long responses
    const generateLongResponse = () => {
        const paragraphs = [
            "Here’s a longer response to keep the conversation going. I can provide you with more detailed information, or we can discuss various topics in depth. I could give you insights into technology, science, or even some fun trivia if you prefer!",
            "Did you know that artificial intelligence is a rapidly advancing field? It's being used for various applications from healthcare to entertainment. The possibilities of AI are endless, and the future looks exciting! Let’s discuss how it might affect the world in the coming years.",
            "Let’s talk about something fun! Have you ever heard of the concept of parallel universes? It's a fascinating theory in physics that suggests the existence of multiple realities, where different versions of us live out different lives. What do you think about that?",
            "It’s always great to dive deeper into interesting topics. For instance, history is full of events that shaped our present world. How about we explore some of the most significant historical moments? There’s so much to learn and discuss, from ancient civilizations to modern history!"
        ];
        return paragraphs[Math.floor(Math.random() * paragraphs.length)];
    };

    // Function to append a message to the chatbox
    const appendMessage = (message, isUser = true) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", isUser ? "user-message" : "bot-message");
        messageElement.textContent = message;
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to the latest message
    };

    // Function to adjust the height of the textarea
    const adjustTextareaHeight = () => {
        // Reset height to auto to calculate the scrollHeight correctly
        messagebox.style.height = 'auto';
        // Calculate the new height, capped at 100px
        const newHeight = Math.min(messagebox.scrollHeight, 200);
        messagebox.style.height = newHeight + 'px';
    };

    // Initial adjustment in case there's pre-filled content
    adjustTextareaHeight();

    // Handle input in textarea
    messagebox.addEventListener('input', adjustTextareaHeight);

    // Handle send button click
    sendButton.addEventListener("click", () => {
        const userMessage = messagebox.value.trim();
        if (userMessage) {
            appendMessage(userMessage, true); // Add user's message
            messagebox.value = ""; // Clear input box
            adjustTextareaHeight(); // Reset height

            // Add bot response after a short delay with dynamic long response
            setTimeout(() => {
                const botMessage = generateLongResponse(); // Generate a long response
                appendMessage(botMessage, false); // Add the long response to the chat
            }, 500);
        }
        console.log('hellllo')
    });

    // Handle Enter key to send message
    messagebox.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendButton.click();
        }
    });
});