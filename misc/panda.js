var Discord = require('discord.js');

module.exports = {
    name: 'panda',
    permission: 1, 
    main: function(bot, msg) {
        var pandaArray = [
            "https://images-na.ssl-images-amazon.com/images/I/81ZzI%2Bg1bWL._AC_SX466_.jpg",
            "https://filmdaily.co/wp-content/uploads/2020/08/cutepanda-lede-1300x869.jpg",
            "https://cdn.shopify.com/s/files/1/0034/2913/8545/articles/7_panda_facts.jpg?v=1552558072",
            "https://i.pinimg.com/originals/93/fa/c0/93fac00692c54e9df0327528967f4741.jpg",
            "https://static01.nyt.com/images/2020/11/12/world/12blackpink-panda-3/merlin_179545950_35e24929-cf02-4095-b5fb-3c4a26a05a12-mobileMasterAt3x.jpg",
            "https://c402277.ssl.cf1.rackcdn.com/photos/18315/images/hero_small/Medium_WW230176.jpg?1576168323",
            "https://upload.wikimedia.org/wikipedia/commons/0/0f/Grosser_Panda.JPG",
            "https://im-media.voltron.voanews.com/Drupal/01live-166/styles/sourced/s3/2019-04/3ED6FCAB-D280-4197-8B02-BCCD9846076A.jpg?itok=EKczHCGX",
            "https://images.theconversation.com/files/350851/original/file-20200803-22-dfm95n.jpg?ixlib=rb-1.1.0&rect=0%2C750%2C5760%2C2880&q=45&auto=format&w=1356&h=668&fit=crop",
            "https://anthropocenemagazine.org/wp-content/uploads/2020/04/Panda-2.jpg",
            "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/26/3c/87.jpg",
            "https://static.scientificamerican.com/sciam/cache/file/ACF0A7DC-14E3-4263-93F438F6DA8CE98A_source.jpg?w=590&h=800&896FA922-DF63-4289-86E2E0A5A8D76BE1",
            "https://lp-cms-production.imgix.net/features/2019/06/panda-d55d15231c4f.jpg?auto=compress&fit=crop&fm=auto&sharp=10&vib=20&w=1200&h=800",
            "https://www.pandasinternational.org/wp-content/uploads/2020/01/%E7%84%B6%E7%84%B6%EF%BC%88Ran-Ran-3-500x500.jpg",
            "https://ca-times.brightspotcdn.com/dims4/default/6754794/2147483647/strip/true/crop/2048x1152+0+0/resize/1486x836!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F88%2F62%2F33c2eda12a5f567e12d740e78fdc%2Fla-1541030622-k1kbw1dk8v-snap-image",
            "https://www.rd.com/wp-content/uploads/2020/03/GettyImages-1060486568.jpg",
            "https://images.csmonitor.com/csm/2015/10/944693_1_1029%20panda%20diplomacy_standard.jpg?alias=standard_900x600",
            "https://api.time.com/wp-content/uploads/2015/02/panda-cub.jpg?w=824&quality=70",
            "https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/panda_16x9.jpg?itok=SRbyO8VJ",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAu8vx-xpkmdhybHvCCXdNNu7ffdev8xWtUQ&usqp=CAU",
            "https://miro.medium.com/max/910/1*yCa5M8MBjdilx9chG2a8Zw.jpeg",
            "https://variety.com/wp-content/uploads/2018/04/1280x720-wh81.jpg?w=681&h=383&crop=1",
            "https://static.dw.com/image/42524546_303.jpg",
            "https://www.slsc.org/wp-content/uploads/2018/07/pandas.jpg",
            "https://kpbs.media.clients.ellingtoncms.com/img/photos/2019/04/29/T13_0236_186.jpg"
        ];

        var randomitem1 = pandaArray[Math.floor(Math.random()*pandaArray.length)];

        var messageArray = [
            ":panda_face: Happy Panda!",
            ":panda_face: Here's a Panda!!",
            ":panda_face: Panda hug!",
            ":panda_face: Neeeeeeeh!",
            ":panda_face: :bamboo:",
        ];

        var randomitem2 = messageArray[Math.floor(Math.random()*messageArray.length)]

        var pandaEmbed = new Discord.MessageEmbed()
            .setColor('#fafafa')
            .setTitle(randomitem2)
            .setURL(randomitem1)
            .setImage(randomitem1);
        
        msg.channel.send(pandaEmbed);
    }
}