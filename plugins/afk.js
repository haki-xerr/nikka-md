/*const { command, isPrivate } = require('../lib');
const { getAfkMessage, setAfkMessage, delAfkMessage } = require('../lib/database/afk');

const afkTrack = {};

command(
  {
    pattern: 'afk',
    desc: 'Manage the global AFK message',
    fromMe: isPrivate,
    type: 'user',
  },
  async (message) => {
    const prefix = message.prefix || '.';
    let args = message.text.split(' ').slice(1).join(' ').trim();

    if (!args) {
      return await message.reply(`${prefix}afk on\n${prefix}afk set <message>\n${prefix}afk off`);
    }

    if (args === 'on') {
      await setAfkMessage(`I'm currently away, please leave a message.`, Date.now());
      return await message.reply(`AFK is now active. Customize with ${prefix}afk set <message>.`);
    }

    if (args === 'off') {
      await delAfkMessage();
      return await message.reply('AFK has been deactivated.');
    }

    if (args.startsWith('set')) {
      const afkMessage = args.split(' ').slice(1).join(' ');
      if (!afkMessage) return await message.reply('Provide a message to set as AFK status.');
      await setAfkMessage(afkMessage, Date.now());
      return await message.reply(`AFK message set to: "${afkMessage}"`);
    }

    if (args === 'get') {
      const afkData = await getAfkMessage();
      if (!afkData) return await message.reply('No AFK message set. Use .afk set <message>.');
      return await message.reply(
        `${afkData.message}\nLast Seen: ${formatDuration(Date.now() - afkData.timestamp)} ago`
      );
    }

    return await message.reply(`${prefix}afk on\n${prefix}afk set <message>\n${prefix}afk off`);
  }
);

command(
  {
    on: 'text',
    dontAddCommandList: true,
  },
  async (message, m) => {
    const afkData = await getAfkMessage();
    if (!afkData) return;

    if (message.isGroup && message.mention?.includes(message.user)) {
      return await message.reply(
        `${afkData.message}\n\nLast Seen: ${formatDuration(Date.now() - afkData.timestamp)}`
      );
    }

    const now = Date.now();
    if (now - (afkTrack[message.sender] || 0) < 30000) return;
    afkTrack[m.sender] = now;

    return await message.reply(
      `${afkData.message}\n\nLast Seen: ${formatDuration(now - afkData.timestamp)}`
    );
  }
);

function formatDuration(ms) {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const seconds = Math.floor((ms / 1000) % 60);
  return `${hours}hr ${minutes}mins ${seconds}sec`;
}

*/