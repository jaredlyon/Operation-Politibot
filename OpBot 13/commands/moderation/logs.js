const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "logs",
    description: "Views a user's moderation log history",
    options: [
      {
        "type": 6,
        "name": "target",
        "description": "The user to be reviewed",
        "required": true
      }
    ],
	run: async(client, interaction) => {
		var caseCount = client.caseNum.count;
        var userid = interaction.options.get('target').id;

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
            if (client.logs[i] && client.logs[i].userid == userid) {
                var moderator = interaction.guild.members.cache.get(client.logs[i].moderatorid);
                log.addField(client.logs[i].type + ' issued by ' + moderator.user.username, client.logs[i].date + '\n' + client.logs[i].reason + '\nCase ID: ' + client.logs[i].caseNum)
            }
        }

        interaction.channel.send({
            embeds: [log]
        })
	},
};