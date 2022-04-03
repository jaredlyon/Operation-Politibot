const { channel } = require('diagnostics_channel');
var Discord = require('discord.js');
const { off } = require('process');

module.exports = {
    name: 'lockdown',
    aliases: ['ld'],
    permission: 2,
    main: async function (bot, msg) {
        let channels = msg.guild.channels;
        let roles = msg.guild.roles; // these are collections! remember this you fucking idiot. don't try to call roles or channels

        let trustedRole = roles.cache.find(r => r.id === `775838439538425866`);
        let memberRole = roles.cache.find(r => r.id === `909989200378601472`);
        let unverRole = roles.cache.find(r => r.id === `909988798308433920`);

        //channels to lock down
        let generalChannel = channels.cache.find(r => r.id === '760275642150420523');
        let offTopicChannel = channels.cache.find(r => r.id === '775867278016118794');
        let philosophyChannel = channels.cache.find(r => r.id === '951322929898061905');
        let foodChannel = channels.cache.find(r => r.id === '949832728625422366');
        let botComChannel = channels.cache.find(r => r.id === '776539403819417634');
        let voiceChatChannel = channels.cache.find(r => r.id === '890376793201180692');
        let podcastChannel = channels.cache.find(r => r.id === '893228922441965638');
        let answersChannel = channels.cache.find(r => r.id === '760548440173314110');
        let memesChannel = channels.cache.find(r => r.id === '774763814889062442');
        let gameNightChannel = channels.cache.find(r => r.id === '854824056238112809');
        let debatesChannel = channels.cache.find(r => r.id === '775839512914952212');
        let internationalChannel = channels.cache.find(r => r.id === '928407503690149939');

        //channel lockdown
        await botComChannel.updateOverwrite(msg.guild.id, { SEND_MESSAGES: false });
        await generalChannel.updateOverwrite(msg.guild.id, { SEND_MESSAGES: false });
        await offTopicChannel.updateOverwrite(msg.guild.id, { SEND_MESSAGES: false });
        await philosophyChannel.updateOverwrite(msg.guild.id, { SEND_MESSAGES: false });
        await foodChannel.updateOverwrite(msg.guild.id, { SEND_MESSAGES: false });
        await voiceChatChannel.updateOverwrite(msg.guild.id, { SEND_MESSAGES: false });
        await podcastChannel.updateOverwrite(msg.guild.id, { SEND_MESSAGES: false });
        await answersChannel.updateOverwrite(msg.guild.id, { SEND_MESSAGES: false });
        await memesChannel.updateOverwrite(msg.guild.id, { SEND_MESSAGES: false });
        await gameNightChannel.updateOverwrite(msg.guild.id, { SEND_MESSAGES: false });
        await debatesChannel.updateOverwrite(msg.guild.id, { SEND_MESSAGES: false });
        await internationalChannel.updateOverwrite(msg.guild.id, { SEND_MESSAGES: false });

        msg.channel.send(`**Channels Locked:**\nGeneral\nOff-Topic\nDebates\nPhilosophy\nInternational-Politics\nBot-Commands\nVoice-Chat\nPodcast\nAnswers\nFood\nMemes\nGame Night`);
    }
}
