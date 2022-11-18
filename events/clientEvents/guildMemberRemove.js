const { MessageEmbed, Message } = require("discord.js");

module.exports = {
	name: 'guildMemberRemove',
	async execute(member, client) {
        // fetch consts
        const channel = member.guild.channels.cache.get(client.config.logChannel);

        // generate embed
        var leave = new MessageEmbed()
            .setAuthor(member.user.username, member.user.avatarURL())
            .addField('Member Count:', member.guild.memberCount.toString())
            .setFooter(`id: ` + member.user.id)
            .setTimestamp()
            .setTitle('Member left!')
            .setColor("#FFFFFF");
    
        // send embed
        channel.send({
            embeds: [leave]
        });
	}
};