const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { ContextMenuInteraction } = require('discord.js')

module.exports = {
    name: 'Rules Reminder',
    type: 'MESSAGE',
    /**
     * 
     * @param {ContextMenuInteraction} interaction 
     */
    run: async (client, interaction) => {

        const targetMsg = await interaction.channel.messages.fetch(interaction.targetId);
        const targetUser = await targetMsg.author

        const filter = i => {
            return i.user.id === interaction.user.id;
        };

        const pickaRule = {
            color: '#ffffff',
            title: '📕  Rules Reminder',
            description: `Do you think someone is violating a rule? You can give them a gentle reminder in a good faith way by sending them a message reminder through this prompt. While rules and their enforcement is ultimately at the determination of staff, you can try to give someone a nudge in the right direction.\n\n❕ Be sure to double check <#775838975755681842>, or your respective channel's rules, and make sure you are citing the right rule/ruleset ❕`,
            fields: [
                {
                    name: 'Targeted User / Message:',
                    value: `${targetUser.toString()} \n[Click to jump to message](${targetMsg.url})`
                }
            ],
            footer: {
                text: "If you clicked this by mistake, or chose the wrong message, click \"Dismiss Message\" below, or \"Cancel\". This prompt times out in 2 minutes."
            },
        };

        const cancelButton = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('cancelrulesreminder')
                    .setLabel('Cancel')
                    .setStyle('DANGER'),
            );

        const rulesList1 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('r1')
                    .setLabel('Rule 1')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('r2')
                    .setLabel('Rule 2')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('r3')
                    .setLabel('Rule 3')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('r4')
                    .setLabel('Rule 4')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('r5')
                    .setLabel('Rule 5')
                    .setStyle('SECONDARY'),
            );

        const rulesList2 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('r6')
                    .setLabel('Rule 6')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('r7')
                    .setLabel('Rule 7')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('r8')
                    .setLabel('Rule 8')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('r9')
                    .setLabel('Rule 9')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('r10')
                    .setLabel('Rule 10')
                    .setStyle('SECONDARY'),
            );

        const rulesList3 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('r11')
                    .setLabel('Rule 11')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('r12')
                    .setLabel('Rule 12')
                    .setStyle('SECONDARY'),
            );

        const rulesList4 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('generalreminder')
                    .setLabel('General Reminder')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('channelrules')
                    .setLabel('Channel Rules')
                    .setStyle('PRIMARY'),
            );

        const sentMsg = await interaction.reply({ embeds: [pickaRule], components: [cancelButton, rulesList4, rulesList1, rulesList2, rulesList3], ephemeral: true, fetchReply: true })

        sentMsg.awaitMessageComponent({ filter, componentType: 'BUTTON', time: 1200000 }).then(async interaction => {
            if (interaction.customId === 'cancelrulesreminder') {
                interaction.update({ content: 'Rules Reminder Prompt Cancelled.', ephemeral: true, embeds: [], components: [] })
            } else if (interaction.customId === 'generalreminder') {

                const generalRules = {
                    color: '#ffffff',
                    title: '📕  General Rules Reminder',
                    description: `Hey there, ${targetUser.toString()}!\n\nOperation Politics strives on civil discourse and principles of mutual respect and a shared desire to promote healthy debate. In order for this to happen, it's integral that all users try and follow **all server rules**, because there cannot be productive dialogue if not everyone participates in good faith. You can check and read our rules in <#775838975755681842>, or check the specific Channel Guidelines or Channel Description for whichever channel you may be in.\n\nIf you have any questions about the rules, don't ask them here... open a Moderation Inquiry in <#999439440273473657> to talk with Moderators directly!)`,
                    footer: {
                        text: `Moderators have the final say-so on what is or is not a rule violation. This is not a warning, this is just a reminder.`
                    }
                };
                sentMsg.channel.send({ content: `${targetUser.toString()}`, embeds: [generalRules] })
                interaction.update({ content: 'Reminder Sent! Thank you for doing your part to keep the server tidy.', embeds: [], components: [], ephemeral: true })

            } else if (interaction.customId === 'channelrules') {

                const updatedEmbed = {
                    color: '#ffffff',
                    description: 'Which channel are you trying to remind people the rules for?',
                };

                const pickaChannel = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('seriousdiscussion')
                            .setLabel('👤︱serious-discussion')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('hottakes')
                            .setLabel('🔥︱hot-takes')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('otherchannelpicked')
                            .setLabel('Other Channel')
                            .setStyle('SECONDARY'),
                    );

                interaction.update({ embeds: [updatedEmbed], components: [pickaChannel] })

                sentMsg.awaitMessageComponent({ filter, componentType: 'BUTTON', time: 1200000 }).then(async interaction => {

                    if (interaction.customId === 'seriousdiscussion') {

                        const seriousEmbed = {
                            color: '#ffffff',
                            title: '📕  Serious Discussion Rules Reminder',
                            description: `Hey there, ${targetUser.toString()}!\n\n<#1006354250017808424> is generally for more serious, structured, and formal debates. While it's not expected that *every* topic at *all* times will adhere to this standard, we expect you to try to do your best to contribute to these discussions in the most meaningful, productive, and good faith way. If you're looking for more informal debate or discussion, try <#964239900620759070>!\n\n[This message](${targetMsg.url}) was potentially in disregard of the channel's rules, or the thread's designated subject. You can check out some common mistakes and important resources below to help you participate in this server better.`,
                            fields: [
                                {
                                    name: "✅  Good Faith Discussion and Discourse",
                                    value: "Generally speaking, good faith discussions are ones which are respectful, open-minded, and honest. Bad faith are the opposite - arguing with a hidden agenda, a closed mind, disingenuous behavior, or lacks honesty and simple respect. [You can read more by clicking here.](https://www.cato.org/sites/cato.org/files/2020-07/Good_Faith-vs-Bad_Faith-Arguments_or_Discussions.pdf)",
                                    inline: false,
                                },
                                {
                                    name: "📝  Cite Your Sources",
                                    value: "Unless the discussion is about a purely ideological or semantical argument, you should do your best to back up your claims. You can easily find lots of good citations through [Google Scholar](https://scholar.google.com/), or use places like [Pew Research Center](https://www.pewresearch.org/), [American Political Science Association](https://www.apsanet.org/), or others to find good political research.",
                                    inline: true,
                                },
                                {
                                    name: "🗣️  Practice Good Debating Techniques",
                                    value: "You should do your best to be honest, genuine, and well-spoken during these debates. This mean [avoiding debate fallacies](https://thebestschools.org/magazine/15-logical-fallacies-know/) as much as possible, [practicing good formal debating methods](https://www.sfu.ca/cmns/130d1/HOWTODEBATE.htm#:~:text=be%20stared%20at.-,Content,the%20other%20side%E2%80%99s%20case%20to%20be%20flawed%20in%20the%20key%20areas.,-Sources) when possible, and [be sure to listen to your opponent and make reasonable arguments.](https://blogs.scientificamerican.com/observations/try-these-5-techniques-to-make-your-next-political-argument-fruitful/)",
                                    inline: true,
                                },
                                {
                                    name: "👁️‍🗨️  Stay On Topic",
                                    value: "Don't try to diverge the discussion unless you are certain it is still relevant and able to be tied back into the main point of the discussion at any time. Other people may want to participate too, but may be confused by the ongoing discussion seemingly being unrelated to the topic's main purpose.",
                                    inline: false,
                                },
                            ],
                            footer: {
                                text: "This isn't a warning, it's a user-generated reminder about the rules! Take it in good faith and don't argue about it in public chats.",
                            },
                        };

                        targetMsg.reply({
                            embeds: [seriousEmbed],
                        })

                    } else if (interaction.customId === 'hottakes') {

                        const hottakesEmbed = {
                            color: '#ffffff',
                            title: "📕  Hot Takes Rules Reminder",
                            description: `Hey there, ${targetUser.toString()}!\n\n<#1007831196874575902> is a channel for making unpopular (but not rule-violating) opinions and debating with folks about it. These posts can be related to politics, food, games, or generally anything. However, shitposting and derailing conversations isn't allowed. Also, do your best to be respectful, no matter how down and dirty you think someone's takes are.\n\nEverything posted in this channel is all in good faith and good fun, keep it that way!\n\n[This message](${targetMsg.url}) was potentially in violation of the server rules, channel rules, or thread topic. Be careful!`,
                            footer: {
                                text: "This isn't a warning, it's a user-generated reminder about the rules! Take it in good faith and don't argue about it in public chats.",
                            },
                        }

                        targetMsg.reply({
                            embeds: [hottakesEmbed],
                        })

                    } else if (interaction.customId === 'otherchannelpicked') {
                        
                        const otherChanEmbed = {
                            color: '#ffffff',
                            title: '📕  Channel Rules Reminder',
                            description: `Hey there, ${targetUser.toString()}!\n\nWe generally pride ourselves on having a neatly organized server structure, with each channel having it's own designated purpose. You can find specific rules for every channel usually at the top of your screen by clicking on the channel name. Usually, it will just be a designated purpose for the channel, but that's what you need to pay attention to.\n\n[This message](${targetMsg.url}) was potentially in disregard of a channel's specific purpose. **This isn't a warning,** but just some advice! Some common Rule 7 / Misusing Channels violations include:`,
                            fields: [
                                {
                                    name: '*Posting several memes in #general*',
                                    value: "A pretty simple mistake! One or two memes is fine, but if you want to post a lot or post them in our designated \"meme\" channel, head to <#775867278016118794>.",
                                    inline: true,
                                },
                                {
                                    name: "*Unrelated Discussion to Topic*",
                                    value: "Even if you're talking about politics outside of <#760275642150420523>, each channel and/or thread in our Forum Channels have a specific purpose. Keep an eye out!",
                                    inline: true,
                                },
                                {
                                    name: "*Discussing politics in #general, or general discussion in a political channel*",
                                    value: "As per the description of the channel, we do **not** allow political discourse in <#760275642150420523>. It's a place to hang out, talk about your day, and make friends - not for the nitty gritty of political discourse. Head to <#964239900620759070> or check out our other specialized channels! Likewise, we don't allow general / unrelated discussion that isn't related to a channel's specific purpose.",
                                },
                                {
                                    name: "*Do you have any questions?*",
                                    value: "If you're unsure about what went wrong, your best course of action is to open a ticket in <#999439440273473657> and get directly in touch with the Moderation team. You can ask questions about the rules, channel purposes/usages, and more there.",
                                },
                            ],
                            footer: {
                                text: "This isn't a warning, it's a user-generated reminder about the rules! Take it in good faith and don't argue about it in public chats.",
                            },
                        };

                        targetMsg.reply({
                            embeds: [otherChanEmbed],
                        })

                    }

                    interaction.update({ content: 'Reminder Sent! Thank you for doing your part to keep the server tidy.', embeds: [], components: [] })

                })

            } else if (interaction.customId === 'r1') {

            } else if (interaction.customId === 'r2') {

            } else if (interaction.customId === 'r3') {

            } else if (interaction.customId === 'r4') {

            } else if (interaction.customId === 'r5') {

            } else if (interaction.customId === 'r6') {

            } else if (interaction.customId === 'r7') {

            } else if (interaction.customId === 'r8') {

            } else if (interaction.customId === 'r9') {

            } else if (interaction.customId === 'r10') {

            } else if (interaction.customId === 'r11') {

            } else if (interaction.customId === 'r12') {

            }
        });

    }
}