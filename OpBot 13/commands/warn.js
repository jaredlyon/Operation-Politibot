const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('Warns a user')
        .addUserOption(warnee =>
            warnee.setName('user')
                .setDescription('The user to be warned')
                .setRequired(true))
        .addStringOption(reason =>
            reason.setName('reason')
                .setDescription('The reason for issue')
                .setRequired(false)),
	async execute(interaction) {
		var log = interaction.guild.channels.cache.get(bot.config.logChannel);

        var caseCount = bot.caseNum.count;
        var reason = interaction.content.split(' ').splice(1).join(' ');
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