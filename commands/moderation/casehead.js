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
                var targetID = client.logs[i].userid;
                var targetUser = await client.users.fetch(targetID);

                if (targetUser) {
                    var username = targetUser.username;
                } else {
                    var username = targetID;
                }

                var modID = client.logs[i].moderatorid;
                var moderator = await client.users.fetch(modID);

                log.addField(username + " | " + client.logs[i].type + ' issued by ' + moderator.username, client.logs[i].date + '\n' + client.logs[i].reason + '\nCase ID: ' + client.logs[i].caseNum)
            } else {
                log.addField("Case " + i, "*This case was deleted.*");
            }
        }

        interaction.reply({
            embeds: [log]
        });
    },
};
