const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	name: "unlockdown",
    description: "Unlocks the main public channels",
    options: [],
	run: async(client, interaction) => {
        let channels = interaction.guild.channels;
        let channelIDs = ['854824056238112809', '946463555639738510', '760275642150420523', '964239900620759070', '775839512914952212', '928407503690149939', '951322929898061905', '965272694264311899', '775867278016118794', '949832728625422366', '886728064086708234', '776539403819417634', '890376793201180692', '951955648336261170'];

        for (const element of channelIDs) {
            let tmp = channels.cache.find(r => r.id === element);
            await tmp.updateOverwrite(interaction.guild.id, { SEND_MESSAGES: true });
        }

        interaction.channel.send("**Unlocked " + channelIDs.length + " channels.**")
	},
};