const { SlashCommandBuilder, blockQuote, EmbedBuilder } = require("discord.js");
function convertToEmoji(color) {
    // check if there is a numba
    let converted = ``;
    if (isNaN(color)) {
        if (color === "R") {
            converted += `<:R_:1248286725189402655> `;
        } else if (color === "W") {
            converted += `<:W_:1248286727261388974> `;
        } else if (color === "G") {
            converted += `<:G_:1248286723990093885> `;
        } else if (color === "B") {
            converted += `<:B_:1248286671007387742> `;
        } else if (color === "U") {
            converted += `<:U_:1248286726275862528> `;
        } else if (color === "C") {
            converted += `<:C_:1248286854105796771> `;
        } else if (color === "T") {
            converted += `<:T_:1248655986743574621>`;
        } else if (color === "X") {
            converted += `<:X_:1248325197115953255> `;
        }
        // hybrid mana
        else if (color === "W/U") {
            converted += `<:WU:1250842026312990877> `;
        } else if (color === "B/G") {
            converted += `<:BG:1250841783840014427> `;
        } else if (color === "W/B") {
            converted += `<:WB:1250842021724422214> `;
        } else if (color === "2/B") {
            converted += `<:2B:1250841777028599891> `;
        } else if (color === "2/G") {
            converted += `<:2G:1250841778601594941> `;
        } else if (color === "2/R") {
            converted += `<:2R:1250841779885051955> `;
        } else if (color === "2/U") {
            converted += `<:2U:1250841780736364625> `;
        } else if (color === "2/W") {
            converted += `<:2W:1250841782502162502> `;
        }
        // phyrexian mana
        else if (color === "B/P") {
            converted += `<:BP:1250841819655311360> `;
        } else if (color === "U/P") {
            converted += `<:UP:1250841909342240952> `;
        } else if (color === "G/P") {
            converted += `<:GP:1250841858335047741> `;
        } else if (color === "R/P") {
            converted += `<:RP:1250841902186758295> `;
        } else if (color === "W/P") {
            converted += `<:WP:1250842025054568509> `;
        }
        //
    } else {
        if (color === "0") {
            converted += `<:0_:1248286854105796771> `;
        } else if (color === "1") {
            converted += `<:1_:1248325191818543204> `;
        } else if (color === "2") {
            converted += `<:2_:1248325192921387050> `;
        } else if (color === "3") {
            converted += `<:3_:1248325194444050563> `;
        } else if (color === "4") {
            converted += `<:4_:1248325195446354112> `;
        } else if (color === "5") {
            converted += `<:5_:1248325196465704970> `;
        }
    }
    return converted;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("commander")
        .addStringOption((option) =>
            option
                .setName("name")
                .setDescription(
                    "The name of the Commander to lookup on Scryfall/EDHRec.",
                )
                .setRequired(true),
        )
        .setDescription(
            "Provides information about commanders sourced from Scryfall + EDHRec.",
        ),
    async execute(interaction) {
        let manaLogos = ``;
        const colorIdentities = {
            U: "Blue",
            G: "Green",
            R: "Red",
            W: "White",
            B: "Black",
        };
        let embedColour = [];
        const commanderName = interaction.options.getString("name");
        let edhCommander = commanderName
            .replace(/\s/g, "-")
            .replace(/\s/g, ",")
            .toLowerCase();
        let linkToEDH =
            "https://json.edhrec.com/pages/commanders/" +
            edhCommander +
            ".json";
        let scryfallAPIURL =
            "https://api.scryfall.com/cards/search?q=" + edhCommander;
        const scryfallData = await (await fetch(scryfallAPIURL))
            .json()
            .catch((error) => {
                console.error("Error:", error);
            });
        let card;

        let cardInfo;
        //edhRecData.code === 403 &&
        if (scryfallData.status === 404) {
            // can't find card in either place
            if (scryfallAPIURL)
                linkToEDH =
                    "https://json.edhrec.com/pages/cards/spelling-bee.json";
            const failureTypeBeat = await (await fetch(linkToEDH)).json();

            cardInfo = failureTypeBeat.container.json_dict.card;

            const exampleEmbed = new EmbedBuilder()
                .setColor("Red")
                .setDescription("you searched for: " + commanderName)
                .setTitle(
                    "Make sure this is a viable commander, or check your fockn spelling baud. Use scryfall [[card_name]] for non-commanders.",
                )
                .setImage(cardInfo.image_uris[0].normal); // first one is the full card
            await interaction.reply({
                content:
                    "Searching Commander details: " + commanderName + "...",
                embeds: [exampleEmbed],
            });
        } else {
            let oracle = "";
            let cardType = "";
            let commaless = "";
            let imageLink = [];
            let nameList = [];
            imageLink[0] = "https://i.imgur.com/KJkSGXI.jpeg";
            imageLink[1] = "https://i.imgur.com/YGtKr7j.jpeg";
            if (scryfallData.total_cards === 1) {
                // scryfall found the card
                cardInfo = scryfallData.data[0];
                cardInfo.color_identity.forEach((manaPib) => {
                    embedColour.push(colorIdentities[manaPib]);
                });
                card = cardInfo;
                cardType = card.type_line;
                imageLink[0] = card.image_uris.normal;
                imageLink[1] = card.image_uris.art_crop;
                for (let i = 0; i < card.oracle_text.length; i++) {
                    if (card.oracle_text.charAt(i) === "{") {
                        i++; // move to mana letter
                        let hold;
                        if (card.oracle_text.charAt(i + 1) === "/") {
                            // this means it is a split letter 2/B
                            hold =
                                card.oracle_text.charAt(i) +
                                card.oracle_text.charAt(i + 1) +
                                card.oracle_text.charAt(i + 2);
                            i++;
                            i++; // move past next few letters
                        } else {
                            hold = card.oracle_text.charAt(i);
                        }
                        oracle += convertToEmoji(hold);
                        i++; // move to the last bracket (will increment away)
                    } else {
                        oracle += card.oracle_text.charAt(i);
                        if (card.oracle_text.charAt(i) === "\n") {
                            oracle += "\n\n";
                        }
                    }
                }
                for (let i = 0; i < card.name.length; i++) {
                    if (card.name.charAt(i) === ",") {
                        i++;
                    }
                    commaless += card.name.charAt(i);
                }
                for (let i = 0; i < card.mana_cost.length; i++) {
                    if (
                        card.mana_cost.charAt(i) !== "{" &&
                        card.mana_cost.charAt(i) !== "}" &&
                        card.mana_cost.charAt(i) !== "-" &&
                        card.mana_cost.charAt(i) !== ","
                    ) {
                        let color = "";
                        if (card.mana_cost.charAt(i + 1) === "/") {
                            color +=
                                card.mana_cost.charAt(i) +
                                card.mana_cost.charAt(i + 1) +
                                card.mana_cost.charAt(i + 2);
                            i++;
                            i++;
                            i++;
                        } else {
                            color += card.mana_cost.charAt(i);
                        }
                        manaLogos += convertToEmoji(color);
                    }
                }
            } else if (scryfallData.total_cards > 1) {
                // scryfall found multiple
                cardInfo = scryfallData.data; // no [0], many cards found
                cardInfo.forEach((rawData) => {
                    nameList.push(rawData.name);
                });
            }

            edhCommander = commaless.replace(/\s/g, "-").toLowerCase();
            let edhCard = "https://edhrec.com/commanders/" + edhCommander;
            linkToEDH =
                "https://json.edhrec.com/pages/commanders/" +
                edhCommander +
                ".json";
            let strBuilt = "";
            const edhRecData = await (await fetch(linkToEDH)).json();
            
            //https://json.edhrec.com/pages/partners/the-tenth-doctor.json
            //get partner details
            let partners = [];
            if(oracle.includes('Partner') || oracle.includes('Doctor\'s companion') || cardType === "Legendary Creature — Time Lord Doctor"){
                let partnerInfo =
                "https://json.edhrec.com/pages/partners/" +
                edhCommander +
                ".json";
                const edhPartnerData = await (await fetch(partnerInfo)).json();
                if (edhPartnerData.code !== 403) {
                    edhPartnerData.partnercounts.forEach(partner =>{
                        partners.push({name: partner.value, count: partner.count});
                    });
                }
                partners.forEach((partner) => {
                    strBuilt += partner.name + " " + partner.count + "\n";
                });
                strBuilt += "\n";
            }
            // get themes
            let themes = [];
            // partner page: https://edhrec.com/commanders/krark-the-thumbless-sakashima-of-a-thousand-faces
            if (edhRecData.code !== 403 && edhRecData.panels['tribelinks']) {
                // get themes
                let tribeHold = edhRecData.panels.tribelinks;
                if(tribeHold.length>1){ // if one exists, it is the dif format
                    tribeHold.forEach((theme) => {
                        themes.push({
                            themeName: theme.value,
                            themeCount: theme.count,
                        });
                    });
                }else{ 
                    tribeHold.themes.forEach((theme) => {
                        themes.push({
                            themeName: theme.value,
                            themeCount: theme.count,
                        });
                    });
                }
                themes.forEach((theme) => {
                    strBuilt += theme.themeName + " " + theme.themeCount + "\n";
                });
            }
            
            let excess = "";
            if (nameList.length > 0) {
                // n extra cards found
                nameList.forEach((cardName) => {
                    excess += cardName + "\n";
                });
            }
            let oracleOfDelphi = blockQuote(excess);
            if (oracle !== "") {
                oracleOfDelphi = blockQuote(oracle);
            }
            let exampleEmbed = new EmbedBuilder()
                .setColor("Grey")
                .setTitle(edhCommander + " " + manaLogos)
                .setDescription(oracleOfDelphi)
                .setURL(edhCard)
                .setImage(imageLink[0]) // first one is the full card
                .setFooter({
                    text: commanderName,
                    iconURL: imageLink[1],
                }); // the second one is just center image
            if(strBuilt.length>1024){
                let tempFill = '';
                // or i can try to add another field
                function truncate(str, maxlength) {
                    return (str.length > maxlength) ?
                      str.slice(0, maxlength - 1) + '…' : str;
                }
                exampleEmbed.addFields({ name: "Themes/Partners", value: blockQuote(truncate(strBuilt, 1020)) });
                for(let k=1020; k<strBuilt.length; k++){
                    tempFill+= strBuilt.charAt(k);
                }
                if(tempFill!==''){
                    exampleEmbed.addFields({ name: "Themes/Partners", value: blockQuote(tempFill) });
                }
            }else{
                exampleEmbed.addFields({ name: "Themes/Partners", value: blockQuote(strBuilt) })
            }

            if (embedColour.length === 1) {
                if (embedColour[0] === "Black") {
                    embedColour[0] = "NotQuiteBlack";
                }
                exampleEmbed.setColor(embedColour[0]);
            } else {
                if (embedColour.length !== 0) {
                    let x = Math.ceil(Math.random() * 5); // max color identity is 5 (not counting colorless) pick one at random
                    if (x > embedColour.length - 1) {
                        x = 0; // take first color if we go outside of colors
                    }
                    if (embedColour[x] === "Black") {
                        embedColour[x] = "NotQuiteBlack";
                    }
                    exampleEmbed.setColor(embedColour[x]);
                }
            }
            await interaction.reply({
                embeds: [exampleEmbed],
            });
        }
    },
};
