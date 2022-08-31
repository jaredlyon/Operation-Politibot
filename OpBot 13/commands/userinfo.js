const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { user } = require('../..');
const client = require('../..');

module.exports = {
    name: "userinfo",
    description: "Views user info",
    options: [
      {
        "type": 6,
        "name": "target",
        "description": "The targeted snowflake",
        "required": true
      }
    ],
	async execute(interaction) {
        var target = interaction.options.get('target');

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