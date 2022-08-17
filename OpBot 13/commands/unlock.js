const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unlock')
		.setDescription('Unlocks the current channel'),
	async execute(interaction) {
		 //channel to lock down
         let channels = interaction.guild.channels;
         let targetChannelID = interaction.channel.id;
         let targetChannel = channels.cache.find(r => r.id === targetChannelID);
 
         //channel lockdown
         await targetChannel.updateOverwrite(interaction.guild.id, { SEND_MESSAGES: true });
 
         interaction.reply('channel unlocked!')
	},
};