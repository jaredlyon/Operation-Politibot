module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		client.config = require('../config.json');
		client.syncLogs();
		client.syncCaseNum();
		client.syncAutoMute();
		client.syncMsgCount();
		await client.startDatabase();
	
		client.user.setPresence({ status: 'online', activity: { name: 'politics | !help', type: 0 } });
	
		console.log(`${client.user.username} is online and ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers!`);
	},
};