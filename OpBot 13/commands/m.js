const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('m')
		.setDescription('Sends a message to a channel'),
	async execute(interaction) {
        await interaction.reply('This commands still under development.');
        /*
        const args = msg.content.slice(2).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        let message = args.splice(0).join(' ');

        var channel = msg.mentions.channels.first();

        channel.send(message)
        */
	},
};