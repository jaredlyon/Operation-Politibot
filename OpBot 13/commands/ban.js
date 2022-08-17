const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Bans a user')
        .addUserOption(banee =>
            banee.setName('user')
                .setDescription('The user to be banned')
                .setRequired(true))
        .addStringOption(reason =>
            reason.setName('reason')
                .setDescription('The reason for issue')
                .setRequired(false)),
	async execute(interaction) {
		if (!interaction.guild.members.cache.get(interaction.author.id).roles.cache.some(role => role.id === '893189360105689139')) {
            var log = interaction.guild.channels.cache.get(bot.config.logChannel);

            var caseCount = bot.caseNum.count;
            if (reason === '') {
                reason = 'No reason was specified.'
            };

            if (banee != null) {
                var ban = new MessageEmbed()
                    .setAuthor(banee.username, banee.avatarURL())
                    .addField('Member banned:', `**:hammer: ${banee} (${banee.id}) was banned from the server.**`)
                    .addField('Reason:', reason)
                    .addField('Case ID: ', caseCount)
                    .setFooter(bot.user.username, bot.user.avatarURL())
                    .setTimestamp()
                    .setColor("#992D22");
                
                var dm = new MessageEmbed()
                    .setAuthor(interaction.guild.name, interaction.guild.iconURL())
                    .setTitle(`**A moderator has banned you.**`)
                    .addField('Reason:', reason)
                    .setFooter(bot.user.username, bot.user.avatarURL())
                    .setTimestamp()
                    .setColor("#992D22");

                await banee.createDM();
                await banee.send({
                    embeds: [dm]
                }).catch(async err => {
                    console.log(err);
                    interaction.reply("I couldn't DM this user since they do not accept DMs from server bots/members.");
                });
                await interaction.guild.members.ban(banee);
                await interaction.channel.send({
                    embeds: [ban]
                })
                await log.send({
                    embeds: [ban]
                })

                bot.logs[caseCount] = {
                    caseNum: caseCount,
                    userid: banee.id,
                    moderatorid: interaction.author.id,
                    date: new Date(),
                    type: "Ban",
                    reason: reason
                }

                bot.caseNum.count++;
            } else {
                interaction.reply("mention someone!")
            }
        } else if (interaction.guild.members.cache.get(interaction.author.id).roles.cache.some(role => role.id === '893189360105689139')) {
            interaction.reply("Permission denied; go get another mod!");
        }
	},
};