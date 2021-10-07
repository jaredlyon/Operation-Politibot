module.exports = {
    name: "withdraw",
    aliases: ['w', 'wd'],
    permission: 1,
    main: async function (bot, msg) {
        let account = (await bot.bank.get(msg.author.id)) || {};
        var input = msg.content.split(' ').splice(0)[0];
        amt = parseInt(input);

        //if amt is a number
        if (!isNaN(amt)) {
            if (amt > account.bank) {
                msg.channel.send(":exclamation: | Insufficient bank account funds.");
            } else {
                account.balance += amt;
                account.bank -= amt;
                await bot.bank.update(account);
                msg.channel.send(":bank: | You withdrew **$" + amt + "** from the bank.");
                console.log("[BANK] | Logged bank transfer");
            }
        //if it isnt
        } else if (input == "all") {
            var deposit = account.bank;
            account.balance += deposit;
            account.bank -= deposit;
            await bot.bank.update(account);
            msg.channel.send(":bank: | You withdrew **$" + deposit + "** from the bank.");
                console.log("[BANK] | Logged bank transfer");
        } else {
            msg.reply("something went wrong!");
        }
    }
}