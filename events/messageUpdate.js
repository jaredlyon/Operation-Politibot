var Discord = require('discord.js');

exports.run = (bot, oldMessage, newMessage) => {
    if (new Date() - oldMessage.createdAt <= 5000 && oldMessage.embeds) return;

    var msgUpdate = new Discord.MessageEmbed()
        .setAuthor(newMessage.author.tag, newMessage.author.avatarURL())
        .setTimestamp()
        .addField('Old message:', `${oldMessage}`)
        .addField('New message:', `${newMessage}`)
        .addField(`Channel:`, `${oldMessage.channel}`)
        .setColor(3447003);

    newMessage.guild.channels.cache.get(bot.config.logChannel).send({
        embed: msgUpdate
    })
};