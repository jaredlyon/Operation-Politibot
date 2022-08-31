const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { user } = require('../..');
const client = require('../..');

module.exports = {
	name: "restart",
    description: "Restarts Politibot...",
    options: [],
	async execute(interaction) {
		interaction.channel.send(":wave: " + bot.user.username + " is restarting...");

		setTimeout(function() {
			process.exit();
		}, 1000);
	},
};
