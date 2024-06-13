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
        let manaLogos =``;
        const colorIdentities = {
            'U': 'Blue',
            'G': 'Green',
            'R': 'Red',
            'W': 'White',
            'B': 'Black',
        }
        let embedColour = [];
        const commanderName = interaction.options.getString('name');
        const edhCommander = commanderName.replace(/\s/g,"-").replace(/\s/g,",").toLowerCase();
        let linkToEDH = 'https://json.edhrec.com/pages/commanders/' + edhCommander + '.json';
        let scryfallAPIURL = 'https://api.scryfall.com/cards/search?q=' + edhCommander;
        let edhCard = 'https://edhrec.com/commanders/' + edhCommander;
        const edhRecData = await (await fetch(linkToEDH)).json();
        let themes = [];
        if(edhRecData.code!==403){
            edhRecData.panels.tribelinks.themes.forEach(theme =>{
                themes.push({themeName: theme.value, themeCount: theme.count});
            });
        }
        let strBuilt = '';
        themes.forEach(theme =>{
            strBuilt+= theme.themeName + ' ' + theme.themeCount + '\n';
        });
        const scryfallData = await (await (fetch(scryfallAPIURL))).json()
        .catch(error => {
            console.error('Error:', error);
        })
        let card;
        
        let cardInfo;
        if(edhRecData.code===403 && scryfallData.status===404){ // can't find card in either place
            if(scryfallAPIURL)
            linkToEDH = 'https://json.edhrec.com/pages/cards/spelling-bee.json'
            const failureTypeBeat = await (await fetch(linkToEDH)).json();
            
            cardInfo = failureTypeBeat.container.json_dict.card;

            const exampleEmbed = new EmbedBuilder()
            .setColor('Red')
            .setDescription('you searched for: ' + commanderName)
            .setTitle('Make sure this is a viable commander, or check your fockn spelling baud. Use scryfall [[card_name]] for non-commanders.')
            .setImage(cardInfo.image_uris[0].normal) // first one is the full card
            await interaction.reply({content:'Searching Commander details: ' + commanderName + '...', embeds: [exampleEmbed]});
        }else{
            cardInfo = scryfallData.data;
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
                        converted+= `<:X_:1248325197115953255> `;
                    } else if(color==='W/U'){
                        converted += `<:WU:1250842026312990877> `;
                    } else if(color==='B/G'){
                        converted += `<:BG:1250841783840014427> `;
                    } else if(color==='W/B'){
                        converted += `<:WB:1250842021724422214> `;
                    }
                }else{
                    if(color === '0'){
                        converted += `<:0_:1248286854105796771> `;
                    } else if(color === '1'){
                        converted += `<:1_:1248325191818543204> `;
                    } else if(color === '2'){
                        converted += `<:2_:1248325192921387050> `;
                    } else if(color === '3'){
                        converted += `<:3_:1248325194444050563> `;
                    } else if(color === '4'){
                        converted += `<:4_:1248325195446354112> `;
                    } else if(color === '5'){
                        converted += `<:5_:1248325196465704970> `;
                    } else if(color==='2/B'){
                        converted += `<:2B:1250841777028599891> `;
                    }
                }
                return converted;
            }
            let oracle = '';
            cardInfo.forEach(rawData =>{
                rawData.color_identity.forEach(manaPib=>{    
                    embedColour.push(colorIdentities[manaPib]);
                });
                // errors on zero though !response.ok
                if(rawData.total_cards>1){
                    rawData.data.forEach(card =>{
                        // get oracle text
                        // check for manas
                        for(let i=0; i<card.oracle_text.length; i++){
                            if(card.oracle_text.charAt(i) === '{'){
                                i++; // move to mana letter
                                let hold;
                                if(card.oracle_text.charAt(i+1)==="/"){
                                    // this means it is a split letter 2/B
                                    hold = card.oracle_text.charAt(i)+card.oracle_text.charAt(i+1)+card.oracle_text.charAt(i+2);
                                    i++; // skip over to excess slash
                                    i++;// move past to next letter
                                    i++;// move past to bracket close (skips by increment)
                                }else{
                                    hold = card.oracle_text.charAt(i);
                                }
                                oracle += convertToEmoji(hold);

                                i++; // move to the last bracket (will increment away) 
                            } else {
                                oracle += card.oracle_text.charAt(i);
                                if(card.oracle_text.charAt(i) === '.'){
                                    oracle += '\n\n';
                                }
                            }
                        }
                        if(commanderName.toString().toUpperCase() === card.name.toUpperCase()){ // full case matching
                            for(let i=0; i<card.mana_cost.length; i++){
                                if(card.mana_cost.charAt(i)!=='{' && card.mana_cost.charAt(i)!=='}' && card.mana_cost.charAt(i)!=='-' && card.mana_cost.charAt(i)!==','){
                                    let color;
                                    if(card.mana_cost.charAt(i+1)==='/'){
                                        color = card.mana_cost.charAt(i)+card.mana_cost.charAt(i+1)+card.mana_cost.charAt(i+2);
                                        i++;
                                        i++;
                                        i++;
                                    }else{
                                        color = card.mana_cost.charAt(i);
                                    }
                                    manaLogos += convertToEmoji(color);
                                }
                            }
                        }
                    })
                }else{
                    card = rawData;
                    for(let i=0; i<card.oracle_text.length; i++){
                        if(card.oracle_text.charAt(i) === '{'){
                            i++; // move to mana letter
                            let hold;
                            if(card.oracle_text.charAt(i+1)==="/"){
                                // this means it is a split letter 2/B
                                hold = card.oracle_text.charAt(i)+card.oracle_text.charAt(i+1)+card.oracle_text.charAt(i+2);
                                i++;
                                i++;// move past next few letters
                            }else{
                                hold = card.oracle_text.charAt(i);
                            }
                            oracle += convertToEmoji(hold);
                            i++; // move to the last bracket (will increment away) 
                        } else {
                            oracle += card.oracle_text.charAt(i);
                            if(card.oracle_text.charAt(i) === '\n'){
                                oracle += '\n\n';
                            }
                        }
                    }
                    let commaless = '';
                    for(let i=0; i<card.name.length; i++){
                        if(card.name.charAt(i) === ','){
                            i++;
                        }
                        commaless += card.name.charAt(i);
                    }
                    for(let i=0; i<card.mana_cost.length; i++){
                            if(card.mana_cost.charAt(i)!=='{' && card.mana_cost.charAt(i)!=='}' && card.mana_cost.charAt(i)!=='-' && card.mana_cost.charAt(i)!==','){
                                let color;
                                if(card.mana_cost.charAt(i+1)==='/'){
                                    color = card.mana_cost.charAt(i)+card.mana_cost.charAt(i+1)+card.mana_cost.charAt(i+2);
                                    i++;
                                    i++;
                                    i++;
                                }else{
                                    color = card.mana_cost.charAt(i);
                                }
                                manaLogos += convertToEmoji(color);
                            }
                        }
                    }
                
            });
            console.log(manaLogos);
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
                .setImage(card.image_uris.normal) // first one is the full card
                .setFooter({ text: commanderName, iconURL: card.image_uris.art_crop }); // the second one is just center image
            
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