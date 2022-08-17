const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('logs')
		.setDescription(`Views a user's moderation log history`)
        .addUserOption(target =>
            target.setName('user')
                .setDescription('The user to be reviewed')
                .setRequired(true)),
	async execute(interaction) {
		var caseCount = bot.caseNum.count;

        var log = new MessageEmbed()
            .setTitle('Moderation Log History')
            .setTimestamp()
            .setColor(3447003);
        
            if (interaction.guild.members.cache.get(userid)) {
                var target = interaction.guild.members.cache.get(userid);
                log.setAuthor(target.user.username + "#" + target.user.discriminator, target.user.avatarURL());
                log.setFooter('User ID: ' + target.id)
            } else {
                var target = userid;
                log.setAuthor("(User left server) ID: " + target);
                log.setFooter('User ID: ' + userid);
            }

        for (let i = 0; i < caseCount; i++) {
            if (bot.logs[i] && bot.logs[i].userid == userid) {
                var moderator = interaction.guild.members.cache.get(bot.logs[i].moderatorid);
                log.addField(bot.logs[i].type + ' issued by ' + moderator.user.username, bot.logs[i].date + '\n' + bot.logs[i].reason + '\nCase ID: ' + bot.logs[i].caseNum)
            }
        }

        interaction.channel.send({
            embeds: [log]
        })
	},
};