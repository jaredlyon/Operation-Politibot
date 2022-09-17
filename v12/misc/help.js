var Discord = require('discord.js');

module.exports = {
    name: "help",
    permission: 1,
    main: function (bot, msg) {
        var help = new Discord.MessageEmbed()
            .setColor('#fafafa')
            .setTitle(`:robot:  Operation Politibot Commands  :robot:`)
            .setDescription(`Names, usage, and descriptions for each command available to Operation Politics members!`)
            .setThumbnail(`https://i.imgur.com/168cewt.jpg`)
            .setFooter(`If you have any questions about Operation Politibot and/or its development, DM 𝓻𝓪𝔂#4390`)
            .addFields(
                { name: `!panda`, value: `Embeds a random panda image in the chat.`},
                { name: `!pig`, value: `Embeds a random pig image in the chat.`},
                { name: `!podcast`, value: `Embeds podcast information in the chat.`},
                { name: `!ping`, value: `Pings the bot and reports response time.`},
                { name: `!balance <@user>`, value: `Check the wallet and bank balance of yourself or another user.`},
                { name: `!daily`, value: `Collects your daily allowance.`},
                { name: `!deposit <amount/all>`, value: `Deposits some or all of your money into your bank account.`},
                { name: `!withdraw <amount/all>`, value: `Withdraws some or all of your money from your bank account.`},
                { name: `!blackjack <amount>`, value: `Bet some money and play blackjack against the bot.`},
                { name: `!leaderboard`, value: `Embeds the banking leaderboard in the chat.`},
                { name: `!pay <@user> <amount>`, value: `Transfers an amount of money from your bank account into another user's account`},
                { name: `!request <@user> <amount>`, value: `Requests a bank transfer of an amount of money from another user's account into your own.`},
            );
        
        msg.channel.send(help);
    }
}