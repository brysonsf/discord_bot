const { ComponentType, EmbedBuilder , SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, codeBlock, time, blockQuote } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('plan')
		.setDescription('Provides an event planning stucture.')
        .addStringOption(option =>
            option.setName('month')
                .setDescription('The month to schedule this for (ex/ 10 === October)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('day')
                .setDescription('The day to schedule this for (ex/ 0->31)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('time')
                .setDescription('The time to schedule this for (ex/ 14:48)')
                .setRequired(true)),
	async execute(interaction) {
        const monthVal = Number(interaction.options.getString('month'));
        const dayVal = Number(interaction.options.getString('day'));
        const timeVal = interaction.options.getString('time');
        let hour = Number(timeVal.slice(0,2));
        let min = Number(timeVal.slice(3,timeVal.length));
        const pollTime = 604800000; // 1 week default length
        
        // if Daylight Savings, +1 more to hour
        if(monthVal<3 || monthVal>11){ // if mar or after
            hour = hour + 1;
        }
        else if(monthVal===11){
                if(dayVal>3){ // if nov 3 or later
                    hour = hour + 1;
                }
        }else if(monthVal===3){
            if(dayVal<10){ // if mar 10 or earlier
                hour = hour + 1;
            }
        }
        hour = hour + 3;
        // just update year when its 2025
        // remove 1 from month to account for offsets
        // year, month, day, hour, minute, second
        let event = new Date(2024, monthVal-1, dayVal, hour, min, 0);
        const monthName = event.toLocaleString('default', { month: 'long' });

        let ISODateNoDashesNoColonsNoDecimalNoMilliseconds = new Date(2024, monthVal-1, dayVal, hour, min, 0).toISOString()
        .split("-").join("")
        .split(".").join("")
        .split(":").join("")
        .slice(0,15).concat("Z");
        // 3 hour session by default
        let ISOEnding = new Date(2024, monthVal-1, dayVal, hour+4, min, 0).toISOString()
        .split("-").join("")
        .split(":").join("")
        .split(".").join("")
        .slice(0,15).concat("Z");

        // day is incrememnting
        let gCal = 'https://www.google.com/calendar/render?action=TEMPLATE&text=Commander+Sesh&details=Commander%3F+I+hardly+knower%21+RSVP+here%21&location=5217+South+St&dates=' + ISODateNoDashesNoColonsNoDecimalNoMilliseconds + '/'+ ISOEnding;
        const fullDateString = monthName + ' ' + dayVal + ' ' + timeVal;
        const highlighted = codeBlock('js', fullDateString);
        
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Commander Sesh')
            .setURL(gCal)
            .setDescription('Commander? I hardly knower! RSVP here!')
            .setThumbnail('https://i.imgur.com/KJkSGXI.jpeg')
            .addFields(
                { name: 'Date / Time', value: highlighted},
            )
            .setImage('https://i.imgur.com/YGtKr7j.jpeg')
            .setFooter({ text: 'RSVP Please', iconURL: 'https://i.imgur.com/KJkSGXI.jpeg' })

		const confirm = new ButtonBuilder()
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

        const collector = response.createMessageComponentCollector({ componentType: ComponentType.Button, time: pollTime });

        let confirmees = [];
        let deniers = [];

        collector.on('collect', i => {
            let yesMan = '';
            let noMan = '';
            if(i.customId === 'confirm'){

                if(confirmees.indexOf(i.user.globalName)===-1){
                    if(deniers.indexOf(i.user.globalName!==-1)){
                        let hold = '';
                        deniers.forEach(swap =>{
                            if(swap!==i.user.globalName){
                                hold+= '\n' + swap;
                            }
                        });
                        noMan = hold;
                    }
                    confirmees.push(i.user.globalName);
                    yesMan+= i.user.globalName;

                }
            }else if(i.customId === 'cancel'){
                if(deniers.indexOf(i.user.globalName)===-1){
                    if(confirmees.indexOf(i.user.globalName!==-1)){
                        let hold = '';
                        confirmees.forEach(swap =>{
                            if(swap!==i.user.globalName){
                                hold+= '\n' + swap;
                            }
                        });
                        yesMan = hold;
                    }
                    deniers.push(i.user.globalName);
                    noMan+= i.user.globalName;
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
    },
};