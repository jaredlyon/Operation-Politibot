const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "setcount",
    description: "Sets a user's message count",
    options: [
      {
        "type": 6,
        "name": "target",
        "description": "The targeted user",
        "required": true
      },
      {
        "type": 4,
        "name": "count",
        "description": "The new message count",
        "required": true
      }
    ],
	run: async(client, interaction) => {
		if (interaction.author.id == 178689418415177729 || interaction.author.id == 133350262420013056) {
            var log = interaction.guild.channels.cache.get(client.config.logChannel);
            var input = interaction.options.get('count');
            var target = interaction.options.get('target');
            var userID = target.id;

            client.msgCount[userID].count = input;
            interaction.reply("user's message count updated!\nNew count: " + client.interactionCount[userID].count);

            var countLog = new MessageEmbed()
                .setAuthor(target.username, target.avatarURL())
                .addField('Message count updated:', `**:1234: ${target} (${target.id}).**`)
                .addField('New Count:', input)
                .setFooter(client.user.username, client.user.avatarURL())
                .setTimestamp()
                .setColor("#E74C3C");
            log.send({embeds: [countLog]});
        } else {
            interaction.reply("you do not have permission to do this!");
        }
	},
};