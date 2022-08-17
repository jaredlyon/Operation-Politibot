const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dbinit')
		.setDescription('Initializes the databases'),
	async execute(interaction) {
        const target = interaction.guild.id;
        //bank
        let funcB = async() => {
            bot.guilds.cache.get(target).members.cache.forEach(async member => {
                await bot.bank.insert({
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
            bot.guilds.cache.get(target).members.cache.forEach(async member => {
                await bot.streaks.insert({
                    id: member.user.id,
                    lastDaily: null,
                    streak: 0
                })
            })
        }
        funcSt()
        
        //cooldowns
        let funcCd = async() => {
            bot.guilds.cache.get(target).members.cache.forEach(async member => {
                await bot.cooldowns.insert({
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
            bot.guilds.cache.get(target).members.cache.forEach(async member => {
                await bot.trusted.insert({
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