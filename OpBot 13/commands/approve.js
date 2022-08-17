const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('approve')
		.setDescription('Approves a user for member status')
        .addUserOption(target =>
            target.setName('user')
                .setDescription('The user to be approved')
                .setRequired(true)),
	async execute(interaction) {
        const tick = bot.emojis.cache.find(emoji => emoji.name == "tickmark").toString();
        var channel = interaction.guild.channels.cache.get(bot.config.welcomeChannel); //mod channel
        var log = interaction.guild.channels.cache.get(bot.config.logChannel);  //logs the stuff
        
        //member id: 909989200378601472
        //untrusted id: 909988798308433920

        if (interaction.channel.id == bot.config.welcomeChannel) {
            if (target != null) {
                if (!target.roles.cache.some(role => role.id === '909989200378601472') && target.roles.cache.some(role => role.id === '909988798308433920')) {
                    var logEmbed = new MessageEmbed()
                        .setAuthor(interaction.author.username, interaction.author.avatarURL())
                        .addField('Member approved:', tick + ` **${target} (${target.id}) was approved.**`)
                        .setFooter(bot.user.username, bot.user.avatarURL())
                        .setTimestamp()
                        .setColor("#FFFFFF");

                    let trusted = (await bot.trusted.get(userID)) || {};

                    await target.roles.add('909989200378601472');
                    await target.roles.remove('909988798308433920');
                    trusted.joinDate = new Date();
                    await bot.trusted.update(trusted);
                    await channel.send({
                        embeds: [logEmbed]
                    })
                    await log.send({
                        embeds: [logEmbed]
                    })
                } else {
                    interaction.reply('this user has either already been approved or has not accepted our rules prompt.');
                }
            } else {
                interaction.reply("target not found! Usage: `!approve [user ID]`\n*Be sure you've correctly copied the user's ID and you're not mentioning them!*");
            }
        } else {
            interaction.reply("wrong channel!");
        }
	},
};