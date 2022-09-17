var Discord = require('discord.js');

exports.run = (bot, messageDelete) => {
    if (!messageDelete.author.bot) {
        var msgDelete = new Discord.MessageEmbed()
            .setAuthor(messageDelete.author.tag, messageDelete.author.avatarURL())
            .setFooter(`id: ` + messageDelete.author.id)
            .setTimestamp()
            .addField('Message deleted:', `${messageDelete.content || "(no content)"}`)
            .addField(`Channel:`, `${messageDelete.channel}`)
            .setColor("#206694");

        messageDelete.guild.channels.cache.get(bot.config.messageDeleteLog).send({
            embed: msgDelete
        }).catch(async err => {
            console.log(err);
            var msgDelete = new Discord.MessageEmbed()
                .setAuthor(messageDelete.author.tag, messageDelete.author.avatarURL())
                .setFooter(`id: ` + messageDelete.author.id)
                .setTimestamp()
                .addField('Message deleted:', `The message content was too large to be logged in an embed, so I'm forwarding it below.`)
                .addField(`Channel:`, `${messageDelete.channel}`)
                .setColor("#206694");
            
            messageDelete.guild.channels.cache.get(bot.config.messageDeleteLog).send({
                embed: msgDelete
            });
            messageDelete.guild.channels.cache.get(bot.config.messageDeleteLog).send(messageDelete.content);
        });
    } else {
        return;
    }
}