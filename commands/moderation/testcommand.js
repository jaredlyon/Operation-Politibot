const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Modal, TextInputComponent, showModal, ModalSubmitInteraction } = require('discord-modals');


module.exports = {
    name: "testbuttons",
    description: "tests the buttons",
    options: [
        {
            type: 7,
            name: "targetchannel",
            description: "The channel to send in",
            required: true
        }
    ],
    run: async (client, interaction) => {

        const cChann = interaction.guild.channels.cache.get('775494762216161341')
        const tChann = interaction.options.getChannel('targetchannel');

        // Setup!

        const earnedRolesEmbed = {
            color: '#ffffff',
            title: '**INFO:** EARNED ROLES',
            description: 'These roles are available through participating in the server some way or another. Some roles are even required to unlock other parts of the server, such as <#1006354250017808424> and <#1007831196874575902> and embed permissions.\n\nWe have a few different categories of Earned Roles that you can receive and/or apply for. Click one of the buttons below to learn more.',
        }

        const assignedRolesEmbed = {
            color: '#ffffff',
            title: '**INFO:** SELF-ASSIGNABLE ROLES',
            description: 'Add some spice and flavor to your identity in this server. We offer several categories of self-assignable roles that allow you to flaunt your political ideology, party, religion, region, and much more to let people know who you are and where you stand. Some of them even give access to other channels!\n\nClick one of the buttons below to learn more.'
        }

        const readytoRoleEmbed = {
            color: '#ffffff',
            title: 'Ready to grab some Roles?',
            description: 'If you are ready to grab some roles, click below to start the role assignment process! Our roles system is new and completely integrated within Discord, and it shows you both the roles you already have and the roles you can obtain.',
            footer: {
                text: `Click the button below to begin at any time. You can click 'Dismiss Message' to end the prompt at any time, or we otherwise encourage you to complete the process.`
            }
        }

        // Earned Roles Buttons!

        const earnedRolesButtons = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('specialroles')
                    .setLabel('🌟 Special Roles')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('activityroles')
                    .setLabel('📈 Activity Roles')
                    .setStyle('SECONDARY'),
            );


        // Assigned Roles Buttons!

        const firstRoles = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ideologyroles')
                    .setLabel('🏷️ Ideological Roles')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('partyroles')
                    .setLabel('🪧 Political Parties')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('faroles')
                    .setLabel('🕊️ Foreign Affairs')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('econroles')
                    .setLabel('💰 Economic Systems')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('issuesroles')
                    .setLabel('⚖️ Political Issues')
                    .setStyle('SECONDARY'),
            );

        const secondroles = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('religionroles')
                    .setLabel('⛪ Religious Roles')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('extraideoroles')
                    .setLabel('🏷️ Other Ideologies')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('georoles')
                    .setLabel('🗺️ Geographical Roles')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('serverroles')
                    .setLabel('📣 Other')
                    .setStyle('SECONDARY'),
            );

        const startRolesButton = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('startroles')
                    .setLabel('✅ Get Roles')
                    .setStyle('SUCCESS')
            );

        // Send the message >:)

        tChann.send({
            embeds: [earnedRolesEmbed],
            components: [earnedRolesButtons],
        })

        tChann.send({
            embeds: [assignedRolesEmbed],
            components: [firstRoles, secondroles],
        })

        tChann.send({
            embeds: [readytoRoleEmbed],
            components: [startRolesButton],
        })

        interaction.reply('Messages sent!')

    },
};