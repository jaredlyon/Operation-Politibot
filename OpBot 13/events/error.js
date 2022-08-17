module.exports = {
	name: 'error',
	once: false,
	execute(client, err) {
		client.error(err);
	},
};