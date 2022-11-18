const { MessageEmbed, Message } = require("discord.js");

module.exports = {
	name: 'messageDelete',
	async execute(message, client) {
        // generate embed
        const msgDelete = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setFooter(`id: ` + message.author.id)
            .setTimestamp()
            .addField('Message deleted:', `${message.content || "(no content)"}`)
            .addField(`Channel:`, `${message.channel}`)
            .setColor("#206694");

        // send embed
        message.guild.channels.cache.get(client.config.messageDeleteLog).send({
            embeds: [msgDelete]
        }).catch(async err => {
            // catches if the edit is too long for an embed
            console.log(err);
            // generate embed
            const msgDelete = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setFooter(`id: ` + message.author.id)
                .setTimestamp()
                .addField('Message deleted:', `The message content was too large to be logged in an embed, so I'm forwarding it below.`)
                .addField(`Channel:`, `${message.channel}`)
                .setColor("#206694");
            
            // send embed
            message.guild.channels.cache.get(client.config.messageDeleteLog).send({
                embeds: [msgDelete]
            });
            // send caught info
            message.guild.channels.cache.get(client.config.messageDeleteLog).send(message.content);
        });
	},
};