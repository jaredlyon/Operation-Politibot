module.exports = {
	name: 'warn',
	once: false,
	execute(bot, err) {
		client.warn(err);
	},
};