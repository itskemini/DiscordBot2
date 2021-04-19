const fs = require('fs')
const Discord = require('discord.js');
const Client = require('./client/Client');
const welcome = require("./commands/welcome");


const {
	prefix,
	token,
} = require('./config.json');

const client = new Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

console.log(client.commands);

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity(' Kems Server', {type: 'WATCHING'})
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

welcome(client);

client.on('message', async message => {
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName);

	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	try {
		if(commandName == "ban" || commandName == "userinfo") {
			command.execute(message, client);
		} else {
			command.execute(message);
		}
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});
//Word Filter
client.on('message', async message => {
    if(message.channel.type === 'dm' || message.author.bot || message.member.hasPermission('ADMINISTRATOR')) return;
    const logchannel = client.channels.cache.find(channel => channel.id === '833789709397917707')
    let words = ["leaf", "tit"]
    let foundInText = false; 
    for (var i in words) {
        if (message.content.toLowerCase().includes(words [i].toLowerCase())) foundInText = true;
    }
	if (foundInText){
        let logEmbed = new Discord.MessageEmbed()
        .setDescription(`<@${message.author.id}> Said a nono word `)
        .addField('The message', message.content)
        .setColor('RANDOM')
        .setTimestamp()
        logchannel.send(logEmbed)
		
 
 
        let embed = new Discord.MessageEmbed()
        .setDescription(`Ahh, okay <@${message.author.id}> .. Based off of your stupidity, i can conclude you think that this is a scam/virus.. Welp, if so you now have approximently 6 hours to show proof of any fraud in our tools.. After the 6 hours are over with no proof..You know what that means...(BAN :Hammer:)`)
        .setColor('RANDOM')
        .setTimestamp()
        
        let msg= await message.channel.send(embed);
        
        msg.delete({timeout : '60000'})

		
        
       
    }
	//Welcome 
	module.exports = client => {
		client.on('guildMemberAdd', member => {
			// Send the message to a designated channel on a server:
			const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome2');
			// Do nothing if the channel wasn't found on this server
			if (!channel) return;
			// console.log(member)
			// Send the message, mentioning the member
			// const embed = new Discord.MessageEmbed()
			//     .setTitle(`Welcome to ${member.guild.name}`)
			//     .setImage(member.user.displayAvatarURL())
			// channel.send(embed)
			// console.log(member)
			// console.log(member.user)
			member.guild.memberCount < 13 ?
				channel.send(`Welcome to the server, ${member}. ${member.guild.name} contains ${member.guild.memberCount} members`) : channel.send(`Welcome to the server, ${member}. ${member.guild.name} contains ${member.guild.memberCount} member`);
		});
	}
})

//Welcome Dm


client.on('guildMemberAdd', (member) => {
    let embed = new Discord.MessageEmbed()
    .setTitle('Welcome to my server!')
    .setDescription(`Thank you for joining my server! Make sure to stay active and dont be afraid to ask questions :)!\n**Current Member Count:** ${member.guild.memberCount}\n**Owner:** ${member.guild.owner.user.tag}`)
    .setColor('#cc3300')
    .setAuthor(member.guild.owner.user.tag, member.guild.owner.user.avatarURL())
    .setFooter(member.guild.name, member.guild.iconURL())
    .setThumbnail(member.user.avatarURL());

    member.send(embed)
})
//ticket 

  
client.login(token);