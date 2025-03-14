const { command } = require("../lib");
const fs = require("fs");
const path = require("path");
const {tiny} = require("../lib/fancy_font/fancy");

const sudoFilePath = path.join(__dirname, "../DB/sudo.json");

const getSudoList = () => {
  if (!fs.existsSync(sudoFilePath)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(sudoFilePath, "utf-8"));
    return data.SUDO ? data.SUDO.split(",") : [];
  } catch (error) {
    console.error("Error reading sudo.json:", error);
    return [];
  }
};

const updateSudo = (sudoList) => {
  try {
    fs.writeFileSync(sudoFilePath, JSON.stringify({ SUDO: sudoList.join(",") }, null, 2));
  } catch (error) {
    console.error("Error updating sudo.json:", error);
  }
};

const cleanJid = (jid) => jid.replace(/@s\.whatsapp\.net$/, "");

const restartBot = async (message) => {
  await message.reply(tiny("♻️ Restarting bot..."));
  process.exit(1);
};

command(
  {
    pattern: "setsudo",
    fromMe: true,
    desc: "Add a number to sudo list",
    type: "config",
  },
  async (message) => {
    let match = message.reply_message?.jid || message.mention?.[0];
    if (!match) return await message.reply(tiny("Reply to a message or mention a number to add to sudo."));

    let number = cleanJid(match);
    let sudoList = getSudoList();

    if (sudoList.includes(number)) {
      return await message.reply(tiny("This number is already a sudo user."));
    }

    sudoList.push(number);
    updateSudo(sudoList);
    await message.reply(tiny(`✅ Added ${number} to sudo list.`));

    restartBot(message);
  }
);

command(
  {
    pattern: "delsudo",
    fromMe: true,
    desc: "Remove a number from sudo list",
    type: "owner",
  },
  async (message) => {
    let match = message.reply_message?.jid || message.mention?.[0];
    if (!match) return await message.reply(tiny("Reply to a message or mention a number to remove from sudo."));

    let number = cleanJid(match);
    let sudoList = getSudoList();

    if (!sudoList.includes(number)) {
      return await message.reply(tiny("This number is not a sudo user."));
    }

    sudoList = sudoList.filter((num) => num !== number);
    updateSudo(sudoList);
    await message.reply(tiny(`✅ Removed ${number} from sudo list.`));

    restartBot(message);
  }
);

command(
  {
    pattern: "getsudo",
    fromMe: true,
    desc: "List all sudo users",
    type: "owner",
  },
  async (message) => {
    let sudoList = getSudoList();
    return await message.reply(
      tiny(` **sudo users:**\n${sudoList.length ? sudoList.join("\n") : "No sudo users found."}`)
    );
  }
);
const axios = require('axios');

command(
  {
    pattern: "pair",
    fromMe: true,
    desc: "Fetches the pair code based on the user's phone number",
    type: "utility",
  },
  async (message, match) => {
    let phoneNumber;
    
    // Check if match exists (used for pair <phone number> case)
    if (match && match.trim()) {
      phoneNumber = match.trim();
    } 
    // If no match, check if the message is a reply and extract JID (phone number)
    else if (message.reply_message && message.reply_message.jid) {
      phoneNumber = message.reply_message.jid.split('@')[0];
    }

    // If no phone number found, inform the user
    if (!phoneNumber) {
      return await message.reply("Please provide a valid phone number or reply to a message with the user's phone number.");
    }

    try {
      // Make the request to your API using the phone number
      const response = await axios.get(`https://pair-nikka.onrender.com/pair?code=${phoneNumber}`);
      
      // Extract the pair code from the response
      const pairCode = response.data.code;
      
      // Send pair code to the user
      return await message.reply(`${pairCode}`);
    } catch (error) {
      console.error(error);
      return await message.reply("There was an error fetching the pair code. Please try again later.");
    }
  }
);
