const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Modal, TextInputComponent, showModal, ModalSubmitInteraction } = require('discord-modals');


module.exports = {
    name: "mute",
    description: "Mutes a user",
    options: [
        {
            type: 6,
            name: "mutee",
            description: "The user to be muted",
            required: true
        },
        {
            type: 3,
            name: "reason",
            description: "The reason for issue",
            required: true
        },
        {
            type: 4,
            name: "length",
            description: "Mute length in minutes"
        },
    ],
    run: async (client, interaction) => {
        var log = interaction.guild.channels.cache.get(client.config.logChannel);
        var caseCount = client.caseNum.count;
        var mutee = interaction.options.getUser('mutee');
        var reason = interaction.options.getString('reason');
        var length = interaction.options.getInteger('length');

        if (reason === '') {
            reason = 'No reason was specified.'
        };

        if (length == null) {
            length = 40000;
        };

        var mute = {
            color: '#E74C3C',
            author: {
                name: mutee.username,
                icon_url: mutee.avatarURL(),
            },
            fields: [
                {
                    name: `Member muted for ${length}m:`,
                    value: `**:mute: ${mutee} (${mutee.id}).**`,
                },
                {
                    name: 'Reason:',
                    value: reason
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
            color: '#E74C3C',
            title: `**A moderator has muted you for ${length}m. You may appeal the decision below.**`,
            author: {
                name: interaction.guild.name,
                icon_url: interaction.guild.iconURL(),
            },
            fields: [
                {
                    name: 'Reason:',
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
        }

        const appealButton = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('appeal')
                    .setLabel('Appeal')
                    .setStyle('PRIMARY'),
            );

        const rulesTestButton = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Rules Test')
                    .setStyle('LINK')
                    .setURL('https://forms.gle/o2ckvskjgPjC7JfV8'),
            );
        
        const targetUser = await interaction.guild.members.fetch(mutee);
        console.log(targetUser);
        await targetUser.timeout(length * 60 * 1000);

        await interaction.reply({
            embeds: [mute]
        });
        await log.send({
            embeds: [mute]
        });

        client.logs[caseCount] = {
            caseNum: caseCount,
            userid: mutee.id,
            moderatorid: interaction.user.id,
            date: new Date(),
            type: "Mute (" + length + "m)",
            reason: reason
        }

        client.caseNum.count++;

        await mutee.createDM();

        await mutee.send({
            embeds: [dm],
            components: [appealButton]
        }).catch(async err => {
            console.log(err);
            interaction.channel.send({
                content: "I couldn't DM this user since they do not accept DMs from server bots/members.",
            });
        });

        if (length === 40000) {
            await mutee.send({
                content: 'You must take a rules test in order to regain access to the server.',
                components: [rulesTestButton]
            }).catch(async err => {
                console.log(err);
                interaction.channel.send({
                    content: "I was also unable to send them the rules test.",
                });
            });
        };
    },
};
