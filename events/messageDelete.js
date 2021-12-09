var Discord = require('discord.js');

exports.run = (bot, messageDelete) => {
    if (!messageDelete.author.bot) {
        var msgDelete = new Discord.MessageEmbed()
            .setAuthor(messageDelete.author.tag, messageDelete.author.avatarURL())
            .setFooter(`id: ` + messageDelete.author.id)
            .setTimestamp()
            .addField('Message deleted:', `${messageDelete.content || "(no content)"}`)
            .addField(`Channel:`, `${messageDelete.channel}`)
            .setColor(3447003);

            messageDelete.guild.channels.cache.get(bot.config.messageDeleteLog).send({
            embed: msgDelete
        })
    } else {
        return;
    }
}