module.exports = {
  name: 'daily',
  aliases: ['dailies'],
  permission: 1,
  main: async function (bot, msg) {
    let account = (await bot.bank.get(msg.author.id)) || {};
    let streaks = (await bot.streaks.get(msg.author.id)) || {};

    if (!streaks.lastDaily) {
      account.balance += 50;
      streaks.lastDaily = new Date();
      await bot.bank.update(account);
      await bot.streaks.update(streaks);
      msg.channel.send(":dollar: | You have received your daily allowance of **$50**, " + msg.author.username + "!");
    } else if (new Date() - new Date(streaks.lastDaily) >= 86400000 && new Date() - new Date(streaks.lastDaily) <= 172800000) {
      streaks.streak += 1;
      account.balance += 50;
      await bot.streaks.update(streaks);
      account.balance += 10 * streaks.streak;
      streaks.lastDaily = new Date();
      await bot.bank.update(account);
      await bot.streaks.update(streaks);
      msg.channel.send(":dollar: | You have received your daily allowance of **$50**! You've also been given a bonus of **$" + 10 * streaks.streak + "** due to your **" + streaks.streak + "** day streak, " + msg.author.username + "!");
    } else if (new Date() - new Date(streaks.lastDaily) >= 86400000 && new Date() - new Date(streaks.lastDaily) >= 172800000 && streaks.streak >= 0) {
      var reset = streaks.streak;
      streaks.streak -= reset;
      account.balance += 50;
      streaks.lastDaily = new Date();
      await bot.bank.update(account);
      await bot.streaks.update(streaks);
      msg.channel.send(":dollar: | You have received your daily allowance of **$50**, but you unfortunately have lost your streak, " + msg.author.username + "!");
    } else if (new Date() - new Date(streaks.lastDaily) >= 86400000 && new Date() - new Date(streaks.lastDaily) >= 172800000 && streaks.streak == 0) {
      account.balance += 50;
      streaks.lastDaily = new Date();
      await bot.bank.update(account);
      await bot.streaks.update(streaks);
      msg.channel.send(":dollar: | You have received your daily allowance of **$50**, " + msg.author.username + "!");
    } else {
      msg.channel.send(`:exclamation: | Not so fast! You still have to wait **${convert(new Date(), new Date(streaks.lastDaily))}** to claim your daily allowance, ` + msg.author.username + `!`);
    }

    function convert(d1, d2) {
      // console.log(d1);
      // console.log(d2);
      var t1 = d1.getTime();
      var t2 = d2.getTime();
      var duration = 86400000 - (t1 - t2);

      var milliseconds = parseInt((duration % 500) / 50),
        seconds = parseInt((duration / 500) % 60),
        minutes = parseInt((duration / (500 * 60)) % 60),
        hours = parseInt((duration / (500 * 60 * 60)) % 24);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

      return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    }
  }
}