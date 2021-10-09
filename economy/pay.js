module.exports = {
    name: 'pay',
    permission: 1,
    main: async function (bot, msg) {
        const Discord = require('discord.js');
        var recipient = msg.mentions.users.array()[0];
        var amt = Number(msg.content.split(' ').splice(1)[0]);
        let account = await bot.bank.get(msg.author.id);

        if (recipient != null && amt != null && account.bank >= amt && Number.isInteger(amt) && recipient.id != msg.author.id && recipient.id != bot.user.id) {
            account.bank -= amt;
            var recB = (await bot.bank.get(recipient.id));
            recB.bank += amt;
            msg.channel.send(":white_check_mark: | " + msg.author.username + ", you have transferred **$" + amt + "** to " + recipient.username + "'s bank account!");

            await bot.bank.update(account);
            await bot.bank.update(recB);
        } else {
            msg.reply("something went wrong! Make sure you have the right usage: `!pay [@user] [amount]` and that you have sufficient funds to give away!");
        }
    }
};