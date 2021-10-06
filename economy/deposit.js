module.exports = {
    name: "deposit",
    aliases: ['d', 'dep'],
    permission: 1,
    main: async function (bot, msg) {
        let account = (await bot.bank.get(msg.author.id)) || {};
        var amt = Number(msg.content.split(' ').splice(0)[0]);

        if (amt != isNaN) {
            if (amt > account.balance) {
                msg.channel.send(":exclamation: | Insufficient cash.");
            } else {
                account.balance -= amt;
                account.bank += amt;
                await bot.bank.update(account);
                msg.channel.send(":bank: | You deposited **$" + amt + "** into the bank.");
                console.log("[BANK] | Logged bank transfer");
            }
        } else {
            msg.reply("something went wrong!");
        }
    }
}