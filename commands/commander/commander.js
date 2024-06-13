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
        let scryfallAPIURL = 'https://api.scryfall.com/cards/search?q=' + edhCommander;
        let edhCard = 'https://edhrec.com/commanders/' + edhCommander;
        
        const edhRecData = await (await fetch(linkToEDH)).json();
        
        let cardInfo;
        if(edhRecData.code===403){
            linkToEDH = 'https://json.edhrec.com/pages/cards/spelling-bee.json'
            const failureTypeBeat = await (await fetch(linkToEDH)).json();
            
            cardInfo = failureTypeBeat.container.json_dict.card;

            const exampleEmbed = new EmbedBuilder()
            .setColor('Red')
            .setDescription('you searched for: ' + commanderName)
            .setTitle('Check your fockn spelling baud.')
            .setImage(cardInfo.image_uris[0].normal) // first one is the full card
            await interaction.reply({content:'Searching Commander details: ' + commanderName + '...', embeds: [exampleEmbed]});
        }else{

            cardInfo = edhRecData.container.json_dict.card;
            let manaLogos =``;
            const colorIdentities = {
                'U': 'Blue',
                'G': 'Green',
                'R': 'Red',
                'W': 'White',
                'B': 'Black',
            }
            let embedColour = [];
            cardInfo.color_identity.forEach(manaPib=>{    
                embedColour.push(colorIdentities[manaPib]);
            });
            let description = ``;

            function convertToEmoji(color){
                // check if there is a numba
                let converted = ``;
                if (isNaN(color)){
                    if(color==='R'){
                        converted+= `<:R_:1248286725189402655> `;
                    }else if(color==='W'){
                        converted+= `<:W_:1248286727261388974> `;
                    }else if(color==='G'){
                        converted+= `<:G_:1248286723990093885> `;
                    }else if(color==='B'){
                        converted+= `<:B_:1248286671007387742> `;
                    }else if(color==='U'){
                        converted+= `<:U_:1248286726275862528> `;
                    }else if(color==='C'){
                        converted+= `<:C_:1248286854105796771> `;
                    }else if (color==='T'){
                        converted+= `<:T_:1248655986743574621>`;
                    }else if(color==='X'){
                        converted+= `<:X_:1248325197115953255`;
                    }
                }else{
                        if(color === '1'){
                            converted += `<:1_:1248325191818543204> `;
                        } else if(color === '2'){
                            converted += `<:2_:1248325192921387050> `;
                        } else if(color === '3'){
                            converted += `<:3_:1248325194444050563> `;
                        } else if(color === '4'){
                            converted += `<:4_:1248325195446354112> `;
                        } else if(color === '5'){
                            converted += `<:5_:1248325196465704970> `;
                        }
                }
                return converted;
            }

            let oracle = '';
            // Make a GET request
            await fetch(scryfallAPIURL)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                    })
                .then(rawData => {
                    // errors on zero thouh !response.ok
                    if(rawData.total_cards>1){
                        rawData.data.forEach(card =>{
                            // get oracle text
                            // check for manas
                            for(let i=0; i<card.oracle_text.length; i++){
                                if(card.oracle_text.charAt(i) === '{'){
                                    i++; // move to mana letter
                                    oracle += convertToEmoji(card.oracle_text.charAt(i));
                                    i++; // move to the last bracket (will increment away) 
                                } else {
                                    oracle += card.oracle_text.charAt(i);
                                    if(card.oracle_text.charAt(i) === '.'){
                                        oracle += '\n\n';
                                    }
                                }
                            }
                            if(commanderName.toString().toUpperCase() === card.name.toUpperCase()){ // full case matching
                                // console.log(card.type_line); console.log(cardInfo.type); can compare types if needed
                                for(let i=0; i<card.mana_cost.length; i++){
                                    if(card.mana_cost.charAt(i)!=='{' && card.mana_cost.charAt(i)!=='}' && card.mana_cost.charAt(i)!=='-' && card.mana_cost.charAt(i)!==','){
                                        const color = card.mana_cost.charAt(i);
                                        manaLogos += convertToEmoji(color);
                                    }
                                }
                            }
                            
                        })
                    }else{
                        let card = rawData.data[0];
                        let cardNameNoGrammar = ``;
                        for(let i=0; i<card.name.length; i++){
                            if(card.name.charAt(i)!==','){
                                cardNameNoGrammar+= card.name.charAt(i);
                            }
                        }
                        for(let i=0; i<card.oracle_text.length; i++){
                            if(card.oracle_text.charAt(i) === '{'){
                                i++; // move to mana letter
                                oracle += convertToEmoji(card.oracle_text.charAt(i));
                                i++; // move to the last bracket (will increment away) 
                            } else {
                                oracle += card.oracle_text.charAt(i);
                                if(card.oracle_text.charAt(i) === '\n'){
                                    oracle += '\n\n';
                                }
                            }
                        }
                        if(commanderName.toUpperCase() === cardNameNoGrammar.toUpperCase()){ // full case matching
                            // console.log(card.type_line); console.log(cardInfo.type); can compare types if needed
                            for(let i=0; i<card.mana_cost.length; i++){
                                if(card.mana_cost.charAt(i)!=='{' && card.mana_cost.charAt(i)!=='}' && card.mana_cost.charAt(i)!=='-' && card.mana_cost.charAt(i)!==','){
                                    const color = card.mana_cost.charAt(i);
                                    manaLogos += convertToEmoji(color);
                                }
                            }
                        }
                    }
                    })
                .catch(error => {
                    console.error('Error:', error);
                });

           
                let themes = [];
                edhRecData.panels.tribelinks.themes.forEach(theme =>{
                    themes.push({themeName: theme.value, themeCount: theme.count});
                });
                let strBuilt = '';
                themes.forEach(theme =>{
                    strBuilt+= theme.themeName + ' ' + theme.themeCount + '\n';
                });
                const highlighted = blockQuote(strBuilt);
                const oracleOfDelphi = blockQuote(oracle);
                const exampleEmbed = new EmbedBuilder()
                    .setColor('Grey')
                    .setTitle(commanderName + ' ' + manaLogos)
                    .setDescription(oracleOfDelphi)
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
                    if(embedColour[x]==='Black'){
                        embedColour[x] = 'NotQuiteBlack';
                    }
                    exampleEmbed
                        .setColor(embedColour[x]);
                }
                
                await interaction.reply({content:'Searching Commander details: ' + commanderName + '...',  
                embeds: [exampleEmbed]});
            
        }
	},
};