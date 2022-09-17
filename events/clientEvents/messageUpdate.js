const { MessageEmbed, Message } = require("discord.js");

module.exports = {
	name: 'messageUpdate',
	execute(oldMessage, newMessage, client) {
		//if (new Date() - oldMessage.createdAt <= 2000 && newMessage.embeds.length > 0) return;
        if (oldMessage.content === newMessage.content) return;

        var msgUpdate = new MessageEmbed()
            .setAuthor(newMessage.author.tag, newMessage.author.avatarURL())
            .setFooter(`id: ` + newMessage.author.id)
            .setTimestamp()
            .addField('Old message:', `${oldMessage}`)
            .addField('New message:', `${newMessage}`)
            .addField(`Channel:`, `${oldMessage.channel}`)
            .setColor("#206694");
    
        newMessage.guild.channels.cache.get(client.config.logChannel).send({
            embeds: [msgUpdate]
        }).catch(async err => {
            console.log(err);
            var msgUpdate = new MessageEmbed()
                .setAuthor(newMessage.author.tag, newMessage.author.avatarURL())
                .setFooter(`id: ` + newMessage.author.id)
                .setTimestamp()
                .addField('Message edited:', `The message content was too large to be logged in an embed, so I'm forwarding it below.`)
                .addField(`Channel:`, `${oldMessage.channel}`)
                .setColor("#206694");
            
            newMessage.guild.channels.cache.get(client.config.logChannel).send({
                embeds: [msgUpdate]
            });
            newMessage.guild.channels.cache.get(client.config.logChannel).send("**Old Message:**");
            newMessage.guild.channels.cache.get(client.config.logChannel).send(oldMessage.content);
            newMessage.guild.channels.cache.get(client.config.logChannel).send("**New Message:**");
            newMessage.guild.channels.cache.get(client.config.logChannel).send(newMessage.content);
        });
	},
};