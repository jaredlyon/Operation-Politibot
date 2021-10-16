var Discord = require('discord.js');

module.exports = {
    name: 'pig',
    permission: 1,
    
    // not used to how you set up your execute function so i tried my best :woozy_face:

    main: async function(bot, msg) {
        var pigArray = [
            "https://i.natgeofe.com/k/23e409f9-4699-46f0-a645-5cc1f5040363/pig-full-body.jpg?w=636&h=358",
            "https://i.natgeofe.com/k/6d301bfc-ff93-4f6f-9179-b1f66b19b9b3/pig-young-closeup.jpg",
            "https://www.irishtimes.com/polopoly_fs/1.3384848.1518095548!/image/image.jpg_gen/derivatives/ratio_1x1_w1200/image.jpg",
            "https://www.alltech.com/sites/default/files/styles/social_friendly/public/2018-03/PigPhoto.png?itok=m_COzHRw",
            "https://i.guim.co.uk/img/media/f9c7981e79697d3c02f2d8d77f135f872affdd7e/0_166_4928_2957/master/4928.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=8b1587280ec21bd3624058a391fedddb",
            "https://images-na.ssl-images-amazon.com/images/I/81PfL3yfocL._AC_SL1500_.jpg",
            "https://149366112.v2.pressablecdn.com/wp-content/uploads/2020/09/shutterstock_556381594-scaled.jpg",
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-937042456-1580320856.jpg?crop=0.670xw:1.00xh;0.106xw,0&resize=480:*",
            "https://i.ebayimg.com/00/s/MTAwMFgxMDAw/z/1qIAAOSwiudcWy1t/$_57.JPG?set_id=8800005007",
            "https://i.ebayimg.com/00/s/MTAwMFgxMDAw/z/1qIAAOSwiudcWy1t/$_57.JPG?set_id=8800005007",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTublKjWG0wMVC73lMs5Ueqvhf2fYyxhvFeTQ&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTublKjWG0wMVC73lMs5Ueqvhf2fYyxhvFeTQ&usqp=CAU",
            "https://www.reallydiamond.com/wp-content/uploads/2020/09/cute-pig-lying-on-piano-table.jpg",
            "https://i.pinimg.com/originals/b2/6c/99/b26c998d89d23f06e315107f88927e9b.jpg",
            "https://www.rd.com/wp-content/uploads/2021/03/GettyImages-586714878.jpg",
            "https://www.rd.com/wp-content/uploads/2021/03/GettyImages-586714878.jpg",
            "https://i.ytimg.com/vi/AvuG2oWhdKQ/maxresdefault.jpg",
            "https://i.pinimg.com/originals/64/54/da/6454dacec0e3a117dcacfc3081b258c0.jpg",
            "https://tailandfur.com/wp-content/uploads/2014/12/Cute-Pig-Pictures-1.jpg",
            "https://i.pinimg.com/originals/8e/54/ec/8e54ec9e10e2a1764d3bd85fb5409d97.jpg",
            "http://i.imgur.com/mU6Lrd5.jpg",
            "https://pbs.twimg.com/profile_images/667000254315696129/UajtCvzf_400x400.jpg",
            "https://squeaksandnibbles.com/wp-content/uploads/2019/06/Pig-names-SN-long.jpg",
            "https://www.rd.com/wp-content/uploads/2021/03/GettyImages-134573654-e1614980257827.jpg",
            "https://www.peta.org/wp-content/uploads/2010/06/800-pigs-in-grass1.jpg",
            "https://www.thesprucepets.com/thmb/aneCRw5cEml4Mg8NmCTelSjMTas=/2719x1809/filters:no_upscale():max_bytes(150000):strip_icc()/five-piglets-157339366-5c8baefb46e0fb00016ee06b.jpg",
            "https://mymodernmet.com/wp/wp-content/uploads/2020/09/cashlie-joy-pig-photoshoot-4.jpg"
        ];

        var randomitem1 = pigArray[Math.floor(Math.random()*pigArray.length)];

        var messageArray = [
            ":pig: Oink Oink Motherfucker!",
            ":pig: Oink Oink!",
            ":pig: Weeeeeeeeeeeee!",
            ":pig: Happy pig!",
            ":pig: Mini Leo has arrived...",
            ":pig2: Oink Oink Motherfucker!",
            ":pig2: Oink Oink!",
            ":pig2: Weeeeeeeeeeeee!",
            ":pig2: Happy pig!",
            ":pig2: Mini Leo has arrived..."
        ];

        var randomitem2 = messageArray[Math.floor(Math.random()*messageArray.length)]

        const pigEmbed = new Discord.MessageEmbed()
            .setColor('#fafafa')
            .setTitle(randomitem2)
            .setURL(randomitem1)
            .setImage(randomitem1);
        
        message.channel.send(pigEmbed);

    }
}