const axios = require('axios');
const { command } = require("../lib");
const { enableChatbot, disableChatbot, isChatbotEnabled } = require("../DB/chatbot");

command(
    {
        pattern: "chatbot",
        desc: "Enable/Disable chatbot in a chat",
        fromMe: true,
        type: "ai",
    },
    async (message, match) => {
        await message.react("⏳️")
        if (!match) return await message.reply("Use `.chatbot on` or `.chatbot off`");

        if (match.toLowerCase() === "on") {
            await enableChatbot(message.jid);
            return await message.react("✅");
        } else if (match.toLowerCase() === "off") {
            await disableChatbot(message.jid);
            return await message.react("❌");
        } else {
            return await message.reply("Invalid option! Use `.chatbot on` or `.chatbot off`.");
        }
    }
);

command(
    {
        on: "text",
        fromMe: false,
        dontAddCommandList: true,
    },
    async (message) => {
        const isEnabled = await isChatbotEnabled(message.jid);
        if (!isEnabled) return;
        if (!message.text) return;

        // Ignore chatbot enable/disable commands and bot's confirmation messages
        const ignoreMessages = [".chatbot on", ".chatbot off", "✅ chatbot enabled", "❌ chatbot disabled"];
        if (ignoreMessages.some((txt) => message.text.toLowerCase().includes(txt))) return;

        try {
            const apiUrl = `https://nikka-api.vercel.app/ai/gemini?q=${encodeURIComponent(message.text)}&apiKey=nikka`;
            const response = await axios.get(apiUrl);
            const replyText = response.data.response || "⚠️ No response from AI.";
            return await message.reply(replyText);
        } catch (error) {
            console.error("AI API Error:", error);
            return await message.reply("⚠️ Error getting AI response.");
        }
    }
);
