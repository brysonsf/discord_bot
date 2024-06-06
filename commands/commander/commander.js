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
        /*const manaImageLinks = {
            '0': 'https://i.ibb.co/6bBGrfP/image.png',
            '1': 'https://i.ibb.co/xs3PxGg/1.png',
            '2': 'https://i.ibb.co/bQW3WkM/2.png',
            '2B': 'https://i.ibb.co/Jt5Jhqs/2B.png',
            "2G": 'https://i.ibb.co/wW3ZRHQ/2G.png',
            '2R': 'https://i.ibb.co/mv4grZJ/2R.png',
            '2U': 'https://i.ibb.co/Nx8YyvF/2U.png',
            '2W': 'https://i.ibb.co/k9B82HG/2W.png',
            '3': 'https://i.ibb.co/7kkDT3J/3.png',
            '4': 'https://i.ibb.co/YZB5xzC/4.png',
            '5': 'https://i.ibb.co/Wv9SDPP/5.png',
            '6': 'https://i.ibb.co/ftr4Z9j/6.png',
            '7': 'https://i.ibb.co/2WSXpjj/7.png',
            '8': 'https://i.ibb.co/twfycVk/8.png',
            '9': 'https://i.ibb.co/gJGNRzH/9.png',
            '10': 'https://i.ibb.co/wKXyzk0/10.png',
            '11': 'https://i.ibb.co/VM2GHbD/11.png',
            '12': 'https://i.ibb.co/C1xMktH/12.png',
            '13': 'https://i.ibb.co/9Z8T1fN/13.png',
            '14': 'https://i.ibb.co/ZSYsmPQ/14.png',
            '15': 'https://i.ibb.co/1mpjW8q/15.png',
            '16': 'https://i.ibb.co/n0W3Lch/16.png',
            '17': 'https://i.ibb.co/BZbQcBy/17.png',
            '18': 'https://i.ibb.co/fYPwZyf/18.png',
            '19': 'https://i.ibb.co/1v5NZYx/19.png',
            '20': 'https://i.ibb.co/hF277ch/20.png',
            'B': 'https://i.ibb.co/ZmWr7z0/B.png',
            'BG': 'https://i.ibb.co/0XJSPG5/BG.png',
            'BGP': 'https://i.ibb.co/zHZDkx0/BGP.png',
            'BP': 'https://i.ibb.co/GnBvBxv/BP.png',
            'BR': 'https://i.ibb.co/WH5Pk6M/BR.png',
            'BRP': 'https://i.ibb.co/LntpNCx/BRP.png',
            'C': 'https://i.ibb.co/nBQX77W/C.png',
            'CB': 'https://i.ibb.co/0mjc7gt/CB.png',
            'CG': 'https://i.ibb.co/r65bbjg/CG.png',
            'CR': 'https://i.ibb.co/7Y8td8S/CR.png',
            'CU': 'https://i.ibb.co/yf9LjyM/CU.png',
            'CW': 'https://i.ibb.co/nLrDL4s/CW.png',
            'G': 'https://i.ibb.co/42tY5Lm/G.png',
            'GP': 'https://i.ibb.co/59fbzCb/GP.png',
            'GU': 'https://i.ibb.co/nRw1R05/GU.png',
            'GUP': 'https://i.ibb.co/Y39F30z/GUP.png',
            'GW': 'https://i.ibb.co/dDznVJ0/GW.png',
            'GWP': 'https://i.ibb.co/xM9YB0P/GWP.png',
            'R': 'https://i.ibb.co/54yq5Bx/R.png',
            'RG': 'https://i.ibb.co/qDfkbP0/RG.png',
            'RGP': 'https://i.ibb.co/5nQvyjd/RGP.png',
            'RP': 'https://i.ibb.co/nCWyCV9/RP.png',
            'RW': 'https://i.ibb.co/3CD7Mt1/RW.png',
            'RWP': 'https://i.ibb.co/7jRYVsT/RWP.png',
            'U': 'https://i.ibb.co/9nm996x/U.png',
            'UB': 'https://i.ibb.co/CQcs18r/UB.png',
            'UBR': 'https://i.ibb.co/0XX6JmX/UBP.png',
            'UP': 'https://i.ibb.co/d70K09G/UP.png',
            'UR': 'https://i.ibb.co/C83d6vT/UR.png',
            'URP': 'https://i.ibb.co/VW3RZ4j/URP.png',
            'W': 'https://i.ibb.co/Jn0FCTG/W.png',
            'WB': 'https://i.ibb.co/Ky23x0b/WB.png',
            'WBP': 'https://i.ibb.co/BGCVJ4y/WBP.png',
            'WP': 'https://i.ibb.co/fdWnzpM/WP.png',
            'WU': 'https://i.ibb.co/k0zxDnY/WU.png',
            'WUP': 'https://i.ibb.co/n8W0mFj/WUP.png',
            'X': 'https://i.ibb.co/nc5g68j/X.png'
        }
            
        console.log(manaImageLinks['1']);
        const colorEmbed = new EmbedBuilder()
        .setTitle('COLORS')
        .setDescription(manaImageLinks['1'])
        .addFields(
            { name: 'Regular field title', value: manaImageLinks['2G'], inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'Inline field title', value: manaImageLinks['1'], inline: true },
        )
        .setImage(manaImageLinks['20']);
        */

        const commanderName = interaction.options.getString('name');
        const edhCommander = commanderName.replace(/\s/g,"-");
		
        let linkToEDH = 'https://json.edhrec.com/pages/commanders/' + edhCommander + '.json';
        let scryfallAPIURL = 'https://api.scryfall.com/cards/search?q=' + edhCommander;
        let edhCard = 'https://edhrec.com/commanders/' + edhCommander;
        
        const edhRecData = await (await fetch(linkToEDH)).json();
        
        let cardInfo;
        cardInfo = edhRecData.container.json_dict.card;

        let description =``;
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
                        if(commanderName.toString().toUpperCase() === card.name.toUpperCase()){ // full case matching
                            // console.log(card.type_line); console.log(cardInfo.type); can compare types if needed
                            for(let i=0; i<card.mana_cost.length; i++){
                                if(card.mana_cost.charAt(i)!=='{' && card.mana_cost.charAt(i)!=='}' && card.mana_cost.charAt(i)!=='-' && card.mana_cost.charAt(i)!==','){
                                    const color = card.mana_cost.charAt(i);
                                     // check if there is a numba
                                    if (isNaN(color)){
                                        if(color==='R'){
                                            description+= `<:R_:1248286725189402655> `;
                                        }else if(color==='W'){
                                            description+= `<:W_:1248286727261388974> `;
                                        }else if(color==='G'){
                                            description+= `<:G_:1248286723990093885> `;
                                        }else if(color==='B'){
                                            description+= `<:B_:1248286671007387742> `;
                                        }else if(color==='U'){
                                            description+= `<:U_:1248286726275862528> `;
                                        }else if(color==='C'){
                                            description+= `<:C_:1248286854105796771> `;
                                        }
                                    }else{
                                        // check if there is a numba
                                        if (!isNaN(color)){
                                            if(color === 1){
                                                description += `<:1_:1248325191818543204> `;
                                            } else if(color === 2){
                                                description += `<:2_:1248325192921387050> `;
                                            } else if(color === 3){
                                            }
                                        }
                                    }
            
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
                    if(commanderName.toUpperCase() === cardNameNoGrammar.toUpperCase()){ // full case matching
                        // console.log(card.type_line); console.log(cardInfo.type); can compare types if needed
                        for(let i=0; i<card.mana_cost.length; i++){
                            if(card.mana_cost.charAt(i)!=='{' && card.mana_cost.charAt(i)!=='}' && card.mana_cost.charAt(i)!=='-' && card.mana_cost.charAt(i)!==','){
                                const color = card.mana_cost.charAt(i);
                                    // check if there is a numba
                                if (isNaN(color)){
                                    if(color==='R'){
                                        description+= `<:R_:1248286725189402655> `;
                                    }else if(color==='W'){
                                        description+= `<:W_:1248286727261388974> `;
                                    }else if(color==='G'){
                                        description+= `<:G_:1248286723990093885> `;
                                    }else if(color==='B'){
                                        description+= `<:B_:1248286671007387742> `;
                                    }else if(color==='U'){
                                        description+= `<:U_:1248286726275862528> `;
                                    }else if(color==='C'){
                                        description+= `<:C_:1248286854105796771> `;
                                    }
                                }else{
                                    // check if there is a numba
                                    if (!isNaN(color)){
                                        if(color === '1'){
                                            description += `<:1_:1248325191818543204> `;
                                        } else if(color === '2'){
                                            description += `<:2_:1248325192921387050> `;
                                        } else if(color === '3'){
                                        }
                                    }
                                }
        
                            }
                        }
                    }
                    
                }
                })
            .catch(error => {
                console.error('Error:', error);
            });

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