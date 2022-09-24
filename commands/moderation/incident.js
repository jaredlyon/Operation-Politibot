const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Modal, TextInputComponent, showModal, ModalSubmitInteraction } = require('discord-modals');

module.exports = {
    name: "incident",
    description: "Log an incident that did not warrant a warning",
    options: [
      {
        type: 6,
        name: "logee",
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
        var logee = interaction.options.getUser('logee');
        var reason = interaction.options.getString('reason');

        if (reason == null) {
            reason = 'No reason was specified.'
        };

        console.log(caseCount);
        console.log(reason);
        console.log(logee);

        var warn = {
            color: '#992D22',
            author: {
                name: logee.username,
                icon_url: logee.avatarURL(),
            },
            fields: [
                {
                    name: 'Incident logged:',
                    value: `**:exclamation: ${logee} (${logee.id}) had an incident logged.**`
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

        caseNumPlaceholder = caseCount.toString();

        await interaction.reply({
            embeds: [warn],
            ephemeral: true
        })
        await log.send({
            embeds: [warn]
        });

        client.logs[caseCount] = {
            caseNum: caseCount,
            userid: logee.id,
            moderatorid: interaction.user.id,
            date: new Date(),
            type: "Incident Log",
            reason: reason
        };

        client.caseNum.count++;
	},
};