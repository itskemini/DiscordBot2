const Discord = require('discord.js');

module.exports = {
    name: 'afk',
    description: 'Sets status to afk',
    async execute(message, args, client) {
        if (message.author.bot) return;

            if (reason === 'back') {
              const embed = new Discord.MessageEmbed()
                .setDescription(`👋 Welcome back ${message.author}`)
                .setColor('#009900')
               message.channel.send(embed)
          } else {
            const reason = args.join(" ") ? args.join(" ") : "AFK"
            const afk = new Discord.MessageEmbed()
              .setDescription(`☑️ ${message.author} Is know AFK`)
              .addField("Reason:", reason)
              .setColor('#009900')
            message.channel.send(afk)
          }
        }
    }