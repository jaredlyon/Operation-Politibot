const { channel } = require('diagnostics_channel');
var Discord = require('discord.js');
const { off } = require('process');

module.exports = {
    name: 'lockdown',
    aliases: ['lock', 'ld'],
    permission: 2,
    main: function (bot, msg) {
        let channels = message.guild.channels;
        let roles = message.guild.roles; // these are collections! remember this you fucking idiot. don't try to call roles or channels

        let trustedrole = roles.cache.find(r => r.id === `<@&775838439538425866>`);
        let memberrole = roles.cache.find(r => r.id === `<@&909989200378601472>`);
        let unverrole = roles.cache.find(r => r.id === `<@&909988798308433920>`);

        //channels to lock down
        let generalchannel = channels.cache.find(r => r.id === '<#760275642150420523>')
        let offtopicchannel = channels.cache.find(r => r.id === '<#775867278016118794>')
        let botcomchannel = channels.cache.find(r => r.id === '<#776539403819417634>')
        let voicechatchannel = channels.cache.find(r => r.id === '<#890376793201180692>')
        let podcastchannel = channels.cache.find(r => r.id === '<#893228922441965638>')
        let answerschannel = channels.cache.find(r => r.id === '<#760548440173314110>')
        let memeschannel = channels.cache.find(r => r.id === '<#774763814889062442>')
        let gamenightchannel = channels.cache.find(r => r.id === '<#854824056238112809>')

        //general channel lockdown
        generalchannel.overwritePermissions(
            trustedrole,
            { 'SEND_MESSAGES': true },
            memberrole,
            { 'SEND_MESSAGES': true },
        )
        //#off-topic-and-shitposting channel lockdown
        offtopicchannel.overwritePermissions(
            trustedrole,
            { 'SEND_MESSAGES': true },
            memberrole,
            { 'SEND_MESSAGES': true },
        )
        //botcomchannel lockdown
        botcomchannel.overwritePermissions(
            trustedrole,
            { 'SEND_MESSAGES': true },
            memberrole,
            { 'SEND_MESSAGES': true },
        )
        //voice chat channel lockdown
        voicechatchannel.overwritePermissions(
            trustedrole,
            { 'SEND_MESSAGES': true },
            memberrole,
            { 'SEND_MESSAGES': true },
        )
        //podcast channel lockdown
        podcastchannel.overwritePermissions(
            trustedrole,
            { 'SEND_MESSAGES': true },
            memberrole,
            { 'SEND_MESSAGES': true },
        )
        //answers channel lockdown
        answerschannel.overwritePermissions(
            trustedrole,
            { 'SEND_MESSAGES': true },
            memberrole,
            { 'SEND_MESSAGES': true },
        )
        //memes channel lockdown
        memeschannel.overwritePermissions(
            trustedrole,
            { 'SEND_MESSAGES': true },
            memberrole,
            { 'SEND_MESSAGES': true },
        )
        //gamenight channel lockdown
        gamenightchannel.overwritePermissions(
            trustedrole,
            { 'SEND_MESSAGES': true },
            memberrole,
            { 'SEND_MESSAGES': true },
        )
    }
}
