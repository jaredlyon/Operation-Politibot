const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Modal, TextInputComponent, showModal, ModalSubmitInteraction } = require('discord-modals');


module.exports = {
    name: "ban",
    description: "Bans a user",
    options: [
      {
        type: 6,
        name: "banee",
        description: "The user to be banned",
        required: true
      },
      {
        type: 3,
        name: "reason",
        description: "The reason for issue",
        required: true
      }
    ],
	run: async(client, interaction) => {
		if (!interaction.guild.members.cache.get(interaction.user.id).roles.cache.some(role => role.id === '893189360105689139')) {
            var log = interaction.guild.channels.cache.get(client.config.logChannel);
            var banee = interaction.options.getUser('banee');
            var reason = interaction.options.getString('reason');

            var caseCount = client.caseNum.count;

            if (reason === '') {
                reason = 'No reason was specified.'
            };

            if (banee != null) {

                var ban = {
                    color: "#992D22",
                    author: {
                        name: banee.username,
                        icon_url: banee.avatarURL(),
                    },
                    fields: [
                        {
                            name: "Member banned:",
                            value: `**:hammer: ${banee} (${banee.id}) was banned from the server.**`
                        },
                        {
                            name: "Reason:",
                            value: reason,
                        },
                        {
                            name: `Case ID: `,
                            value: caseCount.toString(),
                        },
                    ],
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.avatarURL(),
                    },
                    timestamp: new Date(),
                };

                var dm = {
                    color: '#992D22',
                    author: {
                        name: interaction.guild.name,
                        icon_url: interaction.guild.iconURL(),
                    },
                    title: '**A moderator has banned you. You may appeal this decision below.**',
                    fields: [
                        {
                            name: 'Reason:',
                            value: reason
                        },
                        {
                            name: 'Case ID: ',
                            value: caseCount.toString(),
                        },
                    ],
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.avatarURL(),
                    },
                    timestamp: new Date()
                };

                // const appealButton = my lily white ass
                caseNumPlaceholder = caseCount.toString();

                //A filter
        
                const filter = i => {
                    return i.user.id === interaction.user.id;
                };
        
                //The button!
        
                const appealButton = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('appeal')
                            .setLabel('Appeal')
                            .setStyle('PRIMARY'),
                    );
        
                //No longer the button!
                //Now it's the Modal!
        
                const appealModal = new Modal()
                        .setTitle('Appeal Form')
                        .setCustomId('appeal_form');
        
                const caseIDInputField = new TextInputComponent()
                        .setCustomId('caseID')
                        .setLabel('Please input your Case ID')
                        .setMinLength(2)
                        .setMaxLength(6)
                        .setRequired(true)
                        .setStyle('SHORT')
                        .setPlaceholder(caseNumPlaceholder);
                
                const appealInputField = new TextInputComponent()
                        .setCustomId('appealinput')
                        .setLabel('Please justify your appeal.')
                        .setMinLength(20)
                        .setMaxLength(2000)
                        .setRequired(true)
                        .setStyle('PARAGRAPH')
                        .setPlaceholder('Justify your appeal here');
                
                appealModal.addComponents(caseIDInputField, appealInputField);
        
                //No longer the modal!
        
                const targetGuild = interaction.guild

                await interaction.reply({
                    embeds: [ban]
                })
                await log.send({
                    embeds: [ban]
                })

                client.logs[caseCount] = {
                    caseNum: caseCount,
                    userid: banee.id,
                    moderatorid: interaction.user.id,
                    date: new Date(),
                    type: "Ban",
                    reason: reason
                }

                client.caseNum.count++;

                await banee.createDM();
                const appealMsg = await banee.send({
                    embeds: [dm],
                    components: [appealButton]
                }).catch(async err => {
                    console.log(err);
                    interaction.channel.send({
                        content: "I couldn't DM this user since they do not accept DMs from server bots/members.",
                    });
                    appealMsg = null
                });

                await interaction.guild.members.ban(banee);

                if (appealMsg != null) {
                    appealMsg.awaitMessageComponent( filter ).then(async interaction => {
                        const appealSubmit = interaction.customId
        
                        if (appealSubmit === 'appeal') {
                            await interaction.showModal(appealModal);
                            await interaction.awaitModalSubmit({ time: 60000, }).then(async interaction => {
                                const appealee = await interaction.user;
                                const caseIDInputted = await interaction.fields.getTextInputValue('caseID');
                                const appealInputted = await interaction.fields.getTextInputValue('appealinput');
        
                                const appealinputtedEmbed = {
                                    color: '#ffffff',
                                    author: {
                                        name: `${appealee.username} (${appealee.id})`,
                                        icon_url: appealee.avatarURL(),
                                    },
                                    title: `${appealee.username} has submitted an appeal for a moderation action.`,
                                    fields: [
                                        {
                                            name: '**Case ID:** ',
                                            value: caseIDInputted
                                        },
                                        {
                                            name: `**Appeal:** `,
                                            value: appealInputted
                                        },
                                    ],
                                    footer: `Click one of the buttons below to choose whether or not to respond to the appeal.`,
                                    timestamp: new Date(),
                                };
        
                                const appealResponseMenu = new MessageActionRow()
                                    .addComponents(
                                        new MessageButton()
                                            .setCustomId('accept')
                                            .setLabel('Accept')
                                            .setStyle('SUCCESS'),
                                        new MessageButton()
                                            .setCustomId('acceptreason')
                                            .setLabel('Accept w/ Reason')
                                            .setStyle('SUCCESS'),
                                        new MessageButton()
                                            .setCustomId('reject')
                                            .setLabel('Reject')
                                            .setStyle('DANGER'),
                                        new MessageButton()
                                            .setCustomId('rejectreason')
                                            .setLabel('Reject w/ Reason')
                                            .setStyle('DANGER'),
                                    );
        
                                var sendAppealChannel = targetGuild.channels.cache.get('893189759474757693');
        
                                interaction.reply('Thank you for submitting an appeal. A Senior Moderator+ will review your appeal, and you will receive a response shortly.')
                                const appealResponseMsg = await sendAppealChannel.send({
                                    content: `<@&927318500614225920> / <@178689418415177729>, someone has submitted an appeal!`,
                                    embeds: [appealinputtedEmbed],
                                    components: [appealResponseMenu],
                                });
        
                                if (appealResponseMsg != null) {
                                    appealResponseMsg.awaitMessageComponent( filter ).then(async interaction => {
                                        buttonClickValue = interaction.customId
                                        const appealReviewer = interaction.user
            
                                        if (buttonClickValue === 'accept') {
            
                                            const acceptEmbed = {
                                                color: '#ffffff',
                                                author: {
                                                    name: targetGuild.name,
                                                    icon_url: targetGuild.iconURL(),
                                                },
                                                fields: [
                                                    {
                                                        name: `Reason:`,
                                                        value: 'No reason was provided.'
                                                    },
                                                ],
                                                footer: {
                                                    text: client.user.username,
                                                    icon_url: client.user.avatarURL(),
                                                },
                                            };
            
                                            appealResponseMsg.edit({
                                                content: `<@&927318500614225920> / <@178689418415177729>, someone has submitted an appeal!`,
                                                embeds: [appealinputtedEmbed],
                                                components: [],
                                            });
                                            interaction.reply({
                                                content: `**${appealReviewer.username}** *(${appealReviewer.id})* has **accepted** the appeal for Case ID ${caseIDInputted} without a provided reason.`
                                            });
                                            banee.createDM()
                                            banee.send({
                                                content: `A moderator has accepted your appeal for Case ID ${caseIDInputted}. Appropriate action will be made to adjust your record.`,
                                                embeds: [acceptEmbed],
                                            });
                                        }
            
            
            
                                        if (buttonClickValue === 'acceptreason') {
                                            // Create and Show a modal
            
                                            const appealModal = new Modal()
                                                .setTitle('Appeal Accept Reason')
                                                .setCustomId('appeal_accept_reason');
                            
                                            const acceptAppealInput = new TextInputComponent()
                                                .setCustomId('acceptreasoninput')
                                                .setLabel('Reason:')
                                                .setMinLength(10)
                                                .setMaxLength(2000)
                                                .setRequired(true)
                                                .setStyle('PARAGRAPH')
                                                .setPlaceholder('Type here...');
                                            
                                            appealModal.addComponents(acceptAppealInput);
            
                                            interaction.showModal(appealModal)
            
                                            // When modal is submitted, get the responses and plug them into an embed
            
                                            await interaction.awaitModalSubmit({ time: 60000, }).then(async interaction => {
                                                const acceptreasonInputted = await interaction.fields.getTextInputValue('acceptreasoninput')
                                                
                                                const acceptreasonEmbed = {
                                                    color: '#ffffff',
                                                    author: {
                                                        name: targetGuild.name,
                                                        icon_url: targetGuild.iconURL(),
                                                    },
                                                    fields: [
                                                        {
                                                            name: `Reason:`,
                                                            value: acceptreasonInputted
                                                        },
                                                    ],
                                                    footer: {
                                                        text: client.user.username,
                                                        icon_url: client.user.avatarURL(),
                                                    },
                                                };
            
                                                // Change original message to remove components, reply to the message to notify it has been  
                                                // accepted (with embed showing reason), and send dm to user
            
                                                appealResponseMsg.edit({
                                                    content: `<@&927318500614225920> / <@178689418415177729>, someone has submitted an appeal!`,
                                                    embeds: [appealinputtedEmbed],
                                                    components: [],
                                                });
                                                interaction.reply({
                                                    content: `**${appealReviewer.username}** *(${appealReviewer.id})* has **accepted** the appeal for Case ID ${caseIDInputted}`,
                                                    embeds: [acceptreasonEmbed]
                                                });
                                                banee.createDM()
                                                banee.send({
                                                    content: `A moderator has accepted your appeal for Case ID ${caseIDInputted}. Appropriate action will be made to adjust your record.`,
                                                    embeds: [acceptreasonEmbed],
                                                });
                                            });
                                        }
            
            
            
                                        if (buttonClickValue === 'reject') {
            
                                            const rejectEmbed = {
                                                color: '#ffffff',
                                                author: {
                                                    name: targetGuild.name,
                                                    icon_url: targetGuild.iconURL(),
                                                },
                                                fields: [
                                                    {
                                                        name: `Reason:`,
                                                        value: 'No reason was provided.'
                                                    },
                                                ],
                                                footer: {
                                                    text: client.user.username,
                                                    icon_url: client.user.avatarURL(),
                                                },
                                            };
            
                                            appealResponseMsg.edit({
                                                content: `<@&927318500614225920> / <@178689418415177729>, someone has submitted an appeal!`,
                                                embeds: [appealinputtedEmbed],
                                                components: [],
                                            });
                                            interaction.reply({
                                                content: `**${appealReviewer.username}** *(${appealReviewer.id})* has **rejected** the appeal without a provided reason.`
                                            });
                                            banee.createDM()
                                            banee.send({
                                                content: `A moderator has rejected your appeal for Case ID ${caseIDInputted}.`,
                                                embeds: [rejectEmbed],
                                            });
                                        }
            
            
            
                                        if (buttonClickValue === 'rejectreason') {
                                            // Create and Show a modal
            
                                            const rejectappealModal = new Modal()
                                                .setTitle('Appeal Reject Reason')
                                                .setCustomId('appeal_reject_reason');
                            
                                            const rejectAppealInput = new TextInputComponent()
                                                .setCustomId('rejectreasoninput')
                                                .setLabel('Reason:')
                                                .setMinLength(10)
                                                .setMaxLength(2000)
                                                .setRequired(true)
                                                .setStyle('PARAGRAPH')
                                                .setPlaceholder('Type here...');
                                            
                                            rejectappealModal.addComponents(rejectAppealInput);
            
                                            interaction.showModal(rejectappealModal)
            
                                            // When modal is submitted, get the responses and plug them into an embed
            
                                            await interaction.awaitModalSubmit({ time: 60000, }).then(async interaction => {
                                                const rejectreasonInputted = await interaction.fields.getTextInputValue('rejectreasoninput')
                                                
                                                const rejectreasonEmbed = {
                                                    color: '#ffffff',
                                                    author: {
                                                        name: targetGuild.name,
                                                        icon_url: targetGuild.iconURL(),
                                                    },
                                                    fields: [
                                                        {
                                                            name: `Reason:`,
                                                            value: rejectreasonInputted
                                                        },
                                                    ],
                                                    footer: {
                                                        text: client.user.username,
                                                        icon_url: client.user.avatarURL(),
                                                    },
                                                };
            
                                                // Change original message to remove components, reply to the message to notify it has been  
                                                // rejected (with embed showing reason), and send dm to user
            
                                                appealResponseMsg.edit({
                                                    content: `<@&927318500614225920> / <@178689418415177729>, someone has submitted an appeal!`,
                                                    embeds: [appealinputtedEmbed],
                                                    components: [],
                                                });
                                                interaction.reply({
                                                    content: `**${appealReviewer.username}** *(${appealReviewer.id})* has **rejected** the appeal for Case ID ${caseIDInputted}`,
                                                    embeds: [rejectreasonEmbed]
                                                });
                                                banee.createDM()
                                                banee.send({
                                                    content: `A moderator has rejected your appeal for Case ID ${caseIDInputted}.`,
                                                    embeds: [rejectreasonEmbed],
                                                });
                                            });
                                        }
                                    });
                                };
                            })
                        }
                    })
                }
            } else {
                interaction.reply("mention someone!")
            }
        } else if (interaction.guild.members.cache.get(interaction.user.id).roles.cache.some(role => role.id === '893189360105689139')) {
            interaction.reply("Permission denied; go get another mod!");
        }
	},
};
