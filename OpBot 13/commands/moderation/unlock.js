const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	name: "unlock",
    description: "Unlocks the current channel",
    options: [],
	run: async(client, interaction) => {
		//channel to unlock
        let channels = interaction.guild.channels;
        let targetChannelID = interaction.channel.id;
        let targetChannel = channels.cache.find(r => r.id === targetChannelID);

        //channel unlockdown
        await targetChannel.updateOverwrite(interaction.guild.id, { SEND_MESSAGES: true });

        interaction.reply('channel unlocked!')
	},
};