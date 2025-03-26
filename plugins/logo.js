const {
  command,
  isPrivate,
  getBuffer
} = require("../lib/");
const axios = require('axios');
const FormData = require("form-data");
command(
  {
    pattern: "glossy",
    fromMe: true,
    desc: "Generate an image from text",
    type: "logo",
  },
  async (message, query) => {
    try {
      // Ensure the user provides text for the image
      if (!query) {
        return await message.reply(
          `*Nikka Logo Maker*\n\n` +
          `❗ Please provide text for the image.\n` +
          `Example: ${prefix}glossy HAKI XER`
        );
      }

      // Build the API URL with the provided text
      const apiUrl = `https://api.giftedtech.my.id/api/ephoto360/glossysilver?apikey=gifted&text=${encodeURIComponent(
        query
      )}`;

      // Call the API and fetch the response
      const response = await fetch(apiUrl);
      const result = await response.json();

      // Check if the API call was successful
      if (!result.success || !result.result || !result.result.image_url) {
        return await message.reply("Failed to generate the image. Please try again later.");
      }

      // Extract the image URL
      const imageUrl = result.result.image_url;

      // Send the generated image back to the user
      await message.client.sendMessage(message.jid, {
        image: { url: imageUrl },
        caption: `\n> Logo generated successfully.`,
        contextInfo: {
          externalAdReply: {
            title: "Hi Pookie",
            body: "Powered by Haki",
            sourceUrl: "https://whatsapp.com/channel/0029VaoLotu42DchJmXKBN3L",
            mediaUrl: "",
            mediaType: 1,
            showAdAttribution: true,
            renderLargerThumbnail: false,
            thumbnailUrl: "https://files.catbox.moe/mnp025.jpg", // Replace with a relevant thumbnail
          },
        },
      });
    } catch (error) {
      console.error("Image Generator Error:", error);
      await message.reply(`An error occurred while generating the image: ${error.message}`);
    }
  }
);



command(
  {
    pattern: "write",
    fromMe: true,
    desc: "Generate an image from text",
    type: "logo",
  },
  async (message, query) => {
    try {
      // Ensure the user provides text for the image
      if (!query) {
        return await message.reply(
          `*Nikka Logo Maker*\n\n` +
          `❗ Please provide text for the image.\n` +
          `Example: ${prefix}glossy HAKI XER`
        );
      }
//https://api.giftedtech.my.id/api/ephoto360/writetext?apikey=gifted&text=Gifted%20Tech
      // Build the API URL with the provided text
      const apiUrl = `https://api.giftedtech.my.id/api/ephoto360/writetext?apikey=gifted&text=${encodeURIComponent(
        query
      )}`;

      // Call the API and fetch the response
      const response = await fetch(apiUrl);
      const result = await response.json();

      // Check if the API call was successful
      if (!result.success || !result.result || !result.result.image_url) {
        return await message.reply("Failed to generate the image. Please try again later.");
      }

      // Extract the image URL
      const imageUrl = result.result.image_url;

      // Send the generated image back to the user
      await message.client.sendMessage(message.jid, {
        image: { url: imageUrl },
        caption: `\n> Logo generated successfully.`,
        contextInfo: {
          externalAdReply: {
            title: "Hi Pookie",
            body: "Powered by Haki",
            sourceUrl: "https://whatsapp.com/channel/0029VaoLotu42DchJmXKBN3L",
            mediaUrl: "",
            mediaType: 1,
            showAdAttribution: true,
            renderLargerThumbnail: false,
            thumbnailUrl: "https://files.catbox.moe/mnp025.jpg", // Replace with a relevant thumbnail
          },
        },
      });
    } catch (error) {
      console.error("Image Generator Error:", error);
      await message.reply(`An error occurred while generating the image: ${error.message}`);
    }
  }
);



command(
  {
    pattern: "glitch",
    fromMe: true,
    desc: "Generate an image from text",
    type: "logo",
  },
  async (message, query) => {
    try {
      // Ensure the user provides text for the image
      if (!query) {
        return await message.reply(
          `*Nikka Logo Maker*\n\n` +
          `❗ Please provide text for the image.\n` +
          `Example: ${prefix}glossy HAKI XER`
        );
      }
//https://api.giftedtech.my.id/api/ephoto360/blackpinklogo?apikey=gifted&text=Gifted%20Tech
      // Build the API URL with the provided text
      const apiUrl = `https://api.giftedtech.my.id/api/ephoto360/glitchtext?apikey=gifted&text=${encodeURIComponent(
        query
      )}`;

      // Call the API and fetch the response
      const response = await fetch(apiUrl);
      const result = await response.json();

      // Check if the API call was successful
      if (!result.success || !result.result || !result.result.image_url) {
        return await message.reply("Failed to generate the image. Please try again later.");
      }

      // Extract the image URL
      const imageUrl = result.result.image_url;

      // Send the generated image back to the user
      await message.client.sendMessage(message.jid, {
        image: { url: imageUrl },
        caption: `\n> Logo generated successfully.`,
        contextInfo: {
          externalAdReply: {
            title: "Hi Pookie",
            body: "Powered by Haki",
            sourceUrl: "https://whatsapp.com/channel/0029VaoLotu42DchJmXKBN3L",
            mediaUrl: "",
            mediaType: 1,
            showAdAttribution: true,
            renderLargerThumbnail: false,
            thumbnailUrl: "https://files.catbox.moe/mnp025.jpg", // Replace with a relevant thumbnail
          },
        },
      });
    } catch (error) {
      console.error("Image Generator Error:", error);
      await message.reply(`An error occurred while generating the image: ${error.message}`);
    }
  }
);



//https://api.giftedtech.my.id/api/ephoto360/glitchtext?apikey=gifted&text=Gifted%20Tech
command(
  {
    pattern: "glow",
    fromMe: true,
    desc: "Generate an image from text",
    type: "logo",
  },
  async (message, query) => {
    try {
      // Ensure the user provides text for the image
      if (!query) {
        return await message.reply(
          `*Nikka Logo Maker*\n\n` +
          `❗ Please provide text for the image.\n` +
          `Example: ${prefix}glossy HAKI XER`
        );
      }
//https://api.giftedtech.my.id/api/ephoto360/blackpinklogo?apikey=gifted&text=Gifted%20Tech
      // Build the API URL with the provided text
      const apiUrl = `https://api.giftedtech.my.id/api/ephoto360/advancedglow?apikey=gifted&text=${encodeURIComponent(
        query
      )}`;

      // Call the API and fetch the response
      const response = await fetch(apiUrl);
      const result = await response.json();

      // Check if the API call was successful
      if (!result.success || !result.result || !result.result.image_url) {
        return await message.reply("Failed to generate the image. Please try again later.");
      }

      // Extract the image URL
      const imageUrl = result.result.image_url;

      // Send the generated image back to the user
      await message.client.sendMessage(message.jid, {
        image: { url: imageUrl },
        caption: `\n> Logo generated successfully.`,
        contextInfo: {
          externalAdReply: {
            title: "Hi Pookie",
            body: "Powered by Haki",
            sourceUrl: "https://whatsapp.com/channel/0029VaoLotu42DchJmXKBN3L",
            mediaUrl: "",
            mediaType: 1,
            showAdAttribution: true,
            renderLargerThumbnail: false,
            thumbnailUrl: "https://files.catbox.moe/mnp025.jpg", // Replace with a relevant thumbnail
          },
        },
      });
    } catch (error) {
      console.error("Image Generator Error:", error);
      await message.reply(`An error occurred while generating the image: ${error.message}`);
    }
  }
);

command(
  {
    pattern: "topo",
    fromMe: true,
    desc: "Generate an image from text",
    type: "logo",
  },
  async (message, query) => {
    try {
      // Ensure the user provides text for the image
      if (!query) {
        return await message.reply(
          `*Nikka Logo Maker*\n\n` +
          `❗ Please provide text for the image.\n` +
          `Example: ${prefix}glossy HAKI XER`
        );
      }
//https://api.giftedtech.my.id/api/ephoto360/blackpinklogo?apikey=gifted&text=Gifted%20Tech
      // Build the API URL with the provided text
      const apiUrl = `https://api.giftedtech.my.id/api/ephoto360/typographytext?apikey=gifted&text=${encodeURIComponent(
        query
      )}`;

      // Call the API and fetch the response
      const response = await fetch(apiUrl);
      const result = await response.json();

      // Check if the API call was successful
      if (!result.success || !result.result || !result.result.image_url) {
        return await message.reply("Failed to generate the image. Please try again later.");
      }

      // Extract the image URL
      const imageUrl = result.result.image_url;

      // Send the generated image back to the user
      await message.client.sendMessage(message.jid, {
        image: { url: imageUrl },
        caption: `\n> Logo generated successfully.`,
        contextInfo: {
          externalAdReply: {
            title: "Hi Pookie",
            body: "Powered by Haki",
            sourceUrl: "https://whatsapp.com/channel/0029VaoLotu42DchJmXKBN3L",
            mediaUrl: "",
            mediaType: 1,
            showAdAttribution: true,
            renderLargerThumbnail: false,
            thumbnailUrl: "https://files.catbox.moe/mnp025.jpg", // Replace with a relevant thumbnail
          },
        },
      });
    } catch (error) {
      console.error("Image Generator Error:", error);
      await message.reply(`An error occurred while generating the image: ${error.message}`);
    }
  }
);




command(
  {
    pattern: "pixel",
    fromMe: true,
    desc: "Generate an image from text",
    type: "logo",
  },
  async (message, query) => {
    try {
      // Ensure the user provides text for the image
      if (!query) {
        return await message.reply(
          `*Nikka Logo Maker*\n\n` +
          `❗ Please provide text for the image.\n` +
          `Example: ${prefix}glossy HAKI XER`
        );
      }
//https://api.giftedtech.my.id/api/ephoto360/blackpinklogo?apikey=gifted&text=Gifted%20Tech
      // Build the API URL with the provided text
      const apiUrl = `https://api.giftedtech.my.id/api/ephoto360/pixelglitch?apikey=gifted&text=${encodeURIComponent(
        query
      )}`;

      // Call the API and fetch the response
      const response = await fetch(apiUrl);
      const result = await response.json();

      // Check if the API call was successful
      if (!result.success || !result.result || !result.result.image_url) {
        return await message.reply("Failed to generate the image. Please try again later.");
      }

      // Extract the image URL
      const imageUrl = result.result.image_url;

      // Send the generated image back to the user
      await message.client.sendMessage(message.jid, {
        image: { url: imageUrl },
        caption: `\n> Logo generated successfully.`,
        contextInfo: {
          externalAdReply: {
            title: "Hi Pookie",
            body: "Powered by Haki",
            sourceUrl: "https://whatsapp.com/channel/0029VaoLotu42DchJmXKBN3L",
            mediaUrl: "",
            mediaType: 1,
            showAdAttribution: true,
            renderLargerThumbnail: false,
            thumbnailUrl: "https://files.catbox.moe/mnp025.jpg", // Replace with a relevant thumbnail
          },
        },
      });
    } catch (error) {
      console.error("Image Generator Error:", error);
      await message.reply(`An error occurred while generating the image: ${error.message}`);
    }
  }
);


command(
  {
    pattern: "nigger",
    fromMe: true,
    desc: "Generate an image from text",
    type: "logo",
  },
  async (message, query) => {
    try {
      // Ensure the user provides text for the image
      if (!query) {
        return await message.reply(
          `*Nikka Logo Maker*\n\n` +
          `❗ Please provide text for the image.\n` +
          `Example: ${prefix}glossy HAKI XER`
        );
      }
//https://api.giftedtech.my.id/api/ephoto360/blackpinklogo?apikey=gifted&text=Gifted%20Tech
      // Build the API URL with the provided text
      const apiUrl = `https://api.giftedtech.my.id/api/ephoto360/nigerianflag?apikey=gifted&text=${encodeURIComponent(
        query
      )}`;

      // Call the API and fetch the response
      const response = await fetch(apiUrl);
      const result = await response.json();

      // Check if the API call was successful
      if (!result.success || !result.result || !result.result.image_url) {
        return await message.reply("Failed to generate the image. Please try again later.");
      }

      // Extract the image URL
      const imageUrl = result.result.image_url;

      // Send the generated image back to the user
      await message.client.sendMessage(message.jid, {
        image: { url: imageUrl },
        caption: `\n> Logo generated successfully.`,
        contextInfo: {
          externalAdReply: {
            title: "Hi Pookie",
            body: "Powered by Haki",
            sourceUrl: "https://whatsapp.com/channel/0029VaoLotu42DchJmXKBN3L",
            mediaUrl: "",
            mediaType: 1,
            showAdAttribution: true,
            renderLargerThumbnail: false,
            thumbnailUrl: "https://files.catbox.moe/mnp025.jpg", // Replace with a relevant thumbnail
          },
        },
      });
    } catch (error) {
      console.error("Image Generator Error:", error);
      await message.reply(`An error occurred while generating the image: ${error.message}`);
    }
  }
);


command(
  {
    pattern: "neon",
    fromMe: true,
    desc: "Generate an image from text",
    type: "logo",
  },
  async (message, query) => {
    try {
      // Ensure the user provides text for the image
      if (!query) {
        return await message.reply(
          `*Nikka Logo Maker*\n\n` +
          `❗ Please provide text for the image.\n` +
          `Example: ${prefix}glossy HAKI XER`
        );
      }
//https://api.giftedtech.my.id/api/ephoto360/blackpinklogo?apikey=gifted&text=Gifted%20Tech
      // Build the API URL with the provided text
      const apiUrl = `https://api.giftedtech.my.id/api/ephoto360/makingneon?apikey=gifted&text=${encodeURIComponent(
        query
      )}`;

      // Call the API and fetch the response
      const response = await fetch(apiUrl);
      const result = await response.json();

      // Check if the API call was successful
      if (!result.success || !result.result || !result.result.image_url) {
        return await message.reply("Failed to generate the image. Please try again later.");
      }

      // Extract the image URL
      const imageUrl = result.result.image_url;

      // Send the generated image back to the user
      await message.client.sendMessage(message.jid, {
        image: { url: imageUrl },
        caption: `\n> Logo generated successfully.`,
        contextInfo: {
          externalAdReply: {
            title: "Hi Pookie",
            body: "Powered by Haki",
            sourceUrl: "https://whatsapp.com/channel/0029VaoLotu42DchJmXKBN3L",
            mediaUrl: "",
            mediaType: 1,
            showAdAttribution: true,
            renderLargerThumbnail: false,
            thumbnailUrl: "https://files.catbox.moe/mnp025.jpg", // Replace with a relevant thumbnail
          },
        },
      });
    } catch (error) {
      console.error("Image Generator Error:", error);
      await message.reply(`An error occurred while generating the image: ${error.message}`);
    }
  }
);

command(
    {
        pattern: "carbon",
        desc: "carbon img",
        type: "image",
        fromMe: isPrivate,
    },
    async (message, match) => {
        if (!match) {
            return await message.reply("Provide text to carbonate.");
        }

        const url = `https://nikka-api.vercel.app/tools/carbon?q=${encodeURIComponent(match)}&apiKey=nikka`;

        try {
            // React with "waiting" emoji to indicate processing
            await message.react("⌛"); // You can change this to any emoji you'd like
            console.log(`Attempting to generate carbon image with URL: ${url}`);

            // Send the image URL
            await message.sendFromUrl(url);

            // React with "verified" emoji when image is sent successfully
            await message.react("✅"); // Change to any emoji indicating success

            // Wait for a short time, then remove all reactions
            setTimeout(async () => {
                await message.react(""); // Empty string removes all reactions
            }, 1000); // You can adjust the time as needed (1000ms = 1 second)

        } catch (error) {
            console.error("Error generating carbon image:", error);
            await message.reply("An error occurred while generating the carbon image.");
        }
    }
);

