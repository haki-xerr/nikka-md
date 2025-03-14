const { command, isPrivate, getJson } = require("../lib/");
const axios = require("axios");
command(
    {
        pattern: "apk",
        desc: "Downloads APKs",
        fromMe: isPrivate,
        type: "downloader",
    },
    async (message, match) => {
      const query = match.trim();
        if (!query) {
            return await message.sendMessage("Please provide the app name to search.");
        }

        try {
            // Fetch APK details from the API
            const res = await getJson(
                `https://api.nexoracle.com/downloader/apk?apikey=free_key@maher_apis&q=${encodeURIComponent(query)}`
            );

            // Debugging API response
            console.log("API Response:", res);

            // Validate response
            if (!res || !res.result) {
                return await message.sendMessage(
                    "Could not find the APK details. Please check the app name and try again."
                );
            }

            const { name, lastup, size, dllink, icon } = res.result || {};

            // Check mandatory fields
            if (!dllink || !name || !size) {
                return await message.sendMessage(
                    "The APK details for the provided app are unavailable. Please try another app."
                );
            }

            const lastUpdate = lastup || "Not available";
            const apkIcon = icon || "https://files.catbox.moe/cuu1aa.jpg"; // Default icon

            // Prepare the response text
            const text = `
*📥 APK Downloader*

*Name:* ${name}
*Last Updated:* ${lastUpdate}
*Size:* ${size}

_Downloading the file. This may take some time._
            `;

            // Send the message with APK details
            await message.client.sendMessage(message.jid, {
                image: { url: apkIcon },
                caption: text.trim(),
                contextInfo: {
                    externalAdReply: {
                        title: "APK Download Service",
                        body: "Powered by Nikka-MD",
                        sourceUrl: "https://haki.us.kg", // Change this to your site
                        mediaUrl: "https://haki.us.kg",  // Change this to your site
                        mediaType: 4,
                        showAdAttribution: true,
                        renderLargerThumbnail: false,
                        thumbnail: { url: apkIcon }, // Thumbnail for externalAdReply
                    },
                },
            });

            // Send the APK file
            await message.client.sendMessage(
                message.jid,
                {
                    document: { url: dllink },
                    fileName: `${name}.apk`,
                    mimetype: "application/vnd.android.package-archive",
                },
                { quoted: message }
            );
        } catch (error) {
            console.error("Error fetching APK:", error);

            // Send user-friendly error message
            await message.sendMessage(
                "An error occurred while fetching the APK. Please try again later or contact support."
            );
        }
    }
);


command(
  {
    pattern: "fb",
    fromMe: true,
    desc: "Download Facebook reels",
    type: "downloader",
  },
  async (message, match) => {
    try {
      let url = match;
      if (!url && message.reply_message) {
        url = message.reply_message.text.match(/https?:\/\/[^\s]+/g)?.[0];
      }

      if (!url) {
        return await message.reply("Please provide a valid Facebook reel URL.");
      }

      const apiUrl = `https://api.nexoracle.com/downloader/facebook?apikey=free_key@maher_apis&url=${url}`;
      const response = await axios.get(apiUrl);

      if (!response.data || !response.data.result || !response.data.result.HD) {
        return await message.reply("Failed to fetch the video. Please check the URL or try again.");
      }

      const videoUrl = response.data.result.HD;

      await message.sendFromUrl(videoUrl, {
        mimetype: "video/mp4",
        caption: "Here's your Facebook reel!",
      });
    } catch (error) {
      console.error("Error in fbdown command:", error.message);
      await message.reply("An error occurred while downloading the Facebook reel.");
    }
  }
);
command(
    {
        pattern: "tiktok",
        desc: "TikTok video downloader",
        type: "downloader",
        fromMe: isPrivate,
    },
    async (message, match) => {
      
        if (!match) {
            return await message.sendMessage("Please provide a TikTok URL.");
        }

        // Improved TikTok URL validation
        const tiktokRegex = /^(https?:\/\/)?(www\.)?(tiktok\.com\/|vm\.tiktok\.com\/).+/;
        if (!tiktokRegex.test(match.trim())) {
            return await message.sendMessage("Invalid TikTok URL provided.");
        }

       // await message.react("⏳️");

        try {
            // Fetch video data from API
            const apiUrl = `https://api.nikka.us.kg/dl/tiktok?apiKey=nikka&url=${encodeURIComponent(match.trim())}`;
            const response = await getJson(apiUrl);

            // Check for a successful response
            if (!response || !response.data) {
                throw new Error("Failed to fetch video data.");
            }

            const videoUrl = response.data;

            // Send video to the user
            await message.client.sendMessage(message.jid, {
                video: { url: videoUrl },
                caption: "> Powered by Nikka Botz",
                mimetype: "video/mp4",
            });

           // await message.react("✅️");
        } catch (error) {
            // Handle errors gracefully
            await message.sendMessage(`Failed to download video. Error: ${error.message}`);
            await message.react("❌️");
        }
    }
);



command(
  {
    pattern: "sendfile ?(.*)",
    fromMe: isPrivate,
    desc: "Send media from a direct URL",
    type: "downloader",
  },
  async (message, match) => {
    const url = match.trim();

    if (!url) {
      await message.react("❌");
      return await message.reply("*_Please provide a valid URL to send media._*");
    }

    try {
      await message.react("⏳"); // React with "pending"
      await message.sendFromUrl(url);
      await message.react("✅"); // React with "successful"
      
    } catch (err) {
      await message.react("❌"); // React with "error"
      console.error(err);
      await message.reply("*_Failed to send media. Please check the URL and try again._*");
    }
  }
);






const urlRegex = /^(https?:\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,})(?:[\/\w \.-]*)*\/?$/;

command(
  {
    pattern: "source",
    fromMe: isPrivate,
    desc: "Fetches the source code zip file from the provided URL",
    type: "downloader",
  },
  async (message, match) => {
    // Validate the URL format using regex
    if (!match || !urlRegex.test(match.trim())) {
      return await message.reply("Please provide a valid URL.");
    }

    const url = match.trim();

    try {
      // Fetch the zip file from the API
      const response = await axios.get(`https://fastrestapis.fasturl.cloud/tool/getcode?url=${encodeURIComponent(url)}`, {
        responseType: 'arraybuffer', // To handle binary data (zip file)
      });

      // Send the zip file to the user
      await message.client.sendMessage(message.jid, {
        document: { url: response.config.url }, // This is the API URL which directly links to the zip file
        mimetype: 'application/zip',
        fileName: `source_code_${Date.now()}.zip`, // Set a filename for the zip
        caption: `Here is the source code zip for the URL: ${url}`, // Caption
      });

    } catch (error) {
      console.error(error);
      return await message.reply("There was an error fetching the source code. Please try again later.");
    }
  }
);
