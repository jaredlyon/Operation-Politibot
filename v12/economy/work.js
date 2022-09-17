var Discord = require('discord.js');

module.exports = {
    name: "work",
    permission: 1,
    main: async function(bot, msg) {
        let account = (await bot.bank.get(msg.author.id)) || {};
        let cooldowns = (await bot.cooldowns.get(msg.author.id)) || {};

        var successArray = [
            "You perform a day's labor for a man who picks you up in a van outside of Home Depot."
        ]
        var failArray = [
            "If you're seeing this, the code doesn't work."
        ]

        if (!cooldowns.lastWork || new Date() - new Date(cooldowns.lastWork) >= 7200000) {
            var eventRoll = Math.floor(Math.random() * 1);

            if (eventRoll == 0) {
                var eventHeader = successArray[Math.floor(Math.random() * successArray.length)];
                var reward = Math.floor(Math.random() * 1000) + 1;
                var eventDesc = "You are paid $" + reward + " for your services.";
                account.balance += reward;
                cooldowns.lastWork = new Date();
            } else if (eventRoll > 0) {
                var eventHeader = failArray[Math.floor(Math.random() * failArray.length)];
                var loss = Math.floor(Math.random() * 1000) + 1;
                var eventDesc = "You get fined $" + loss + "!";
                account.balance -= loss;
                cooldowns.lastWork = new Date();
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
            msg.channel.send(`:exclamation: | You still have to wait **${convert(new Date(), new Date(cooldowns.lastWork))}** to work, ` + msg.author.username + `!`);
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