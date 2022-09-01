const { MessageEmbed, Message } = require("discord.js");

module.exports = {
	name: 'guildMemberRemove',
	async execute(member, client) {
        console.log('HELLO YOU FUCKINT IDIITO')
        var channel = member.guild.channels.cache.get(client.config.logChannel);
        var leave = new MessageEmbed()
            .setAuthor(member.user.username, member.user.avatarURL())
            .addField('Member Count:', member.guild.memberCount.toString())
            .setFooter(`id: ` + member.user.id)
            .setTimestamp()
            .setTitle('Member left!')
            .setColor("#FFFFFF");
    
        channel.send({
            embeds: [leave]
        })
	},
};