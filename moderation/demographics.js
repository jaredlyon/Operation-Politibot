module.exports = {
    name: "demographics",
    permission: 2,
    main: async function (bot, msg) {
        const target = msg.guild.id;
        var input = msg.content.split(' ').splice(0)[0];
        if (input === "!demographics" || input === null) {
            //party counts
            var democrats = 0;
            var republicans = 0;
            var greens = 0;
            var pLibertarians = 0;
            var others = 0;
            var independents = 0;

            //count party members
            let partyCount = async () => {
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
            let ideologyCount = async () => {
                await bot.guilds.cache.get(target).members.cache.forEach(async member => {
                    //by priority
                    if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist')) {
                        moderates++;
                    }

                    //right wing
                    if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal')) {
                        moderateConservatives++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive')) {
                        conservatives++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                        paleoconservatives++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist')) {
                        iLibertarians++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist')) {
                        natPops++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                        classicalRights++;
                    }

                    //Communist
                    if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                        moderateLiberals++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                        liberals++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                        progressives++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                        demSocs++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
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
            var total = msg.guild.memberCount;

            //count members
            let memberCount = async () => {
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
            let regionalCount = async () => {
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
            msg.channel.send("**Member Count:**\nTrusted Members: " + trustedMembers + "\nMembers: " + members + "\nUnverified Members: " + unverifiedMembers + "\nTotal Member Count: " + total);
            //regional counts
            msg.channel.send("**Regional Demographics:**\nSouth Atlantic: " + southAtlantic + "\nEast South Central: " + eastSouthCentral + "\nWest South Central: " + westSouthCentral + "\nNew England: " + newEngland + "\nMiddle Atlantic: " + middleAtlantic + "\nEast North Central: " + eastNorthCentral + "\nWest North Central: " + westNorthCentral + "\nMountain: " + mountain + "\nPacific: " + pacific + "\nWestern Europe: " + westernEurope + "\nCentral Europe: " + centralEurope + "\nSouthern Europe: " + southernEurope + "\nEastern Europe: " + easternEurope + "\nNordic Countries: " + nordic + "\nBalkan Countries: " + balkans + "\nNorth America (Canada): " + canada + "\nCentral America: " + centralAmerica + "\nCaribbean Countries: " + caribbean + "\nSouth America: " + southAmerica + "\nMiddle East: " + middleEast + "\nAsia: " + asia + "\nOceania: " + oceania + "\nAfrica: " + africa);
            //party
            msg.channel.send("**Party Demographics:**\nDemocrats: " + democrats + "\nRepublicans: " + republicans + "\nGreens: " + greens + "\nLibertarians: " + pLibertarians + "\nOther: " + others + "\nIndependents: " + independents);
            //ideology
            msg.channel.send("**Ideology Demographics by Priority (Total):**\nCommunists: " + communists + " (" + communistsTot + ")\nSocialists: " + socialists + " (" + socialistsTot + ")\nDemocratic-Socialists: " + demSocs + " (" + demSocsTot + ")\nProgressives: " + progressives + " (" + progressivesTot + ")\nLiberals: " + liberals + " (" + liberalsTot + ")\nModerate Liberals: " + moderateLiberals + " (" + moderateLiberalsTot + ")\nModerates: " + moderates + " (" + moderatesTot + ")\nModerate Conservatives: " + moderateConservatives + " (" + moderateConservativesTot + ")\nConservatives: " + conservatives + " (" + conservativesTot + ")\nPaleoconservatives: " + paleoconservatives + " (" + paleoconservativesTot + ")\nLibertarians: " + iLibertarians + " (" + iLibertariansTot + ")\nNational-Populists: " + natPops + " (" + natPopsTot + ")\nClassical Right: " + classicalRights + " (" + classicalRightsTot + ")");
        } else if (input === "religion") {
            var other = 0;
            var syncretism = 0;
            var sikh = 0;
            var protestant = 0;
            var pagan = 0;
            var orthodox = 0;
            var nonreligious = 0;
            var muslim = 0;
            var mormon = 0;
            var christian = 0;
            var jewish = 0;
            var catholic = 0;
            var hindu = 0;
            var buddhist = 0;
            var atheist = 0;
            var agnostic = 0;

            let religionCount = async () => {
                await bot.guilds.cache.get(target).members.cache.forEach(async member => {
                    if (member.roles.cache.some(role => role.name === 'Agnostic')) {
                        agnostic++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Atheist')) {
                        atheist++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Buddhist')) {
                        buddhist++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Hindu')) {
                        hindu++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Catholic')) {
                        catholic++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Jewish')) {
                        jewish++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Christian')) {
                        christian++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Mormon')) {
                        mormon++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Muslim')) {
                        muslim++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Non-religious')) {
                        nonreligious++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Orthodox')) {
                        orthodox++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Pagan')) {
                        pagan++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Protestant')) {
                        protestant++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Sikh')) {
                        sikh++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Syncretism')) {
                        syncretism++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Other Religion')) {
                        other++;
                    }
                })
            }


            //execute function
            religionCount();

            //member count
            msg.channel.send("**Religious Role Count:**\nAgnostics: " + agnostic + "\nAtheists: " + atheist + "\nBuddhists: " + buddhist + "\nHindus: " + hindu + "\nCatholics: " + catholic + "\nJewish: " + jewish + "\nChristians: " + christian + "\nMuslims: " + muslim + "\nMormons: " + mormon + "\nNon-religious: " + nonreligious + "\nOrthodox: " + orthodox + "\nPagans: " + pagan + "\nProtestants: " + protestant + "\nSikhs: " + sikh + "\nSyncretists: " + syncretism + "\nOther Religious: " + other);

        } else if (input === "foreign" || input === "foreign policy") {
            var regionalists = 0;
            var isolationists = 0;
            var imperialists = 0
            var marxists = 0;
            var constructivists = 0;
            var liberalists = 0;
            var realists = 0;

            let foreignCount = async () => {
                await bot.guilds.cache.get(target).members.cache.forEach(async member => {
                    if (member.roles.cache.some(role => role.name === 'Realism')) {
                        realists++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Liberalism')) {
                        liberalists++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Constructivism')) {
                        constructivists++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Marxist Foreign Policy')) {
                        marxists++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Imperialism')) {
                        imperialists++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Isolationism')) {
                        isolationists++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Regionalism')) {
                        regionalists++;
                    }
                })
            }

            foreignCount();

            msg.channel.send("**Foreign Policy Role Count:**\nRegionalists: " + regionalists + "\nIsolationists: " + isolationists + "\nImperialists: " + imperialists + "\nMarxists: " + marxists + "\nConstructivists: " + constructivists + "\nLiberalists: " + liberalists + "\nRealists: " + realists);

        } else if (input === "economic" || input === "economic policy") {
            var mixed = 0;
            var lazyFair = 0;
            var keynesian = 0;
            var corporatist = 0;
            var socialist = 0;
            var marxist = 0;
            var capitalist = 0;

            let economicCount = async () => {
                await bot.guilds.cache.get(target).members.cache.forEach(async member => {
                    if (member.roles.cache.some(role => role.name === 'Mixed Economics')) {
                        mixed++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Laissez-Faire Economics')) {
                        lazyFair++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Keynesian Economics')) {
                        keynesian++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Corporatist Economics')) {
                        corporatist++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Socialist Economics')) {
                        socialist++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Marxist Economics')) {
                        marxist++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Capitalist Economics')) {
                        capitalist++;
                    }
                })
            }

            economicCount();

            msg.channel.send("**Economic Policy Role Count:**\nMixed Economics: " + mixed + "\nLaissez-Faire Economics: " + lazyFair + "\nKeynesian Economics: " + keynesian + "\nCorporatist Economics: " + corporatist + "\nSocialist Economics: " + socialist + "\nMarxist Economics: " + marxist + "\nCapitalist Economics: " + capitalist);

        } else if (input === "other" || input === "other ideology roles") {
            var utilitarianism = 0;
            var collectivism = 0;
            var individualism = 0;
            var skepticism = 0;
            var traditionalist = 0;
            var reactionary = 0;
            var environmentalist = 0;
            var monarchist = 0;
            var anarchist = 0;
            var patriotism = 0;
            var nationalist = 0;
            var populist = 0;
            var apolitical = 0;

            let otherCount = async () => {
                await bot.guilds.cache.get(target).members.cache.forEach(async member => {
                    if (member.roles.cache.some(role => role.name === 'Utilitarianism')) {
                        utilitarianism++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Collectivism')) {
                        collectivism++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Individualism')) {
                        individualism++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Skepticism')) {
                        skepticism++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Traditionalist')) {
                        traditionalist++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Reactionary')) {
                        reactionary++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Environmentalist')) {
                        environmentalist++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Monarchist')) {
                        monarchist++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Anarchist')) {
                        anarchist++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Patriotism')) {
                        patriotism++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Nationalist')) {
                        nationalist++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Populist')) {
                        populist++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Apolitical')) {
                        apolitical++;
                    }
                })
            }

            otherCount();

            msg.channel.send("**Other Ideological Role Count:**\nUtilitarianism: " + utilitarianism + "\nCollectivism: " + collectivism + "\nIndividualism: " + individualism + "\nSkepticism: " + skepticism + "\nTraditionalist: " + traditionalist + "\nReactionariy " + reactionary + "\nEnvironmentalist: " + environmentalist + "\nMonarchist: " + monarchist + "\nAnarchist: " + anarchist + "\nPatriotism: " + patriotism + "\nNationalist: " + nationalist + "\nPopulist: " + populist + "\nApolitical: " + apolitical);

        } else if (input === "political" || input === "political stance roles") {
            var antiMilitary = 0;
            var proMilitary = 0;
            var proHealth = 0;
            var lgbtq = 0;
            var police = 0;
            var proImmigrationReform = 0;
            var proImmigration = 0;
            var antiImmigration = 0;
            var proGunReform = 0;
            var proGun = 0;
            var antiGun = 0;
            var proChoice = 0;
            var proLife = 0;

            let poliCount = async () => {
                await bot.guilds.cache.get(target).members.cache.forEach(async member => {
                    if (member.roles.cache.some(role => role.name === 'Anti-Military')) {
                        antiMilitary++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Pro-Military')) {
                        proMilitary++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Pro Healthcare Reform')) {
                        proHealth++;
                    }
                    if (member.roles.cache.some(role => role.name === 'LGBTQ Rights')) {
                        lgbtq++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Police Reform')) {
                        police++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Pro Immigration Reform')) {
                        proImmigrationReform++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Pro-Immigration')) {
                        proImmigration++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Anti-Immigration')) {
                        antiImmigration++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Pro Gun Reform')) {
                        proGunReform++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Pro-Gun')) {
                        proGun++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Anti-Gun')) {
                        antiGun++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Pro-Choice')) {
                        proChoice++;
                    }
                    if (member.roles.cache.some(role => role.name === 'Pro-Life')) {
                        proLife++;
                    }
                })
            }

            poliCount();

            msg.channel.send(`**__Political Stance Roles:__**\n**Military:**\n${proMilitary} Pro / ${antiMilitary} Anti\n**Healthcare:**\n${proHealth} Pro Healthcare Reform\n**LGBTQ Rights:**\n${lgbtq} Pro LGBTQ Rights\n**Police:**\n${police} Pro Police Reform\n**Immigration:**\n${proImmigrationReform} Pro Immigration Reform\n${proImmigration} Pro / ${antiImmigration} Anti\n**Guns:**\n${proGunReform} Pro Gun Reform\n${proGun} Pro / ${antiGun} Anti\n**Abortion:**\n${proChoice} Pro-Choice / ${proLife} Pro-Life`);

        } else if (input === "regideologies" || input === "regional ideologies") {

            var southAtlanticCommunist = 0;
            var southAtlanticSocialist = 0;
            var southAtlanticDemsoc = 0;
            var southAtlanticProg = 0;
            var southAtlanticLib = 0;
            var southAtlanticModLib = 0;
            var southAtlanticMod = 0;
            var southAtlanticModCon = 0;
            var southAtlanticCon = 0;
            var southAtlanticLibert = 0;
            var southAtlanticPaleoCon = 0;
            var southAtlanticNatPop = 0;
            var southAtlanticClassicalRight = 0;
            var southAtlanticDem = 0;
            var southAtlanticRep = 0;
            var southAtlanticGreen = 0;
            var southAtlanticLibertarian = 0;
            var southAtlanticOther = 0;
            var southAtlanticInd = 0;

            var southEastCentralCommunist = 0;
            var southEastCentralSocialist = 0;
            var southEastCentralDemsoc = 0;
            var southEastCentralProg = 0;
            var southEastCentralLib = 0;
            var southEastCentralModLib = 0;
            var southEastCentralMod = 0;
            var southEastCentralModCon = 0;
            var southEastCentralCon = 0;
            var southEastCentralLibert = 0;
            var southEastCentralPaleoCon = 0;
            var southEastCentralNatPop = 0;
            var southEastCentralClassicalRight = 0;
            var southEastCentralDem = 0;
            var southEastCentralRep = 0;
            var southEastCentralGreen = 0;
            var southEastCentralLibertarian = 0;
            var southEastCentralOther = 0;
            var southEastCentralInd = 0;

            var southWestCentralCommunist = 0;
            var southWestCentralSocialist = 0;
            var southWestCentralDemsoc = 0;
            var southWestCentralProg = 0;
            var southWestCentralLib = 0;
            var southWestCentralModLib = 0;
            var southWestCentralMod = 0;
            var southWestCentralModCon = 0;
            var southWestCentralCon = 0;
            var southWestCentralLibert = 0;
            var southWestCentralPaleoCon = 0;
            var southWestCentralNatPop = 0;
            var southWestCentralClassicalRight = 0;
            var southWestCentralDem = 0;
            var southWestCentralRep = 0;
            var southWestCentralGreen = 0;
            var southWestCentralLibertarian = 0;
            var southWestCentralOther = 0;
            var southWestCentralInd = 0;

            var newEnglandCommunist = 0;
            var newEnglandSocialist = 0;
            var newEnglandDemsoc = 0;
            var newEnglandProg = 0;
            var newEnglandLib = 0;
            var newEnglandModLib = 0;
            var newEnglandMod = 0;
            var newEnglandModCon = 0;
            var newEnglandCon = 0;
            var newEnglandLibert = 0;
            var newEnglandPaleoCon = 0;
            var newEnglandNatPop = 0;
            var newEnglandClassicalRight = 0;
            var newEnglandDem = 0;
            var newEnglandRep = 0;
            var newEnglandGreen = 0;
            var newEnglandLibertarian = 0;
            var newEnglandOther = 0;
            var newEnglandInd = 0;

            var midAtlanticCommunist = 0;
            var midAtlanticSocialist = 0;
            var midAtlanticDemsoc = 0;
            var midAtlanticProg = 0;
            var midAtlanticLib = 0;
            var midAtlanticModLib = 0;
            var midAtlanticMod = 0;
            var midAtlanticModCon = 0;
            var midAtlanticCon = 0;
            var midAtlanticLibert = 0;
            var midAtlanticPaleoCon = 0;
            var midAtlanticNatPop = 0;
            var midAtlanticClassicalRight = 0;
            var midAtlanticDem = 0;
            var midAtlanticRep = 0;
            var midAtlanticGreen = 0;
            var midAtlanticLibertarian = 0;
            var midAtlanticOther = 0;
            var midAtlanticInd = 0;

            var EastNorthCentralCommunist = 0;
            var EastNorthCentralSocialist = 0;
            var EastNorthCentralDemsoc = 0;
            var EastNorthCentralProg = 0;
            var EastNorthCentralLib = 0;
            var EastNorthCentralModLib = 0;
            var EastNorthCentralMod = 0;
            var EastNorthCentralModCon = 0;
            var EastNorthCentralCon = 0;
            var EastNorthCentralLibert = 0;
            var EastNorthCentralPaleoCon = 0;
            var EastNorthCentralNatPop = 0;
            var EastNorthCentralClassicalRight = 0;
            var EastNorthCentralDem = 0;
            var EastNorthCentralRep = 0;
            var EastNorthCentralGreen = 0;
            var EastNorthCentralLibertarian = 0;
            var EastNorthCentralOther = 0;
            var EastNorthCentralInd = 0;

            var WestNorthCentralCommunist = 0;
            var WestNorthCentralSocialist = 0;
            var WestNorthCentralDemsoc = 0;
            var WestNorthCentralProg = 0;
            var WestNorthCentralLib = 0;
            var WestNorthCentralModLib = 0;
            var WestNorthCentralMod = 0;
            var WestNorthCentralModCon = 0;
            var WestNorthCentralCon = 0;
            var WestNorthCentralLibert = 0;
            var WestNorthCentralPaleoCon = 0;
            var WestNorthCentralNatPop = 0;
            var WestNorthCentralClassicalRight = 0;
            var WestNorthCentralDem = 0;
            var WestNorthCentralRep = 0;
            var WestNorthCentralGreen = 0;
            var WestNorthCentralLibertarian = 0;
            var WestNorthCentralOther = 0;
            var WestNorthCentralInd = 0;

            var pacMountainCommunist = 0;
            var pacMountainSocialist = 0;
            var pacMountainDemsoc = 0;
            var pacMountainProg = 0;
            var pacMountainLib = 0;
            var pacMountainModLib = 0;
            var pacMountainMod = 0;
            var pacMountainModCon = 0;
            var pacMountainCon = 0;
            var pacMountainLibert = 0;
            var pacMountainPaleoCon = 0;
            var pacMountainNatPop = 0;
            var pacMountainClassicalRight = 0;
            var pacMountainDem = 0;
            var pacMountainRep = 0;
            var pacMountainGreen = 0;
            var pacMountainLibertarian = 0;
            var pacMountainOther = 0;
            var pacMountainInd = 0;

            var pacCoastCommunist = 0;
            var pacCoastSocialist = 0;
            var pacCoastDemsoc = 0;
            var pacCoastProg = 0;
            var pacCoastLib = 0;
            var pacCoastModLib = 0;
            var pacCoastMod = 0;
            var pacCoastModCon = 0;
            var pacCoastCon = 0;
            var pacCoastLibert = 0;
            var pacCoastPaleoCon = 0;
            var pacCoastNatPop = 0;
            var pacCoastClassicalRight = 0;
            var pacCoastDem = 0;
            var pacCoastRep = 0;
            var pacCoastGreen = 0;
            var pacCoastLibertarian = 0;
            var pacCoastOther = 0;
            var pacCoastInd = 0;

            var europeWestCommunist = 0;
            var europeWestSocialist = 0;
            var europeWestDemsoc = 0;
            var europeWestProg = 0;
            var europeWestLib = 0;
            var europeWestModLib = 0;
            var europeWestMod = 0;
            var europeWestModCon = 0;
            var europeWestCon = 0;
            var europeWestLibert = 0;
            var europeWestPaleoCon = 0;
            var europeWestNatPop = 0;
            var europeWestClassicalRight = 0;
            var europeWestDem = 0;
            var europeWestRep = 0;
            var europeWestGreen = 0;
            var europeWestLibertarian = 0;
            var europeWestOther = 0;
            var europeWestInd = 0;

            var europeCentralCommunist = 0;
            var europeCentralSocialist = 0;
            var europeCentralDemsoc = 0;
            var europeCentralProg = 0;
            var europeCentralLib = 0;
            var europeCentralModLib = 0;
            var europeCentralMod = 0;
            var europeCentralModCon = 0;
            var europeCentralCon = 0;
            var europeCentralLibert = 0;
            var europeCentralPaleoCon = 0;
            var europeCentralNatPop = 0;
            var europeCentralClassicalRight = 0;
            var europeCentralDem = 0;
            var europeCentralRep = 0;
            var europeCentralGreen = 0;
            var europeCentralLibertarian = 0;
            var europeCentralOther = 0;
            var europeCentralInd = 0;

            var europeSouthCommunist = 0;
            var europeSouthSocialist = 0;
            var europeSouthDemsoc = 0;
            var europeSouthProg = 0;
            var europeSouthLib = 0;
            var europeSouthModLib = 0;
            var europeSouthMod = 0;
            var europeSouthModCon = 0;
            var europeSouthCon = 0;
            var europeSouthLibert = 0;
            var europeSouthPaleoCon = 0;
            var europeSouthNatPop = 0;
            var europeSouthClassicalRight = 0;
            var europeSouthDem = 0;
            var europeSouthRep = 0;
            var europeSouthGreen = 0;
            var europeSouthLibertarian = 0;
            var europeSouthOther = 0;
            var europeSouthInd = 0;

            var europeEastCommunist = 0;
            var europeEastSocialist = 0;
            var europeEastDemsoc = 0;
            var europeEastProg = 0;
            var europeEastLib = 0;
            var europeEastModLib = 0;
            var europeEastMod = 0;
            var europeEastModCon = 0;
            var europeEastCon = 0;
            var europeEastLibert = 0;
            var europeEastPaleoCon = 0;
            var europeEastNatPop = 0;
            var europeEastClassicalRight = 0;
            var europeEastDem = 0;
            var europeEastRep = 0;
            var europeEastGreen = 0;
            var europeEastLibertarian = 0;
            var europeEastOther = 0;
            var europeEastInd = 0;

            var europeNordicCommunist = 0;
            var europeNordicSocialist = 0;
            var europeNordicDemsoc = 0;
            var europeNordicProg = 0;
            var europeNordicLib = 0;
            var europeNordicModLib = 0;
            var europeNordicMod = 0;
            var europeNordicModCon = 0;
            var europeNordicCon = 0;
            var europeNordicLibert = 0;
            var europeNordicPaleoCon = 0;
            var europeNordicNatPop = 0;
            var europeNordicClassicalRight = 0;
            var europeNordicDem = 0;
            var europeNordicRep = 0;
            var europeNordicGreen = 0;
            var europeNordicLibertarian = 0;
            var europeNordicOther = 0;
            var europeNordicInd = 0;

            var europeBalkanCommunist = 0;
            var europeBalkanSocialist = 0;
            var europeBalkanDemsoc = 0;
            var europeBalkanProg = 0;
            var europeBalkanLib = 0;
            var europeBalkanModLib = 0;
            var europeBalkanMod = 0;
            var europeBalkanModCon = 0;
            var europeBalkanCon = 0;
            var europeBalkanLibert = 0;
            var europeBalkanPaleoCon = 0;
            var europeBalkanNatPop = 0;
            var europeBalkanClassicalRight = 0;
            var europeBalkanDem = 0;
            var europeBalkanRep = 0;
            var europeBalkanGreen = 0;
            var europeBalkanLibertarian = 0;
            var europeBalkanOther = 0;
            var europeBalkanInd = 0;

            var canadaCommunist = 0;
            var canadaSocialist = 0;
            var canadaDemsoc = 0;
            var canadaProg = 0;
            var canadaLib = 0;
            var canadaModLib = 0;
            var canadaMod = 0;
            var canadaModCon = 0;
            var canadaCon = 0;
            var canadaLibert = 0;
            var canadaPaleoCon = 0;
            var canadaNatPop = 0;
            var canadaClassicalRight = 0;
            var canadaDem = 0;
            var canadaRep = 0;
            var canadaGreen = 0;
            var canadaLibertarian = 0;
            var canadaOther = 0;
            var canadaInd = 0;

            var centralAmCommunist = 0;
            var centralAmSocialist = 0;
            var centralAmDemsoc = 0;
            var centralAmProg = 0;
            var centralAmLib = 0;
            var centralAmModLib = 0;
            var centralAmMod = 0;
            var centralAmModCon = 0;
            var centralAmCon = 0;
            var centralAmLibert = 0;
            var centralAmPaleoCon = 0;
            var centralAmNatPop = 0;
            var centralAmClassicalRight = 0;
            var centralAmDem = 0;
            var centralAmRep = 0;
            var centralAmGreen = 0;
            var centralAmLibertarian = 0;
            var centralAmOther = 0;
            var centralAmInd = 0;

            var caribbeanCommunist = 0;
            var caribbeanSocialist = 0;
            var caribbeanDemsoc = 0;
            var caribbeanProg = 0;
            var caribbeanLib = 0;
            var caribbeanModLib = 0;
            var caribbeanMod = 0;
            var caribbeanModCon = 0;
            var caribbeanCon = 0;
            var caribbeanLibert = 0;
            var caribbeanPaleoCon = 0;
            var caribbeanNatPop = 0;
            var caribbeanClassicalRight = 0;
            var caribbeanDem = 0;
            var caribbeanRep = 0;
            var caribbeanGreen = 0;
            var caribbeanLibertarian = 0;
            var caribbeanOther = 0;
            var caribbeanInd = 0;

            var southAmCommunist = 0;
            var southAmSocialist = 0;
            var southAmDemsoc = 0;
            var southAmProg = 0;
            var southAmLib = 0;
            var southAmModLib = 0;
            var southAmMod = 0;
            var southAmModCon = 0;
            var southAmCon = 0;
            var southAmLibert = 0;
            var southAmPaleoCon = 0;
            var southAmNatPop = 0;
            var southAmClassicalRight = 0;
            var southAmDem = 0;
            var southAmRep = 0;
            var southAmGreen = 0;
            var southAmLibertarian = 0;
            var southAmOther = 0;
            var southAmInd = 0;

            var middleEastCommunist = 0;
            var middleEastSocialist = 0;
            var middleEastDemsoc = 0;
            var middleEastProg = 0;
            var middleEastLib = 0;
            var middleEastModLib = 0;
            var middleEastMod = 0;
            var middleEastModCon = 0;
            var middleEastCon = 0;
            var middleEastLibert = 0;
            var middleEastPaleoCon = 0;
            var middleEastNatPop = 0;
            var middleEastClassicalRight = 0;
            var middleEastDem = 0;
            var middleEastRep = 0;
            var middleEastGreen = 0;
            var middleEastLibertarian = 0;
            var middleEastOther = 0;
            var middleEastInd = 0;

            var AsiaCommunist = 0;
            var AsiaSocialist = 0;
            var AsiaDemsoc = 0;
            var AsiaProg = 0;
            var AsiaLib = 0;
            var AsiaModLib = 0;
            var AsiaMod = 0;
            var AsiaModCon = 0;
            var AsiaCon = 0;
            var AsiaLibert = 0;
            var AsiaPaleoCon = 0;
            var AsiaNatPop = 0;
            var AsiaClassicalRight = 0;
            var AsiaDem = 0;
            var AsiaRep = 0;
            var AsiaGreen = 0;
            var AsiaLibertarian = 0;
            var AsiaOther = 0;
            var AsiaInd = 0;

            var OceaniaCommunist = 0;
            var OceaniaSocialist = 0;
            var OceaniaDemsoc = 0;
            var OceaniaProg = 0;
            var OceaniaLib = 0;
            var OceaniaModLib = 0;
            var OceaniaMod = 0;
            var OceaniaModCon = 0;
            var OceaniaCon = 0;
            var OceaniaLibert = 0;
            var OceaniaPaleoCon = 0;
            var OceaniaNatPop = 0;
            var OceaniaClassicalRight = 0;
            var OceaniaDem = 0;
            var OceaniaRep = 0;
            var OceaniaGreen = 0;
            var OceaniaLibertarian = 0;
            var OceaniaOther = 0;
            var OceaniaInd = 0;

            var AfricaCommunist = 0;
            var AfricaSocialist = 0;
            var AfricaDemsoc = 0;
            var AfricaProg = 0;
            var AfricaLib = 0;
            var AfricaModLib = 0;
            var AfricaMod = 0;
            var AfricaModCon = 0;
            var AfricaCon = 0;
            var AfricaLibert = 0;
            var AfricaPaleoCon = 0;
            var AfricaNatPop = 0;
            var AfricaClassicalRight = 0;
            var AfricaDem = 0;
            var AfricaRep = 0;
            var AfricaGreen = 0;
            var AfricaLibertarian = 0;
            var AfricaOther = 0;
            var AfricaInd = 0;

            //count ideologies
            let regionalIdeologies = async () => {
                await bot.guilds.cache.get(target).members.cache.forEach(async member => {
                    if (member.roles.cache.some(role => role.name === 'South - South Atlantic')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            southAtlanticCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            southAtlanticSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            southAtlanticDemsoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            southAtlanticProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            southAtlanticLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            southAtlanticModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            southAtlanticMod++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal')) {
                            southAtlanticModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive')) {
                            southAtlanticCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                            southAtlanticPaleoCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist')) {
                            southAtlanticLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist')) {
                            southAtlanticNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            southAtlanticClassicalRight++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                            southAtlanticDem++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                            southAtlanticRep++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                            southAtlanticGreen++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                            southAtlanticLibertarian++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                            southAtlanticOther++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                            southAtlanticInd++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === 'South - East South Central')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            southEastCentralCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            southEastCentralSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            southEastCentralDemsoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            southEastCentralProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            southEastCentralLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            southEastCentralModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            southEastCentralMod++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal')) {
                            southEastCentralModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive')) {
                            southEastCentralCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                            southEastCentralPaleoCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist')) {
                            southEastCentralLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist')) {
                            southEastCentralNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            southEastCentralClassicalRight++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                            southEastCentralDem++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                            southEastCentralRep++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                            southEastCentralGreen++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                            southEastCentralLibertarian++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                            southEastCentralOther++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                            southEastCentralInd++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === 'South - West South Central')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            southWestCentralCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            southWestCentralSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            southWestCentralDemsoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            southWestCentralProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            southWestCentralLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            southWestCentralModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            southWestCentralMod++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal')) {
                            southWestCentralModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive')) {
                            southWestCentralCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                            southWestCentralPaleoCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist')) {
                            southWestCentralLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist')) {
                            southWestCentralNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            southWestCentralClassicalRight++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                            southWestCentralDem++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                            southWestCentralRep++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                            southWestCentralGreen++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                            southWestCentralLibertarian++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                            southWestCentralOther++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                            southWestCentralInd++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === 'Northeast - New England')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            newEnglandCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            newEnglandSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            newEnglandDemsoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            newEnglandProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            newEnglandLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            newEnglandModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            newEnglandMod++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal')) {
                            newEnglandModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive')) {
                            newEnglandCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                            newEnglandPaleoCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist')) {
                            newEnglandLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist')) {
                            newEnglandNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            newEnglandClassicalRight++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                            newEnglandDem++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                            newEnglandRep++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                            newEnglandGreen++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                            newEnglandLibertarian++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                            newEnglandOther++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                            newEnglandInd++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === 'Northeast - Middle Atlantic')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            midAtlanticCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            midAtlanticSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            midAtlanticDemsoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            midAtlanticProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            midAtlanticLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            midAtlanticModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            midAtlanticMod++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal')) {
                            midAtlanticModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive')) {
                            midAtlanticCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                            midAtlanticPaleoCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist')) {
                            midAtlanticLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist')) {
                            midAtlanticNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            midAtlanticClassicalRight++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                            midAtlanticDem++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                            midAtlanticRep++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                            midAtlanticGreen++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                            midAtlanticLibertarian++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                            midAtlanticOther++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                            midAtlanticInd++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === 'Midwest - East North Central')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            EastNorthCentralCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            EastNorthCentralSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            EastNorthCentralDemsoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            EastNorthCentralProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            EastNorthCentralLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            EastNorthCentralModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            EastNorthCentralMod++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal')) {
                            EastNorthCentralModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive')) {
                            EastNorthCentralCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                            EastNorthCentralPaleoCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist')) {
                            EastNorthCentralLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist')) {
                            EastNorthCentralNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            EastNorthCentralClassicalRight++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                            EastNorthCentralDem++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                            EastNorthCentralRep++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                            EastNorthCentralGreen++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                            EastNorthCentralLibertarian++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                            EastNorthCentralOther++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                            EastNorthCentralInd++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === 'Midwest - West North Central')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            WestNorthCentralCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            WestNorthCentralSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            WestNorthCentralDemsoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            WestNorthCentralProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            WestNorthCentralLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            WestNorthCentralModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            WestNorthCentralMod++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal')) {
                            WestNorthCentralModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive')) {
                            WestNorthCentralCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                            WestNorthCentralPaleoCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist')) {
                            WestNorthCentralLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist')) {
                            WestNorthCentralNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            WestNorthCentralClassicalRight++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                            WestNorthCentralDem++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                            WestNorthCentralRep++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                            WestNorthCentralGreen++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                            WestNorthCentralLibertarian++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                            WestNorthCentralOther++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                            WestNorthCentralInd++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === 'West - Mountain')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            pacMountainCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            pacMountainSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            pacMountainDemsoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            pacMountainProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            pacMountainLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            pacMountainModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            pacMountainMod++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal')) {
                            pacMountainModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive')) {
                            pacMountainCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                            pacMountainPaleoCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist')) {
                            pacMountainLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist')) {
                            pacMountainNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            pacMountainClassicalRight++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                            pacMountainDem++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                            pacMountainRep++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                            pacMountainGreen++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                            pacMountainLibertarian++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                            pacMountainOther++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                            pacMountainInd++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === 'West - Pacific')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            pacCoastCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            pacCoastSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            pacCoastDemsoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            pacCoastProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            pacCoastLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            pacCoastModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            pacCoastMod++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal')) {
                            pacCoastModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive')) {
                            pacCoastCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                            pacCoastPaleoCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist')) {
                            pacCoastLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist')) {
                            pacCoastNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            pacCoastClassicalRight++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                            pacCoastDem++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                            pacCoastRep++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                            pacCoastGreen++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                            pacCoastLibertarian++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                            pacCoastOther++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                            pacCoastInd++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === 'Western Europe')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            europeWestCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            europeWestSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            europeWestDemsoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            europeWestProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            europeWestLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            europeWestModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            europeWestMod++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal')) {
                            europeWestModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive')) {
                            europeWestCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                            europeWestPaleoCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist')) {
                            europeWestLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist')) {
                            europeWestNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            europeWestClassicalRight++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                            europeWestDem++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                            europeWestRep++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                            europeWestGreen++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                            europeWestLibertarian++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                            europeWestOther++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                            europeWestInd++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === 'Central Europe')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            europeCentralCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            europeCentralSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            europeCentralDemsoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            europeCentralProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            europeCentralLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            europeCentralModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            europeCentralMod++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal')) {
                            europeCentralModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive')) {
                            europeCentralCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                            europeCentralPaleoCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist')) {
                            europeCentralLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist')) {
                            europeCentralNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            europeCentralClassicalRight++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                            europeCentralDem++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                            europeCentralRep++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                            europeCentralGreen++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                            europeCentralLibertarian++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                            europeCentralOther++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                            europeCentralInd++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === 'Southern Europe')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            europeSouthCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            europeSouthSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            europeSouthDemsoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            europeSouthProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            europeSouthLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            europeSouthModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            europeSouthMod++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal')) {
                            europeSouthModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive')) {
                            europeSouthCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                            europeSouthPaleoCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist')) {
                            europeSouthLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist')) {
                            europeSouthNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            europeSouthClassicalRight++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                            europeSouthDem++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                            europeSouthRep++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                            europeSouthGreen++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                            europeSouthLibertarian++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                            europeSouthOther++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                            europeSouthInd++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === 'Eastern Europe')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            europeEastCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            europeEastSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            europeEastDemsoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            europeEastProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            europeEastLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            europeEastModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            europeEastMod++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal')) {
                            europeEastModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive')) {
                            europeEastCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                            europeEastPaleoCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist')) {
                            europeEastLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist')) {
                            europeEastNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            europeEastClassicalRight++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                            europeEastDem++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                            europeEastRep++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                            europeEastGreen++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                            europeEastLibertarian++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                            europeEastOther++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                            europeEastInd++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === 'Nordic Countries')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            europeNordicCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            europeNordicSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            europeNordicDemsoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            europeNordicProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            europeNordicLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            europeNordicModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            europeNordicMod++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal')) {
                            europeNordicModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive')) {
                            europeNordicCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                            europeNordicPaleoCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist')) {
                            europeNordicLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist')) {
                            europeNordicNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            europeNordicClassicalRight++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                            europeNordicDem++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                            europeNordicRep++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                            europeNordicGreen++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                            europeNordicLibertarian++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                            europeNordicOther++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                            europeNordicInd++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === 'Balkan Countries')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            europeBalkanCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            europeBalkanSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            europeBalkanDemsoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            europeBalkanProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            europeBalkanLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            europeBalkanModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            europeBalkanMod++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal')) {
                            europeBalkanModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive')) {
                            europeBalkanCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                            europeBalkanPaleoCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist')) {
                            europeBalkanLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist')) {
                            europeBalkanNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            europeBalkanClassicalRight++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                            europeBalkanDem++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                            europeBalkanRep++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                            europeBalkanGreen++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                            europeBalkanLibertarian++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                            europeBalkanOther++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                            europeBalkanInd++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === 'North America (Canada)')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            canadaCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            canadaSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            canadaDemsoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            canadaProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            canadaLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            canadaModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            canadaMod++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal')) {
                            canadaModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive')) {
                            canadaCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                            canadaPaleoCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist')) {
                            canadaLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist')) {
                            canadaNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            canadaClassicalRight++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                            canadaDem++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                            canadaRep++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                            canadaGreen++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                            canadaLibertarian++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                            canadaOther++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                            canadaInd++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === 'Central America')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            centralAmCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            centralAmSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            centralAmDemsoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            centralAmProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            centralAmLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            centralAmModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            centralAmMod++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal')) {
                            centralAmModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive')) {
                            centralAmCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                            centralAmPaleoCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist')) {
                            centralAmLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist')) {
                            centralAmNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            centralAmClassicalRight++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                            centralAmDem++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                            centralAmRep++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                            centralAmGreen++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                            centralAmLibertarian++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                            centralAmOther++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                            centralAmInd++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === 'Caribbean')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            caribbeanCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            caribbeanSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            caribbeanDemsoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            caribbeanProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            caribbeanLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            caribbeanModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            caribbeanMod++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal')) {
                            caribbeanModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive')) {
                            caribbeanCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                            caribbeanPaleoCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist')) {
                            caribbeanLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist')) {
                            caribbeanNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            caribbeanClassicalRight++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                            caribbeanDem++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                            caribbeanRep++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                            caribbeanGreen++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                            caribbeanLibertarian++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                            caribbeanOther++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                            caribbeanInd++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === 'Middle East')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            middleEastCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            middleEastSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            middleEastDemsoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            middleEastProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            middleEastLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            middleEastModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            middleEastMod++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal')) {
                            middleEastModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive')) {
                            middleEastCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                            middleEastPaleoCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist')) {
                            middleEastLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist')) {
                            middleEastNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            middleEastClassicalRight++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                            middleEastDem++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                            middleEastRep++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                            middleEastGreen++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                            middleEastLibertarian++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                            middleEastOther++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                            middleEastInd++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === 'Asia')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            AsiaCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            AsiaSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            AsiaDemsoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            AsiaProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            AsiaLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            AsiaModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            AsiaMod++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal')) {
                            AsiaModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive')) {
                            AsiaCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                            AsiaPaleoCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist')) {
                            AsiaLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist')) {
                            AsiaNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            AsiaClassicalRight++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                            AsiaDem++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                            AsiaRep++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                            AsiaGreen++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                            AsiaLibertarian++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                            AsiaOther++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                            AsiaInd++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === 'Oceania')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            OceaniaCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            OceaniaSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            OceaniaDemsoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            OceaniaProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            OceaniaLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            OceaniaModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            OceaniaMod++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal')) {
                            OceaniaModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive')) {
                            OceaniaCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                            OceaniaPaleoCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist')) {
                            OceaniaLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist')) {
                            OceaniaNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            OceaniaClassicalRight++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                            OceaniaDem++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                            OceaniaRep++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                            OceaniaGreen++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                            OceaniaLibertarian++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                            OceaniaOther++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                            OceaniaInd++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === 'Africa')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            AfricaCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            AfricaSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            AfricaDemsoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            AfricaProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            AfricaLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            AfricaModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            AfricaMod++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Liberal')) {
                            AfricaModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Progressive')) {
                            AfricaCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist')) {
                            AfricaPaleoCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'National-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Socialist')) {
                            AfricaLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Communist')) {
                            AfricaNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            AfricaClassicalRight++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                            AfricaDem++;
                        }
                        if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                            AfricaRep++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                            AfricaGreen++;
                        }
                        if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                            AfricaLibertarian++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                            AfricaOther++;
                        }
                        if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                            AfricaInd++;
                        }
                    }
                })
            }

            //execute functions
            regionalIdeologies();

            msg.channel.send("**__Regional Ideology Counts__**\n**South - South Atlantic:**\n*Communist:* " + southAtlanticCommunist + "\n*Socialist:* " + southAtlanticSocialist + "\n*Democratic-Socialist:* " + southAtlanticDemsoc + "\n*Progressive:* " + southAtlanticProg + "\n*Liberal:* " + southAtlanticLib + "\n*Moderate Liberal:* " + southAtlanticModLib + "\n*Moderate:* " + southAtlanticMod + "\n*Moderate Conservative:* " + southAtlanticModCon + "\n*Conservative:* " + southAtlanticCon + "\n*Paleoconservative:* " + southAtlanticPaleoCon + "\n*Libertarian:* " + southAtlanticLibert + "\n*Nationalist-Populist:* " + southAtlanticNatPop + "\n*Classical Right:* " + southAtlanticClassicalRight + "\n**South - South East Central:**\n*Communist:* " + southEastCentralCommunist + "\n*Socialist:* " + southEastCentralSocialist + "\n*Democratic-Socialist:* " + southEastCentralDemsoc + "\n*Progressive:* " + southEastCentralProg + "\n*Liberal:* " + southEastCentralLib + "\n*Moderate Liberal:* " + southEastCentralModLib + "\n*Moderate:* " + southEastCentralMod + "\n*Moderate Conservative:* " + southEastCentralModCon + "\n*Conservative:* " + southEastCentralCon + "\n*Paleoconservative:* " + southEastCentralPaleoCon + "\n*Libertarian:* " + southEastCentralLibert + "\n*Nationalist-Populist:* " + southEastCentralNatPop + "\n*Classical Right:* " + southEastCentralClassicalRight + "\n**South - South West Central:**\n*Communist:* " + southWestCentralCommunist + "\n*Socialist:* " + southWestCentralSocialist + "\n*Democratic-Socialist:* " + southWestCentralDemsoc + "\n*Progressive:* " + southWestCentralProg + "\n*Liberal:* " + southWestCentralLib + "\n*Moderate Liberal:* " + southWestCentralModLib + "\n*Moderate:* " + southWestCentralMod + "\n*Moderate Conservative:* " + southWestCentralModCon + "\n*Conservative:* " + southWestCentralCon + "\n*Paleoconservative:* " + southWestCentralPaleoCon + "\n*Libertarian:* " + southWestCentralLibert + "\n*Nationalist-Populist:* " + southWestCentralNatPop + "\n*Classical Right:* " + southWestCentralClassicalRight + "\n**Northeast - New England:**\n*Communist:* " + newEnglandCommunist + "\n*Socialist:* " + newEnglandSocialist + "\n*Democratic-Socialist:* " + newEnglandDemsoc + "\n*Progressive:* " + newEnglandProg + "\n*Liberal:* " + newEnglandLib + "\n*Moderate Liberal:* " + newEnglandModLib + "\n*Moderate:* " + newEnglandMod + "\n*Moderate Conservative:* " + newEnglandModCon + "\n*Conservative:* " + newEnglandCon + "\n*Paleoconservative:* " + newEnglandPaleoCon + "\n*Libertarian:* " + newEnglandLibert + "\n*Nationalist-Populist:* " + newEnglandNatPop + "\n*Classical Right:* " + newEnglandClassicalRight + "\n**Northeast - Mid Atlantic:**\n*Communist:* " + midAtlanticCommunist + "\n*Socialist:* " + midAtlanticSocialist + "\n*Democratic-Socialist:* " + midAtlanticDemsoc + "\n*Progressive:* " + midAtlanticProg + "\n*Liberal:* " + midAtlanticLib + "\n*Moderate Liberal:* " + midAtlanticModLib + "\n*Moderate:* " + midAtlanticMod + "\n*Moderate Conservative:* " + midAtlanticModCon + "\n*Conservative:* " + midAtlanticCon + "\n*Paleoconservative:* " + midAtlanticPaleoCon + "\n*Libertarian:* " + midAtlanticLibert + "\n*Nationalist-Populist:* " + midAtlanticNatPop + "\n*Classical Right:* " + midAtlanticClassicalRight + "\n**Midwest - East North Central:**\n*Communist:* " + EastNorthCentralCommunist + "\n*Socialist:* " + EastNorthCentralSocialist + "\n*Democratic-Socialist:* " + EastNorthCentralDemsoc + "\n*Progressive:* " + EastNorthCentralProg + "\n*Liberal:* " + EastNorthCentralLib + "\n*Moderate Liberal:* " + EastNorthCentralModLib + "\n*Moderate:* " + EastNorthCentralMod + "\n*Moderate Conservative:* " + EastNorthCentralModCon + "\n*Conservative:* " + EastNorthCentralCon + "\n*Paleoconservative:* " + EastNorthCentralPaleoCon + "\n*Libertarian:* " + EastNorthCentralLibert + "\n*Nationalist-Populist:* " + EastNorthCentralNatPop + "\n*Classical Right:* " + EastNorthCentralClassicalRight);

            msg.channel.send("**Midwest - West North Central:**\n*Communist:* " + WestNorthCentralCommunist + "\n*Socialist:* " + WestNorthCentralSocialist + "\n*Democratic-Socialist:* " + WestNorthCentralDemsoc + "\n*Progressive:* " + WestNorthCentralProg + "\n*Liberal:* " + WestNorthCentralLib + "\n*Moderate Liberal:* " + WestNorthCentralModLib + "\n*Moderate:* " + WestNorthCentralMod + "\n*Moderate Conservative:* " + WestNorthCentralCon + "\n*Conservative:* " + WestNorthCentralModCon + "\n*Paleoconservative:* " + WestNorthCentralPaleoCon + "\n*Libertarian:* " + WestNorthCentralLibert + "\n*Nationalist-Populist:* " + WestNorthCentralNatPop + "\n*Classical Right:* " + WestNorthCentralClassicalRight + "\n**West - Mountain:**\n*Communist:* " + pacMountainCommunist + "\n*Socialist:* " + pacMountainSocialist + "\n*Democratic-Socialist:* " + pacMountainDemsoc + "\n*Progressive:* " + pacMountainProg + "\n*Liberal:* " + pacMountainLib + "\n*Moderate Liberal:* " + pacMountainModLib + "\n*Moderate:* " + pacMountainMod + "\n*Moderate Conservative:* " + pacMountainModCon + "\n*Conservative:* " + pacMountainCon + "\n*Paleoconservative:* " + pacMountainPaleoCon + "\n*Libertarian:* " + pacMountainLibert + "\n*Nationalist-Populist:* " + pacMountainNatPop + "\n*Classical Right:* " + pacMountainClassicalRight + "\n**West - Pacific:**\n*Communist:* " + pacCoastCommunist + "\n*Socialist:* " + pacCoastSocialist + "\n*Democratic-Socialist:* " + pacCoastDemsoc + "\n*Progressive:* " + pacCoastProg + "\n*Liberal:* " + pacCoastLib + "\n*Moderate Liberal:* " + pacCoastModLib + "\n*Moderate:* " + pacCoastMod + "\n*Moderate Conservative:* " + pacCoastModCon + "\n*Conservative:* " + pacCoastCon + "\n*Paleoconservative:* " + pacCoastPaleoCon + "\n*Libertarian:* " + pacCoastLibert + "\n*Nationalist-Populist:* " + pacCoastNatPop + "\n*Classical Right:* " + pacCoastClassicalRight + "\n**Western Europe:**\n*Communist:* " + europeWestCommunist + "\n*Socialist:* " + europeWestSocialist + "\n*Democratic-Socialist:* " + europeWestDemsoc + "\n*Progressive:* " + europeWestProg + "\n*Liberal:* " + europeWestLib + "\n*Moderate Liberal:* " + europeWestModLib + "\n*Moderate:* " + europeWestMod + "\n*Moderate Conservative:* " + europeWestModCon + "\n*Conservative:* " + europeWestCon + "\n*Paleoconservative:* " + europeWestPaleoCon + "\n*Libertarian:* " + europeWestLibert + "\n*Nationalist-Populist:* " + europeWestNatPop + "\n*Classical Right:* " + europeWestClassicalRight + "\n**Central Europe:**\n*Communist:* " + europeCentralCommunist + "\n*Socialist:* " + europeCentralSocialist + "\n*Democratic-Socialist:* " + europeCentralDemsoc + "\n*Progressive:* " + europeCentralProg + "\n*Liberal:* " + europeCentralLib + "\n*Moderate Liberal:* " + europeCentralModLib + "\n*Moderate:* " + europeCentralMod + "\n*Moderate Conservative:* " + europeCentralModCon + "\n*Conservative:* " + europeCentralCon + "\n*Paleoconservative:* " + europeCentralPaleoCon + "\n*Libertarian:* " + europeCentralLibert + "\n*Nationalist-Populist:* " + europeCentralNatPop + "\n*Classical Right:* " + europeCentralClassicalRight + "\n**Southern Europe:**\n*Communist:* " + europeSouthCommunist + "\n*Socialist:* " + europeSouthSocialist + "\n*Democratic-Socialist:* " + europeSouthDemsoc + "\n*Progressive:* " + europeSouthProg + "\n*Liberal:* " + europeSouthLib + "\n*Moderate Liberal:* " + europeSouthModLib + "\n*Moderate:* " + europeSouthMod + "\n*Moderate Conservative:* " + europeSouthModCon + "\n*Conservative:* " + europeSouthCon + "\n*Paleoconservative:* " + europeSouthPaleoCon + "\n*Libertarian:* " + europeSouthLibert + "\n*Nationalist-Populist:* " + europeSouthNatPop + "\n*Classical Right:* " + europeSouthClassicalRight);

            msg.channel.send("**Eastern Europe:**\n*Communist:* " + europeEastCommunist + "\n*Socialist:* " + europeEastSocialist + "\n*Democratic-Socialist:* " + europeEastDemsoc + "\n*Progressive:* " + europeEastProg + "\n*Liberal:* " + europeEastLib + "\n*Moderate Liberal:* " + europeEastModLib + "\n*Moderate:* " + europeEastMod + "\n*Moderate Conservative:* " + europeEastModCon + "\n*Conservative:* " + europeEastCon + "\n*Paleoconservative:* " + europeEastPaleoCon + "\n*Libertarian:* " + europeEastLibert + "\n*Nationalist-Populist:* " + europeEastNatPop + "\n*Classical Right:* " + europeEastClassicalRight + "\n**Nordic Countries:**\n*Communist:* " + europeNordicCommunist + "\n*Socialist:* " + europeNordicSocialist + "\n*Democratic-Socialist:* " + europeNordicDemsoc + "\n*Progressive:* " + europeNordicProg + "\n*Liberal:* " + europeNordicLib + "\n*Moderate Liberal:* " + europeNordicModLib + "\n*Moderate:* " + europeNordicMod + "\n*Moderate Conservative:* " + europeNordicModCon + "\n*Conservative:* " + europeNordicCon + "\n*Paleoconservative:* " + europeNordicPaleoCon + "\n*Libertarian:* " + europeNordicLibert + "\n*Nationalist-Populist:* " + europeNordicNatPop + "\n*Classical Right:* " + europeNordicClassicalRight + "\n**Balkan Countries:**\n*Communist:* " + europeBalkanCommunist + "\n*Socialist:* " + europeBalkanSocialist + "\n*Democratic-Socialist:* " + europeBalkanDemsoc + "\n*Progressive:* " + europeBalkanProg + "\n*Liberal:* " + europeBalkanLib + "\n*Moderate Liberal:* " + europeBalkanModLib + "\n*Moderate:* " + europeBalkanMod + "\n*Moderate Conservative:* " + europeBalkanModCon + "\n*Conservative:* " + europeBalkanCon + "\n*Paleoconservative:* " + europeBalkanPaleoCon + "\n*Libertarian:* " + europeBalkanLibert + "\n*Nationalist-Populist:* " + europeBalkanNatPop + "\n*Classical Right:* " + europeBalkanClassicalRight + "\n**Canada:**\n*Communist:* " + canadaCommunist + "\n*Socialist:* " + canadaSocialist + "\n*Democratic-Socialist:* " + canadaDemsoc + "\n*Progressive:* " + canadaProg + "\n*Liberal:* " + canadaLib + "\n*Moderate Liberal:* " + canadaModLib + "\n*Moderate:* " + canadaMod + "\n*Moderate Conservative:* " + canadaModCon + "\n*Conservative:* " + canadaCon + "\n*Paleoconservative:* " + canadaPaleoCon + "\n*Libertarian:* " + canadaLibert + "\n*Nationalist-Populist:* " + canadaNatPop + "\n*Classical Right:* " + canadaClassicalRight + "\n**Central America:**\n*Communist:* " + centralAmCommunist + "\n*Socialist:* " + centralAmSocialist + "\n*Democratic-Socialist:* " + centralAmDemsoc + "\n*Progressive:* " + centralAmProg + "\n*Liberal:* " + centralAmLib + "\n*Moderate Liberal:* " + centralAmModLib + "\n*Moderate:* " + centralAmMod + "\n*Moderate Conservative:* " + centralAmModCon + "\n*Conservative:* " + centralAmCon + "\n*Paleoconservative:* " + centralAmPaleoCon + "\n*Libertarian:* " + centralAmLibert + "\n*Nationalist-Populist:* " + centralAmNatPop + "\n*Classical Right:* " + centralAmClassicalRight + "\n**Caribbean::**\n*Communist:* " + caribbeanCommunist + "\n*Socialist:* " + caribbeanSocialist + "\n*Democratic-Socialist:* " + caribbeanDemsoc + "\n*Progressive:* " + caribbeanProg + "\n*Liberal:* " + caribbeanLib + "\n*Moderate Liberal:* " + caribbeanModLib + "\n*Moderate:* " + caribbeanMod + "\n*Moderate Conservative:* " + caribbeanModCon + "\n*Conservative:* " + caribbeanCon + "\n*Paleoconservative:* " + caribbeanPaleoCon + "\n*Libertarian:* " + caribbeanLibert + "\n*Nationalist-Populist:* " + caribbeanNatPop + "\n*Classical Right:* " + caribbeanClassicalRight);

            msg.channel.send("**South America:**\n*Communist:* " + southAmCommunist + "\n*Socialist:* " + southAmSocialist + "\n*Democratic-Socialist:* " + southAmDemsoc + "\n*Progressive:* " + southAmProg + "\n*Liberal:* " + southAmLib + "\n*Moderate Liberal:* " + southAmModLib + "\n*Moderate:* " + southAmMod + "\n*Moderate Conservative:* " + southAmModCon + "\n*Conservative:* " + southAmCon + "\n*Paleoconservative:* " + southAmPaleoCon + "\n*Libertarian:* " + southAmLibert + "\n*Nationalist-Populist:* " + southAmNatPop + "\n*Classical Right:* " + southAmClassicalRight + "\n**Middle East:**\n*Communist:* " + middleEastCommunist + "\n*Socialist:* " + middleEastSocialist + "\n*Democratic-Socialist:* " + middleEastDemsoc + "\n*Progressive:* " + middleEastProg + "\n*Liberal:* " + middleEastLib + "\n*Moderate Liberal:* " + middleEastModLib + "\n*Moderate:* " + middleEastMod + "\n*Moderate Conservative:* " + middleEastModCon + "\n*Conservative:* " + middleEastCon + "\n*Paleoconservative:* " + middleEastPaleoCon + "\n*Libertarian:* " + middleEastLibert + "\n*Nationalist-Populist:* " + middleEastNatPop + "\n*Classical Right:* " + middleEastClassicalRight + "\n**Asia:**\n*Communist:* " + AsiaCommunist + "\n*Socialist:* " + AsiaSocialist + "\n*Democratic-Socialist:* " + AsiaDemsoc + "\n*Progressive:* " + AsiaProg + "\n*Liberal:* " + AsiaLib + "\n*Moderate Liberal:* " + AsiaModLib + "\n*Moderate:* " + AsiaMod + "\n*Moderate Conservative:* " + AsiaModCon + "\n*Conservative:* " + AsiaCon + "\n*Paleoconservative:* " + AsiaPaleoCon + "\n*Libertarian:* " + AsiaLibert + "\n*Nationalist-Populist:* " + AsiaNatPop + "\n*Classical Right:* " + AsiaClassicalRight + "\n**Oceania:**\n*Communist:* " + OceaniaCommunist + "\n*Socialist:* " + OceaniaSocialist + "\n*Democratic-Socialist:* " + OceaniaDemsoc + "\n*Progressive:* " + OceaniaProg + "\n*Liberal:* " + OceaniaLib + "\n*Moderate Liberal:* " + OceaniaModLib + "\n*Moderate:* " + OceaniaMod + "\n*Moderate Conservative:* " + OceaniaModCon + "\n*Conservative:* " + OceaniaCon + "\n*Paleoconservative:* " + OceaniaPaleoCon + "\n*Libertarian:* " + OceaniaLibert + "\n*Nationalist-Populist:* " + OceaniaNatPop + "\n*Classical Right:* " + OceaniaClassicalRight + "\n**Africa:**\n*Communist:* " + AfricaCommunist + "\n*Socialist:* " + AfricaSocialist + "\n*Democratic-Socialist:* " + AfricaDemsoc + "\n*Progressive:* " + AfricaProg + "\n*Liberal:* " + AfricaLib + "\n*Moderate Liberal:* " + AfricaModLib + "\n*Moderate:* " + AfricaMod + "\n*Moderate Conservative:* " + AfricaModCon + "\n*Conservative:* " + AfricaCon + "\n*Paleoconservative:* " + AfricaPaleoCon + "\n*Libertarian:* " + AfricaLibert + "\n*Nationalist-Populist:* " + AfricaNatPop + "\n*Classical Right:* " + AfricaClassicalRight);

            msg.channel.send("**__Regional Party Counts__**\n**South - South Atlantic**\n*Democratic Party:* " + southAtlanticDem + "\n*Republican Party:* " + southAtlanticRep + "\n*Independents:* " + southAtlanticInd + "\n*Libertarian Party:* " + southAtlanticLibertarian + "\n*Green Party:* " + southAtlanticGreen + "\n*Other Party:* " + southAtlanticOther + "\n**South - South East Central:**\n*Democratic Party:* " + southEastCentralDem + "\n*Republican Party:* " + southEastCentralRep + "\n*Independents:* " + southEastCentralInd + "\n*Libertarian Party:* " + southEastCentralLibertarian + "\n*Green Party:* " + southEastCentralGreen + "\n*Other Party:* " + southEastCentralOther + "\n**South - South West Central:**\n*Democratic Party:* " + southWestCentralDem + "\n*Republican Party:* " + southWestCentralRep + "\n*Independents:* " + southWestCentralInd + "\n*Libertarian Party:* " + southWestCentralLibertarian + "\n*Green Party:* " + southWestCentralGreen + "\n*Other Party:* " + southWestCentralOther + "\n**Northeast - New England:**\n*Democratic Party:* " + newEnglandDem + "\n*Republican Party:* " + newEnglandRep + "\n*Independents:* " + newEnglandInd + "\n*Libertarian Party:* " + newEnglandLibertarian + "\n*Green Party:* " + newEnglandGreen + "\n*Other Party:* " + newEnglandOther + "\n**Northeast - Mid Atlantic:**\n*Democratic Party:* " + midAtlanticDem + "\n*Republican Party:* " + midAtlanticRep + "\n*Independents:* " + midAtlanticInd + "\n*Libertarian Party:* " + midAtlanticLibertarian + "\n*Green Party:* " + midAtlanticGreen + "\n*Other Party:* " + midAtlanticOther + "\n**Midwest - East North Central:**\n*Democratic Party:* " + EastNorthCentralDem + "\n*Republican Party:* " + EastNorthCentralRep + "\n*Independents:* " + EastNorthCentralInd + "\n*Libertarian Party:* " + EastNorthCentralLibertarian + "\n*Green Party:* " + EastNorthCentralGreen + "\n*Other Party:* " + EastNorthCentralOther + "\n**Midwest - West North Central:**\n*Democratic Party:* " + WestNorthCentralDem + "\n*Republican Party:* " + WestNorthCentralRep + "\n*Independents:* " + WestNorthCentralInd + "\n*Libertarian Party:* " + WestNorthCentralLibertarian + "\n*Green Party:* " + WestNorthCentralGreen + "\n*Other Party:* " + WestNorthCentralOther + "\n**West - Mountain:**\n*Democratic Party:* " + pacMountainDem + "\n*Republican Party:* " + pacMountainRep + "\n*Independents:* " + pacMountainInd + "\n*Libertarian Party:* " + pacMountainLibertarian + "\n*Green Party:* " + pacMountainGreen + "\n*Other Party:* " + pacMountainOther)

            msg.channel.send("**West - Pacific:**\n*Democratic Party:* " + pacCoastDem + "\n*Republican Party:* " + pacCoastRep + "\n*Independents:* " + pacCoastInd + "\n*Libertarian Party:* " + pacCoastLibertarian + "\n*Green Party:* " + pacCoastGreen + "\n*Other Party:* " + pacCoastOther + "\n**Western Europe:**\n*Democratic Party:* " + europeWestDem + "\n*Republican Party:* " + europeWestRep + "\n*Independents:* " + europeWestInd + "\n*Libertarian Party:* " + europeWestLibertarian + "\n*Green Party:* " + europeWestGreen + "\n*Other Party:* " + europeWestOther + "\n**Central Europe:**\n*Democratic Party:* " + europeCentralDem + "\n*Republican Party:* " + europeCentralRep + "\n*Independents:* " + europeCentralInd + "\n*Libertarian Party:* " + europeCentralLibertarian + "\n*Green Party:* " + europeCentralGreen + "\n*Other Party:* " + europeCentralOther + "\n**Southern Europe:**\n*Democratic Party:* " + europeSouthDem + "\n*Republican Party:* " + europeSouthRep + "\n*Independents:* " + europeSouthInd + "\n*Libertarian Party:* " + europeSouthLibertarian + "\n*Green Party:* " + europeSouthGreen + "\n*Other Party:* " + europeSouthOther + "\n**Eastern Europe:**\n*Democratic Party:* " + europeEastDem + "\n*Republican Party:* " + europeEastRep + "\n*Independents:* " + europeEastInd + "\n*Libertarian Party:* " + europeEastLibertarian + "\n*Green Party:* " + europeEastGreen + "\n*Other Party:* " + europeEastOther + "\n**Nordic Countries:**\n*Democratic Party:* " + europeNordicDem + "\n*Republican Party:* " + europeNordicRep + "\n*Independents:* " + europeNordicInd + "\n*Libertarian Party:* " + europeNordicLibertarian + "\n*Green Party:* " + europeNordicGreen + "\n*Other Party:* " + europeNordicOther + "\n**Balkan Countries:**\n*Democratic Party:* " + europeBalkanDem + "\n*Republican Party:* " + europeBalkanRep + "\n*Independents:* " + europeBalkanInd + "\n*Libertarian Party:* " + europeBalkanLibertarian + "\n*Green Party:* " + europeBalkanGreen + "\n*Other Party:* " + europeBalkanOther + "\n**Canada:**\n*Democratic Party:* " + canadaDem + "\n*Republican Party:* " + canadaRep + "\n*Independents:* " + canadaInd + "\n*Libertarian Party:* " + canadaLibertarian + "\n*Green Party:* " + canadaGreen + "\n*Other Party:* " + canadaOther)

            msg.channel.send("**Central America:**\n*Democratic Party:* " + centralAmDem + "\n*Republican Party:* " + centralAmRep + "\n*Independents:* " + centralAmInd + "\n*Libertarian Party:* " + centralAmLibertarian + "\n*Green Party:* " + centralAmGreen + "\n*Other Party:* " + centralAmOther + "\n**Caribbean:**\n*Democratic Party:* " + caribbeanDem + "\n*Republican Party:* " + caribbeanRep + "\n*Independents:* " + caribbeanInd + "\n*Libertarian Party:* " + caribbeanLibertarian + "\n*Green Party:* " + caribbeanGreen + "\n*Other Party:* " + caribbeanOther + "\n**South America:**\n*Democratic Party:* " + southAmDem + "\n*Republican Party:* " + southAmRep + "\n*Independents:* " + southAmInd + "\n*Libertarian Party:* " + southAmLibertarian + "\n*Green Party:* " + southAmGreen + "\n*Other Party:* " + southAmOther + "\n**Middle East:**\n*Democratic Party:* " + middleEastDem + "\n*Republican Party:* " + middleEastRep + "\n*Independents:* " + middleEastInd + "\n*Libertarian Party:* " + middleEastLibertarian + "\n*Green Party:* " + middleEastGreen + "\n*Other Party:* " + middleEastOther + "\n**Asia:**\n*Democratic Party:* " + AsiaDem + "\n*Republican Party:* " + AsiaRep + "\n*Independents:* " + AsiaInd + "\n*Libertarian Party:* " + AsiaLibertarian + "\n*Green Party:* " + AsiaGreen + "\n*Other Party:* " + AsiaOther + "\n**Oceania:**\n*Democratic Party:* " + OceaniaDem + "\n*Republican Party:* " + OceaniaRep + "\n*Independents:* " + OceaniaInd + "\n*Libertarian Party:* " + OceaniaLibertarian + "\n*Green Party:* " + OceaniaGreen + "\n*Other Party:* " + OceaniaOther + "\n**Africa:**\n*Democratic Party:* " + AfricaDem + "\n*Republican Party:* " + AfricaRep + "\n*Independents:* " + AfricaInd + "\n*Libertarian Party:* " + AfricaLibertarian + "\n*Green Party:* " + AfricaGreen + "\n*Other Party:* " + AfricaOther)

        } else if (input === "party" || input === "party roles") {
            var demCommunist = 0;
            var demSocialist = 0;
            var demDemSoc = 0;
            var demProg = 0;
            var demLib = 0;
            var demModLib = 0;
            var demMod = 0;
            var demModCon = 0;
            var demCon = 0;
            var demPaleo = 0;
            var demLibert = 0;
            var demNatPop = 0;
            var demClassRight = 0;

            var repCommunist = 0;
            var repSocialist = 0;
            var repDemSoc = 0;
            var repProg = 0;
            var repLib = 0;
            var repModLib = 0;
            var repMod = 0;
            var repModCon = 0;
            var repCon = 0;
            var repPaleo = 0;
            var repLibert = 0;
            var repNatPop = 0;
            var repClassRight = 0;

            var indCommunist = 0;
            var indSocialist = 0;
            var indDemSoc = 0;
            var indProg = 0;
            var indLib = 0;
            var indModLib = 0;
            var indMod = 0;
            var indModCon = 0;
            var indCon = 0;
            var indPaleo = 0;
            var indLibert = 0;
            var indNatPop = 0;
            var indClassRight = 0;

            var greenCommunist = 0;
            var greenSocialist = 0;
            var greenDemSoc = 0;
            var greenProg = 0;
            var greenLib = 0;
            var greenModLib = 0;
            var greenMod = 0;
            var greenModCon = 0;
            var greenCon = 0;
            var greenPaleo = 0;
            var greenLibert = 0;
            var greenNatPop = 0;
            var greenClassRight = 0;

            var libertCommunist = 0;
            var libertSocialist = 0;
            var libertDemSoc = 0;
            var libertProg = 0;
            var libertLib = 0;
            var libertModLib = 0;
            var libertMod = 0;
            var libertModCon = 0;
            var libertCon = 0;
            var libertPaleo = 0;
            var libertLibert = 0;
            var libertNatPop = 0;
            var libertClassRight = 0;

            var otherCommunist = 0;
            var otherSocialist = 0;
            var otherDemSoc = 0;
            var otherProg = 0;
            var otherLib = 0;
            var otherModLib = 0;
            var otherMod = 0;
            var otherModCon = 0;
            var otherCon = 0;
            var otherPaleo = 0;
            var otherLibert = 0;
            var otherNatPop = 0;
            var otherClassRight = 0;

            let partyIdeoCount = async () => {
                await bot.guilds.cache.get(target).members.cache.forEach(async member => {
                    if (member.roles.cache.some(role => role.name === '🔵 Democratic Party')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            demCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            demClassRight++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            demSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            demNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            demDemSoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            demLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            demProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            demPaleo++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            demLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            demCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            demModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            demModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative')) {
                            demMod++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === '🔴 Republican Party')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            repCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            repClassRight++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            repSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            repNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            repDemSoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            repLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            repProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            repPaleo++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            repLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            repCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            repModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            repModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative')) {
                            repMod++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === '🟢 Green Party')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            greenCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            greenClassRight++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            greenSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            greenNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            greenDemSoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            greenLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            greenProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            greenPaleo++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            greenLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            greenCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            greenModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            greenModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative')) {
                            greenMod++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === '🟡 Libertarian Party')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            libertCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            libertClassRight++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            libertSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            libertNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            libertDemSoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            libertLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            libertProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            libertPaleo++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            libertLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            libertCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            libertModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            libertModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative')) {
                            libertMod++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === '⚫ Other Party')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            otherCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            otherClassRight++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            otherSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            otherNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            otherDemSoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            otherLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            otherProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            otherPaleo++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            otherLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            otherCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            otherModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            otherModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative')) {
                            otherMod++;
                        }
                    }
                    if (member.roles.cache.some(role => role.name === '⚪ Independent')) {
                        if (member.roles.cache.some(role => role.name === 'Communist')) {
                            indCommunist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Classical Right')) {
                            indClassRight++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            indSocialist++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right')) {
                            indNatPop++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            indDemSoc++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Libertarian') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist')) {
                            indLibert++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            indProg++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')) {
                            indPaleo++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            indLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative')) {
                            indCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            indModLib++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate Conservative') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Conservative')) {
                            indModCon++;
                        }
                        if (member.roles.cache.some(role => role.name === 'Moderate') && !member.roles.cache.some(role => role.name === 'Communist') && !member.roles.cache.some(role => role.name === 'Classical Right') && !member.roles.cache.some(role => role.name === 'Socialist') && !member.roles.cache.some(role => role.name === 'Nationalist-Populist') && !member.roles.cache.some(role => role.name === 'Democratic-Socialist') && !member.roles.cache.some(role => role.name === 'Libertarian')  && !member.roles.cache.some(role => role.name === 'Progressive') && !member.roles.cache.some(role => role.name === 'Paleoconservative') && !member.roles.cache.some(role => role.name === 'Liberal') && !member.roles.cache.some(role => role.name === 'Conservative') && !member.roles.cache.some(role => role.name === 'Moderate Liberal') && !member.roles.cache.some(role => role.name === 'Moderate Conservative')) {
                            indMod++;
                        }
                    }
                    
                })
            }

            partyIdeoCount();

            msg.channel.send(`**__Political Party Ideologies:__**\n**🔵 Democratic Party:**\nCommunist: ` + demCommunist + `\nSocialist: ` + demSocialist + `\nDemocratic-Socialist: ` + demDemSoc + `\nProgressive: ` + demProg + `\nLiberal: ` + demLib + `\nModerate Liberal: ` + demModLib + `\nModerate: ` + demMod + `\nModerate Conservative: ` + demModCon + `\nConservative: ` + demCon + `\nPaleoconservative: ` + demPaleo + `\nLibertarian: ` + demLibert + `\nNationalist-Populist: ` + demNatPop + `\nClassical Rights: ` + demClassRight + `\n\n**🔴 Republican Party:**\nCommunist: ` + repCommunist + `\nSocialist: ` + repSocialist + `\nDemocratic-Socialist: ` + repDemSoc + `\nProgressive: ` + repProg + `\nLiberal: ` + repLib + `\nModerate Liberal: ` + repModLib + `\nModerate: ` + repMod + `\nModerate Conservative: ` + repModCon + `\nConservative: ` + repCon + `\nPaleoconservative: ` + repPaleo + `\nLibertarian: ` + repLibert + `\nNationalist-Populist: ` + repNatPop + `\nClassical Rights: ` + repClassRight + `\n\n**⚪ Independents:**\nCommunist: ` + indCommunist + `\nSocialist: ` + indSocialist + `\nDemocratic-Socialist: ` + indDemSoc + `\nProgressive: ` + indProg + `\nLiberal: ` + indLib + `\nModerate Liberal: ` + indModLib + `\nModerate: ` + indMod + `\nModerate Conservative: ` + indModCon + `\nConservative: ` + indCon + `\nPaleoconservative: ` + indPaleo + `\nLibertarian: ` + indLibert + `\nNationalist-Populist: ` + indNatPop + `\nClassical Rights: ` + indClassRight + `\n\n**🟡 Libertarian Party:**\nCommunist: ` + libertCommunist + `\nSocialist: ` + libertSocialist + `\nDemocratic-Socialist: ` + libertDemSoc + `\nProgressive: ` + libertProg + `\nLiberal: ` + libertLib + `\nModerate Liberal: ` + libertModLib + `\nModerate: ` + libertMod + `\nModerate Conservative: ` + libertModCon + `\nConservative: ` + libertCon + `\nPaleoconservative: ` + libertPaleo + `\nLibertarian: ` + libertLibert + `\nNationalist-Populist: ` + libertNatPop + `\nClassical Rights: ` + libertClassRight);
            msg.channel.send(`\n\n**🟢 Green Party:**\nCommunist: ` + greenCommunist + `\nSocialist: ` + greenSocialist + `\nDemocratic-Socialist: ` + greenDemSoc + `\nProgressive: ` + greenProg + `\nLiberal: ` + greenLib + `\nModerate Liberal: ` + greenModLib + `\nModerate: ` + greenMod + `\nModerate Conservative: ` + greenModCon + `\nConservative: ` + greenCon + `\nPaleoconservative: ` + greenPaleo + `\nLibertarian: ` + greenLibert + `\nNationalist-Populist: ` + greenNatPop + `\nClassical Rights: ` + greenClassRight + `\n\n**⚫ Other Party:**\nCommunist: ` + otherCommunist + `\nSocialist: ` + otherSocialist + `\nDemocratic-Socialist: ` + otherDemSoc + `\nProgressive: ` + otherProg + `\nLiberal: ` + otherLib + `\nModerate Liberal: ` + otherModLib + `\nModerate: ` + otherMod + `\nModerate Conservative: ` + otherModCon + `\nConservative: ` + otherCon + `\nPaleoconservative: ` + otherPaleo + `\nLibertarian: ` + otherLibert + `\nNationalist-Populist: ` + otherNatPop + `\nClassical Rights: ` + otherClassRight);


        } else if (input === "help") {
            msg.channel.send("Categories:\n!demographics\n!demographics religion\n!demographics foreign\n!demographics economic\n!demographics other\n!demographics political\n!demographics regideologies\n!demographics party")
        }
    }
}