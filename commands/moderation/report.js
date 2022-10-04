const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "report",
    description: "Report an issue to staff!",
    options: [
      {
        type: 3,
        name: "reason",
        description: "The reason for issue",
        required: true
      }
    ],
	run: async(client, interaction) => {
        var log = interaction.guild.channels.cache.get(client.config.logChannel);
        var reason = interaction.options.getString('reason');
        var modChannel = interaction.guild.channels.cache.get('893189722887839797');

        var logEmbed = new MessageEmbed()
            .setAuthor(interaction.user.username, interaction.user.avatarURL())
            .setTitle("**Complaint Filed**")
            .addField('Reason:', reason)
            .addField('Timestamp:', "In channel " + interaction.channel.toString() + " at: \n`" + interaction.createdAt + "`")
            .setFooter(client.user.username, client.user.avatarURL())
            .setTimestamp()
            .setColor("#992D22");

        log.send({
            embeds: [logEmbed]
        })

        modChannel.send({
          content: "<@178689418415177729> <@&893189360105689139> <@&854841000480079882> <@&927318500614225920> **See below complaint:**",
          embeds: [logEmbed]
        });

        //reply
        interaction.reply({ content: "Your complaint has been sent! Thank you for helping keep Operation Politics healthy!", ephemeral: true });
	},
};