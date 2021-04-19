module.exports = (client) => {
    const channelId = "833496150845292564";
    client.on("guildMemberAdd", (member) => {
        console.log(member);
        //Backtick = ``
        const message =  `Welcome <@${member.id}> to our server, you are our  ${member.guild.memberCount}th member.. feel free to look at #「:orange_book:」ʀᴜʟᴇꜱ.. Know that the staff are here to support you, so dont be afraid to ask questions.. Thankyou :)     `;
        const channel = member.guild.channels.cache.get(channelId);
        channel.send(message);
    });
}