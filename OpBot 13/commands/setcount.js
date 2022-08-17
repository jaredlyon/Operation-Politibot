const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setcount')
		.setDescription(`Sets a user's message count`)
        .addIntegerOption(input =>
            input.setName('count')
                .setDescription('The new message count')
                .setRequired(true)),
	async execute(interaction) {
		if (interaction.author.id == 178689418415177729 || interaction.author.id == 133350262420013056) {
            var log = interaction.guild.channels.cache.get(bot.config.logChannel);

            if (interaction.mentions.users.first()) {
                var target = interaction.mentions.users.first();
                var userID = target.id;
            } else if (!interaction.mentions.users.first()) {
                var userID = interaction.content.split(' ').splice(0)[0];
                var tmp = interaction.guild.members.cache.get(userID);
                var target = tmp.user;
            }

            bot.interactionCount[userID].count = input;
            interaction.reply("user's message count updated!\nNew count: " + bot.interactionCount[userID].count);

            var countLog = new MessageEmbed()
                .setAuthor(target.username, target.avatarURL())
                .addField('Message count updated:', `**:1234: ${target} (${target.id}).**`)
                .addField('New Count:', input)
                .setFooter(bot.user.username, bot.user.avatarURL())
                .setTimestamp()
                .setColor("#E74C3C");
            log.send({embeds: [countLog]});
        } else {
            interaction.reply("you do not have permission to do this!");
        }
	},
};