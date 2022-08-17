const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('report')
		.setDescription('Report an issue to staff!')
        .addStringOption(reason =>
            reason.setName('reason')
                .setDescription('The reason for issue')
                .setRequired(true)),
	async execute(interaction) {
        var log = interaction.guild.channels.cache.get(bot.config.logChannel);

        //#trial-moderators: 893189722887839797
        var modChannel = interaction.guild.channels.cache.get('893189722887839797');

        var logEmbed = new MessageEmbed()
            .setAuthor(interaction.author.username, interaction.author.avatarURL())
            .setTitle("**Complaint Filed**")
            .addField('Reason:', reason)
            .addField('Message Link:', interaction.url)
            .setFooter(bot.user.username, bot.user.avatarURL())
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