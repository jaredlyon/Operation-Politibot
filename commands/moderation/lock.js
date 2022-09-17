const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "lock",
    category: "Moderation",
    description: "Lock a channel to stop those hooligans!",
    options: [
        {
            type: 7,
            name: "channel",
            description: "The channel you wish to lock",
        },
    ],

    run: async(client, interaction) => {

        // const targetChannel = interaction.options.getChannel('channel');

        if (interaction.options.getChannel('channel') == null) {
            targetChannel = interaction.channel;
        } else {
            targetChannel = interaction.options.getChannel('channel');
        };

        //channel lockdown
        await targetChannel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: false });

        interaction.reply({
            content: 'Channel locked! `/unlock` to unlock the channel.',
            ephemeral: true,
        })
        targetChannel.send("This channel has been locked by a moderator.")
    }

}
