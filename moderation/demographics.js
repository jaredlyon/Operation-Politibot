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
            var total = msg.guild.memberCount;

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

            let religionCount = async() => {
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

            let foreignCount = async() => {
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

            let economicCount = async() => {
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

            let otherCount = async() => {
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

            let poliCount = async() => {
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

        } else if (input === "help") {
            msg.channel.send("Categories:\n!demographics\n!demographics religion\n!demographics foreign\n!demographics economic\n!demographics other\n!demographics political")
        }
    }
}