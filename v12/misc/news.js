module.exports = {
    name: "news",
    permission: 4,
    main: function (bot, msg) {
        var newsChannel = msg.guild.channels.cache.get('775837560651120640');

        newsChannel.send({
            embed: {
              color: 3447003,
              author: {
                name: "Twitter accepts Elon Musk’s buyout deal",
                url: 'https://www.cnbc.com/2022/04/25/twitter-accepts-elon-musks-buyout-deal.html',
            },
              description: "*“Twitter, Inc. (NYSE: TWTR) today announced that it has entered into a definitive agreement to be acquired by an entity wholly owned by Elon Musk, for $54.20 per share in cash in a transaction valued at approximately $44 billion. Upon completion of the transaction, Twitter will become a privately held company.\nUnder the terms of the agreement, Twitter stockholders will receive $54.20 in cash for each share of Twitter common stock that they own upon closing of the proposed transaction. The purchase price represents a 38% premium to Twitter’s closing stock price on April 1, 2022, which was the last trading day before Mr. Musk disclosed his approximately 9% stake in Twitter.\nBret Taylor, Twitter’s Independent Board Chair, said, “The Twitter Board conducted a thoughtful and comprehensive process to assess Elon’s proposal with a deliberate focus on value, certainty, and financing. The proposed transaction will deliver a substantial cash premium, and we believe it is the best path forward for Twitter’s stockholders.”*",
              timestamp: new Date(),
            }
        });
    }
}