var Discord = require('discord.js');

exports.run = (bot, oldMessage, newMessage) => {
    //if (new Date() - oldMessage.createdAt <= 2000 && newMessage.embeds.length > 0) return;
    if (oldMessage.content === newMessage.content) return;

    var msgUpdate = new Discord.MessageEmbed()
        .setAuthor(newMessage.author.tag, newMessage.author.avatarURL())
        .setFooter(`id: ` + newMessage.author.id)
        .setTimestamp()
        .addField('Old message:', `${oldMessage}`)
        .addField('New message:', `${newMessage}`)
        .addField(`Channel:`, `${oldMessage.channel}`)
        .setColor(3447003);

    newMessage.guild.channels.cache.get(bot.config.logChannel).send({
        embed: msgUpdate
    })
};