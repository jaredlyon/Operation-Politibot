const { Client, Message, MessageEmbed, MessageButton, ButtonStyle, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Modal, TextInputComponent, showModal, ModalSubmitInteraction } = require('discord-modals');

module.exports = {
    name: "suggest",
    category: "Utility",
    description: "Send a suggestion to server staff",
    options: [
        {
            type: 3,
            name: "suggestion",
            description: "Write your suggestion here!",
            required: true
        }
    ],
    /**
     * 
     * @param {Modal} modal
     */
    run: async (client, interaction) => {

        // Just grabbing the user for something later...
        const intAuth = interaction.user;

        // Setting up the button menus for the interaction...
        const submitMenu = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('submit')
                    .setLabel('Submit')
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomId('cancel')
                    .setLabel('Cancel')
                    .setStyle('DANGER'),
            );

        const reviewMenu = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('approve')
                    .setLabel('Approve')
                    .setStyle('SUCCESS'),
                new MessageButton()
                    .setCustomId('reject')
                    .setLabel('Reject')
                    .setStyle('DANGER'),
            );

        // Voting Emojis...
        const up = client.emojis.cache.find(emoji => emoji.name == "upvote").toString();
        const down = client.emojis.cache.find(emoji => emoji.name == "downvote").toString();
        const neut = client.emojis.cache.find(emoji => emoji.name == "neutralvote").toString();

        // Channels and stuff
        var log = interaction.guild.channels.cache.get(client.config.logChannel);
        var sendChannel = interaction.guild.channels.cache.get('965271666684985454')
        var rayChannel = interaction.guild.channels.cache.get('775494762216161341')
        // var staffChannel = interaction.guild.channels.cache.get('893189722887839797')

        // Getting the string from the input
        const suggestionText = interaction.options.getString('suggestion');

        // Message Embeds and stuff
        const submitEmbed = {
            color: '#ffffff',
            author: {
                name: 'Suggestion from ' + interaction.user.username,
                icon_url: interaction.user.avatarURL(),
            },
            description: suggestionText + "\n\n*Do you want to submit this suggestion?*",
            timestamp: new Date()
        };

        const reviewEmbed = {
            color: '#ffffff',
            author: {
                name: 'Suggestion from ' + interaction.user.username,
                icon_url: interaction.user.avatarURL(),
            },
            description: suggestionText + "\n\n*Do you want to approve this suggestion?*",
            timestamp: new Date()
        };

        const suggestEmbed = {
            color: '#ffffff',
            author: {
                name: 'Suggestion from ' + interaction.user.username,
                icon_url: interaction.user.avatarURL(),
            },
            description: suggestionText + "\n\n*" + up + " to upvote / " + neut + " to abstain / " + down + " to downvote*",
            timestamp: new Date()
        };

        const suggestEmbedPreview = {
            color: '#ffffff',
            author: {
                name: 'Suggestion from ' + interaction.user.username,
                icon_url: interaction.user.avatarURL(),
            },
            description: suggestionText,
            timestamp: new Date()
        }

        // Sending a confirmation message to submit the suggestion for review
        const msgA = await interaction.reply({
            ephemeral: true,
            embeds: [submitEmbed],
            components: [submitMenu],
            fetchReply: true,
        });

        // Just a fancy filter majig
        const filter = i => {
            return i.user.id === interaction.user.id;
        };

        // The actual code
        msgA.awaitMessageComponent( filter ).then(async interaction => {

            buttonClickValue = interaction.customId

            if (buttonClickValue === 'cancel') {
                await interaction.update({
                    content: '*Suggestion cancelled.*',
                    ephemeral: true,
                    embeds: [],
                    components: [],
                })
            } else if (buttonClickValue === 'submit') {
                await interaction.update({
                    content: '*Your suggestion has been submitted for review by server management! You will receive a DM shortly.*',
                    ephemeral: true,
                    embeds: [],
                    components: [],
                })

                const confirmMsg = await rayChannel.send({
                    content: '<@178689418415177729>, a new suggestion needs review!',
                    embeds: [reviewEmbed],
                    components: [reviewMenu],
                    fetchReply: true,
                }) 

                confirmMsg.awaitMessageComponent( filter ).then(async interaction => {

                    buttonClickValue2 = interaction.customId

                    // If it's confirmed by the Management...
                    if (buttonClickValue2 === 'approve') {
                        await confirmMsg.edit({
                            content: 'Suggestion has been **approved**. Check <#965271666684985454>!',
                            embeds: [suggestEmbedPreview],
                            components: [],
                        })
                        // Send message to #suggestions channel!
                        sendChannel.send({
                            embeds: [suggestEmbed],
                        }).then(async function (message) {
                            await message.react(up)
                            await message.react(neut)
                            await message.react(down)
                            return message;
                        });
                        // DM the user a confirmation here!
                        await intAuth.send({
                            content: 'Your suggestion has been approved and submitted to <#965271666684985454> for voting! \n\nApproved Suggestion:',
                            embeds: [suggestEmbedPreview],
                        })
                    }

                    // If it's rejected by the Management...
                    if (buttonClickValue2 === 'reject') {
                        const reasonModal = new Modal()
                            .setTitle('Rejection Reason')
                            .setCustomId('reject_reason');
                        
                        const reasonInputComponent = new TextInputComponent()
                            .setCustomId('reasoninput')
                            .setLabel('Reason:')
                            .setMinLength(2)
                            .setMaxLength(1000)
                            .setRequired(false)
                            .setStyle("PARAGRAPH")
                            .setPlaceholder("Enter a reason here");

                        const row_Input = new MessageActionRow().addComponents(reasonInputComponent);

                        reasonModal.addComponents(reasonInputComponent);

                        await interaction.showModal(reasonModal);

                        await interaction.awaitModalSubmit({ time: 60000, }).then(async interaction => {
                            const reasonInputted = await interaction.fields.getTextInputValue('reasoninput')
                            if (reasonInputted === null) {
                                reasonInputted = "No reason was given."
                            }

                            const reasonEmbed = {
                                color: '#ffffff',
                                author: {
                                    name: 'Suggestion from ' + intAuth.username + ' rejected by ' + interaction.user.username,
                                    icon_url: interaction.user.avatarURL(),
                                },
                                description: "**Suggestion:** \n" + suggestionText + "**\n\nReason: \n**" + reasonInputted,
                                timestamp: new Date()
                            };

                            await interaction.reply({
                                embeds: [reasonEmbed],
                                components: [],
                            });

                            await confirmMsg.edit({
                                embeds: [suggestEmbedPreview],
                                components: [],
                            });

                            await intAuth.send({
                                content: 'Your suggestion has been **rejected** for the following reasons:',
                                embeds: [reasonEmbed],
                            });

                        })
                    }
                });
            }
        })
    },
};
