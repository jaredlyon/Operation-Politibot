const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Modal, TextInputComponent, showModal, ModalSubmitInteraction } = require('discord-modals');
module.exports = {
    name: "warn",
    description: "Warns a user",
    options: [
      {
        type: 6,
        name: "warnee",
        description: "The user to be warned",
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
		var log = interaction.guild.channels.cache.get(client.config.logChannel);
        var caseCount = client.caseNum.count;
        var warnee = interaction.options.getUser('warnee');
        var reason = interaction.options.getString('reason');

        if (reason == null) {
            reason = 'No reason was specified.'
        };

        console.log(caseCount);
        console.log(reason);
        console.log(warnee);

        var warn = {
            color: '#992D22',
            author: {
                name: warnee.username,
                icon_url: warnee.avatarURL(),
            },
            fields: [
                {
                    name: 'Member warned:',
                    value: `**:exclamation: ${warnee} (${warnee.id}) was warned.**`
                },
                {
                    name: 'Reason:',
                    value: reason,
                },
                {
                    name: 'Case ID:',
                    value: caseCount.toString(),
                },
            ],
            timestamp: new Date(),
        };

        var dm = {
            color: `#992D22`,
            author: {
                name: interaction.guild.name,
                icon_url: interaction.guild.iconURL(),
            },
            title: '**A moderator has issued you a warning. You may appeal the decision below.**',
            fields: [
                {
                    name: 'Reason:',
                    value: reason,
                },
                {
                    name: 'Case ID:',
                    value: caseCount.toString(),
                },
            ],
            footer: {
                text: client.user.username,
                icon_url: client.user.avatarURL(),
            },
            timestamp: new Date()
        };

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
            embeds: [warn]
        })
        await log.send({
            embeds: [warn]
        });

        client.logs[caseCount] = {
            caseNum: caseCount,
            userid: warnee.id,
            moderatorid: interaction.user.id,
            date: new Date(),
            type: "Warning",
            reason: reason
        };

        client.caseNum.count++;

        var isDMable = true;
        await warnee.createDM();
        const appealMsg = await warnee.send({
            embeds: [dm],
            components: [appealButton]
        }).catch(async err => {
            console.log(err);
            interaction.channel.send({
                content: "I couldn't DM this user since they do not accept DMs from server bots/members.",
            });
            isDMable = false;
        });
	},
};
