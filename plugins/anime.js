const {
  command,
  isPrivate,
  getBuffer
} = require("../lib/");
const axios = require('axios');
const FormData = require("form-data");
// https://api.nexoracle.com/search/google?apikey=free_key@maher_apis&q=who%20is%20Mark%20Zuckeberk
const { gojo, goku, animeChar } = require("@anime")
command(
  {
    pattern: "animewall",
    fromMe: isPrivate,
    desc: "Sends anime wallpapers with multiple CTA buttons",
    type: "anime",
  },
  async (message) => {
    try {
      // Send slide with anime wallpaper and CTA buttons
      await message.sendSlide(
        message.jid,
        "Nikka Botz Inc",
        "Anime Wallpapers",
        message,
        "Powered by Haki",
        [
          [
            "https://api.nexoracle.com/wallpapers/anime?apikey=free_key@maher_apis",
            "𝞜𝞘𝞙𝞙𝞓",
            "Get Support",
            "Powered by Haki",
            "cta_url",
            "https://whatsapp.com/channel/0029VaoLotu42DchJmXKBN3L",
          ],
          [
            "https://api.nexoracle.com/wallpapers/anime?apikey=free_key@maher_apis",
            "𝞜𝞘𝞙𝞙𝞓",
            "Get Support",
            "Powered by Haki",
            "cta_url",
            "https://whatsapp.com/channel/0029VaoLotu42DchJmXKBN3L",
          ],
          [
            "https://api.nexoracle.com/wallpapers/anime?apikey=free_key@maher_apis",
            "𝞜𝞘𝞙𝞙𝞓",
            "Learn More",
            "Powered by Haki",
            "cta_url",
            "https://whatsapp.com/channel/0029VaoLotu42DchJmXKBN3L",
          ],
          [
            "https://api.nexoracle.com/wallpapers/anime?apikey=free_key@maher_apis",
            "𝞜𝞘𝞙𝞙𝞓",
            "Get Support",
            "Powered by Haki",
            "cta_url",
            "https://whatsapp.com/channel/0029VaoLotu42DchJmXKBN3L",
          ],
          [
            "https://api.nexoracle.com/wallpapers/anime?apikey=free_key@maher_apis",
            "𝞜𝞘𝞙𝞙𝞓",
            "Explore",
            "Powered by Haki",
            "cta_url",
            "https://whatsapp.com/channel/0029VaoLotu42DchJmXKBN3L",
          ],
        ]
      );
    } catch (error) {
      console.error("Error in animewall command:", error.message);
      await message.reply("An error occurred while sending the anime wallpapers.");
    }
  }
);


command(
  {
    pattern: "anime-status",
    desc: "downloads anime status videos",
    type: "anime",
    fromMe: isPrivate,

  },
  async(message) => {
    await message.react("⏳️");
    try{
      const api = "https://nikka-api.vercel.app/anime/status?apiKey=nikka";
      const response = await axios.get(api);
      const res = response.data.video;
      const vid = res.link;
      const title = "> POWERED BY NIKKA TECH"

      await message.sendFromUrl(vid, {caption: title} )
      await message.react("");
    } catch(error){
       await message.react("❌️")
        await message.haki(error)
        console.log(error)
    }
  }
)

command(
  {
    pattern: "gojo",
    desc: "downloads gojo amv",
    type: "anime",
    fromMe: isPrivate,

  },
  async(message) => {
    await message.react("⏳️");
    try{
      const vid = await gojo()
      
      const title = "> POWERED BY NIKKA TECH"

      await message.sendFromUrl(vid, {caption: title} )
      await message.react("");

    } catch(error){
       await message.react("❌️")
        await message.haki(error)
        console.log(error)
    }
  }
)

command(
  {
    pattern: "goku",
    desc: "downloads goku amv",
    type: "anime",
    fromMe: isPrivate,

  },
  async(message) => {
    await message.react("⏳️");
    try{
      const vid = await goku()
      
      const title = "> POWERED BY NIKKA TECH"

      await message.sendFromUrl(vid, {caption: title} )
      await message.react("");

    } catch(error){
       await message.react("❌️")
        await message.haki(error)
        console.log(error)
    }
  }
)





command(
  {
    pattern: "anime-character",
    desc: "Fetch details of an anime character",
    type: "anime",
    fromMe: isPrivate,
  },
  async (message, match) => {
    if (!match) {
      return await message.reply("Please provide the name of the anime character.");
    }

    await message.react("⏳️");

    try {
      const charDetails = await animeChar(match);

      if (!charDetails) {
        throw new Error("Character details not found");
      }

      const { name, alias, url, thumb, anime, manga } = charDetails;

      const caption = `
Name: ${name}

Alias: ${alias || "N/A"}

URL: ${url}

Anime: ${anime || "N/A"}

Manga: ${manga || "N/A"}
      `;

      // Ensure the send method is correct for your bot
      await message.sendFromUrl(thumb, {caption: caption});
      await message.react("");

    } catch (error) {
      await message.react("❌️");
      await message.reply("Sorry, something went wrong. Please try again later.");
      console.error(error);
    }
  }
);
