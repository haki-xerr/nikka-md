const { command, getJson, isPrivate } = require("@lib");
const axios = require("axios");
const { tiny } = require("../lib/fancy_font/fancy");
const { unsplash, fetchPinterestImages, fetchPixabay, wiki } = require("@search");
command(
    {
        pattern: "gimage",
        desc: "Fetch images based on search query and optional index.",
        fromMe: isPrivate,
        type: "search",
    },
    async (message, match) => {
        await message.react("⏳");

        try {
            const parts = match.split(',');
            const searchQuery = parts[0].trim();
            const index = parts.length > 1 ? parseInt(parts[1].trim()) : null;

            const response = await axios.get('https://nikka-api.vercel.app/search/googleimg?apiKey=nikka&q=' + encodeURIComponent(searchQuery));
            const images = response.data.images;

            if (Array.isArray(images) && images.length > 0) {
                if (!index) {
                    // Send only 5 images if no index is provided
                    let responseMessage = `Here are 5 images for **${searchQuery}**:\n`;
                    for (let i = 0; i < Math.min(5, images.length); i++) {
                        responseMessage += `**${i + 1}.** Image ${i + 1} 🖼️\n`;
                        await message.sendFromUrl(images[i]);
                    }
                } else {
                    if (isNaN(index) || index < 1 || index > images.length) {
                        await message.reply(`🚫 Invalid index. Please provide a valid number between **1** and **${images.length}**.`);
                    } else {
                        const imageUrl = images[index - 1];
                        await message.sendFromUrl(imageUrl);
                    }
                }

                await message.react("✅");
                setTimeout(() => message.react(""), 1000);
            } else {
                await message.reply("No images found for your search.");
                await message.react("❌");
            }
        } catch (error) {
            await message.reply("An error occurred while fetching the images. Please try again.");
            await message.react("❌");
        }
    }
);
command(
    {
        pattern: "news",
        desc: "Fetch news based on index, or all news if no index is provided.",
        fromMe: isPrivate,
        type: "search",
    },
    async (message, match) => {
        await message.react("⏳");

        try {
            const response = await axios.get('https://nikka-api.vercel.app/search/news?apiKey=nikka');
            const news = response.data.results;

            if (Array.isArray(news) && news.length > 0) {
                let responseMessage = "";

                if (!match) {
                    responseMessage = "Here are the latest news titles:\n";
                    news.forEach((item, index) => {
                        responseMessage += `\n**${index + 1}.** ${item.title} 📢`;
                    });
                } else {
                    const index = parseInt(match.trim());

                    if (isNaN(index) || index < 1 || index > news.length) {
                        responseMessage = `🚫 Invalid index. Please provide a valid number between **1** and **${news.length}**.`;
                    } else {
                        const newsTitle = news[index - 1].title;
                        responseMessage = `**News ${index}:** ${newsTitle} 📢`;
                    }
                }

                await message.reply(responseMessage);
                await message.react("✅");
                setTimeout(() => message.react(""), 5000);
            } else {
                await message.reply("No news data available.");
                await message.react("❌");
            }
        } catch (error) {
            await message.reply("An error occurred while fetching the news. Please try again.");
            await message.react("❌");
        }
    }
);


command(
    {
        pattern: "unsplash",
        desc: "Fetch and send the first 5 images from Unsplash",
        fromMe: isPrivate,
        type: "ai",
    },
    async (message, match) => {
      const name = message.pushName
      const prefix = message.prefix
      await message.react("⏳️");
        if (!match) {
          await message.react("❌️")
            return await message.reply(`Sorry ${name} Please provide a search term. Example: ${prefix}getimages car`);
            
        }
        await message.react("⏳️");

        const images = await unsplash(match);

        if (images.length > 0) {
            for (const url of images) {
                await message.sendFromUrl(url);
            }
            await message.react("")
        } else {
            await message.reply("No images found for your search.");
            await message.react("❌️")
        }
    }
);



command(
    {
        pattern: "pinterest",
        desc: "Fetch and send the first 5 Pinterest images",
        fromMe: isPrivate,
        type: "ai",
    },
    async (message, match) => {
        const name = message.pushName;
        const prefix = message.prefix;
        await message.react("⏳️");

        if (!match) {
            await message.react("❌️");
            return await message.reply(`Sorry ${name}, please provide a search term. Example: ${prefix}pinterest arabic quotes`);
        }

        const images = await fetchPinterestImages(match);

        if (images === null) {
            await message.reply("An error occurred while fetching images. Please try again.");
            await message.react("⚠️");
            return;
        }

        if (images.length > 0) {
            for (const item of images) {
                await message.sendFromUrl(item.images_url);
            }
            await message.react("");
        } else {
            await message.reply("No images found for your search.");
            await message.react("❌️");
        }
    }
);




command(
    {
        pattern: "pixabay",
        desc: "Fetch and send the first 5 images from Pixabay",
        fromMe: isPrivate,
        type: "ai",
    },
    async (message, match) => {
        const name = message.pushName;
        const prefix = message.prefix;
        
        await message.react("⏳️");

        if (!match) {
            await message.react("⏳️");
            return await message.reply(`Sorry ${name}, please provide a search term. Example: ${prefix}pixabay car`);
        }

        const images = await fetchPixabay(match);

        if (images.length > 0) {
            for (const url of images) {
                await message.sendFromUrl(url);
            }
            await message.react("✅");
        } else {
            await message.reply("No images found for your search.");
            await message.react("❌️");
        }
    }
);



command(
    {
        pattern: "wiki",
        desc: "Get Wikipedia data",
        fromMe: isPrivate,
        type: "search",
    },
    async (message, match) => {
        if (!match) {
            await message.react("❌️");
            return await message.reply("Please provide a search query.");
        }
        await message.react("⏳️");

        const result = await wiki(match);
        
        if (!result) {
            return await message.reply("No results found.");
        }

        const { text, image } = result;

        // Send image with caption
        await message.client.sendMessage(message.jid, {
            image: { url: image },
            caption: text
        });
        await message.react("");
    }
);

command(
    {
      pattern: "yts",
      fromMe: true,
      desc: "Search YouTube and fetch video details",
      type: "search",
    },
    async (message, match) => {
      try {
        if (!match) {
          await message.react("❌️");
          return await message.reply("Please provide a search term.");
        }
  
        await message.react("⏳️");
  
        // Parse query and optional limit
        const [query, limit] = match.split(",").map((item) => item.trim());
        const maxResults = limit && !isNaN(limit) ? parseInt(limit) : null;
  
        const response = await getJson(`https://nikka-api.vercel.app/search/yts?apiKey=nikka&q=${query}`);
  
        if (!response || !response.data || response.data.length === 0) {
          await message.react("❌️");
          return await message.reply("No results found for your query.");
        }
  
        // Limit results if a valid limit is provided
        const results = response.data.slice(0, maxResults || response.data.length).map((res, index) => {
          return `
  📌 **Result ${index + 1}:**
  > **Title:** ${res.title || "N/A"}
  > **Description:** ${res.description || "N/A"}
  > **URL:** ${res.url || "N/A"}
          `;
        }).join("\n\n");
  
        await message.client.sendMessage(
          message.jid,
          {
            text: `🎥 **YouTube Search Results:**\n\n${results}`,
          }
        );
  
        await message.react("✅️");
      } catch (error) {
        console.error("Error in yts command:", error);
        await message.react("❌️");
        await message.reply("An error occurred while fetching YouTube search results.");
      }
    }
  );

command(
    {
        pattern: "def",
        desc: "define stuff",
        type: "search",
        fromMe: isPrivate,
    },
    async(message, match) => {
        const q = match || message.reply_message.text
        if(!q){
            return m.send(`hey ${message.pushName}, i need a query`)

        }
        try{
            const response = await getJson(`https://api.giftedtech.my.id/api/tools/define?apikey=gifted&term=${q}`)
            const res = response.results[0]
            const text = `
Word: ${res.word}

Definition: ${res.definition}

Author: ${res.author}

Written_on: ${res.written_on}

Example: ${res.example}

Thumbs_down: ${res.thumbs_down}
            `
            const tes = await tiny(text)
            const init = await message.client.sendMessage(message.jid, {text: "searching..."})
            await message.fek(init.key, tes)
        }catch(e){
            await m.send(e)
        }

    }
)
