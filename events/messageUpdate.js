var Discord = require('discord.js');

exports.run = (messageUpdate, ) => {
    if (!messageUpdate.author.bot) {
        var msgUpdate = new Discord.MessageEmbed()
            .setAuthor(messageUpdate.author.tag, messageUpdate.author.avatarURL())
            .setTimestamp()
            .addField('Old message:', `${oldMessage.content || "(no content)"}`)
            .addField('New message:', `${newMessage.content || "(no content)"}`)
            .addField(`Channel:`, `${messageUpdate.channel}`)
            .setColor(3447003);

            messageUpdate.guild.channels.cache.get(bot.config.messageUpdateLog).send({
            embed: msgDelete
        })
    } else {
        return;
    }
}