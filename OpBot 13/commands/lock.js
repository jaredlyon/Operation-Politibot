const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { user } = require('../..');
const client = require('../..');

module.exports = {
	name: "lock",
    description: "Locks the current channel",
    options: [],
	async execute(interaction) {
		//channel to lock down
        let channels = interaction.guild.channels;
        let targetChannelID = interaction.channel.id;
        let targetChannel = channels.cache.find(r => r.id === targetChannelID);

        //channel lockdown
        await targetChannel.updateOverwrite(interaction.guild.id, { SEND_MESSAGES: false });

        interaction.reply('channel locked! `!unlock` to unlock.')
	},
};