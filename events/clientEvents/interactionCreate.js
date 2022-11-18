const { RequestManager } = require("@discordjs/rest");
const { CommandInteraction } = require("discord.js");
const { MessageActionRow, Client, Message, MessageEmbed, MessageButton, MessageSelectMenu } = require('discord.js');
const { Modal, TextInputComponent, showModal, ModalSubmitInteraction } = require('discord-modals');
const { ContextMenuInteraction } = require('discord.js');


module.exports = {
    name: 'interactionCreate',
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
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
            const targetGuild = client.guilds.cache.get('760275642150420520'); //server id
            const targetChannel = targetGuild.channels.cache.get('893189759474757693'); //moderators channel
            
            if (interaction.customId === 'appeal') {
                const appealee = interaction.user;

                // declare appeal modal form
                const appealModal = new Modal()
                    .setTitle('Appeal Form')
                    .setCustomId(interaction.id);

                // declare first field
                const caseIDInputField = new TextInputComponent()
                    .setCustomId('caseID')
                    .setLabel('Please input your Case ID')
                    .setMinLength(2)
                    .setMaxLength(6)
                    .setRequired(true)
                    .setStyle('SHORT')
                    .setPlaceholder('Put your Case ID here (ex: 650)');

                // declare second field
                const appealInputField = new TextInputComponent()
                    .setCustomId('appealinput')
                    .setLabel('Please justify your appeal.')
                    .setMinLength(20)
                    .setMaxLength(2000)
                    .setRequired(true)
                    .setStyle('PARAGRAPH')
                    .setPlaceholder('Justify your appeal here');

                // assemble modal
                appealModal.addComponents(caseIDInputField, appealInputField);

                // shows the modal to the appealee
                await interaction.showModal(appealModal);

                // filters duplicate responses
                const filter = i => {
                    i.deferUpdate();
                    return i.customId === interaction.id;
                };

                // awaits user submission
                await interaction.awaitModalSubmit({ time: 120000, filter }).then(async interaction => {
                    caseId = interaction.fields.getTextInputValue('caseID');
                    appealInputted = interaction.fields.getTextInputValue('appealinput');

                    // generate mod response button row
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

                    // generate appeal embed
                    const appealEmbed = {
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
                                value: caseId
                            },
                            {
                                name: `**Appeal:** `,
                                value: appealInputted
                            },
                        ],
                        footer: `Click one of the buttons below to choose whether or not to respond to the appeal.`,
                        timestamp: new Date(),
                    };

                    // confirms submission to user
                    appealee.send('Thank you for submitting an appeal. A Senior Moderator+ will review your appeal, and you will receive a response shortly.');

                    // sends the appeal to the mods
                    targetChannel.send({
                        content: `<@&927318500614225920> / <@178689418415177729>, someone has submitted an appeal!`, // pings mods
                        embeds: [appealEmbed], // attaches the embed
                        components: [appealResponseMenu] // attaches the button row
                    });
                }).catch(async err => {
                    console.log('[INTERACTIONCREATE.JS] Error thrown, ID 5');
                });
            }

            // checks for simple accepts / rejects
            if (interaction.customId === 'accept' || interaction.customId === 'reject') {
                const appealee = targetGuild.members.cache.get(interaction.message.embeds[0].fields[0].value); // finds the appealee
                const caseId = interaction.message.embeds[0].fields[1].value; // gets case Id
                const appealBody = interaction.message.embeds[0].fields[2].value // gets the original appeal body

                // regenerates the appeal embed for the message edit below
                const appealEmbed = {
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
                            value: caseId
                        },
                        {
                            name: `**Appeal:** `,
                            value: appealBody
                        },
                    ],
                    footer: `This appeal has been responded to already by ${interaction.user.username}`,
                    timestamp: new Date(),
                };

                // disable buttons
                interaction.message.edit({
                    content: `<@&927318500614225920> / <@178689418415177729>, someone has submitted an appeal!`,
                    embeds: [appealEmbed],
                    components: [],
                });

                // fills reasoning field
                if (interaction.customId === "accept") {
                    var result = '**accepted**';
                } else if (interaction.customId === 'reject') {
                    var result = '**rejected**';
                } else {
                    console.log('[INTERACTIONCREATE.JS] Error thrown, ID 2');
                }

                // confirms reply in moderator channel
                targetChannel.send({
                    content: `${interaction.user.username} (${interaction.user.id}) has ${result} the appeal without a provided reason.`
                });

                // sends the result to the appealee
                appealee.send({
                    content: `Your appeal for Case ${caseId} was ${result}.`
                });
            }

            // checks for appeals accepts / rejects with reasons
            if (interaction.customId === 'acceptreason' || interaction.customId === 'rejectreason') {
                const appealee = targetGuild.members.cache.get(interaction.message.embeds[0].fields[0].value) // finds the appealee
                const caseId = interaction.message.embeds[0].fields[1].value; // gets case Id
                const appealBody = interaction.message.embeds[0].fields[2].value // gets the original appeal body

                // fill result
                if (interaction.customId === 'acceptreason') {
                    var result = '**accepted**';
                } else if (interaction.customId === 'rejectreason') {
                    var result = '**rejected**';
                } else {
                    console.log('[INTERACTIONCREATE.JS] Error thrown, ID: 3');
                }

                // generate reply modal
                const replyModal = new Modal()
                    .setTitle('Appeal Accept/Reject Reason')
                    .setCustomId(interaction.id);

                // generate reasoning field
                const reasonField = new TextInputComponent()
                    .setCustomId('reasoninput')
                    .setLabel('Reason:')
                    .setMinLength(10)
                    .setMaxLength(2000)
                    .setRequired(true)
                    .setStyle('PARAGRAPH')
                    .setPlaceholder('Type here...');
                
                // combine modal and field
                replyModal.addComponents(reasonField);

                // show modal
                interaction.showModal(replyModal);

                // filters duplicate responses
                const filter = i => {
                    i.deferUpdate();
                    return i.customId === interaction.id;
                };

                // awaits moderator submission
                await interaction.awaitModalSubmit({ time: 120000, filter }).then(async interaction => {
                    const reason = interaction.fields.getTextInputValue('reasoninput'); // get reason

                    // regenerates the appeal embed for the message edit below
                    const appealEmbed = {
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
                                value: caseId
                            },
                            {
                                name: `**Appeal:** `,
                                value: appealBody
                            },
                        ],
                        footer: `This appeal has been responded to already by ${interaction.user.username}`,
                        timestamp: new Date(),
                    };

                    // disable buttons
                    interaction.message.edit({
                        content: `<@&927318500614225920> / <@178689418415177729>, someone has submitted an appeal!`,
                        embeds: [appealEmbed],
                        components: [],
                    });

                    // confirms reply in moderator channel
                    targetChannel.send({
                        content: `${interaction.user.username} (${interaction.user.id}) has ${result} the appeal with reason:\n${reason}`
                    });

                    // sends the result to the appealee
                    appealee.send({
                        content: `Your appeal for Case ${caseId} has been ${result} with reason:\n${reason}`
                    });
                }).catch(async err => {
                    console.log('[INTERACTIONCREATE.JS] Error thrown, ID 4');
                });
            }

            // connects to context menu button
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