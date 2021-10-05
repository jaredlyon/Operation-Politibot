exports.run = async (bot, msg) => {
	bot.config = require('../config.json');
	bot.awaitConsoleInput();
	await bot.startDatabase();

	bot.user.setPresence({ status: 'online', activity: { name: 'politics | !help', type: 0 } });
	//bot.user.setPresence({ status: 'online', activity: { name: "It's not delivery, it's DiBjorno", type: 0 } });

	bot.log(`${bot.user.username} is online and ready to serve in ${bot.channels.cache.size} channels on ${bot.guilds.cache.size} servers!`);
}