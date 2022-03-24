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

        //ideology counts by priority
        var communists = 0;
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

        //total ideology counts
        var communistsTot = 0;
        var socialistsTot = 0;
        var demSocsTot = 0;
        var progressivesTot = 0;
        var liberalsTot = 0;
        var moderateLiberalsTot = 0;
        var moderatesTot = 0;
        var moderateConservativesTot = 0;
        var conservativesTot = 0;
        var paleoconservativesTot = 0;
        var iLibertariansTot = 0;
        var natPopsTot = 0;
        var classicalRightsTot = 0;

        //count ideologies
        let ideologyCount = async() => {
            await bot.guilds.cache.get(target).members.cache.forEach(async member => {
                //by priority
                if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist')) {
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

                //Communist
                if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist')) {
                    moderateLiberals++;
                }
                if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist')) {
                    liberals++;
                }
                if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist')) {
                    progressives++;
                }
                if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist')) {
                    demSocs++;
                }
                if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist')) {
                    socialists++;
                }
                if (member.roles.cache.some(role => role.name === 'Communist')) {
                    communists++;
                }

                //by total
                if (member.roles.cache.some(role => role.name === 'Moderate')) {
                    moderatesTot++;
                }

                //right wing
                if (member.roles.cache.some(role => role.name === 'Moderate Conservative')) {
                    moderateConservativesTot++;
                }
                if (member.roles.cache.some(role => role.name === 'Conservative')) {
                    conservativesTot++;
                }
                if (member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                    paleoconservativesTot++;
                }
                if (member.roles.cache.some(role => role.name === 'Libertarian')) {
                    iLibertariansTot++;
                }
                if (member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                    natPopsTot++;
                }
                if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                    classicalRightsTot++;
                }

                //Communist
                if (member.roles.cache.some(role => role.name === 'Moderate Liberal')) {
                    moderateLiberalsTot++;
                }
                if (member.roles.cache.some(role => role.name === 'Liberal')) {
                    liberalsTot++;
                }
                if (member.roles.cache.some(role => role.name === 'Progressive')) {
                    progressivesTot++;
                }
                if (member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                    demSocsTot++;
                }
                if (member.roles.cache.some(role => role.name === 'Socialist')) {
                    socialistsTot++;
                }
                if (member.roles.cache.some(role => role.name === 'Communist')) {
                    communistsTot++;
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
        msg.channel.send("**Ideology Demographics by Priority (Total):**\nCommunists: " + communists + " (" + communistsTot + ")\nSocialists: " + socialists + " (" + socialistsTot + ")\nDemocratic-Socialists: " + demSocs + " (" + demSocsTot + ")\nProgressives: " + progressives + " (" + progressivesTot + ")\nLiberals: " + liberals + " (" + liberalsTot + ")\nModerate Liberals: " + moderateLiberals + " (" + moderateLiberalsTot + ")\nModerates: " + moderates + " (" + moderatesTot + ")\nModerate Conservatives: " + moderateConservatives + " (" + moderateConservativesTot + ")\nConservatives: " + conservatives + " (" + conservativesTot + ")\nPaleoconservatives: " + paleoconservatives + " (" + paleoconservativesTot + ")\nLibertarians: " + iLibertarians + " (" + iLibertariansTot + ")\nNational-Populists: " + natPops + " (" + natPopsTot + ")\nClassical Right: " + classicalRights + " (" + classicalRightsTot + ")");
    }
}