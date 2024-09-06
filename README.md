# discord_bot
test dev environment for discord bot development.

created using node.js

## Running the app
run `node deploy-commands.js` to redeploy commands before running the bot.

run `node .` to activate the bot.

## Live Hosting Info
live server panel is found at:
https://panel.breezehost.xyz/

Running the app locally for testing will require you to STOP the beezehost server at:
https://panel.breezehost.xyz/server/b7cd1fb7

Name: Satanic_pizza_teacher
Package: NodeJS
ID: b7cd1fb7

- The server will run in the background.
- If you make changes, you will need to restart the breezehost server in order to see those changes reflected in the live version.

## config help
{
    "clientId": found on discord developer portal
    "guildId": copy server id from discord, 
    "token": found on dis dev portal in Bot tab under token
}

## Planned/Todo:
 - change plan command to be more easily used
  - track button clicks for available/unavailable players
 - weekly availability calendar
 - include STFP connection for transferring up to date (or just raw upload to site on good changes)
