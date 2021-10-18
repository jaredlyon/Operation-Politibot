module.exports = {
    name: "request",
    permission: 1,
    main: async function(bot, msg) {
        const Discord = require('discord.js');
        var target = msg.mentions.users.array()[0];
        var amt = Number(msg.content.split(' ').splice(1)[0]);
        let account = await bot.bank.get(msg.author.id);
        
        if (target != null && amt != null && Number.isInteger(amt) && target.id != msg.author.id && target.id != bot.user.id) {
            let donor = await bot.bank.get(target.id);
            if (donor.bank >= amt) {
                msg.channel.send(":dollar: | Request processed! " + target.toString() + " must enter **Approve** or **Reject** to finalize the transaction:").then(() => {
                    const filter = m => target.id === m.author.id;

                    msg.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ["time"] }).then(messages => {
                        if (messages.first().content == 'Approve' || messages.first().content == 'approve') {
                            donor.bank -= amt;
                            account.bank += amt;
                            msg.channel.send(`:bank: | Transfer approved!`);
                            await bot.bank.update(account);
                            await bot.bank.update(donor);
                        } else if (messages.first().content == 'Reject' || messages.first().content == 'reject') {
                            msg.channel.send(':bank: | Transfer rejected!');
                        } else {
                            msg.channel.send(`You've entered: **${messages.first().content}**\nTransfer failed; please try again.`);
                        }
                    }).catch(() => {
                        msg.channel.send(':bank: | ' + msg.author.username + "'s transfer request expired.");
                    })
                })
            } else {
                msg.reply(":exlamation: | " + target.toString() + " does not have sufficient bank account funds to donate!");
            }
        }
    }
};