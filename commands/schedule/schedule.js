const { ComponentType , SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, blockQuote } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('schedule')
		.setDescription('Helps schedule meetups on a 5-day basis.'),
	async execute(interaction) {
        const d = new Date();
        let dayVal = d.getDay(); //The getDay() method returns the day of the week (from 0 to 6) of a date.
        let weeklyRow = new ActionRowBuilder()
        .addComponents('unknown weekly error');
        const sunday = new ButtonBuilder()
			.setCustomId('sunday')
			.setLabel('Sunday')
			.setStyle(ButtonStyle.Secondary);
        const monday = new ButtonBuilder()
			.setCustomId('monday')
			.setLabel('Monday')
			.setStyle(ButtonStyle.Secondary);
        const tuesday = new ButtonBuilder()
			.setCustomId('tuesday')
			.setLabel('Tuesday')
			.setStyle(ButtonStyle.Secondary);
        const wednesday = new ButtonBuilder()
			.setCustomId('wednesday')
			.setLabel('Wednesday')
			.setStyle(ButtonStyle.Secondary);
        const thursday = new ButtonBuilder()
			.setCustomId('thursday')
			.setLabel('Thursday')
			.setStyle(ButtonStyle.Secondary);
        const friday = new ButtonBuilder()
			.setCustomId('friday')
			.setLabel('Friday')
			.setStyle(ButtonStyle.Secondary);
        const saturday = new ButtonBuilder()
			.setCustomId('saturday')
			.setLabel('Saturday')
			.setStyle(ButtonStyle.Secondary);

        let msg = [[],[],[],[],[]];
        if(dayVal===0){
            weeklyRow = new ActionRowBuilder()
			.addComponents(monday, tuesday, wednesday, thursday, friday);
            msg[0].push('monday');
            msg[1].push('tuesday');
            msg[2].push('wednesday');
            msg[3].push('thursday');
            msg[4].push('friday');
        }
        else if(dayVal===1){
            weeklyRow = new ActionRowBuilder()
			.addComponents(tuesday, wednesday, thursday, friday, saturday);
            msg[0].push('tuesday');
            msg[1].push('wednesday');
            msg[2].push('thursday');
            msg[3].push('friday');
            msg[4].push('saturday');
        }
        else if(dayVal===2){
            weeklyRow = new ActionRowBuilder()
			.addComponents(wednesday, thursday, friday, saturday, sunday);
            msg[0].push('wednesday');
            msg[1].push('thursday');
            msg[2].push('friday');
            msg[3].push('saturday');
            msg[4].push('sunday');
        }
        else if(dayVal===3){
            weeklyRow = new ActionRowBuilder()
			.addComponents(thursday, friday, saturday, sunday, monday);
            msg[0].push('thursday');
            msg[1].push('friday');
            msg[2].push('saturday');
            msg[3].push('sunday');
            msg[4].push('monday');
        }
        else if(dayVal===4){
            weeklyRow = new ActionRowBuilder()
			.addComponents(friday, saturday, sunday, monday, tuesday);
            msg[0].push('friday');
            msg[1].push('saturday');
            msg[2].push('sunday');
            msg[3].push('monday');
            msg[4].push('tuesday');
        }
        else if(dayVal===5){
            weeklyRow = new ActionRowBuilder()
			.addComponents(saturday, sunday, monday, tuesday, wednesday);
            msg[0].push('saturday');
            msg[1].push('sunday');
            msg[2].push('monday');
            msg[3].push('tuesday');
            msg[4].push('wednesday');
        }
        else if(dayVal===6){
            weeklyRow = new ActionRowBuilder()
			.addComponents(sunday, monday, tuesday, wednesday, thursday);
            msg[0].push('sunday');
            msg[1].push('monday');
            msg[2].push('tuesday');
            msg[3].push('wednesday');
            msg[4].push('thursday');
        }

        //channelID 1288929775846428834
        let botChannel = "1288929775846428834";
        const weekResponse = await interaction.guild.channels.cache.get(botChannel).send({components:[weeklyRow]});
        //interaction.guild.channels.cache.get(botChannel).send('message');
       // const weekResponse = await(interaction.reply({
           // content: 'Weekly scheduler',
           // components: [weeklyRow]
    //    }));
        const weeklyCollector = weekResponse.createMessageComponentCollector({ componentType: ComponentType.Button, time: 604800000}); // 1 week

        weeklyCollector.on('collect', i => {
            console.log(i.user);
            for(let k=0; k<5; k++){ 
                if(msg[k][0]===i.customId){
                    if(msg[k].indexOf(i.user.globalName)===-1){
                        msg[k].push(i.user.globalName ?? i.user.username);
                    }else{
                        if (msg[k].indexOf(i.user.globalName) > -1) { // only splice array when item is found
                            msg[k].splice(msg[k].indexOf(i.user.globalName), 1); // 2nd parameter means remove one item only
                        }
                    }
                }
            }
            let hold = '';
            for(let j=0; j<5; j++){
                let holdHere = '';
                for(let k=0; k<msg[j].length; k++){
                    if(k===0){
                        holdHere+= msg[j][k] + ': ';
                    }else{
                        holdHere+= msg[j][k] + ', ';
                    }
                }
                hold+= holdHere+'\n';
            }
            i.message.edit(hold)
            .then(msg => console.log(`Updated the content of a message to ${msg.content}`))
            .catch(console.error);
        });

        weeklyCollector.on('end', collected => {
            console.log(`Collected ${collected.size} interactions.`);
        });
	},
};