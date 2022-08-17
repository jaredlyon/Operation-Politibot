const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('restart')
		.setDescription('Restarts the bot'),
	async execute(interaction) {
		interaction.channel.send(":wave: " + bot.user.username + " is restarting...");

		setTimeout(function() {
			process.exit();
		}, 1000);
	},
};
