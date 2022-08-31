const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { user } = require('../..');
const client = require('../..');

module.exports = {
    name: "warn",
    description: "Warns a user",
    options: [
      {
        "type": 6,
        "name": "warnee",
        "description": "The user to be warned",
        "required": true
      },
      {
        "type": 3,
        "name": "reason",
        "description": "The reason for issue"
      }
    ],
	async execute(interaction) {
		var log = interaction.guild.channels.cache.get(bot.config.logChannel);
        var caseCount = bot.caseNum.count;
        var warnee = interaction.options.get('warnee');
        var reason = interaction.options.get('reason');
        if (reason === '') {
            reason = 'No reason was specified.'
        };

        var warn = new MessageEmbed()
            .setAuthor(warnee.username, warnee.avatarURL())
            .addField('Member warned:', `**:exclamation: ${warnee} (${warnee.id}) was warned.**`)
            .addField('Reason:', reason)
            .addField('Case ID: ', caseCount)
            .setFooter(bot.user.username, bot.user.avatarURL())
            .setTimestamp()
            .setColor("#992D22");

        var dm = new MessageEmbed()
            .setAuthor(interaction.guild.name, interaction.guild.iconURL())
            .setTitle(`**A moderator has issued you a warning. You may appeal the decision through Modmail.**`)
            .addField('Reason:', reason)
            .setFooter(bot.user.username, bot.user.avatarURL())
            .setTimestamp()
            .setColor("#992D22");

        await interaction.channel.send({
            embeds: [warn]
        })
        await log.send({
            embeds: [warn]
        })

        bot.logs[caseCount] = {
            caseNum: caseCount,
            userid: warnee.id,
            moderatorid: interaction.author.id,
            date: new Date(),
            type: "Warning",
            reason: reason
        };

        bot.caseNum.count++;

        await warnee.createDM();
        await warnee.send({
            embeds: [dm]
        }).catch(async err => {
            console.log(err);
            interaction.reply("I couldn't DM this user since they do not accept DMs from server bots/members.");
        });
	},
};