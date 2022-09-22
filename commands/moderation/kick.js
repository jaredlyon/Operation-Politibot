const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Modal, TextInputComponent, showModal, ModalSubmitInteraction } = require('discord-modals');


module.exports = {
    name: "kick",
    description: "Kicks a user",
    options: [
      {
        type: 6,
        name: "kickee",
        description: "The user to be kicked",
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
        var kickee = interaction.options.getUser('kickee');
        var reason = interaction.options.getString('reason');

        if (reason === '') {
            reason = 'No reason was specified.'
        };


        var kick = new MessageEmbed()
            .setAuthor(kickee.username, kickee.avatarURL())
            .addField('Member kicked:', `**:hiking_boot: ${kickee} (${kickee.id}) was kicked from the server.**`)
            .addField('Reason:', reason)
            .addField('Case ID: ', caseCount.toString())
            .setFooter(client.user.username, client.user.avatarURL())
            .setTimestamp()
            .setColor("#992D22");

        var dm = new MessageEmbed()
            .setAuthor(interaction.guild.name, interaction.guild.iconURL())
            .setTitle(`**A moderator has kicked you. Rejoin the server using the button below in order to appeal or just to rejoin.**`)
            .addField('Reason:', reason)
            .addField('Case ID: ', caseCount.toString())
            .setFooter(client.user.username, client.user.avatarURL())
            .setTimestamp()
            .setColor("#992D22");

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

        const serverLinkmain = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Operation Politics Server')
                    .setStyle('LINK')
                    .setURL('https://discord.gg/operationpolitics')
            );

        const targetGuild = interaction.guild

        await kickee.createDM();
        const appealMsg = await kickee.send({
            embeds: [dm],
            components: [appealButton, serverLinkmain]
        }).catch(async err => {
            console.log(err);
            interaction.channel.send("I couldn't DM this user since they do not accept DMs from server bots/members.");
            appealMsg = null
        });

        const targetUser = await interaction.guild.members.fetch(kickee);
        await targetUser.kick();

        await interaction.reply({
            embeds: [kick]
        })
        await log.send({
            embeds: [kick]
        })

        client.logs[caseCount] = {
            caseNum: caseCount,
            userid: kickee.id,
            moderatorid: interaction.user.id,
            date: new Date(),
            type: "Kick",
            reason: reason
        }

        client.caseNum.count++;

        await interaction.guild.members.kick(kickee);

	},
};
