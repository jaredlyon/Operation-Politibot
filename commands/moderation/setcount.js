const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "setcount",
    description: "Sets a user's message count",
    options: [
      {
        type: 6,
        name: "target",
        description: "The targeted user",
        required: true
      },
      {
        type: 4,
        name: "count",
        description: "The new message count",
        required: true
      }
    ],
	run: async(client, interaction) => {
		if (interaction.user.id == 178689418415177729 || interaction.user.id == 133350262420013056) {
            var log = interaction.guild.channels.cache.get(client.config.logChannel);
            var input = interaction.options.getInteger('count');
            var target = interaction.options.getUser('target');
            var userID = target.id;

            client.msgCount[userID].count = input;
            interaction.reply("User's message count updated!\nNew count: " + client.msgCount[userID].count);

            var countLog = new MessageEmbed()
                .setAuthor(target.username, target.avatarURL())
                .addField('Message count updated:', `**:1234: ${target} (${target.id}).**`)
                .addField('New Count:', input.toString())
                .setFooter(client.user.username, client.user.avatarURL())
                .setTimestamp()
                .setColor("#E74C3C");
            log.send({embeds: [countLog]});
        } else {
            interaction.reply("you do not have permission to do this!");
        }
	},
};