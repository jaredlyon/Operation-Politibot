const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('case')
		.setDescription('Accesses and edits case logs')
        .addSubcommand(view =>
            view.setName('view')
                .setDescription('View a specific case')
                .addIntegerOption(caseNumber =>
                    caseNumber.setName('case')
                        .setDescription('The targeted case ID')
                        .setRequired(true)))
        .addSubcommand(edit =>
            edit.setName('edit')
                .setDescription(`Edit a specific case's reason`)
                .addIntegerOption(caseNumber =>
                    caseNumber.setName('case')
                        .setDescription('The targeted case ID')
                        .setRequired(true))
                .addStringOption(reason => reason.setName('edit').setDescription('The text to be added to the case reason').setRequired(true)))
        .addSubcommand(rewrite =>
            rewrite.setName('rewrite')
                .setDescription(`Rewrite a specific case's reason`)
                .addIntegerOption(caseNumber =>
                    caseNumber.setName('case')
                        .setDescription('The targeted case ID')
                        .setRequired(true))
                .addStringOption(reason => reason.setName('rewrite').setDescription('The text to replace the case reason').setRequired(true)))
        .addSubcommand(remove =>
            remove.setName('remove')
                .addIntegerOption(caseNumber =>
                    caseNumber.setName('case')
                        .setDescription('The targeted case ID')
                        .setRequired(true))
                .setDescription('Remove a specific case')),
	async execute(interaction) {
        if (bot.logs[caseNumber]) {
            if (interaction.options.getSubcommand() === 'view') {

                // view case
                var userid = bot.logs[caseNumber].userid;
                var moderator = interaction.guild.members.cache.get(bot.logs[caseNumber].moderatorid);

                var log = new MessageEmbed()
                    .setTitle('Case ' + bot.logs[caseNumber].caseNum)
                    .addField(bot.logs[caseNumber].type + ' issued by ' + moderator.user.username, bot.logs[caseNumber].date + '\n' + bot.logs[caseNumber].reason)
                    .setTimestamp()
                    .setColor(3447003);

                    if (interaction.guild.members.cache.get(userid)) {
                        var target = interaction.guild.members.cache.get(bot.logs[caseNumber].userid);
                        log.setAuthor(target.user.username + "#" + target.user.discriminator, target.user.avatarURL());
                        log.setFooter('User ID: ' + target.id)
                    } else {
                        var target = bot.logs[caseNumber].userid;
                        log.setAuthor("(User left server) ID: " + target);
                        log.setFooter('User ID: ' + userid);
                    }
    
    
                interaction.channel.send({
                    embeds: [log]
                });

            } else if (interaction.options.getSubcommand() === 'edit') {

                // edit case
                bot.logs[caseNumber].reason += "\nEdited on `" + new Date() + "`\n" + reason
                interaction.reply("case updated! New case:");
                var userid = bot.logs[caseNumber].userid;
                var target = interaction.guild.members.cache.get(userid);
                var moderator = interaction.guild.members.cache.get(bot.logs[caseNumber].moderatorid);

                var log = new MessageEmbed()
                    .setTitle('Case ' + bot.logs[caseNumber].caseNum)
                    .addField(bot.logs[caseNumber].type + ' issued by ' + moderator.user.username, bot.logs[caseNumber].date + '\n' + bot.logs[caseNumber].reason)
                    .setTimestamp()
                    .setColor(3447003);

                    if (interaction.guild.members.cache.get(userid)) {
                        var target = interaction.guild.members.cache.get(bot.logs[caseNumber].userid);
                        log.setAuthor(target.user.username + "#" + target.user.discriminator, target.user.avatarURL());
                        log.setFooter('User ID: ' + target.id)
                    } else {
                        var target = bot.logs[caseNumber].userid;
                        log.setAuthor("(User left server) ID: " + target);
                        log.setFooter('User ID: ' + userid);
                    }
    
                interaction.channel.send({
                    embeds: [log]
                });

            } else if (interaction.options.getSubcommand() === 'rewrite') {

                // rewrite case
                bot.logs[caseNumber].reason = "Edited on `" + new Date() + "`\n" + reason
                interaction.reply("case updated! New case:");
                var userid = bot.logs[caseNumber].userid;
                var target = interaction.guild.members.cache.get(userid);
                var moderator = interaction.guild.members.cache.get(bot.logs[caseNumber].moderatorid);

                var log = new MessageEmbed()
                    .setTitle('Case ' + bot.logs[caseNumber].caseNum)
                    .addField(bot.logs[caseNumber].type + ' issued by ' + moderator.user.username, bot.logs[caseNumber].date + '\n' + bot.logs[caseNumber].reason)
                    .setTimestamp()
                    .setColor(3447003);

                    if (interaction.guild.members.cache.get(userid)) {
                        var target = interaction.guild.members.cache.get(bot.logs[caseNumber].userid);
                        log.setAuthor(target.user.username + "#" + target.user.discriminator, target.user.avatarURL());
                        log.setFooter('User ID: ' + target.id)
                    } else {
                        var target = bot.logs[caseNumber].userid;
                        log.setAuthor("(User left server) ID: " + target);
                        log.setFooter('User ID: ' + userid);
                    }
    
                interaction.channel.send({
                    embeds: [log]
                });

            } else if (interaction.options.getSubcommand() === 'delete') {

                // delete case
                if (interaction.author.id == bot.config.owner || interaction.guild.members.cache.get(interaction.author.id).roles.cache.some(role => role.id === '775501181212295239') || interaction.guild.members.cache.get(interaction.author.id).roles.cache.some(role => role.id === '927318500614225920')) {
                    delete bot.logs[caseNumber]
                    interaction.reply("case deleted!")
                } else {
                    interaction.reply('due to database & logging security, data can only be deleted by Senior Moderation Staff.')
                }

            }
        } else if (!bot.logs[caseNumber]) {
            interaction.reply('this case does not exist!');
        }
	},
};