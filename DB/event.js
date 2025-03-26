const fs = require("fs");
const path = require("path");

const configDir = path.join(__dirname, "events", "config");
const configFile = path.join(configDir, "eventConfig.json");

// Ensure the directory exists
if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
}

// Ensure the JSON file exists
if (!fs.existsSync(configFile)) {
    fs.writeFileSync(configFile, JSON.stringify({ promote: {}, demote: {} }, null, 2));
}

// Function to read event states
function getEventConfig() {
    return JSON.parse(fs.readFileSync(configFile, "utf8"));
}

// Function to update event states per group
function setEventConfig(event, state, jid) {
    let config = getEventConfig();
    
    if (!config[event]) config[event] = {}; // Ensure event key exists
    if (state) {
        config[event][jid] = true; // Enable for this group JID
    } else {
        delete config[event][jid]; // Disable/remove for this group JID
    }

    fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
}

// Export functions
module.exports = { getEventConfig, setEventConfig };
