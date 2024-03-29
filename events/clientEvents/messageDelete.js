const { MessageEmbed, Message } = require("discord.js");

module.exports = {
	name: 'messageDelete',
	async execute(message, client) {
        var msgDelete = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setFooter(`id: ` + message.author.id)
            .setTimestamp()
            .addField('Message deleted:', `${message.content || "(no content)"}`)
            .addField(`Channel:`, `${message.channel}`)
            .setColor("#206694");

        message.guild.channels.cache.get(client.config.messageDeleteLog).send({
            embeds: [msgDelete]
        }).catch(async err => {
            console.log(err);
            var msgDelete = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setFooter(`id: ` + message.author.id)
                .setTimestamp()
                .addField('Message deleted:', `The message content was too large to be logged in an embed, so I'm forwarding it below.`)
                .addField(`Channel:`, `${message.channel}`)
                .setColor("#206694");
            
            message.guild.channels.cache.get(client.config.messageDeleteLog).send({
                embeds: [msgDelete]
            });
            message.guild.channels.cache.get(client.config.messageDeleteLog).send(message.content);
        });
	},
};