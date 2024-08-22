const { ComponentType, EmbedBuilder , SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, codeBlock, time, blockQuote } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vote')
		.setDescription('Provides a voting tool for up to 5 items!')
        .addStringOption(option =>
            option.setName('list')
                .setDescription('List of items seperated by commas (ex/ 10 === October)')
                .setRequired(true)),
	async execute(interaction) {
        const list = Number(interaction.options.getString('list'));
        console.log(list);
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Commander Sesh')
            .setURL(gCal)
            .setDescription('Commander? I hardly knower! RSVP here!')
            .setThumbnail('https://th.bing.com/th/id/OIP.JvVdr8nKMVZ_djnnd0nZ1wHaKU?rs=1&pid=ImgDetMain')
            .addFields(
                { name: 'Vote:', value: 'Vote here.'},
            )
            .setImage('https://th.bing.com/th/id/OIP.JvVdr8nKMVZ_djnnd0nZ1wHaKU?rs=1&pid=ImgDetMain')
            .setFooter({ text: 'Please Vote', iconURL: 'https://thumbs.dreamstime.com/z/ballot-box-cartoon-illustration-53519089.jpg' })

		/*const confirm = new ButtonBuilder()
			.setCustomId('confirm')
			.setLabel('RSVP')
			.setStyle(ButtonStyle.Primary);

		const cancel = new ButtonBuilder()
			.setCustomId('cancel')
			.setLabel('Cant')
			.setStyle(ButtonStyle.Danger);

		const row = new ActionRowBuilder()
			.addComponents(confirm, cancel);

		const response = await interaction.reply({
			content: 'Whos in ' + fullDateString + '?',
			components: [row],
            embeds: [exampleEmbed]
		});
        const collector = response.createMessageComponentCollector({ componentType: ComponentType.Button, time: 604800000 }); // 1 week

        let confirmees = [];
        let deniers = [];

        collector.on('collect', i => {
            let yesMan = '';
            let noMan = '';
            let username = i.user.globalName ?? i.user.username;
            if(i.customId === 'confirm'){
                if(confirmees.indexOf(username)===-1){
                    if(deniers.indexOf(username!==-1)){
                        let hold = '';
                        deniers.forEach(swap =>{
                            if(swap!==username){
                                hold+= '\n' + swap;
                            }
                        });
                        noMan = hold;
                    }
                    confirmees.push(username);
                    yesMan+= username;

                }
            }else if(i.customId === 'cancel'){
                if(deniers.indexOf(username)===-1){
                    if(confirmees.indexOf(username!==-1)){
                        let hold = '';
                        confirmees.forEach(swap =>{
                            if(swap!==username){
                                hold+= '\n' + swap;
                            }
                        });
                        yesMan = hold;
                    }
                    deniers.push(username);
                    noMan+= username;
                }
            }
            //i.reply(fullDateString + ' RSVP log: Yes: ' + yesMan + '  No: ' + noMan);
            //Update the content of a message
            let msg = fullDateString + ' RSVP log: ';
            const replies = blockQuote('\nYes: ' + yesMan + '\nNo: ' + noMan);
            i.message.edit(msg + replies)
            .then(msg => console.log(`Updated the content of a message to ${msg.content}`))
            .catch(console.error);
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} interactions.`);
        });
        
        */
    },
};