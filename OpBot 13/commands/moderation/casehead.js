const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "casehead",
    description: "Shows then ten most recent moderation logs",
    options: [],
    run: async (client, interaction) => {
        var caseCount = client.caseNum.count;

        var log = new MessageEmbed()
            .setTitle('Most Recent Moderation Logs (10)')
            .setTimestamp()
            .setColor(3447003);

        for (let i = caseCount - 10; i < caseCount; i++) {
            if (client.logs[i]) {
                var targetMember = await interaction.guild.members.fetch(client.logs[i].userid);
                console.log("Member: " + targetMember);

                if (targetMember) {
                    var username = await targetMember.username;
                } else {
                    var username = client.logs[i].userid;
                }
                console.log(username);

                var moderator = await client.users.fetch(client.logs[i].moderatorid);

                log.addField(username + " | " + client.logs[i].type + ' issued by ' + moderator.username, client.logs[i].date + '\n' + client.logs[i].reason + '\nCase ID: ' + client.logs[i].caseNum)
            } else {
                log.addField("Case " + i, "*This case was deleted.*")
            }
        }

        interaction.reply({
            embeds: [log]
        });
    },
};
