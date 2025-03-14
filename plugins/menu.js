const plugins = require("../lib/event");
const {
  command,
  isPrivate,
} = require("../lib");
const {
  BOT_INFO
} = require("../config");
const config = require("../config");
const { tiny } = require("../lib/fancy_font/fancy");

command(
  {
    pattern: "menu",
    fromMe: isPrivate,
    desc: "Show All Commands",
    dontAddCommandList: true,
    type: "user",
  },
  async (message, match, m, client) => {
    await message.react("⏳️");

    try {
      if (match) {
        for (let i of plugins.commands) {
          if (
            i.pattern instanceof RegExp &&
            i.pattern.test(message.prefix + match)
          ) {
            const cmdName = i.pattern.toString().split(/\W+/)[1];
            message.reply(`\`\`\`Command: ${message.prefix}${cmdName.trim()}
Description: ${i.desc}\`\`\``);
          }
        }
      } else {
        let { prefix } = message;
        let [date, time] = new Date()
          .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
          .split(",");
        let usern = message.pushName;
        const readMore = String.fromCharCode(8206).repeat(4001);

        let menu = `\`\`\`╭───𖣘 🇳​​🇮​​🇰​​🇰​​🇦​ ​🇲​​🇩​ 𖣘
🌻 Prefix: ${config.HANDLERS}
🌻︎ Owner: ${BOT_INFO.split(";")[1]}
🌻︎ Mode: ${config.WORK_TYPE}
🌻 Cmds: ${plugins.commands.length}
╰─────\`\`\`\n${readMore}`;

        let cmnd = [];
        let cmd;
        let category = [];

        plugins.commands.map((command) => {
          if (command.pattern instanceof RegExp) {
            cmd = command.pattern.toString().split(/\W+/)[1];
          }

          if (!command.dontAddCommandList && cmd !== undefined) {
            let type = command.type ? command.type.toLowerCase() : "misc";

            cmnd.push({ cmd, type });

            if (!category.includes(type)) category.push(type);
          }
        });

        cmnd.sort();
        category.sort().forEach((cmmd) => {
          menu += `\n\`\`\`╭─── ${cmmd.toUpperCase()} ────\`\`\``;
          let comad = cmnd.filter(({ type }) => type == cmmd);
          comad.forEach(({ cmd }) => {
            menu += `\n│\`\`\`❀ ${cmd.trim()}\`\`\``;
          });
          menu += `\n╰───────\n\n`;
        });

        menu += `\n\n\`\`\`𝗡𝗶𝗸𝗸𝗮 𝘅 𝗺𝗱\`\`\``;

        let penu = tiny(menu);

        // Random menu images
        const menuImages = [
          "https://cdn.ironman.my.id/i/hvlui0.jpg",
          "https://cdn.ironman.my.id/i/hvlui0.jpg",
          "https://cdn.ironman.my.id/i/hvlui0.jpg",
          config.BOT_INFO.split(";")[2], // Including the existing one
        ];
        const randomImage = menuImages[Math.floor(Math.random() * menuImages.length)];

        // Send the image with the menu text as caption
        return await message.sendFromUrl(randomImage, { caption: penu });
      }
    } catch (e) {
      message.reply(e);
    }
  }
);
