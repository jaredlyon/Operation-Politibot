const Discord = require('discord.js');
const bot = new Discord.Client(require("./config.json").opts);
require('./funcs.js')(bot);
const readdir = require("fs").readdir;

bot.commands = new Discord.Collection();
bot.blackjackInProgress = new Set();
bot.hotTopic = new Date();

readdir('./moderation/', (err, files) => {
	bot.log(`Loading ${files.length} moderation modules!`);
	files.forEach(fmoderation => {
		try {
			var name = require(`./moderation/${fmoderation}`).name
			bot.commands.set(name, require(`./moderation/${fmoderation}`));
		} catch (emoderation) {
			bot.log(`Unable to load command ${fmoderation}: ${emoderation}`);
		}
	});
	bot.log(`Moderation modules loaded!`);
});

readdir('./misc/', (err, files) => {
	bot.log(`Loading ${files.length} miscellaneous modules!`);
	files.forEach(fmisc => {
		try {
			var name = require(`./misc/${fmisc}`).name
			bot.commands.set(name, require(`./misc/${fmisc}`));
		} catch (emisc) {
			bot.log(`Unable to load command ${fmisc}: ${emisc}`);
		}
	});
	bot.log(`Miscellaneous modules loaded!`);
});

readdir('./economy/', (err, files) => {
	bot.log(`Loading ${files.length} economy modules!`);
	files.forEach(fcurr => {
		try {
			var name = require(`./economy/${fcurr}`).name
			bot.commands.set(name, require(`./economy/${fcurr}`));
		} catch (ecurr) {
			bot.log(`Unable to load command ${fcurr}: ${ecurr}`);
		}
	});
	bot.log(`economy modules loaded!`);
});

readdir('./events/', (err, files) => {
	bot.log(`Loading ${files.length} events!`);
	files.forEach(file => {
		bot.on(file.split(".")[0], (...args) => {
			require(`./events/${file}`).run(bot, ...args);
		});
	});
	bot.log(`Events loaded!`);
});

/**
//restart
var restart;
bot.on('ready', () => {
	restart = bot.channels.cache.get('895052490574270484'); // Channel to send notification
});

const TARGET_HOUR_R = 4;
const TARGET_MINUTE_R = 20;

setInterval(function () {
	var d2 = new Date();
	if (d2.getMinutes() !== TARGET_MINUTE_R || d2.getHours() !== TARGET_HOUR_R) return; // Return if current minute is not the notify minute
	setTimeout(function () {
		process.exit();
	}, 1000);
	restart.send("[AUTO RESTART] | OpBot successfully restarted!")
}, 60 * 1000); // Check every minute
*/


//spam resets
var filterReset;
bot.on('ready', () => {
	filterReset = bot.channels.cache.get('895052490574270484'); // Channel to send notification
});

const TARGET_HOUR = 0;
const TARGET_MINUTE = 1;

setInterval(function () {
	var d2 = new Date();
	if (d2.getMinutes() !== TARGET_MINUTE || d2.getHours() !== TARGET_HOUR) return; // Return if current minute is not the notify minute
	bot.users.cache.forEach(user => {
		if (!bot.autoMute[user.id] && !user.bot) {
			bot.autoMute[user.id] = {
				spamCount: 0,
				filterCount: 0
			}
		}
		if (bot.autoMute[user.id]) {
			bot.autoMute[user.id].spamCount = 0;
			bot.autoMute[user.id].filterCount = 0;
		}
	})
	filterReset.send("[SPAM FILTERS] | Cache cleared!")
}, 60 * 1000); // Check every minute


//6h bump reminder
var bump;
bot.on('ready', () => {
	bump = bot.channels.cache.get('886728064086708234'); // Channel to send notification
});

//anti spam
const usersMap = new Map();
const LIMIT = 5;
const DIFF = 5000;

bot.on('message', async(msg) => {
	if (msg.author.bot) return;
	
	if (usersMap.has(msg.author.id)) {
		const userData = usersMap.get(msg.author.id);
		const { lastMessage, timer } = userData;
		const difference = msg.createdTimestamp - lastMessage.createdTimestamp;
		let msgCount = userData.msgCount;
		console.log(difference);

		if (difference > DIFF) {
			clearTimeout(timer);
			console.log('[SPAM] | Reset Spam Timer');
			userData.msgCount = 1;
			userData.lastMessage = msg;
			userData.timer = setTimeout(() => {
				usersMap.delete(msg.author.id);
				console.log('[SPAM] | User removed from map!')
			}, DIFF);
			usersMap.set(msg.author.id, userData)
		} else {
			++msgCount;
			if(parseInt(msgCount) === LIMIT) {

			msg.reply("Warning: Spam filter triggered!");
			msg.channel.bulkDelete(LIMIT);

			bot.autoMute[msg.author.id].spamCount++;

			if (bot.autoMute[msg.author.id].spamCount == 3) {
				bot.autoMute[msg.author.id].spamCount = 0;

				var log = msg.guild.channels.cache.get(bot.config.logChannel);
				let role = msg.guild.roles.cache.get("849498583102914581");
				var userID = msg.author.id;
				let member = msg.guild.members.cache.get(userID);
				member.roles.add(role);

				setTimeout(function() {
                    member.roles.remove(role);
                }, 10 * 60000);
	
				var mute = new Discord.MessageEmbed()
					.setAuthor(member.user.username, member.user.avatarURL())
					.addField('Member auto-muted (10 mins):', `**:mute: ${member} (${member.id}).**`)
					.addField('Reason:', 'Triggered spam filter excessively.')
					.setFooter(bot.user.username, bot.user.avatarURL())
					.setTimestamp()
					.setColor("#992D22");
				
				msg.channel.send({
					embed: mute
				});
				log.send({
					embed: mute
				});
				log.send("<@&893189360105689139> <@&854841000480079882> <@&927318500614225920> <@&895051017828311100> **Auto-Mute triggered!!**");
			}
			
			} else {
				userData.msgCount = msgCount;
				usersMap.set(msg.author.id, userData);
			}
		}
	} else {
		let fn = setTimeout(() => {
			usersMap.delete(msg.author.id);
			console.log('[SPAM] | User removed from map!')
		}, DIFF);
		usersMap.set(msg.author.id, {
			msgCount: 1,
			lastMessage : msg,
			timer : fn
		});
	}
})

var bumpReminder = new Discord.MessageEmbed()
    .setColor('#fafafa')
    .setTitle('<:upvote:877990048438550538>  Bump Reminder!')
    .setDescription('Its time to bump the server! See the links below:')
    .addFields(
        { name: '<:discordme:899100819926974485> Discord.me', value: 'https://discord.me/operationpolitics - Every 6h' },
        { name: '<:disboard:899100807562133554> Disboard', value: 'https://disboard.org/server/760275642150420520 - use !d bump'},
        { name: '<:discords:899100797571317830> Discords.com', value: 'https://discords.com/servers/operationpolitics - Every 6h'},
        { name: '<:topgg:899100785902755841> Top.gg', value: 'https://top.gg/servers/760275642150420520 - every 12h'},
        { name: '<:discordservers:899100776364933180> DiscordServers', value: 'https://discordservers.com/server/760275642150420520/bump - every 12h'},
    )
    .setFooter(`If any site is down or the links don't work, let other bumpers know!`);

const TARGET_HOUR_B1 = 2;
const TARGET_MINUTE_B1 = 00;

setInterval(function () {
	var d2 = new Date();
	if (d2.getMinutes() !== TARGET_MINUTE_B1 || d2.getHours() !== TARGET_HOUR_B1) return; // Return if current minute is not the notify minute
	bump.send('<@&886727925674676264>')
	bump.send(bumpReminder)
}, 60 * 1000); // Check every minute

const TARGET_HOUR_B2 = 8;
const TARGET_MINUTE_B2 = 00;

setInterval(function () {
	var d2 = new Date();
	if (d2.getMinutes() !== TARGET_MINUTE_B2 || d2.getHours() !== TARGET_HOUR_B2) return; // Return if current minute is not the notify minute
	bump.send('<@&886727925674676264>')
	bump.send(bumpReminder)
}, 60 * 1000); // Check every minute

const TARGET_HOUR_B3 = 14;
const TARGET_MINUTE_B3 = 00;

setInterval(function () {
	var d2 = new Date();
	if (d2.getMinutes() !== TARGET_MINUTE_B3 || d2.getHours() !== TARGET_HOUR_B3) return; // Return if current minute is not the notify minute
	bump.send('<@&886727925674676264>')
	bump.send(bumpReminder)
}, 60 * 1000); // Check every minute

const TARGET_HOUR_B4 = 20;
const TARGET_MINUTE_B4 = 00;

setInterval(function () {
	var d2 = new Date();
	if (d2.getMinutes() !== TARGET_MINUTE_B4 || d2.getHours() !== TARGET_HOUR_B4) return; // Return if current minute is not the notify minute
	bump.send('<@&886727925674676264>')
	bump.send(bumpReminder)
}, 60 * 1000); // Check every minute

bot.login(require("./config.json").token);