const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
        console.log('Запустился бот ' + bot.user.tag);
    })

    const colors = {
      "ID Эмоджи": "ID Роли",
      "ID Эмодзи 2": "ID Роли 2", // И так далее.
    };
    bot.on("ready", () => {
    const channelID = "ID Канала, где сообщение с реакциями.",
       messageID = "ID Сообщение, какое думаю и так понятно.";
    
    bot.channels.cache.get(channelID).messages.fetch(messageID);
    
    bot.on("messageReactionAdd", (r, user) => {
      if (user.bot || r.message.id != messageID || (!(r.emoji.id in colors) && !(r.emoji.name in colors))) return; 
      r.message.guild.member(user.id).roles.add(colors[(r.emoji.id in colors) ? r.emoji.id : r.emoji.name]);
    });
    
    bot.on("messageReactionRemove", (r, user) => {
      if (user.bot || r.message.id != messageID || (!(r.emoji.id in colors) && !(r.emoji.name in colors))) return;
      r.message.guild.member(user.id).roles.remove(colors[(r.emoji.id in colors) ? r.emoji.id : r.emoji.name]);
    });
    })

bot.login('token');