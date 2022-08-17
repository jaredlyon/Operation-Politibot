const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kicks a user')
        .addUserOption(kickee =>
            kickee.setName('user')
                .setDescription('The user to be kicked')
                .setRequired(true))
        .addStringOption(reason =>
            reason.setName('reason')
                .setDescription('The reason for issue')
                .setRequired(false)),
	async execute(interaction) {
		var log = interaction.guild.channels.cache.get(bot.config.logChannel);
        var caseCount = bot.caseNum.count;
        if (reason === '') {
            reason = 'No reason was specified.'
        };


        var kick = new MessageEmbed()
            .setAuthor(kickee.username, kickee.avatarURL())
            .addField('Member kicked:', `**:hiking_boot: ${kickee} (${kickee.id}) was kicked from the server.**`)
            .addField('Reason:', reason)
            .addField('Case ID: ', caseCount)
            .setFooter(bot.user.username, bot.user.avatarURL())
            .setTimestamp()
            .setColor("#992D22");

        var dm = new MessageEmbed()
            .setAuthor(interaction.guild.name, interaction.guild.iconURL())
            .setTitle(`**A moderator has kicked you.**`)
            .addField('Reason:', reason)
            .setFooter(bot.user.username, bot.user.avatarURL())
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

        bot.logs[caseCount] = {
            caseNum: caseCount,
            userid: kickee.id,
            moderatorid: interaction.author.id,
            date: new Date(),
            type: "Kick",
            reason: reason
        }

        bot.caseNum.count++;
	},
};