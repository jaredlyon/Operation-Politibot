module.exports = {
    name: "addmoney",
    permission: 2,
    main: async function(bot, msg) {
        const Discord = require('discord.js');
        var recipient = msg.mentions.users.array()[0];
        var amt = Number(msg.content.split(' ').splice(1)[0]);
        let account = await bot.bank.get(recipient.id);
        var log = msg.guild.channels.cache.get(bot.config.logChannel);

        if (!recipient || !amt || isNaN(amt) || amt < 0) {
            msg.reply("something went wrong!\nUsage: `!addmoney <@user> <amt>`");
        } else {
            account.bank += amt;
            log.send(msg.author.toString() + " has added $" + amt + " to " + recipient.toString() + "'s bank account.");
            await bot.bank.update(account);
            msg.reply("success! Log generated.");
        }
    }
}