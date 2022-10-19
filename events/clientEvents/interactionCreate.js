const { RequestManager } = require("@discordjs/rest")
const { CommandInteraction } = require("discord.js")
const { MessageActionRow, Client, Message, MessageEmbed, MessageButton, MessageSelectMenu } = require('discord.js');
const { Modal, TextInputComponent, showModal, ModalSubmitInteraction } = require('discord-modals');
const { ContextMenuInteraction } = require('discord.js')


module.exports = {
    name: 'interactionCreate',

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */

    async execute(interaction, client) {
        if (!interaction.isCommand() && !interaction.isButton() && !interaction.isContextMenu()) {
            console.log('This is not a command! Something went wrong in interactionCreate.js probably!')
        };

        //Context Menu Handler!
        if (interaction.isContextMenu()) {
            const command = client.commandslist.get(interaction.commandName);
            if (!command) return interaction.reply({ content: 'Thats not a command you silly goose!' })

            try {
                command.run(client, interaction)
            } catch (e) {
                interaction.reply({ content: e.message });
            }
        }

        //Command Handler!
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
                    .setCustomId(interaction.id);

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

                const filter = i => {
                    i.deferUpdate();
                    return i.customId === interaction.id;
                };

                await interaction.awaitModalSubmit({ time: 120000, filter }).then(async interaction => {
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
                        content: `<@&927318500614225920> / <@178689418415177729>, someone has submitted an appeal!`,
                        embeds: [appealinputtedEmbed],
                        components: [appealResponseMenu],
                    });
                }).catch(async err => {
                    console.log('A modal submission was rejected due to duplication.');
                });
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
                    content: `<@&927318500614225920> / <@178689418415177729>, someone has submitted an appeal!`,
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
                        content: `<@&927318500614225920> / <@178689418415177729>, someone has submitted an appeal!`,
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

            if (interaction.customId === 'moreinfopls') {
                const moreinfoembed = {
                    color: '#ffffff',
                    title: '🔬  Tips and Tricks for Citing Sources',
                    fields: [
                        {
                            name: "🔍  Finding Appropriate Sources",
                            value: "Finding good sources can be a challenge. As a general rule of thumb, news articles are okay as long as the news organization is generally reliable. For medical sources, you should try to focus on things like PubMed and other Medical Journals, and stay away from op-eds and random websites. For political research, there are lots of good websites and firms that organize and deliver that kind of stuff. Check out [Google Scholar](https://scholar.google.com/) if you want help finding professional academic sources.",
                            inline: false, 
                        },
                        {
                            name: "📰  Dealing with the News",
                            value: "Citing news sources can be an important part of political discourse because of how much of it is centered around the idea of a free press. Generally, there are quite a few reliable news organizations (regardless of your weird political opinions about them) that can often be used as good sources. \n\nThe **best** news sources actually provide citations when they're discussing or bringing up other things. However, this can easily blur the line between news and editorials, so be sure to NOT post opinion articles.\n\nA list of some good news organizations includes: CNN, New York Times, Fox News (outside their editorials), The Washington Post, **AP News, Reuters,** NPR, Wall Street Journal, BBC, Bloomberg News, Foreign Affairs, and Politico. There are others, but these are some of the best!",
                            inline: false, 
                        },
                        {
                            name: "🏛️  Government Sources",
                            value: "Data and reports are generally fine. Government-sourced media, news, statements, and otherwise generally should not be taken as fact unless they can be corroborated by reliable free press sources.",
                            inline: true, 
                        },
                        {
                            name: "🏷️  Affiliations and Credentials",
                            value: "Checking an author's affiliations and credentials are not always important, but making sure they are relevant to the field they are publishing about, are well-established, or aren't affiliated with biased political groups is important.",
                            inline: true, 
                        },
                        {
                            name: "🤔  Be Skeptical",
                            value: "A lot of people will simply look at the title and the first few words in the Abstract of a research paper and say \"Well, this is what I need!\". Don't do that. If you're not familiar with the paper / resource in full, then at least read the full Abstract before posting it. Never take any source at first glance without understanding completely what it is about. A lot of publishers offer you free access to look at research papers if you are part of a college or school - you should try to make sure your paper mentions what you're looking for!",
                            inline: false, 
                        },
                        {
                            name: "📅  Make Sure It's Up to Date",
                            value: "Publishing a study or source from 1965, unless it is the most recent source available or you are specifically discussing that for some reason, should generally be taken with a grain of salt. Try to make sure your research is as up-to-date as possible, as newer research sometimes has better methodology and refutes old research. Don't get caught lacking!",
                            inline: true, 
                        },
                        {
                            name: "🏅  Peer-Reviewed Research",
                            value: "Always try to make sure the research your post is peer-reviewed. This means that it has undergone a level of scrutiny and verification that ensures that it was conducted properly with good methodology and generally reasonable or factuals hypotheses and assumptions and reliable, repeatable results. There are some instances where peer-reviewed research *can* be bad, but just make sure it's peer-reviewed.",
                            inline: true, 
                        },
                        {
                            name: "Still looking for more tips and tricks?",
                            value: "This embed is already too long, and there's so much more that could be said! If you're looking for more tips and tricks on how to find reliable, reputable sources, please check out the following links below:\n[Paperpile](https://paperpile.com/g/find-credible-sources/) - *\"How can I find credible sources?\"*\n[Scribbr](https://www.scribbr.com/working-with-sources/credible-sources/) - *A brief lesson on sources, and explains the \"CRAAP\" test, a good tool!*\n[University of the People](https://www.uopeople.edu/blog/ultimate-student-guide-to-finding-credible-sources/) - *Another brief lesson, but with some more good journals and tips.*\n[UTEP](https://libguides.utep.edu/c.php?g=429972&p=2931971) - *Lots of good Political Science source websites here.*\n[Washington & Jefferson College](https://libguides.washjeff.edu/politicalscience/websites) - *Provides lots of good tips for googling.*",
                            inline: false, 
                        },
                    ]
                };

                interaction.reply({ embeds: [moreinfoembed], ephemeral: true })

            }

        }
    }
};