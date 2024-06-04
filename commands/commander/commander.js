// colors: W(white) R(red) B(black) U(blue) G(green) 
const { SlashCommandBuilder } = require('discord.js');

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
        const edhRecData = await (await fetch(linkToEDH)).json();
        let themes = [];
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
            edhRecData.panels.tribelinks.themes.forEach(theme =>{
                themes.push({themeName: theme.value, themeCount: theme.count});
            });
            console.log(themes);
            let strBuilt = '';
            themes.forEach(theme =>{
                strBuilt+= theme.themeName + ' ' + theme.themeCount + '\n';
            });
            await interaction.reply({content:'Searching Commander details: ' + commanderName + '...\nThemes:\n' + strBuilt });
        }
        
	},
};