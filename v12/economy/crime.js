var Discord = require('discord.js');

module.exports = {
    name: "crime",
    permission: 1,
    main: async function(bot, msg) {
        let account = (await bot.bank.get(msg.author.id)) || {};
        let cooldowns = (await bot.cooldowns.get(msg.author.id)) || {};

        var successArray = [
            "You snatch a purse off of an old woman.",
            "You utilize an elaborate tax loophole and manage to short the IRS a couple dollars. Better hope they don't find out!",
            "You manage to pickpocket a passerby."
        ]
        var failArray = [
            "A police officer apprehends you in the act of petty larceny.",
            "You manage to hold up a convenience store, but you end up dropping and losing your wallet on the way home...",
            "You offer to act as a mule for a local gang, but they decide to beat you up and take your money!",
            "You try to pickpocket a passerby, but they grab your wrist and kick your ass instead."
        ]

        if (!cooldowns.lastCrime || new Date() - new Date(cooldowns.lastCrime) >= 7200000) {
            var eventRoll = Math.floor(Math.random() * 2);

            if (eventRoll == 0) {
                var eventHeader = successArray[Math.floor(Math.random() * successArray.length)];
                var reward = Math.floor(Math.random() * 1000) + 1;
                var eventDesc = "You retrieved $" + reward + "!";
                account.balance += reward;
                cooldowns.lastCrime = new Date();
            } else if (eventRoll > 0) {
                var eventHeader = failArray[Math.floor(Math.random() * failArray.length)];
                var loss = Math.floor(Math.random() * 1000) + 1;
                var eventDesc = "You lost $" + loss + "!";
                account.balance -= loss;
                cooldowns.lastCrime = new Date();
            }

            await bot.bank.update(account);
            await bot.cooldowns.update(cooldowns);

            var eventEmbed = new Discord.MessageEmbed()
                .setColor('#fafafa')
                .addField(eventHeader, eventDesc);
            
            msg.channel.send({
                embed: eventEmbed
            })
        } else {
            msg.channel.send(`:exclamation: | You still have to wait **${convert(new Date(), new Date(cooldowns.lastCrime))}** to go thieving, ` + msg.author.username + `!`);
        }
        
        function convert(d1, d2) {
            // console.log(d1);
            // console.log(d2);
            var t1 = d1.getTime();
            var t2 = d2.getTime();
            var duration = 7200000 - (t1 - t2);
        
            var milliseconds = parseInt((duration % 1000) / 50),
                seconds = parseInt((duration / 1000) % 60),
                minutes = parseInt((duration / (1000 * 60)) % 60),
                hours = parseInt((duration / (1000 * 60 * 60)) % 24);
        
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
        
            return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
        }
    }
}