module.exports = {
    name: "withdraw",
    aliases: ['w', 'wd'],
    permission: 1,
    main: async function (bot, msg) {
        let account = (await bot.bank.get(msg.author.id)) || {};
        var amt = Number(msg.content.split(' ').splice(0)[0]);

        if (amt != isNaN) {
            if (amt > account.bank) {
                msg.channel.send(":exclamation: | Insufficient bank account funds.");
            } else {
                account.balance += amt;
                account.bank -= amt;
                await bot.bank.update(account);
                msg.channel.send(":bank: | You withdrew **$" + amt + "** from the bank.");
                console.log("[BANK] | Logged bank transfer");
            }
        } else {
            msg.reply("something went wrong!");
        }
    }
}