const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('casehead')
		.setDescription('Shows then ten most recent moderation logs'),
	async execute(interaction) {
		var caseCount = bot.caseNum.count;

        var log = new MessageEmbed()
            .setTitle('Most Recent Moderation Logs (10)')
            .setTimestamp()
            .setColor(3447003);

        for (let i = caseCount-10; i < caseCount; i++) {
            if (bot.logs[i]) {
                if (interaction.guild.members.cache.get(bot.logs[i].userid)) {
                    var username = interaction.guild.members.cache.get(bot.logs[i].userid).user.username;
                } else {
                    var username = bot.logs[i].userid;
                }
                var moderator = interaction.guild.members.cache.get(bot.logs[i].moderatorid);
                log.addField(username + " | " + bot.logs[i].type + ' issued by ' + moderator.user.username, bot.logs[i].date + '\n' + bot.logs[i].reason + '\nCase ID: ' + bot.logs[i].caseNum)
            } else {
                log.addField("Case " + i, "*This case was deleted.*")
            }
        }

        interaction.channel.send({
            embeds: [log]
        })
	},
};