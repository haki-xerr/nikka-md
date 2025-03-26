const fs = require("fs");
const { command } = require("../lib");
const path = "./autodl_config.json"; // Path for the JSON file

// Initialize the configuration JSON file if it doesn't exist
if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify({ isAutoDownloaderEnabled: false }, null, 4));
}

// Function to read the toggle state
function getAutoDownloadState() {
    const config = JSON.parse(fs.readFileSync(path, "utf8"));
    return config.isAutoDownloaderEnabled;
}

// Function to update the toggle state
function setAutoDownloadState(state) {
    fs.writeFileSync(path, JSON.stringify({ isAutoDownloaderEnabled: state }, null, 4));
}

// Command to toggle auto-downloader
command(
    {
        pattern: "autott ?(on|off)?", // Matches "!autodl on" or "!autodl off"
        fromMe: true, // Only the bot owner can toggle the state
        desc: "Enable or disable TikTok auto-downloader",
        type: "downloader",
    },
    async (message, match) => {
        const state = match && match.trim().toLowerCase(); // Get the toggle state

        if (!state) {
            // If no state is provided, show the current status
            const status = getAutoDownloadState() ? "ON" : "OFF";
            return await message.reply(`Auto-downloader is currently **${status}**.`);
        }

        // Update the toggle state
        if (state === "on") {
            setAutoDownloadState(true);
            await message.reply("✅ TikTok auto-downloader has been enabled.");
        } else if (state === "off") {
            setAutoDownloadState(false);
            await message.reply("❌ TikTok auto-downloader has been disabled.");
        } else {
            await message.reply("Invalid command. Use `!autodl on` or `!autodl off`.");
        }
    }
);

// Auto-downloader triggered on text
command(
    {
        pattern: ".*", // Matches all text messages
        on: "text", // Triggered on text messages
        desc: "Detects TikTok links and downloads videos automatically",
        dontAddCommandList: true,
    },
    async (message) => {
        // Check if the auto-downloader is enabled
        if (!getAutoDownloadState()) return;

        // Extract the full text from the message
        const text = message.text || "";

        // TikTok link detection regex
        const tiktokRegex = /(https?:\/\/(?:www\.)?(tiktok\.com\/|vm\.tiktok\.com\/)[^\s]+)/;

        // Extract the first valid TikTok link from the text
        const matchResult = text.match(tiktokRegex);
        if (!matchResult) return; // Exit if no TikTok link is found

        const tiktokLink = matchResult[0]; // The first matched TikTok link

        // Acknowledge detection
        await message.reply("TikTok link detected! Processing download...");

        try {
            // Call TikTok downloader API
            const apiUrl = `https://nikka-api.vercel.app/dl/tiktok?apiKey=nikka&url=${encodeURIComponent(tiktokLink)}`;
            const response = await getJson(apiUrl);

            // Validate the API response
            if (!response || !response.data) {
                throw new Error("Failed to retrieve video data from the API.");
            }

            const videoUrl = response.data; // Extract video URL

            // Send the downloaded video back to the user
            await message.client.sendMessage(message.jid, {
                video: { url: videoUrl },
                caption: "🎥 TikTok video downloaded successfully! \n> Powered by Nikka Botz",
                mimetype: "video/mp4",
            });
        } catch (error) {
            // Handle errors gracefully
            await message.reply(`Failed to download video. Error: ${error.message}`);
        }
    }
);
