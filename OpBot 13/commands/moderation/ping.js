const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: "ping",
    description: "Pings the bot",
    options: [],
	run: async(client, interaction) => {
		await interaction.reply('Pong!');
	},
};