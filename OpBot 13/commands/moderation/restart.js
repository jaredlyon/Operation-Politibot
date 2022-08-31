const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	name: "restart",
    description: "Restarts Politibot...",
    options: [],
	run: async(client, interaction) => {
		interaction.channel.send(":wave: " + bot.user.username + " is restarting...");

		setTimeout(function() {
			process.exit();
		}, 1000);
	},
};
