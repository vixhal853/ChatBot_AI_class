const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

const responses = [
  // Greetings
  { keywords: ["hello", "hi", "hey", "greetings"], reply: () => [
      "Hi there! What brings you here today?",
      "Hello! How can I assist you?",
      "Hey! Ask me anything; I'm here to help."
    ][Math.floor(Math.random()*3)]
  },
  // Technology
  { keywords: ["ai", "machine learning", "gpt", "robot"], reply: () => [
      "AI, or Artificial Intelligence, is the field of making machines think more like humans.",
      "Machine learning lets computers learn from data without being explicitly programmed.",
      "GPT models are powerful AI systems trained on vast amounts of data to understand and generate text."
    ][Math.floor(Math.random()*3)]
  },
  // Science
  { keywords: ["gravity", "atoms", "biology", "physics"], reply: () => [
      "Gravity keeps planets in orbit and our feet on the ground!",
      "Atoms are the smallest building blocks of matter.",
      "Physics helps us understand how the universe works, from stars to tiny particles."
    ][Math.floor(Math.random()*3)]
  },
  // Math
  { keywords: ["pi", "equation", "integral", "math", "derivative"], reply: () => [
      "Pi is approximately 3.14159, and it's the ratio of a circle's circumference to its diameter.",
      "Math makes the world more precise and helps solve big problems.",
      "An integral is used to find areas under curves, while a derivative computes rates of change."
    ][Math.floor(Math.random()*3)]
  },
  // Philosophy
  { keywords: ["life", "meaning", "purpose", "exist"], reply: () => [
      "The meaning of life is a personal quest—what inspires you?",
      "Great question! Many philosophers say life’s meaning is created by our actions.",
      "Purpose can be shaped by values, passions, and connections."
    ][Math.floor(Math.random()*3)]
  },
  // Humor
  { keywords: ["joke", "funny", "laugh"], reply: () => [
      "Why did the computer get cold? It left its Windows open!",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
      "I would tell you a joke about UDP, but you might not get it."
    ][Math.floor(Math.random()*3)]
  },
  // Food
  { keywords: ["pizza", "food", "recipe", "cook"], reply: () => [
      "Pizza is awesome—cheese, sauce, and any topping you like!",
      "Looking for a recipe? How about pasta—quick and delicious!",
      "Cooking combines science and creativity to make tasty meals."
    ][Math.floor(Math.random()*3)]
  },
  // Weather
  { keywords: ["weather", "sunny", "rain", "forecast"], reply: () => [
      "Sorry, I can't get the live weather, but I hope it's pleasant where you are!",
      "Sunny days bring happiness, rainy days bring coziness!",
      "You can check a weather app for the latest updates."
    ][Math.floor(Math.random()*3)]
  },
  // Sports
  { keywords: ["football", "soccer", "olympics", "game"], reply: () => [
      "Football (soccer) is loved around the world!",
      "The Olympics bring people together for friendly competition.",
      "Games and sports are great for fun and teamwork."
    ][Math.floor(Math.random()*3)]
  },
  // Pop Culture
  { keywords: ["movie", "music", "star wars", "bingewatch"], reply: () => [
      "Great movies spark imagination—any favorite genres?",
      "Music mixes emotions and stories in creative ways.",
      "The Star Wars saga has inspired generations since 1977."
    ][Math.floor(Math.random()*3)]
  },
  // Help and FAQ
  { keywords: ["help", "support", "faq", "problem"], reply: () => [
      "I'm here to assist! Ask a question or describe your issue.",
      "Support starts by understanding the problem. What can I help with?",
      "Feel free to ask for advice or more info anytime."
    ][Math.floor(Math.random()*3)]
  },
  // Definitions
  { keywords: ["define", "what is", "meaning of"], reply: () => [
      "Can you specify which word you'd like me to define?",
      "Happy to help! What term are you curious about?",
      "To understand something, it's important to look at context and usage."
    ][Math.floor(Math.random()*3)]
  },
  // Time/Date
  { keywords: ["time", "date", "day", "month"], reply: () => [
      `It's currently ${new Date().toLocaleString()}.`,
      "Every day brings new opportunities. What shall we talk about next?",
      "Time keeps moving, but I'm always here to chat."
    ][Math.floor(Math.random()*3)]
  },
  // Fallback
  { keywords: [], reply: user =>
      [
        `That's really interesting—can you tell me more about "${user}"?`,
        "Could you clarify what you mean?",
        "Great question! I'd love to hear more.",
        "I'm still learning; can you rephrase or ask something different?"
      ][Math.floor(Math.random()*4)]
  }
];


// Smarter matching with reflection for LLM feel
function findResponse(message, userMsgRaw) {
  message = message.toLowerCase();
  for (let r of responses) {
    if (r.keywords.some(kw => message.includes(kw))) {
      return typeof r.reply === "function" ? r.reply(userMsgRaw) : r.reply;
    }
  }
  // Fallback, echoing user
  return [
    `That's interesting—let's talk more about "${userMsgRaw}".`,
    "I’d like to understand you better. Could you elaborate?",
    "Great question! Could you provide more details so I can help?"
  ][Math.floor(Math.random()*3)];
}

function addMsg(content, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-message ${sender}`;
  msgDiv.textContent = content;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener("submit", e => {
  e.preventDefault();
  const msg = userInput.value.trim();
  if (!msg) return;
  addMsg(msg, "user");
  userInput.value = "";
  setTimeout(() => addMsg(findResponse(msg, msg), "bot"), 600);
});

window.onload = () => {
  addMsg("Hello! I'm your LLM-mimic chatbot. Ask me anything.", "bot");
};
