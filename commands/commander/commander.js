const { SlashCommandBuilder, blockQuote, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commander')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the Commander to lookup on EDHRec (ex/ kwain the itinerant')
                .setRequired(true))
		.setDescription('Provides information about commanders sourced from EDHRec.'),
	async execute(interaction) {
        const commanderName = interaction.options.getString('name');
        const edhCommander = commanderName.replace(/\s/g,"-");
		let linkToEDH = 'https://json.edhrec.com/pages/commanders/' + edhCommander + '.json';
		let edhCard = 'https://edhrec.com/commanders/' + edhCommander;
        const edhRecData = await (await fetch(linkToEDH)).json();
        /*
        edhRecData.panels.links.forEach(category =>{
            if(category.header==="Themes"){
                category.items.forEach(theme =>{
                    themes.push(theme);
                });
            }
        });
        */
        if(edhRecData.code){
            await interaction.reply({content:'Commander ' + commanderName + ' cannot be found.'});
        }else{
            let themes = [];
            edhRecData.panels.tribelinks.themes.forEach(theme =>{
                themes.push({themeName: theme.value, themeCount: theme.count});
            });
            let strBuilt = '';
            themes.forEach(theme =>{
                strBuilt+= theme.themeName + ' ' + theme.themeCount + '\n';
            });
            const highlighted = blockQuote(strBuilt);

            let cardInfo;
            cardInfo = edhRecData.container.json_dict.card;
            const colorIdentities = {
                'U': 'Blue',
                'G': 'Green',
                'R': 'Red',
                'W': 'White',
                'B': 'Black',
            }
            let embedColour = [];
            let description = 'Color Identity: ';
            
            console.log(cardInfo);

            cardInfo.color_identity.forEach(color=>{
                // red green blue white red
                description += colorIdentities[color] + ' ';
                embedColour.push(colorIdentities[color]);
            });
            const exampleEmbed = new EmbedBuilder()
                .setColor('Grey')
                .setTitle(commanderName)
                .setDescription(description)
                .setURL(edhCard)
                .addFields(
                    { name: 'Themes', value: highlighted},
                )
                .setImage(cardInfo.image_uris[0].normal) // first one is the full card
                .setFooter({ text: commanderName, iconURL: cardInfo.image_uris[0].art_crop }); // the second one is just center image
            if (embedColour.length===1){
                exampleEmbed
                    .setColor(embedColour[0]);
            }else{
                let x = Math.ceil(Math.random() * 5); // max color identity is 5 (not counting colorless) pick one at random
                if(x>embedColour.length-1){
                    x = 0; // take first color if we go outside of colors
                }
                exampleEmbed
                    .setColor(embedColour[x]);
            }
            

            await interaction.reply({content:'Searching Commander details: ' + commanderName + '...',  
            embeds: [exampleEmbed]});
        }
        
	},
};