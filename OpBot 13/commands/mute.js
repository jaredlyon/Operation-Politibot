const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription('Mutes a user')
        .addUserOption(mutee =>
            mutee.setName('user')
                .setDescription('The user to be muted')
                .setRequired(true))
        .addIntegerOption(length =>
            length.setName('length')
                .setDescription('Mute length in minutes')
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

        var mute = new MessageEmbed()
            .setAuthor(mutee.username, mutee.avatarURL())
            .addField(`Member muted for ${length}m:`, `**:mute: ${mutee} (${mutee.id}).**`)
            .addField('Reason:', reason)
            .addField('Case ID: ', caseCount)
            .setFooter(bot.user.username, bot.user.avatarURL())
            .setTimestamp()
            .setColor("#E74C3C");

        //await interaction.guild.members.ban(mutee);
        var dm = new MessageEmbed()
            .setAuthor(interaction.guild.name, interaction.guild.iconURL())
            .setTitle(`**A moderator has muted you for ${length}m:. You may appeal the decision through Modmail.**`)
            .addField('Reason:', reason)
            .setFooter(bot.user.username, bot.user.avatarURL())
            .setTimestamp()
            .setColor("#E74C3C");

        
        member.timeout(length*60*1000, reason)

        await interaction.channel.send({
            embeds: [mute]
        });
        await log.send({
            embeds: [mute]
        });

        bot.logs[caseCount] = {
            caseNum: caseCount,
            userid: mutee.id,
            moderatorid: interaction.author.id,
            date: new Date(),
            type: "Mute (" + length + "m)",
            reason: reason
        }

        bot.caseNum.count++;

        await mutee.createDM();
        await mutee.send({
            embeds: [dm]
        }).catch(async err => {
            console.log(err);
            interaction.reply("I couldn't DM this user since they do not accept DMs from server bots/members.");
        });
	},
};