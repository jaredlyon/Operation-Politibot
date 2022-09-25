const { RequestManager } = require("@discordjs/rest")
const { CommandInteraction } = require("discord.js")
const { MessageActionRow, Client, Message, MessageEmbed, MessageButton, MessageSelectMenu } = require('discord.js');
const { Modal, TextInputComponent, showModal, ModalSubmitInteraction } = require('discord-modals');

module.exports = {
    name: 'interactionCreate',

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */

    async execute(interaction, client) {
        if (!interaction.isCommand() && !interaction.isButton()) return;

        if (interaction.isCommand()) {
            const command = client.commandslist.get(interaction.commandName);
            if (!command) return interaction.reply({ content: 'Thats not a command you silly goose!' })

            const args = [];

            for (let option of interaction.options.data) {
                if (option.type === 'SUB_COMMAND') {
                    if (option.name) args.push(option.name);
                    option.options?.forEach(x => {
                        if (x.value) args.push(x.value);
                    });
                } else if (option.value) args.push(option.value);
            }

            try {
                command.run(client, interaction, args)
            } catch (e) {
                interaction.reply({ content: e.message });
            }
        }

        //Button Handler!
        if (interaction.isButton()) {

            const targetGuild = client.guilds.cache.get('760275642150420520');
            let caseIDInputted;
            let appealInputted;
            let appealinputtedEmbed;
            var result;
            let appealReviewer;
            let intmessage;

            const simpleEmbed = {
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

            if (interaction.customId === 'appeal') {
                const appealee = interaction.user;

                //First, set up the Modal for the Appeal.

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
                    .setPlaceholder('Put your Case ID here (ex: 650)');

                const appealInputField = new TextInputComponent()
                    .setCustomId('appealinput')
                    .setLabel('Please justify your appeal.')
                    .setMinLength(20)
                    .setMaxLength(2000)
                    .setRequired(true)
                    .setStyle('PARAGRAPH')
                    .setPlaceholder('Justify your appeal here');

                appealModal.addComponents(caseIDInputField, appealInputField);

                // All done!
                // Now, let's display the thing!

                await interaction.showModal(appealModal)

                // Let's add Modal functionality...

                await interaction.awaitModalSubmit({ time: 120000, }).then(async interaction => {
                    caseIDInputted = interaction.fields.getTextInputValue('caseID');
                    appealInputted = interaction.fields.getTextInputValue('appealinput');

                    appealinputtedEmbed = {
                        color: '#ffffff',
                        author: {
                            name: `${appealee.username} (${appealee.id})`,
                            icon_url: appealee.avatarURL(),
                        },
                        title: `${appealee.username} has submitted an appeal for a moderation action.`,
                        fields: [
                            {
                                name: `**User ID:**`,
                                value: `${appealee.id}`
                            },
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

                    // Set up the stuff that mods will see...

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

                    // Alright, now let's send a notification to the senior mods...

                    var sendAppealChannel = targetGuild.channels.cache.get('893189759474757693');

                    interaction.reply('Thank you for submitting an appeal. A Senior Moderator+ will review your appeal, and you will receive a response shortly.')
                    await sendAppealChannel.send({
                        // content: `<@&927318500614225920> / <@178689418415177729>, someone has submitted an appeal!`,
                        content: `someone has submitted an appeal!`,
                        embeds: [appealinputtedEmbed],
                        components: [appealResponseMenu],
                    });
                })
            }

            if (interaction.customId === 'accept' || interaction.customId === 'reject') {
                intmessage = interaction.message
                appealReviewer = interaction.user

                const appealee = targetGuild.members.cache.get(intmessage.embeds[0].fields[0].value)
                caseIDInputted = intmessage.embeds[0].fields[1].value
                appealInputted = intmessage.embeds[0].fields[2].value

                appealinputtedEmbed = {
                    color: '#ffffff',
                    author: {
                        name: `${appealee.user.username} (${appealee.id})`,
                        icon_url: appealee.user.avatarURL(),
                    },
                    title: `${appealee.user.username} has submitted an appeal for a moderation action.`,
                    fields: [
                        {
                            name: `**User ID:**`,
                            value: `${appealee.id}`
                        },
                        {
                            name: '**Case ID:** ',
                            value: caseIDInputted
                        },
                        {
                            name: `**Appeal:** `,
                            value: appealInputted
                        },
                    ],
                    footer: `This appeal has been responded to already by ${appealReviewer.username}`,
                    timestamp: new Date(),
                };

                intmessage.edit({
                    // content: `<@&927318500614225920> / <@178689418415177729>, someone has submitted an appeal!`,
                    content: `someone has submitted an appeal!`,
                    embeds: [appealinputtedEmbed],
                    components: [],
                })

                if (interaction.customId === "accept") {
                    var result = '**accepted**'
                } else if (interaction.customId === 'reject') {
                    var result = '**rejected**'
                } else {
                    console.log('Something went wrong!')
                }

                interaction.reply({
                    content: `${appealReviewer.username} (${appealReviewer.id}) has ${result} the appeal without a provided reason.`
                })

                appealee.createDM();
                appealee.send({
                    content: `A moderator has ${result} your appeal.`,
                    embeds: [simpleEmbed],
                })
            }

            if (interaction.customId === 'acceptreason' || interaction.customId === 'rejectreason') {
                intmessage = interaction.message
                appealReviewer = interaction.user

                const appealee = targetGuild.members.cache.get(intmessage.embeds[0].fields[0].value)
                caseIDInputted = intmessage.embeds[0].fields[1].value
                appealInputted = intmessage.embeds[0].fields[2].value

                if (interaction.customId === "acceptreason") {
                    var result = '**accepted**'
                } else if (interaction.customId === 'acceptreason') {
                    var result = '**rejected**'
                } else {
                    console.log('Something went wrong!')
                }

                const appealModal = new Modal()
                    .setTitle('Appeal Accept/Reject Reason')
                    .setCustomId('appeal_reason');

                const appealInputModalThing = new TextInputComponent()
                    .setCustomId('reasoninput')
                    .setLabel('Reason:')
                    .setMinLength(10)
                    .setMaxLength(2000)
                    .setRequired(true)
                    .setStyle('PARAGRAPH')
                    .setPlaceholder('Type here...');

                appealModal.addComponents(appealInputModalThing);

                interaction.showModal(appealModal)

                await interaction.awaitModalSubmit({ time: 120000 }).then(async interaction => {
                    const reasonInputted = interaction.fields.getTextInputValue('reasoninput')

                    console.log(`Result: ${result}`)

                    const reasonEmbed = {
                        color: '#ffffff',
                        author: {
                            name: targetGuild.name,
                            icon_url: targetGuild.iconURL(),
                        },
                        fields: [
                            {
                                name: `Reason:`,
                                value: `${reasonInputted}`
                            },
                        ],
                        footer: {
                            text: client.user.username,
                            icon_url: client.user.avatarURL(),
                        },
                    };

                    appealinputtedEmbed = {
                        color: '#ffffff',
                        author: {
                            name: `${appealee.user.username} (${appealee.id})`,
                            icon_url: appealee.user.avatarURL(),
                        },
                        title: `${appealee.user.username} has submitted an appeal for a moderation action.`,
                        fields: [
                            {
                                name: `**User ID:**`,
                                value: `${appealee.id}`
                            },
                            {
                                name: '**Case ID:** ',
                                value: caseIDInputted
                            },
                            {
                                name: `**Appeal:** `,
                                value: appealInputted
                            },
                        ],
                        footer: `This appeal has been responded to already by ${appealReviewer.username}`,
                        timestamp: new Date(),
                    };
    
                    intmessage.edit({
                        // content: `<@&927318500614225920> / <@178689418415177729>, someone has submitted an appeal!`,
                        content: `someone has submitted an appeal!`,
                        embeds: [appealinputtedEmbed],
                        components: [],
                    })

                    interaction.reply({
                        content: `${appealReviewer.username} (${appealReviewer.id}) has ${result} the appeal:`,
                        embeds: [reasonEmbed],
                    })
    
                    appealee.createDM();
                    appealee.send({
                        content: `A moderator has ${result} your appeal.`,
                        embeds: [reasonEmbed],
                    })
                })
            }
        }

        // if (interaction.isSelectMenu()) {
        //     if (interaction.customId === 'menu1') {
        //         await interaction.update() {
        //             if (interaction.values === 'first_option')
        //         }
        //     }
        // }
    }
};