var Discord = require('discord.js');

module.exports = {
    name: "slut",
    permission: 1,
    main: async function(bot, msg) {
        let account = (await bot.bank.get(msg.author.id)) || {};
        let cooldowns = (await bot.cooldowns.get(msg.author.id)) || {};

        var successArray = [
            "You give a great performance for your client, who promptly pays you in cash and orders you out of the car."
        ]
        var failArray = [
            "Your client informs you that they are an undercover police officer. You wonder if sex work will ever be decriminalized as he handcuffs you..."
        ]

        if (!cooldowns.lastSlut || new Date() - new Date(cooldowns.lastSlut) >= 7200000) {
            var eventRoll = Math.floor(Math.random() * 2);

            if (eventRoll == 0) {
                var eventHeader = successArray[Math.floor(Math.random() * successArray.length)];
                var reward = Math.floor(Math.random() * 1000) + 1;
                var eventDesc = "You are paid $" + reward + " for your services. You dirty pig, you...";
                account.balance += reward;
                cooldowns.lastSlut = new Date();
            } else if (eventRoll > 0) {
                var eventHeader = failArray[Math.floor(Math.random() * failArray.length)];
                var loss = Math.floor(Math.random() * 1000) + 1;
                var eventDesc = "You get fined $" + loss + "!";
                account.balance -= loss;
                cooldowns.lastSlut = new Date();
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
            msg.channel.send(`:exclamation: | You still have to wait **${convert(new Date(), new Date(cooldowns.lastSlut))}** to sell your body, ` + msg.author.username + `!`);
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