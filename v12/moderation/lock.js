module.exports = {
    name: 'lock',
    permission: 2,
    main: async function (bot, msg) {
        //channel to lock down
        let channels = msg.guild.channels;
        let targetChannelID = msg.channel.id;
        let targetChannel = channels.cache.find(r => r.id === targetChannelID);

        //channel lockdown
        await targetChannel.updateOverwrite(msg.guild.id, { SEND_MESSAGES: false });

        msg.reply('channel locked! `!unlock` to unlock.')
    }
}