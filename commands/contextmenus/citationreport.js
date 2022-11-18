const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Modal, TextInputComponent, showModal, ModalSubmitInteraction } = require('discord-modals');
const { ContextMenuInteraction } = require('discord.js');

module.exports = {
    name: 'Report Citation',
    type: 'MESSAGE',
    /**
     * @param {ContextMenuInteraction} interaction 
     */
    run: async (client, interaction) => {
        // fetch constants
        const targetMsg = await interaction.channel.messages.fetch(interaction.targetId);
        const targetUser = await targetMsg.author;
        const notifyChannel = interaction.guild.channels.cache.get('893189759474757693');

        // generate modal
        const reportModal = new Modal()
            .setTitle('Report a Citation')
            .setCustomId('report_modal');

        // generate input field
        const appealInputField = new TextInputComponent()
            .setCustomId('complaint')
            .setLabel('Complaint')
            .setMinLength(20)
            .setMaxLength(2000)
            .setRequired(true)
            .setStyle('PARAGRAPH')
            .setPlaceholder('Why are you reporting this citation? Inaccurate? Misleading? Unreliable?');

        // assembles the modal
        reportModal.addComponents(appealInputField);

        // shows the modal
        await interaction.showModal(reportModal);

        // awaits user submit
        await interaction.awaitModalSubmit({ time: 120000 }).then(async interaction => {
            const complaintInput = interaction.fields.getTextInputValue('complaint');

            // generates embed
            const notifyEmbed = {
                author: {
                    name: interaction.user.username,
                    icon_url: interaction.user.avatarURL(),
                },
                color: '#992D22',
                title: '**Citation Complaint Filed**',
                description: "Against: " + targetUser.toString() + `\n\n[Jump to Message](${targetMsg.url})\n\n*Please note that this is a **citation report**. If this is a simple mistake, just use the context menu interaction (right click -> apps) to prompt the user with a reminder of how to properly cite and find reliable sources in a debate to back up their claims. Otherwise, if you think there is misconduct that can fall under Rule 11, talk with other Moderators or issue an appropriate judgement.*`,
                fields: [
                    {
                        name: 'Reason:',
                        value: complaintInput,
                    },
                    {
                        name: 'Timestamp:',
                        value: "In channel " + interaction.channel.toString() + " at: \n`" + interaction.createdAt + "`" 
                    },
                ],
                footer: {
                    text: client.user.username,
                    icon_url: client.user.avatarURL(),
                }
            };

            // sends the embed
            notifyChannel.send({
                content: "<@178689418415177729> <@&893189360105689139> <@&854841000480079882> <@&927318500614225920> **See below complaint:**",
                embeds: [notifyEmbed],
            });

            // reply to original interaction
            interaction.reply({ content: 'Thank you for submitting a report! It will be reviewed by Moderators shortly. Please be sure to use <#999439440273473657> when possible!\n\nBecause this is a citation report, there may be no actual action taken. We prefer these kinds of issues to work themselves out through debate and discourse, but if we can find genuine misbheavior or intent to purposefully mislead, then we will take action under Rule 11. Otherwise, you may at most see a reminder message pop up to remind someone of how to cite sources appropriately. If you have any questions, let us know!', ephemeral: true });
        });
    }
}