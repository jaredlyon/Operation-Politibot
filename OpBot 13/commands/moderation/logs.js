const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "logs",
    description: "Views a user's moderation log history",
    options: [
      {
        type: 6,
        name: "target",
        description: "The user to be reviewed",
        required: true
      }
    ],
	run: async(client, interaction) => {
		var caseCount = client.caseNum.count;
        const targetUser = await interaction.options.getUser('target');
        const userID = targetUser.id;
        const targetMember = await interaction.guild.members.fetch(targetUser);

        var log = new MessageEmbed()
            .setTitle('Moderation Log History')
            .setTimestamp()
            .setColor(3447003);
        
        if (targetMember) {
            log.setAuthor(targetUser.username + "#" + targetUser.discriminator, targetUser.avatarURL());
            log.setFooter('User ID: ' + targetUser.id)
        } else {
            var targetID = targetUser.id;
            log.setAuthor("(User left server) ID: " + targetID);
            log.setFooter('User ID: ' + targetID);
        }

        for (let i = 0; i < caseCount; i++) {
            if (client.logs[i] && client.logs[i].userid == userID) {
                var moderator = interaction.guild.members.cache.get(client.logs[i].moderatorid);
                log.addField(client.logs[i].type + ' issued by ' + moderator.user.username, client.logs[i].date + '\n' + client.logs[i].reason + '\nCase ID: ' + client.logs[i].caseNum)
            }
        }

        interaction.reply({
            embeds: [log]
        })
	},
};
