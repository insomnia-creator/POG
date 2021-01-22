module.exports = {
    name: 'giveaway',
    description: 'Starts a giveaway, use ;giveaway <time> <channel> <item or prize>',
    category: 'misc',
    aliases: ['gaway', 'gstart'],
    run: async(message, args, client, Discord, Util, db, ytdl, ms, fs, moment) => {
         if(!args[0]){
             //checks for time
             const specifyTime = new Discord.MessageEmbed();
             specifyTime
             .setTitle('Invalid arguments!')
             .setDescription(`Please specify the time you want, please!`)
             .setColor("RANDOM");
             message.channel.send(specifyTime);
             return;
         }
         if(!args[0].endsWith('h') && !args[0].endsWith('m') && !args[0].endsWith('d')){
             //ends with checks
            const specifyTime = new Discord.MessageEmbed();
            specifyTime
            .setTitle('Invalid arguments!')
            .setDescription(`The time format you provided is not supported`)
            .setColor("RANDOM");
            message.channel.send(specifyTime);
            return;
         }

         if(isNaN(args[0][0])){
            //is nan go brrrrr
            const specifyTimes = new Discord.MessageEmbed();
            specifyTimes
            .setTitle('Invalid arguments!')
            .setDescription(`The first number of the argument(time) was not a number!`)
            .setFooter('isNan() got you there huh?')
            .setColor("RANDOM");
            message.channel.send(specifyTimes);
            return;
         }
         
         let channel = message.mentions.channels.first();
         if(!channel){
             //channel check copy paste 😎
            const specifyTime = new Discord.MessageEmbed();
            specifyTime
            .setTitle('Invalid arguments!')
            .setDescription(`The argument provided was not a proper channel!`)
            .setColor("RANDOM");
            message.channel.send(specifyTime);
            return;
         }

         let prizepog = args.slice(2).join(/ + /);

         if(!prizepog){
            const specifyTime = new Discord.MessageEmbed();
            specifyTime
            .setTitle('Invalid arguments!')
            .setDescription(`No prize or item was specified!`)
            .setColor("RANDOM");
            message.channel.send(specifyTime);
            return;
         }
         const emojis = '🍾';

         const gibaway = new Discord.MessageEmbed();
         gibaway
         .setTitle(`Giveaway by ${message.author.id}`)
         .setDescription(`React with ${emojis} to get the '**${prizepog}**' prize!`)
         .setColor('RANDOM')
         .setTimestamp(Date.now()+ms(args[0]))
         let send = await channel.send(gibaway);
         send.react(emojis);
        //cmon we do need SOME humour homie!

        setTimeout(() => {
            if(send.reactions.cache.size <= 1) return message.channel.send(`No one was selected as the winner because well the participants were none`)
            let winner = send.reactions.cache.get(emojis).users.cache.filter(u => !u.bot).random();
            channel.send(`Congratulations to <@${winner.id}> for winning ${prizepog}!`);
        }, ms(args[0]));

         

    }
}