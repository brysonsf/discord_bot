const { ComponentType, EmbedBuilder , SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, codeBlock, time, blockQuote } = require('discord.js');
function convertToEmoji(color) {
    // check if there is a numba
    let converted = ``;
    if (isNaN(color)) {
        if (color === "R") {
            converted += `<:R_:1248286725189402655> `;
        } else if (color === "W") {
            converted += `<:W_:1248286727261388974>`;
        } else if (color === "G") {
            converted += `<:G_:1248286723990093885>`;
        } else if (color === "B") {
            converted += `<:B_:1248286671007387742>`;
        } else if (color === "U") {
            converted += `<:U_:1248286726275862528>`;
        } else if (color === "C") {
            converted += `<:C_:1248286854105796771>`;
        } else if (color === "T") {
            converted += `<:T_:1248655986743574621>`;
        } else if (color === "X") {
            converted += `<:X_:1248325197115953255>`;
        }
        // hybrid mana
        else if (color === "W/U") {
            converted += `<:WU:1250842026312990877>`;
        } else if (color === "B/G") {
            converted += `<:BG:1250841783840014427>`;
        } else if (color === "W/B") {
            converted += `<:WB:1250842021724422214>`;
        } else if (color === "2/B") {
            converted += `<:2B:1250841777028599891>`;
        } else if (color === "2/G") {
            converted += `<:2G:1250841778601594941>`;
        } else if (color === "2/R") {
            converted += `<:2R:1250841779885051955>`;
        } else if (color === "2/U") {
            converted += `<:2U:1250841780736364625>`;
        } else if (color === "2/W") {
            converted += `<:2W:1250841782502162502>`;
        }
        // phyrexian mana
        else if (color === "B/P") {
            converted += `<:BP:1250841819655311360>`;
        } else if (color === "U/P") {
            converted += `<:UP:1250841909342240952>`;
        } else if (color === "G/P") {
            converted += `<:GP:1250841858335047741>`;
        } else if (color === "R/P") {
            converted += `<:RP:1250841902186758295>`;
        } else if (color === "W/P") {
            converted += `<:WP:1250842025054568509>`;
        }
        //
    } else {
        if (color === 0) {
            converted += '1248286854105796771';
        } else if (color === 1) {
            converted += '1248325191818543204';
        } else if (color === 2) {
            converted += '1248325192921387050';
        } else if (color === 3) {
            converted += '1248325194444050563';
        } else if (color === 4) {
            converted += '1248325195446354112';
        } else if (color === 5) {
            converted += '1248325196465704970';
        }
    }
    return converted;
}
module.exports = {
	data: new SlashCommandBuilder()
		.setName('vote')
		.setDescription('Provides a voting tool forup to 13 items. Leverages reactions to keep track')
        .addStringOption(option =>
            option.setName('list')
                .setDescription('Comma seperated list (ex/ Red, Red/White). Max options 13, lmk if you want more.')
                .setRequired(true)),
	async execute(interaction) {
        const list = interaction.options.getString('list');
        var splitArray = list.split(',');
        const message = await interaction.reply({ content: 'Options be: '+ splitArray, fetchReply: true });
        for(let i=0; i<6; i++){
            if(i===splitArray.length){
                break;
            }
            message.react(String(convertToEmoji(i)));
        }
        if(splitArray.length>6){
            let remainder = splitArray.length-6;
            console.log(remainder);
            let array = ['T', 'G', 'W', 'R', 'B', 'U','X'];
            while(remainder!=0){
                message.react(convertToEmoji(array.pop()));
                remainder--;
            }
        }
        /*
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