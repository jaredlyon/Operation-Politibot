const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

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

        var warn = new MessageEmbed()
            .setAuthor(warnee.username, warnee.avatarURL())
            .addField('Member warned:', `**:exclamation: ${warnee} (${warnee.id}) was warned.**`)
            .addField('Reason:', reason)
            .addField('Case ID:', caseCount.toString())
            .setFooter(client.user.username, client.user.avatarURL())
            .setTimestamp()
            .setColor("#992D22");

        var dm = new MessageEmbed()
            .setAuthor(interaction.guild.name, interaction.guild.iconURL())
            .setTitle(`**A moderator has issued you a warning. You may appeal the decision through Modmail.**`)
            .addField('Reason:', reason)
            .addField('Case ID:', caseCount.toString())
            .setFooter(client.user.username, client.user.avatarURL())
            .setTimestamp()
            .setColor("#992D22");

        await interaction.channel.send({
            embeds: [warn]
        })
        await log.send({
            embeds: [warn]
        })

        client.logs[caseCount] = {
            caseNum: caseCount,
            userid: warnee.id,
            moderatorid: interaction.user.id,
            date: new Date(),
            type: "Warning",
            reason: reason
        };

        client.caseNum.count++;

        await warnee.createDM();
        await warnee.send({
            embeds: [dm]
        }).catch(async err => {
            console.log(err);
            interaction.reply("I couldn't DM this user since they do not accept DMs from server bots/members.");
        });
	},
};