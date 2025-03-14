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


command(
  {
    pattern: 'spot',
    desc: 'Download music from Spotify',
    fromMe: isPrivate,
    type: 'downloader',
  },
  async (message, match) => {
    if (!match) {
      return await message.reply(
        'Please provide a search query. Example:\nspot fly me to the moon'
      );
    }

    const apiKey = 'nikka'; // Replace with your actual API key
    const apiUrl = `https://api.nikka.us.kg/dl/spotify?q=${encodeURIComponent(
      match
    )}&apiKey=${apiKey}`;

    try {
      await message.react("⌛"); // React with loading icon

      const response = await axios.get(apiUrl);
      const { data } = response;

      if (!data?.data?.status) {
        await message.react("⛔"); // React with failure icon
        return await message.reply('Failed to fetch the Spotify download URL.');
      }

      const { title, artist, downloadUrl } = data.data.result;

      if (!downloadUrl) {
        await message.react("⛔"); // React with failure icon
        return await message.reply('No download URL available for this song.');
      }

      // React with success before sending the audio
      await message.react("✅");

      // Send the song details and the download URL
      await message.reply(
        `🎵 *Title:* ${title}\n👤 *Artist:* ${artist}\n\nDownloading...`
      );

      // Send the audio file
      await message.sendFromUrl(downloadUrl);
    } catch (error) {
      console.error('Error in Spotify downloader command:', error);
      await message.react("⛔"); // React with failure icon
      await message.reply(
        'An error occurred while processing your request. Please try again later.'
      );
    }
  }
);


const yts = require("yt-search");
command(
    {
        pattern: "pla",
        desc: "Downloads music",
        type: "downloader",
        fromMe: isPrivate,
    },
    async (message, match, m) => {
        try {
        await message.react("⏳️")
            const query = match.trim();
            if (!query) {
                return await m.send("Query required.");
            }

            // Search for the video
            const search = await yts(query);
            if (!search.all.length) {
                return await m.send("No results found.");
            }
           
            const vidurl = search.all[0].url;
            const apiurl = `https://api.giftedtech.my.id/api/download/ytmp3?apikey=gifted&url=${vidurl}`;
            const response = await getJson(apiurl);

            

            const aud = response.result.download_url;
            const title = response.result.title;
            const img = response.result.thumbnail || ""; // Get the first available thumbnail

            if (!aud) {
                return await m.send("Download URL not found.");
            }

            // Send audio file
            await message.client.sendMessage(message.jid, {
                audio: { url: aud },
                mimetype: "audio/mpeg",
                ptt: false,
                contextInfo: {
                    externalAdReply: {
                        title: title,
                        body: "Powered by Nikka Botz",
                        sourceUrl: "https://whatsapp.com/channel/0029VaoLotu42DchJmXKBN3L",
                        mediaUrl: vidurl,
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: true,
                        thumbnailUrl: img,
                    }
                }
            });
            await message.react("")

        } catch (error) {
            console.error(error);
            await message.react("❌️")
            await m.send("An error occurred while processing your request.");
        }
    }
);


command(
  {
      pattern: "ytmp3",
      desc: "Download YouTube videos as MP3.",
      fromMe: false,
      type: "download",
  },
  async (message, match) => {
      await message.react("⏳️")

      if (!match) return await message.reply("Please provide a YouTube link.\nExample: .ytmp3 <video_url>");

      const apiUrl = `https://ditzdevs-ytdl-api.hf.space/api/ytmp3?url=${encodeURIComponent(match)}`;

      try {
          const response = await axios.get(apiUrl);
          if (response.data.status && response.data.download.downloadUrl) {
              const audioUrl = response.data.download.downloadUrl;
              const title = response.data.download.title;
              const caption = `> POWERED BY NIKKA TECH`;
              
              await message.client.sendMessage(message.jid, { audio: { url: audioUrl }, mimetype: "audio/mpeg", ptt: false, caption });
              await message.react("")
          } else {
              await message.reply("Failed to fetch audio. Please check the URL and try again.");
          }
      } catch (error) {
          console.error(error);
          await message.reply("An error occurred while fetching the audio.");
      }
  }
);


// Regex pattern to validate URL
const urlRegex = /^(https?:\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,})(?:[\/\w \.-]*)*\/?$/;

command(
  {
    pattern: "source",
    fromMe: isPrivate,
    desc: "Fetches the source code zip file from the provided URL",
    type: "utility",
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
