module.exports = {
  name: 'balance',
  aliases: ['bal'],
  permission: 1,
  main: async function (bot, msg) {
    if (msg.mentions.users.first()) {
      var target = msg.mentions.users.first();
      let account = (await bot.bank.get(target.id)) || {};
      msg.channel.send(target.username + `'s balance is **$${account.balance}**!\nThey have **$${account.bank}** deposited in the bank.`);
    } else if (msg.mentions.users.first() == null) {
      let account = (await bot.bank.get(msg.author.id)) || {};
      msg.reply(`your balance is **$${account.balance}**!\nYou have **$${account.bank}** deposited in the bank.`);
    }
  }
};