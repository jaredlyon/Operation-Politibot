const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Modal, TextInputComponent, showModal, ModalSubmitInteraction } = require('discord-modals');
const { ContextMenuInteraction } = require('discord.js')

module.exports = {
    name: 'Report Message',
    type: 'MESSAGE',
    /**
     * 
     * @param {ContextMenuInteraction} interaction 
     */
    run: async (client, interaction) => {

        const targetMsg = await interaction.channel.messages.fetch(interaction.targetId);
        const targetUser = await targetMsg.author
        const notifyChannel = interaction.guild.channels.cache.get('893189759474757693')

        const filter = i => {
            return i.user.id === interaction.user.id;
        };

        const reportModal = new Modal()
            .setTitle('Report a Message')
            .setCustomId('report_modal');

        const appealInputField = new TextInputComponent()
            .setCustomId('complaint')
            .setLabel('Complaint')
            .setMinLength(20)
            .setMaxLength(2000)
            .setRequired(true)
            .setStyle('PARAGRAPH')
            .setPlaceholder('Please provide information regarding the message you are reporting.');

        reportModal.addComponents(appealInputField)

        await interaction.showModal(reportModal)

        await interaction.awaitModalSubmit({ time: 120000, }).then(async interaction => {
            const complaintInput = interaction.fields.getTextInputValue('complaint')

            const notifyEmbed = {
                //            .setAuthor(interaction.user.username, interaction.user.avatarURL())
                author: {
                    name: interaction.user.username,
                    icon_url: interaction.user.avatarURL(),
                },
                color: '#992D22',
                title: '**Complaint Filed**',
                description: "Against: " + targetUser.toString() + `\n\n[Jump to Message](${targetMsg.url})`,
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
            }

            notifyChannel.send({
                content: "<@178689418415177729> <@&893189360105689139> <@&854841000480079882> <@&927318500614225920> **See below complaint:**",
                embeds: [notifyEmbed],
            })

            interaction.reply({ content: 'Thank you for submitting a report! It will be reviewed by Moderators shortly. Please be sure to use <#999439440273473657> when possible!', ephemeral: true })

        })
    }
}