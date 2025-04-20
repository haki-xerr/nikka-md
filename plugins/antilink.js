/** @format */

const {
	enableAntilink,
	disableAntilink,
	isAntilinkEnabled,
} = require('../DB/chatbot');
const { command, isPrivate, isUrl } = require('@lib');
const config = require('@config');

command(
	{
		pattern: 'antilink',
		desc: 'toggle antilink on or off',
		type: 'group',
		fromMe: isPrivate,
	},
	async (message, match, m) => {
		try {
			jid = message.jid;
			if (jid.endsWith('@g.us')) return m.reply('group only command');
			let opt = ['on', 'off'];
			if (!match && !match.includes(opt))
				return m.reply(
					`uhh incorrect format,use\n ${message.prefix}antilink on\n ${message.prefix}antilink off\n`
				);
			if (match.toLowerCase() === 'on') {
				await enableAntilink(jid);
				await m.reply('antilink enabled');
			} else if (match.toLowerCase() === 'off') {
				await disableAntilink(jid);
				await m.reply('antilink disabled');
			} else
				return m.reply(
					`uhh incorrect format,use\n ${message.prefix}antilink on\n ${message.prefix}antilink off\n`
				);
		} catch (e) {
			console.log(e);
			m.reply(e);
		}
	}
);

command(
	{
		on: 'text',
		fromMe: false,
		dontAddToCommandList: true,
	},
	async (message, match) => {
		if (!message.isGroup) return;
		const isEnabled = await isAntilinkEnabled(message.jid);
		if (isEnabled)
			if (isUrl(match)) {
				await message.reply('*_Link detected_*');
				let botadmin = await isAdmin(message.jid, message.user, message.client);
				let senderadmin = await isAdmin(
					message.jid,
					message.participant,
					message.client
				);
				if (botadmin) {
					if (!senderadmin) {
						if (config.ANTILINK_ACTION === 'kick') {
							await message.reply(
								`_Commencing Specified Action :${config.ANTILINK_ACTION}_`
							);
							return await message.kick(m.sender);
						} else {
							return await message.delete(message.key);
						}
					}
				} else {
					return await message.reply("*_I'm not admin_*");
				}
			}
	}
);
