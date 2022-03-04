var Discord = require('discord.js');

module.exports = {
    name: "case",
    permission: 2,
    main: function(bot, msg) {
        var caseNumber = Number(msg.content.split(' ').splice(0)[0]);
        var input = msg.content.split(' ').splice(1)[0];
        var reason = msg.content.split(' ').splice(2).join(' ');

        if (!caseNumber) {
            msg.reply("Usage: \n`!case <number> <edit/delete> <input>` to edit\n`!case <number>` to view\nError: 1");
        } else if (bot.logs[caseNumber]) {
            if (!input) {
                var userid = bot.logs[caseNumber].userid;
                var moderator = msg.guild.members.cache.get(bot.logs[caseNumber].moderatorid);

                var log = new Discord.MessageEmbed()
                    .setTitle('Case ' + bot.logs[caseNumber].caseNum)
                    .addField(bot.logs[caseNumber].type + ' issued by ' + moderator.user.username, bot.logs[caseNumber].date + '\n' + bot.logs[caseNumber].reason)
                    .setTimestamp()
                    .setColor(3447003);

                    if (msg.guild.members.cache.get(userid)) {
                        var target = msg.guild.members.cache.get(bot.logs[caseNumber].userid);
                        log.setAuthor(target.user.username + "#" + target.user.discriminator, target.user.avatarURL());
                        log.setFooter('User ID: ' + target.id)
                    } else {
                        var target = bot.logs[caseNumber].userid;
                        log.setAuthor("(User left server) ID: " + target);
                        log.setFooter('User ID: ' + userid);
                    }
    
    
                msg.channel.send({
                    embed: log
                });
            } else if (input == "edit") {
                if (!reason) {
                    msg.reply("Usage: \n`!case <number> <edit/delete> <input>` to edit\n`!case <number>` to view\nError: 2");
                } else {
                    bot.logs[caseNumber].reason += "\nEdited on `" + new Date() + "`\n" + reason
                    msg.reply("case updated! New case:");
                    var userID = bot.logs[caseNumber].userid;
                    const target = msg.guild.members.cache.get(userID);
                    var moderator = msg.guild.members.cache.get(bot.logs[caseNumber].moderatorid);
    
                    var log = new Discord.MessageEmbed()
                        .setTitle('Case ' + bot.logs[caseNumber].caseNum)
                        .setAuthor(target.user.username + "#" + target.user.discriminator, target.user.avatarURL())
                        .addField(bot.logs[caseNumber].type + ' issued by ' + moderator.user.username, bot.logs[caseNumber].date + '\n' + bot.logs[caseNumber].reason)
                        .setFooter('User ID: ' + target.id)
                        .setTimestamp()
                        .setColor(3447003);
        
        
                    msg.channel.send({
                        embed: log
                    });
                }
            } else if (input == "rewrite") {
                if (!reason) {
                    msg.reply("Usage: \n`!case <number> <edit/delete> <input>` to edit\n`!case <number>` to view\nError: 2");
                } else {
                    bot.logs[caseNumber].reason = "Edited on `" + new Date() + "`\n" + reason
                    msg.reply("case updated! New case:");
                    var userID = bot.logs[caseNumber].userid;
                    const target = msg.guild.members.cache.get(userID);
                    var moderator = msg.guild.members.cache.get(bot.logs[caseNumber].moderatorid);
    
                    var log = new Discord.MessageEmbed()
                        .setTitle('Case ' + bot.logs[caseNumber].caseNum)
                        .setAuthor(target.user.username + "#" + target.user.discriminator, target.user.avatarURL())
                        .addField(bot.logs[caseNumber].type + ' issued by ' + moderator.user.username, bot.logs[caseNumber].date + '\n' + bot.logs[caseNumber].reason)
                        .setFooter('User ID: ' + target.id)
                        .setTimestamp()
                        .setColor(3447003);
        
        
                    msg.channel.send({
                        embed: log
                    });
                }
            } else if (input == "delete") {
                    delete bot.logs[caseNumber]
                    msg.reply("case deleted!")
            } else {
                msg.reply("Usage: \n`!case <number> <edit/delete> <input>` to edit\n`!case <number>` to view\nError: 3");
            }
        } else if (!bot.logs[caseNumber]) {
            msg.reply('this case does not exist!');
        }
    }
}