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

        let mainrole = roles.cache.find(r => r.id === `<@&775838439538425866>`);

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
            mainrole,
            { 'SEND_MESSAGES': false },
        )
        //#off-topic-and-shitposting channel lockdown
        offtopicchannel.overwritePermissions(
            mainrole,
            { 'SEND_MESSAGES': false },
        )
        //botcomchannel lockdown
        botcomchannel.overwritePermissions(
            mainrole,
            { 'SEND_MESSAGES': false },
        )
        //voice chat channel lockdown
        voicechatchannel.overwritePermissions(
            mainrole,
            { 'SEND_MESSAGES': false },
        )
        //podcast channel lockdown
        podcastchannel.overwritePermissions(
            mainrole,
            { 'SEND_MESSAGES': false },
        )
        //answers channel lockdown
        answerschannel.overwritePermissions(
            mainrole,
            { 'SEND_MESSAGES': false },
        )
        //memes channel lockdown
        memeschannel.overwritePermissions(
            mainrole,
            { 'SEND_MESSAGES': false },
        )
        //gamenight channel lockdown
        gamenightchannel.overwritePermissions(
            mainrole,
            { 'SEND_MESSAGES': false },
        )
    }
}
