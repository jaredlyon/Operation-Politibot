const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { user } = require('../..');
const client = require('../..');

module.exports = {
    name: "kick",
    description: "Kicks a user",
    options: [
      {
        "type": 6,
        "name": "kickee",
        "description": "The user to be kicked",
        "required": true
      },
      {
        "type": 3,
        "name": "reason",
        "description": "The reason for issue",
      }
    ],
	async execute(interaction) {
		var log = interaction.guild.channels.cache.get(client.config.logChannel);
        var caseCount = client.caseNum.count;
        var kickee = interaction.options.get('kickee');
        var reason = interaction.options.get('reason');
        if (reason === '') {
            reason = 'No reason was specified.'
        };


        var kick = new MessageEmbed()
            .setAuthor(kickee.username, kickee.avatarURL())
            .addField('Member kicked:', `**:hiking_boot: ${kickee} (${kickee.id}) was kicked from the server.**`)
            .addField('Reason:', reason)
            .addField('Case ID: ', caseCount)
            .setFooter(client.user.username, client.user.avatarURL())
            .setTimestamp()
            .setColor("#992D22");

        var dm = new MessageEmbed()
            .setAuthor(interaction.guild.name, interaction.guild.iconURL())
            .setTitle(`**A moderator has kicked you.**`)
            .addField('Reason:', reason)
            .setFooter(client.user.username, client.user.avatarURL())
            .setTimestamp()
            .setColor("#992D22");

        await kickee.createDM();
        await kickee.send({
            embeds: [dm]
        }).catch(async err => {
            console.log(err);
            interaction.reply("I couldn't DM this user since they do not accept DMs from server bots/members.");
        });
        const user = interaction.guild.member(kickee);
        await user.kick();
        await interaction.channel.send({
            embeds: [kick]
        })
        await log.send({
            embeds: [kick]
        })

        client.logs[caseCount] = {
            caseNum: caseCount,
            userid: kickee.id,
            moderatorid: interaction.author.id,
            date: new Date(),
            type: "Kick",
            reason: reason
        }

        client.caseNum.count++;
	},
};