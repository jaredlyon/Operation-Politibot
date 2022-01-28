module.exports = {
    name: "demographics",
    permission: 2,
    main: async function (bot, msg) {
        const target = msg.guild.id;

        //party counts
        var democrats = 0;
        var republicans = 0;
        var greens = 0;
        var pLibertarians = 0;
        var others = 0;
        var independents = 0;

        //count party members
        let partyCount = async() => {
            await bot.guilds.cache.get(target).members.cache.forEach(async member => {
                if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                    democrats++;
                }
                if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                    republicans++;
                }
                if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                    greens++;
                }
                if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                    pLibertarians++;
                }
                if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                    others++;
                }
                if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                    independents++;
                }
            })
        }

        //ideology counts
        var leftWings = 0;
        var socialists = 0;
        var demSocs = 0;
        var progressives = 0;
        var liberals = 0;
        var moderateLiberals = 0;
        var moderates = 0;
        var moderateConservatives = 0;
        var conservatives = 0;
        var paleoconservatives = 0;
        var iLibertarians = 0;
        var natPops = 0;
        var classicalRights = 0;

        //count ideologies
        let ideologyCount = async() => {
            await bot.guilds.cache.get(target).members.cache.forEach(async member => {
                if (member.roles.cache.some(role => role.name === 'Moderate')) {
                    moderates++;
                }

                //right wing
                if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                    moderateConservatives++;
                }
                if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                    conservatives++;
                }
                if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                    paleoconservatives++;
                }
                if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                    iLibertarians++;
                }
                if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                    natPops++;
                }
                if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                    classicalRights++;
                }

                //left wing
                if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Left Wing')) {
                    moderateLiberals++;
                }
                if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Left Wing')) {
                    liberals++;
                }
                if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Left Wing')) {
                    progressives++;
                }
                if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Left Wing')) {
                    demSocs++;
                }
                if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Left Wing')) {
                    socialists++;
                }
                if (member.roles.cache.some(role => role.name === 'Left Wing')) {
                    leftWings++;
                }
            })
        }

        //member role counts
        var trustedMembers = 0;
        var members = 0;
        var unverifiedMembers = 0;

        //count members
        let memberCount = async() => {
            await bot.guilds.cache.get(target).members.cache.forEach(async member => {
                if (member.roles.cache.some(role => role.name === 'Trusted Member')) {
                    trustedMembers++;
                }
                if (member.roles.cache.some(role => role.name === 'Member')) {
                    members++;
                }
                if (member.roles.cache.some(role => role.name === 'Unverified Member')) {
                    unverifiedMembers++;
                }
            })
        }

        //regional role counts
        //america
        var southAtlantic = 0;
        var eastSouthCentral = 0;
        var westSouthCentral = 0;
        var newEngland = 0;
        var middleAtlantic = 0;
        var eastNorthCentral = 0;
        var westNorthCentral = 0;
        var mountain = 0;
        var pacific = 0;
        //europe
        var westernEurope = 0;
        var centralEurope = 0;
        var southernEurope = 0;
        var easternEurope = 0;
        var nordic = 0;
        var balkans = 0;
        //other
        var canada = 0;
        var centralAmerica = 0;
        var caribbean = 0;
        var southAmerica = 0;
        var middleEast = 0;
        var asia = 0;
        var oceania = 0;
        var africa = 0;


        //count regionals
        let regionalCount = async() => {
            await bot.guilds.cache.get(target).members.cache.forEach(async member => {
                if (member.roles.cache.some(role => role.name === 'South - South Atlantic')) {
                    southAtlantic++;
                }
                if (member.roles.cache.some(role => role.name === 'South - East South Central')) {
                    eastSouthCentral++;
                }
                if (member.roles.cache.some(role => role.name === 'South - West South Central')) {
                    westSouthCentral++;
                }
                if (member.roles.cache.some(role => role.name === 'Northeast - New England')) {
                    newEngland++;
                }
                if (member.roles.cache.some(role => role.name === 'Northeast - Middle Atlantic')) {
                    middleAtlantic++;
                }
                if (member.roles.cache.some(role => role.name === 'Midwest - East North Central')) {
                    eastNorthCentral++;
                }
                if (member.roles.cache.some(role => role.name === 'Midwest - West North Central')) {
                    westNorthCentral++;
                }
                if (member.roles.cache.some(role => role.name === 'West - Mountain')) {
                    mountain++;
                }
                if (member.roles.cache.some(role => role.name === 'West - Pacific')) {
                    pacific++;
                }
                if (member.roles.cache.some(role => role.name === 'Western Europe')) {
                    westernEurope++;
                }
                if (member.roles.cache.some(role => role.name === 'Central Europe')) {
                    centralEurope++;
                }
                if (member.roles.cache.some(role => role.name === 'Southern Europe')) {
                    southernEurope++;
                }
                if (member.roles.cache.some(role => role.name === 'Eastern Europe')) {
                    easternEurope++;
                }
                if (member.roles.cache.some(role => role.name === 'Nordic Countries')) {
                    nordic++;
                }
                if (member.roles.cache.some(role => role.name === 'Balkan Countries')) {
                    balkans++;
                }
                if (member.roles.cache.some(role => role.name === 'North America (Canada)')) {
                    canada++;
                }
                if (member.roles.cache.some(role => role.name === 'Central America')) {
                    centralAmerica++;
                }
                if (member.roles.cache.some(role => role.name === 'Caribbean')) {
                    caribbean++;
                }
                if (member.roles.cache.some(role => role.name === 'South America')) {
                    southAmerica++;
                }
                if (member.roles.cache.some(role => role.name === 'Middle East')) {
                    middleEast++;
                }
                if (member.roles.cache.some(role => role.name === 'Asia')) {
                    asia++;
                }
                if (member.roles.cache.some(role => role.name === 'Oceania')) {
                    oceania++;
                }
                if (member.roles.cache.some(role => role.name === 'Africa')) {
                    africa++;
                }
            })
        }


        //execute functions
        partyCount();
        ideologyCount();
        memberCount();
        regionalCount();

        //member counts
        msg.channel.send("**Member Count:**\nTrusted Members: " + trustedMembers + "\nMembers: " + members + "\nUnverified Members: " + unverifiedMembers);
        //regional counts
        msg.channel.send("**Regional Demographics:**\nSouth Atlantic: " + southAtlantic + "\nEast South Central: " + eastSouthCentral + "\nWest South Central: " + westSouthCentral + "\nNew England: " + newEngland + "\nMiddle Atlantic: " + middleAtlantic + "\nEast North Central: " + eastNorthCentral + "\nWest North Central: " + westNorthCentral + "\nMountain: " + mountain + "\nPacific: " + pacific + "\nWestern Europe: " + westernEurope + "\nCentral Europe: " + centralEurope + "\nSouthern Europe: " + southernEurope + "\nEastern Europe: " + easternEurope + "\nNordic Countries: " + nordic + "\nBalkan Countries: " + balkans + "\nNorth America (Canada): " + canada + "\nCentral America: " + centralAmerica + "\nCaribbean Countries: " + caribbean + "\nSouth America: " + southAmerica + "\nMiddle East: " + middleEast + "\nAsia: " + asia + "\nOceania: " + oceania + "\nAfrica: " + africa);
        //party
        msg.channel.send("**Party Demographics:**\nDemocrats: " + democrats + "\nRepublicans: " + republicans + "\nGreens: " + greens + "\nLibertarians: " + pLibertarians + "\nOther: " + others + "\nIndependents: " + independents);
        //ideology
        msg.channel.send("**Ideology Demographics:**\nLeft Wing: " + leftWings + "\nSocialists: " + socialists + "\nDemocratic-Socialists: " + demSocs + "\nProgressives: " + progressives + "\nLiberals: " + liberals + "\nModerate Liberals: " + moderateLiberals + "\nModerates: " + moderates + "\nModerate Conservatives: " + moderateConservatives + "\nConservatives: " + conservatives + "\nPaleoconservatives: " + paleoconservatives + "\nLibertarians: " + iLibertarians + "\nNational-Populists: " + natPops + "\nClassical Right: " + classicalRights);
    }
}