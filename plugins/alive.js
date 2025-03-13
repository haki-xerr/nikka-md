const { command, isPrivate } = require("../lib/");
const { getAlive, setAlive, resetAlive } = require("../lib/database/alive");

command(
  {
    pattern: "alive",
    desc: "Get, set, or reset the alive message.",
    fromMe: true,
    type: "user",
  },
  async (message, match) => {
    const args = match.split(" ");

    if (!match || args[0] === "get") {
      const aliveMsg = await getAlive();
      return await message.reply(aliveMsg || "✅ Default Alive Message.");
    }

    if (args[0] === "reset") {
      await resetAlive();
      return await message.reply("✅ Alive message has been reset to default.");
    }

    if (args[0] === "set") {
      const newMessage = match.replace(/^set\s+/, "").trim();
      if (!newMessage) return await message.reply("❌ Please provide a message inside quotes.\nExample: `.alive set \"New alive message\"`");
      await setAlive(newMessage);
      return await message.reply(`✅ Alive message updated to:\n\n${newMessage}`);
    }

    return await message.reply("❌ Invalid command. Use:\n\n.alive get\n.alive set \"your message\"\n.alive reset");
  }
);
