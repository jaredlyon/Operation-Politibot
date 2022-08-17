const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('View user info')
        .addUserOption(target =>
            target.setName('target')
                .setDescription('The targeted snowflake')
                .setRequired(true)),
	async execute(interaction) {
        var info = new MessageEmbed()
            .setAuthor(target.user.tag, target.user.avatarURL())
            .addField('Nickname:', target.nickname)
            .addField('Joined At:', target.joinedAt)
            .addField('Account Created At:', target.user.createdAt)
            .addField('Roles:', target.roles.cache.map(r => `${r}`).join(' | '), true)
            .setFooter("User ID: " + target.id)
            .setTimestamp()
            .setColor(3447003);
        
        let trusted = (await bot.trusted.get(target.id)) || {};
        if (target.roles.cache.some(role => role.id === '909989200378601472')) {
            var trustedDate = new Date(trusted.joinDate.getTime() + 1209600000);
            info.addField('User Will Be Trusted On:', trustedDate)
        }

        interaction.channel.send({
            embeds: [info]
        });
	},
};