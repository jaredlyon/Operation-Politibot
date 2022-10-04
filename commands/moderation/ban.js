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
                    title: '**A moderator has banned you. You may appeal this decision by joining our ban appeals server, and then clicking the "Appeal" button below.**',
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

                const serverLinkBan = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('linkban')
                            .setLabel('Ban Appeal Server')
                            .setStyle('LINK')
                            .setURL('https://discord.gg/CFS7yjEhUd')
                    );
        
                const serverLinkmain = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel('Operation Politics Server')
                            .setStyle('LINK')
                            .setURL('https://discord.gg/operationpolitics')
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
                    components: [serverLinkBan, appealButton]
                }).catch(async err => {
                    console.log(err);
                    interaction.channel.send({
                        content: "I couldn't DM this user since they do not accept DMs from server bots/members.",
                    });
                });

                await interaction.guild.members.ban(banee);

            } else {
                interaction.reply("mention someone!")
            }
        } else if (interaction.guild.members.cache.get(interaction.user.id).roles.cache.some(role => role.id === '893189360105689139')) {
            interaction.reply("Permission denied; go get another mod!");
        }
	},
};
