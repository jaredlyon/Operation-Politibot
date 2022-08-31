const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { user } = require('../..');
const client = require('../..');

module.exports = {
    name: "casehead",
    description: "Shows then ten most recent moderation logs",
    options: [],
	async execute(interaction) {
		var caseCount = client.caseNum.count;

        var log = new MessageEmbed()
            .setTitle('Most Recent Moderation Logs (10)')
            .setTimestamp()
            .setColor(3447003);

        for (let i = caseCount-10; i < caseCount; i++) {
            if (client.logs[i]) {
                if (interaction.guild.members.cache.get(client.logs[i].userid)) {
                    var username = interaction.guild.members.cache.get(client.logs[i].userid).user.username;
                } else {
                    var username = client.logs[i].userid;
                }
                var moderator = interaction.guild.members.cache.get(client.logs[i].moderatorid);
                log.addField(username + " | " + client.logs[i].type + ' issued by ' + moderator.user.username, client.logs[i].date + '\n' + client.logs[i].reason + '\nCase ID: ' + client.logs[i].caseNum)
            } else {
                log.addField("Case " + i, "*This case was deleted.*")
            }
        }

        interaction.channel.send({
            embeds: [log]
        })
	},
};