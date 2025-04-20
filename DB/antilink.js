/** @format */

const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, 'store', 'antilink.json');

// Ensure the JSON file exists
if (!fs.existsSync(storePath)) {
	fs.writeFileSync(storePath, JSON.stringify({ enabledChats: [] }));
}

// Database functions
const readDB = () => JSON.parse(fs.readFileSync(storePath, 'utf8'));
const writeDB = data =>
	fs.writeFileSync(storePath, JSON.stringify(data, null, 2));

// Enable chatbot in a chat
async function enableAntilink(jid) {
	const data = readDB();
	if (!data.enabledChats.includes(jid)) {
		data.enabledChats.push(jid);
		writeDB(data);
	}
	return true;
}

// Disable chatbot in a chat
async function disableAntilink(jid) {
	const data = readDB();
	data.enabledChats = data.enabledChats.filter(chat => chat !== jid);
	writeDB(data);
	return true;
}

// Check if chatbot is enabled
async function isAntilinkEnabled(jid) {
	const data = readDB();
	return data.enabledChats.includes(jid);
}

module.exports = {
	enableAntilink,
	disableAntilink,
	isAntilinkEnabled,
};
