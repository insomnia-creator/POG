const { some } = require("lodash");

module.exports = {
    name: 'poll',
    description: 'Starts a poll!',
    category: 'misc',
    aliases: ['startpoll'],
    run: async(message, args, client, Discord, Util, db, ytdl, ms, fs, moment) => {

        const helppollEmbed = new Discord.MessageEmbed();
        helppollEmbed
        .setTitle('Got an error? Need help with polling? Read this')
        .setDescription(`Use (prefix)poll "placeholder text" "lorem" "ipsum" to start a 3 option poll.
        The usage is quite weird and I'm sorry for that but please use this format at all times while executing your poll!
        So if I want to do a poll on which cake is better I can just use
        ;poll "strawberry cake" "chocolate cake"
        It's quite simple, just lock your options! in double quotes!`)
        .setColor('RANDOM');
        const pollstring = args.slice(0).join(' ');
        //the polling string
        if(!pollstring){
            message.channel.send(helppollEmbed);
            return;
        }
        const regex = pollstring.match(/"[^"]+"|[\\S]+"[^"]+/g);
        //gets the regex to match the polling string
        if(!regex){
            message.channel.send(helppollEmbed);
            return;
        }
        if(regex.length > 10){
            return message.channel.send(`Hey <@${message.author.id}> There is a maximum 10 options(because of limited number emojis)`);
        }
        
        let string = '';

        let emojisToReact = [
            '1️⃣',
            '2️⃣',
            '3️⃣',
            '4️⃣',
            '5️⃣',
            '6️⃣',
            '7️⃣',
            '8️⃣',
            '9️⃣',
            '🔟'
        ];
        //emoji array

        var i = 0;

        for(const poll of regex){
            string = string + `React with ${emojisToReact[i]} to choose ${poll}\n\n`;
            i++;
        };

        const somePollEmbed = new Discord.MessageEmbed();
        somePollEmbed
        .setTitle(`Poll by ${message.author.tag}`)
        .setColor('RANDOM')
        .setDescription(string.replace(/"/g, ''));
        
        let sendIt = await message.channel.send(somePollEmbed);

       for(var i = 0; i < regex.length; i++){
           sendIt.react(emojisToReact[i]);
       } 
    }
}