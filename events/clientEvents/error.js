module.exports = {
	name: 'error',
	execute(client, err) {
		client.error(err);
	},
};