const { Client, Message, MessageEmbed, MessageButton } = require('discord.js');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { user } = require('../..');
const client = require('../..');

module.exports = {
	name: "dbinit",
    description: "Initializes the client databases",
    options: [],
	async execute(interaction) {
        const target = interaction.guild.id;
        //bank
        let funcB = async() => {
            client.guilds.cache.get(target).members.cache.forEach(async member => {
                await client.bank.insert({
                    id: member.user.id,
                    balance: 0,
                    bank: 500,
                    lastMessage: null,
                })
            })
        }        
        funcB()

        //streaks
        let funcSt = async() => {
            client.guilds.cache.get(target).members.cache.forEach(async member => {
                await client.streaks.insert({
                    id: member.user.id,
                    lastDaily: null,
                    streak: 0
                })
            })
        }
        funcSt()
        
        //cooldowns
        let funcCd = async() => {
            client.guilds.cache.get(target).members.cache.forEach(async member => {
                await client.cooldowns.insert({
                    id: member.user.id,
                    lastBeg: null,
                    lastCrime: null,
                    lastSlut: null,
                    lastWork: null
                })
            })
        }
        funcCd()

        //trusted member counts
        let funcTd = async() => {
            client.guilds.cache.get(target).members.cache.forEach(async member => {
                await client.trusted.insert({
                    id: member.user.id,
                    joinDate: member.joinedAt
                })
            })
        }
        funcTd()

        console.log("[RETHINK] | Databases initialized!");
        await interaction.reply("Database initialized! Godspeed, Mr. Chairman.")
	},
};