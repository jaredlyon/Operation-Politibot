module.exports = {
	name: 'guildMemberRemove',
	once: false,
	execute(client, member) {
        var channel = member.guild.channels.cache.get(client.config.logChannel);
        var leave = new Discord.MessageEmbed()
            .setAuthor(member.user.username, member.user.avatarURL())
            .addField('Member Count:', member.guild.memberCount)
            .setFooter(`id: ` + member.user.id)
            .setTimestamp()
            .setTitle('Member left!')
            .setColor("#FFFFFF");
    
        channel.send({
            embeds: [leave]
        })
	},
};