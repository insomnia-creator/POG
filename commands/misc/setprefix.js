module.exports = {
    name: 'setprefix',
    description: 'sets the prefix of the bot in the future, use ;setprefix (some prefix)',
    category: 'misc',
    aliases: ['prefix', 'setpre'],
    run: async(message, args, client, Discord, Util, db, ytdl, ms, fs, moment) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Only people with the ``ADMINISTRATOR`` permission can use this command!');
        console.log(args);
        if(!args[0]){ 
            const ArgsnotFoundEmbed = new Discord.MessageEmbed();
            //checks if the member does not exist embeds
            ArgsnotFoundEmbed
            .setTitle('Invalid arguments')
            .setDescription(`Please provide some arguments to set the prefix to!
              ❌`)
              .setColor('RED');
              message.channel.send(ArgsnotFoundEmbed);
              return;
        } else if(args[0].length > 3){
            const lengthembed = new Discord.MessageEmbed();
            lengthembed
            .setTitle('Invalid length')
            .setDescription(`The prefix can only be set to 3 letter words, please select a prefix with a smaller length!
            ❌`)
            .setColor("RED");
            message.channel.send(lengthembed);
            return;
        } else if(args.join(' ') === ';'){
            db.delete(`prefix_${message.guild.id}`);
            const success = new Discord.MessageEmbed();
            success
            .setTitle('The prefix was deleted!')
            .setDescription(`The custom prefix was reset back to the original one, ;
            ✅`)
            .setColor('#14FF00')
            message.channel.send(success);
            return;
        } 

        db.set(`prefix_${message.guild.id}`, args[0]);
        const success = new Discord.MessageEmbed();
        success
        .setTitle('The prefix was changed!')
        .setDescription(`**${message.author.tag}** changed the prefix in **${message.guild.name}** to **${args[0]}**
        ✅`)
        .setColor('#14FF00')
        message.channel.send(success);
        return;

    }
}