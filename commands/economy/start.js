module.exports = {
    name: 'start',
    description: 'Starts your life in the economy! Use ;start!',
    category: 'economy',
    run: async(message, args, client, Discord, Util, db, ytdl, ms, fs, moment) => {
        let economy = db.get(`balance_${message.author.id}`);
        if(economy === null){
            const economyEmbed = new Discord.MessageEmbed();
            economyEmbed
            .setTitle('Welcome to the economy!')
            .setDescription(`So uhh, hey ${message.author.username}, whats up?
            So I'd like to welcome you to the wonderful, totally not corrupt economy of uhh, Pogland!
            Make yourself at home, here's some 500 cash to get you started!`)
            .setColor('RANDOM')
            message.channel.send(economyEmbed);
            db.set(`balance_${message.author.id}`, 500);

        } else {
            const youHaveAnAccountEmbed = new Discord.MessageEmbed();
            youHaveAnAccountEmbed
            .setTitle('You already have an account!')
            .setDescription(`Hey ${message.author.username}, you already have an account at the bank of POGLAND! 
            You can't create more than one!
            ❌`)
            .setColor('RED')
        }
    } 
}