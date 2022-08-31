const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { user } = require('../..');
const client = require('../..');

module.exports = {
    name: "report",
    description: "Report an issue to staff!",
    options: [
      {
        "type": 3,
        "name": "reason",
        "description": "The reason for issue",
        "required": true
      }
    ],
	async execute(interaction) {
        var log = interaction.guild.channels.cache.get(client.config.logChannel);
        var reason = interaction.options.get('reason');

        //#trial-moderators: 893189722887839797
        var modChannel = interaction.guild.channels.cache.get('893189722887839797');

        var logEmbed = new MessageEmbed()
            .setAuthor(interaction.author.username, interaction.author.avatarURL())
            .setTitle("**Complaint Filed**")
            .addField('Reason:', reason)
            .addField('Message Link:', interaction.url)
            .setFooter(client.user.username, client.user.avatarURL())
            .setTimestamp()
            .setColor("#992D22");

        log.send({
            embeds: [logEmbed]
        })

        //trial mod role: 893189360105689139
        //mod role: 854841000480079882
        modChannel.send("<@&893189360105689139> <@&854841000480079882> <@&927318500614225920> <@&895051017828311100> **See below complaint:**");
        modChannel.send({
            embeds: [logEmbed]
        })

        //reply
        interaction.reply("your complaint has been sent! A staff member will be with you shortly.");
	},
};