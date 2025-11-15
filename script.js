const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

const responses = [
  {
    keywords: ["hello", "hi", "hey"],
    reply: () => [
      "Hi there! How can I assist you today?",
      "Hello! Is there anything you’d like to discuss?",
      "Hey! Ready whenever you are."
    ][Math.floor(Math.random()*3)]
  },
  {
    keywords: ["life", "meaning"],
    reply: user => [
      `That's a profound question, "${user}". Philosophers have pondered this for ages. What's your view?`,
      "Everyone has their own perspective on meaning. Are you reflecting on something specific?",
      "Life is a journey—sometimes pondering the question is more important than the answer!"
    ][Math.floor(Math.random()*3)]
  },
  {
    keywords: ["weather"],
    reply: () => [
      "I don't have live weather data, but blue skies and clear minds are always welcome!",
      "Wherever you are, I hope the weather suits your mood.",
      "I'm not connected to a weather service, but I encourage you to step outside and enjoy it!"
    ][Math.floor(Math.random()*3)]
  },
  {
    keywords: ["time"],
    reply: () => [
      `I'm timeless, but according to your device, it's ${new Date().toLocaleTimeString()}.`,
      "Time is a concept that keeps us moving forward. How can I help you today?",
      "Don't worry about the clock—I'm here when you need me!"
    ][Math.floor(Math.random()*3)]
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
