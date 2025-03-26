var config = require("../config");
var commands = [];

function command(info, func) {
    let types = [
        'converter', 'image', 'wallpaper', 'config', 'sticker-cmd', 'christian', 
        'system', 'downloader', 'ai', 'group', 'stalker', 'dev', 'help', 
        'user', 'search', 'logo', 'fun', 'file', 'anime'
    ];
    
    var infos = { ...info, function: func };
    infos.pattern = new RegExp(`^${config.HANDLERS}(${info.pattern})$`, `i`);

    if (!infos.dontAddCommandList) infos.dontAddCommandList = false;
    if (!infos.fromMe) infos.dontAddCommandList = false;
    if (!info.type || !types.includes(info.type)) infos.dontAddCommandList = true;

    commands.push(infos);
    return infos;
}

module.exports = { command, commands };
