const { getChatSummary, getGroupMembersMessageCount, getInactiveGroupMembers } = require('../DB/store');
const { command,  isPrivate } = require('../lib');

command(
  {
    pattern: 'listpc',
    fromMe: isPrivate, 
    desc: 'Get direct messages summary',
    type: 'user',
  },
  async (message) => {
    const allChats = await getChatSummary();
    const dmChats = allChats.filter(
      (chat) =>
        !chat.jid.endsWith('@g.us') &&
        !chat.jid.endsWith('@newsletter') &&
        chat.jid !== 'status@broadcast' &&
        chat.jid !== message.user
    );

    if (dmChats.length === 0) {
      return message.reply('No direct messages found.');
    }

    const mentionJids = dmChats.map((chat) => chat.jid);
    const PersonalMessages = dmChats.map(
      (chat, index) =>
        `${index + 1}. FROM: @${chat.jid.split('@')[0]}
Messages: ${chat.messageCount}
Last Message: ${new Date(chat.lastMessageTimestamp).toLocaleString()}`
    );

    message.reply(`*Direct Messages:*\n\n${PersonalMessages.join('\n\n')}`, {
      mentions: mentionJids,
    });
  }
);

command(
  {
    pattern: 'listgc',
    fromMe: isPrivate,
    desc: 'Get group chats summary',
    type: 'user',
  },
  async (message) => {
    const allChats = await getChatSummary();
    const groupChats = allChats.filter((chat) => chat.jid.endsWith('@g.us'));

    if (groupChats.length === 0) {
      return message.reply('No group chats found.');
    }

    const data = await Promise.all(
      groupChats.map(async (chat, index) => {
        try {
          const groupMetadata = await message.client.groupMetadata(chat.jid);
          return `GROUP: ${groupMetadata?.subject || 'Unknown Group'}
Messages: ${chat.messageCount}
Last Message: ${new Date(chat.lastMessageTimestamp).toLocaleString()}`;
        } catch (error) {
          return `GROUP: Unknown Group
Messages: ${chat.messageCount}
Last Message: ${new Date(chat.lastMessageTimestamp).toLocaleString()}`;
        }
      })
    );

    message.reply(`Group Chats:\n\n${data.join('\n\n')}`);
  }
);

command(
  {
    pattern: 'active',
    fromMe: isPrivate,
    desc: 'Return the Active Group Members from when the bot started running',
    type: 'group',
  },
  async (message) => {
    const groupData = await getGroupMembersMessageCount(message.jid);
    if (groupData.length === 0) return await message.reply('_No active members found._');
    let activeMembers = '*Active Group Members*\n\n';
    groupData.forEach((member, index) => {
      activeMembers += `*${index + 1}. ${member.name}*\n`;
      activeMembers += `*   • Messages: ${member.messageCount}\n`;
    });

    await message.reply(activeMembers);
  }
);

command(
  {
    pattern: 'inactive',
    fromMe: isPrivate,
    desc: 'Get the inactive group members from a group',
    type: 'group',
  },
  async (message) => {
    const groupData = await getInactiveGroupMembers(message.jid, message.client);
    if (groupData.length === 0)
      return await message.reply('*📊 Inactive Members:* No inactive members found.');
    let inactiveMembers = '📊 Inactive Members:\n\n';
    inactiveMembers += `Total Inactive: ${groupData.length}\n\n`;
    groupData.forEach((jid, index) => {
      inactiveMembers += `${index + 1}. @${jid.split('@')[0]}\n`;
    });
    await message.reply(inactiveMembers, { mentions: groupData });
  }
);
