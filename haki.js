
const {
  default: makeWASocket,
  useMultiFileAuthState,
  Browsers,
  makeCacheableSignalKeyStore,
  makeInMemoryStore,
} = require("@whiskeysockets/baileys");
const fs = require("fs");
const { serialize } = require("./lib/serialize");
const { Message } = require("./lib/Base");
const pino = require("pino");
const path = require("path");
const events = require("./lib/event");
const got = require("got");
const config = require("./config");
const { getEventConfig } = require("./DB/event");
const { PluginDB } = require("./lib/database/plugins");
const saveCreds = require("./lib/session");
require('module-alias/register');


const store = makeInMemoryStore({
  logger: pino().child({ level: "silent", stream: "store" }),
});
require("events").EventEmitter.defaultMaxListeners = 50;

const { File } = require("megajs");

(async function () {
  var prefix = "NIKKA-X";
  var output = "./lib/session/";
  var pth = output + "creds.json";

  try {
    var store = makeInMemoryStore({
      logger: pino().child({ level: "silent", stream: "store" }),
    });

    require("events").EventEmitter.defaultMaxListeners = 50;

    if (!fs.existsSync(pth)) {
      if (!config.SESSION_ID.startsWith(prefix)) {
        throw new Error("Invalid session id.");
      }

      var url = "https://mega.nz/file/" + config.SESSION_ID.replace(prefix, "");
      var file = File.fromURL(url);
      await file.loadAttributes();

      if (!fs.existsSync(output)) {
        fs.mkdirSync(output, { recursive: true });
      }

      var data = await file.downloadBuffer();
      fs.writeFileSync(pth, data);
    }
  } catch (error) {
    console.error(error);
  }

  fs.readdirSync("./lib/database/").forEach((plugin) => {
    if (path.extname(plugin).toLowerCase() === ".js") {
      require("./lib/database/" + plugin);
    }
  });


  try {

  } catch (error) {
    console.error("Failed to initialize store:", error);
  }
})();
async function startNikka() {
  console.log("Syncing Database");
  await config.DATABASE.sync();

  const { state, saveCreds } = await useMultiFileAuthState("./lib/session", {
    store: true, 
  });
  

  const conn = makeWASocket({
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" })),
    },
    msgRetryCounterCache: new Map(), // Ensures messages are retried properly
    printQRInTerminal: true,
    logger: pino({ level: "fatal" }).child({ level: "fatal" }),
    browser: Browsers.macOS("Safari"),
    markOnlineOnConnect: true,
  });
  
  

  store.bind(conn.ev);

  setInterval(() => {
    store.writeToFile("./lib/store_db.json");
    console.log("saved store");
  }, 30 * 60 * 1000);

  conn.ev.on("connection.update", async (s) => {
    const { connection, lastDisconnect } = s;

    if (connection === "connecting") {
      console.log("please wait...");
      console.log("processing session id.....");
    }

    if (
      connection === "close" &&
      lastDisconnect &&
      lastDisconnect.error &&
      lastDisconnect.error.output.statusCode !== 401
    ) {
      if (conn?.state?.connection !== "open") {
        console.log(lastDisconnect.error.output.payload);
        startNikka();
      }
    }

    if (connection === "open") {
      console.log("Login Sucessful ✅");
      console.log("Installing Plugins 📥");

      let plugins = await PluginDB.findAll();
      plugins.map(async (plugin) => {
        if (!fs.existsSync("./plugins/" + plugin.dataValues.name + ".js")) {
          console.log(plugin.dataValues.name);
          var response = await got(plugin.dataValues.url);
          if (response.statusCode === 200) {
            fs.writeFileSync(
              "./plugins/" + plugin.dataValues.name + ".js",
              response.body
            );
            require("./plugins/" + plugin.dataValues.name + ".js");
          }
        }
      });
      console.log("plugins installed ✅");

      fs.readdirSync("./plugins").forEach((plugin) => {
        if (path.extname(plugin).toLowerCase() === ".js") {
          require("./plugins/" + plugin);
        }
      });

      console.log(" connected  ✅");

      const packageVersion = require("./package.json").version;
      const totalPlugins = events.commands.length;
      const workType = config.WORK_TYPE;
      const statusMessage = `ׂNikka x md connected  ✅\n ׂᴠᴇʀsɪᴏɴ: ${packageVersion}\n ׂᴄᴍᴅs: ${totalPlugins}\n ׂᴡᴏʀᴋᴛʏᴘᴇ: ${workType}\n ׂ𝗺𝗮𝗱𝗲 𝘄𝗶𝘁𝗵 ❤️ 𝗯𝘆 𝗵𝗮𝗸𝗶`;

      await conn.sendMessage(conn.user.id, {text: statusMessage})
    }

    try {
      conn.ev.on("creds.update", saveCreds);

      conn.ev.removeAllListeners("group-participants.update");
conn.ev.on("group-participants.update", async (data) => {
    try {
        const metadata = await conn.groupMetadata(data.id);
        const groupName = metadata.subject;

        if (config.GREETINGS) {
            if (data.action === "add") {
                for (const participant of data.participants) {
                    const ppUrl = await conn.profilePictureUrl(participant, "image").catch(() => null);
                    const welcomeMessage = `Hello @${participant.split("@")[0]}, welcome to *${groupName}*! 🎉\nFeel free to introduce yourself and enjoy your stay.`;

                    await conn.sendMessage(data.id, {
                        image: { url: ppUrl || "https://files.catbox.moe/placeholder.png" },
                        caption: welcomeMessage,
                        mentions: [participant],
                    });
                }
            } else if (data.action === "remove") {
                for (const participant of data.participants) {
                    const ppUrl = await conn.profilePictureUrl(participant, "image").catch(() => null);
                    const goodbyeMessage = `Goodbye @${participant.split("@")[0]}, we’ll miss you from *${groupName}*. 😢`;

                    await conn.sendMessage(data.id, {
                        image: { url: ppUrl || "https://files.catbox.moe/placeholder.png" },
                        caption: goodbyeMessage,
                        mentions: [participant],
                    });
                }
            }
        }
    } catch (error) {
        console.error("Error in group-participants.update handler:", error);
    }
});


conn.ev.removeAllListeners("group-participants.update");
conn.ev.on("group-participants.update", async (data) => {
    try {
        const metadata = await conn.groupMetadata(data.id);
        const groupName = metadata.subject;

        // CHECK IF GROUP IS ENABLED FOR PROMOTE/DEMOTE EVENTS
        if (config.EVENTS) {
            if (data.action === "promote" && config.EVENTS) {
                for (const participant of data.participants) {
                    const ppUrl = await conn.profilePictureUrl(participant, "image").catch(() => null);
                    const promoteMessage = `🎉 @${participant.split("@")[0]} is now an admin of *${groupName}*! 🎊`;

                    await conn.sendMessage(data.id, {
                        image: { url: ppUrl || "https://files.catbox.moe/placeholder.png" },
                        caption: promoteMessage,
                        mentions: [participant],
                    });
                }
            }

            if (data.action === "demote" && config.EVENTS) {
                for (const participant of data.participants) {
                    const ppUrl = await conn.profilePictureUrl(participant, "image").catch(() => null);
                    const demoteMessage = `⚠️ @${participant.split("@")[0]} is no longer an admin of *${groupName}*.`;  

                    await conn.sendMessage(data.id, {
                        image: { url: ppUrl || "https://files.catbox.moe/placeholder.png" },
                        caption: demoteMessage,
                        mentions: [participant],
                    });
                }
            }
        }
    } catch (error) {
        console.error("Error in group-participants.update handler:", error);
    }
});

      conn.ev.removeAllListeners("messages.upsert");
     conn.ev.on('messages.upsert', async (mess) => {
    const msg = mess.messages[0];
    try {
        if ( conn.user.id === 'status@broadcast') {
            console.log("Status detected"); // Logs when a status is detected
            await conn.readMessages([msg.key]);
            console.log("Status marked as read"); // Logs when the status is successfully marked as read
        }
    } catch (error) {
        console.error("Failed to mark status message as read:", error);
    }
});


      conn.ev.removeAllListeners("messages.upsert");
      conn.ev.on("messages.upsert", async (m) => {
        if (m.type !== "notify") return;
        let ms = m.messages[0];
        let msg = await serialize(JSON.parse(JSON.stringify(ms)), conn);

        if (!msg.message) return;

        let text_msg = msg.body;
        if (text_msg && config.LOGS) {
          console.log(
            `At : ${
              msg.from.endsWith("@g.us")
                ? (await conn.groupMetadata(msg.from)).subject
                : msg.from
            }\nFrom : ${msg.sender}\nMessage:${text_msg}`
          );
        }

        events.commands.map(async (command) => {
          if (
  command.fromMe &&
  !config.SUDO.includes(msg.sender?.split("@")[0] || !msg.isSelf)
)
            return;
            var id = conn.user.id
          if(id === "status@broadcast"){
            return;
          }

          let comman;
          if (text_msg) {
            comman = text_msg.trim().split(/ +/)[0];
            const handlerRegex = new RegExp(
              `^(${config.HANDLERS.split("").map(h => h.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")})`);            
            msg.prefix = handlerRegex.test(text_msg) ? text_msg.charAt(0) : ",";
          }


          if (command.pattern && command.pattern.test(comman)) {
            var match;
            try {
              await conn.sendMessage(msg.key.remoteJid, {
  react: { text: "⏳️", key: msg.key },
});
              match = text_msg.replace(new RegExp(`^\\${comman}\\s*`, "i"), "").trim();

            } catch {
              match = false;
            }

            whats = new Message(conn, msg, ms);
            command.function(whats, match, msg, conn);
            
          } 
          if(command.on){
            let whats = new Message(conn, msg, ms);
            switch (command.on){
              case "text":
                if(text_msg) command.function(whats, text_msg, msg, conn, m);
                break;
              case "image":
                if(msg.message?.imageMessage) command.function(whats, msg.message.imageMessage, msg, conn, m);
                break;
              case "video":
                if(msg.message?.videoMessage) command.function(whats, msg.message.videoMessage, msg, conn, m);
                break;
              case "audio":
                if(msg.message?.audioMessage) command.function(whats, msg.message.audioMessage, msg, conn, m);
                break;
              case "sticker":
                if(msg.message?.stickerMessage) command.function(whats, msg.message.stickerMessage, msg, conn, m);
                break;
              case "document":
                if (msg.message?.documentMessage) 
                  command.function(whats, msg.message.documentMessage, msg, conn, m);
                break;
              case "reaction":
                if (msg.message?.reactionMessage) 
                  command.function(whats, msg.message.reactionMessage, msg, conn, m);
                break;

              case "status":
                if (msg.key.remoteJid === "status@broadcast" && msg.message) 
                  command.function(whats, msg, conn, m);
                break;
            }
          }
        });
      });
    } catch (e) {
      await conn.sendMessage(msg.sender, {text: e })
      console.log(e.stack + "\n\n\n\n\n" + JSON.stringify(msg));
    }
  });
 




  process.on("uncaughtException", async (err) => {
    //let error = err.message;
    //console.log(err);*
    await conn.sendMessage(conn.user.id, { text: error });
  });
}


setTimeout(() => {
  startNikka();
}, 3000);
