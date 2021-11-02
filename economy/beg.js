var Discord = require('discord.js');

module.exports = {
    name: "beg",
    permission: 1,
    main: async function(bot, msg) {
        let account = (await bot.bank.get(msg.author.id)) || {};
        let cooldowns = (await bot.cooldowns.get(msg.author.id)) || {};

        var successArray = [
            "A passerby takes pity on you.",
            "Elon Musk notices you and decides to spread his wealth.",
            "Your plight resurrects Ronald Reagan, who trickles some wealth down into your beggar's cup.",
            "You cry for help, prompting Franklin D. Roosevelt to open a social program just for you.",
            "Your sudden, haggard appearance startles a rich couple with their young son. In terror, the wife drops her wallet before the group hastily walks off. You wonder if this will be that kid's superhero origin story.",
            "Abraham Lincoln stops to give you some aid before telling you about this great new theatrical production that he's about to go see.",
            "Joe Biden hands you come cash and tells you to keep your head up, because 'poor kids are just as smart as white kids'.",
        ]
        var failArray = [
            "A social worker takes notice and offers you an early withdrawal from your Roth IRA... but you're not old enough to qualify!",
            "You catch the attention of Herbert Hoover. He does nothing.",
            "Your anguish grabs the attention of Barack Obama, who moves to assist you but is cut off by Mitch McConnell. Damn you, Senate filibuster!",
            "Your painful cries fall onto the ears of Jimmy Carter, who's too old to hear you. Tough luck.",
            "A passerby hands you ***Trump: The Art of the Deal*** and tells you to get a job. Maybe you could sell the book for something?",
            "Jimmy Carter hands you a bag of peanuts.",
            "You catch Ray's attention, who tells you that he'll only help you if you take the AP United States History test. Oh, well.",
            "Elbridge Gerry stops to assist you; he redraws your congressional districts such that a candidate that supports more welfare spending might win next election. I guess that helps? You should probably vote this time around.",
            "You signal William Henry Harrison, who dies walking across the street towards you.",
            "You attract Richard Nixon, who promptly insists that he is 'not a crook' and did not take your money. He runs off when a man in a suit rounds the adjacent corner before giving you anything.",
            "You call your dashingly handsome friend John, heir to the Kennedy fortune, who tells you he'll hop in the convertible whip and drive across town to help you out. He doesn't show up.",
        ]

        if (!cooldowns.lastBeg || new Date() - new Date(cooldowns.lastBeg) >= 7200000) {
            var eventRoll = Math.floor(Math.random() * 10);

            if (eventRoll == 0) {
                var eventHeader = successArray[Math.floor(Math.random() * successArray.length)];
                var reward = Math.floor(Math.random() * 1000) + 1;
                var eventDesc = "You were rewarded with $" + reward + "!";
                account.balance += reward;
                cooldowns.lastBeg = new Date();
            } else if (eventRoll > 0) {
                var eventHeader = failArray[Math.floor(Math.random() * failArray.length)];
                //var loss = Math.floor(Math.random() * 1000) + 1;
                var eventDesc = "You weren't given any money."
                //account.balance -= loss;
                cooldowns.lastBeg = new Date();
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
            msg.channel.send(`:exclamation: | You still have to wait **${convert(new Date(), new Date(cooldowns.lastBeg))}** to beg, ` + msg.author.username + `!`);
        }
        
        function convert(d1, d2) {
            // console.log(d1);
            // console.log(d2);
            var t1 = d1.getTime();
            var t2 = d2.getTime();
            var duration = 7200000 - (t1 - t2);
        
            var milliseconds = parseInt((duration % 500) / 50),
                seconds = parseInt((duration / 500) % 60),
                minutes = parseInt((duration / (500 * 60)) % 60),
                hours = parseInt((duration / (500 * 60 * 60)) % 24);
        
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
        
            return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
        }
    }
}