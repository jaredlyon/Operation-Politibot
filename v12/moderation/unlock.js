module.exports = {
    name: 'unlock',
    permission: 2,
    main: async function (bot, msg) {
        //channel to lock down
        let channels = msg.guild.channels;
        let targetChannelID = msg.channel.id;
        let targetChannel = channels.cache.find(r => r.id === targetChannelID);

        //channel lockdown
        await targetChannel.updateOverwrite(msg.guild.id, { SEND_MESSAGES: true });

        msg.reply('channel unlocked!')
    }
}