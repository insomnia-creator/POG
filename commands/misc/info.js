module.exports = {
    name: 'info',
    description: 'Gets the information of a user, use ;info @someone, alternatively you can not ping anyone to recieve information about yourself!',
    aliases: ['userinfo', 'uinfo'],
    category: 'misc',
    run: async(message, args, client, Discord, Util, db, ytdl, ms, fs, moment) => {
        const userm = message.mentions.users.first() || message.member.user;
        const memberm = message.mentions.members.first() || message.member;

        const infoembed = new Discord.MessageEmbed();
        infoembed
        .setTitle(`Information for ${userm.username}`)
        .addFields({
            name: 'Tag',
            value: userm.tag
        },{
            name: 'Nickname',
            value: memberm.nickname || 'unspecified'
        },{
            name: 'Server Join date',
            value: new Date(memberm.joinedTimestamp).toLocaleDateString(),
        },
        {
            name: 'Discord Join date',
            value:  new Date(userm.createdTimestamp).toLocaleDateString()
        },
        {
            name: 'Roles',
            value: memberm.roles.cache.size - 1
        })
        .setThumbnail(userm.displayAvatarURL({dynamic: true}))
        message.channel.send(infoembed);
        return undefined;
        
    }
}