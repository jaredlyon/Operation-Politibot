const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "unlock",
    category: "Moderation",
    description: "Unlock a channel and free them from their silent lunch.",
    options: [
        {
            type: 7,
            name: "channel",
            description: "The channel you wish to unlock",
        },
    ],

    run: async(client, interaction) => {

        if (interaction.options.getChannel('channel') == null) {
            var targetChannel = interaction.channel;
        } else {
            var targetChannel = interaction.options.getChannel('channel');
        };

        //channel lockdown
        await targetChannel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: true });

        interaction.reply({
            content: 'Channel unlocked!',
            ephemeral: true,
        })
        targetChannel.send("This channel has been unlocked. Please behave.")
    }
}
