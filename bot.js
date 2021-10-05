const Discord = require('discord.js');
const bot = new Discord.Client(require("./config.json").opts);
require('./funcs.js')(bot);
const readdir = require("fs").readdir;

bot.commands = new Discord.Collection();
bot.blackjackInProgress = new Set();
bot.work = new Boolean;
bot.work = false;

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

readdir('./events/', (err, files) => {
	bot.log(`Loading ${files.length} events!`);
	files.forEach(file => {
		bot.on(file.split(".")[0], (...args) => {
			require(`./events/${file}`).run(bot, ...args);
		});
	});
	bot.log(`Events loaded!`);
});

var restart;
bot.on('ready', () => {
	restart = bot.channels.cache.get('399746390793650177'); // Channel to send notification
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

bot.login(require("./config.json").token);