# discord_bot
test dev environment for discord bot development.

created using node.js

## Running the app
run `node deploy-commands.js` to redeploy commands before running the bot.

run `node .` to activate the bot.

## Live Hosting Info
Running the app triggers the express server, which is hosted on replit at:
https://4938dc2c-5872-45d8-81c6-6647f4352fe0-00-22wl4yo9aet4.spock.replit.dev/

the bot is kept active via 5 minute uptime-robot pings at: https://dashboard.uptimerobot.com/monitors/797099840

Replit codebase:
https://replit.com/@brysonsf/discordbot

## Notes on hosting
- Once deployed, the server will continue to run in the background.
- The server will stay awake and active until an hour after its last request, after which it will enter a sleeping stage. 
- Sleeping repls will be woken up as soon as it receives another request (from uptime-robot)
- If you make changes to your server, you will need to restart the repl in order to see those changes reflected in the live version.

## Planned/Todo:
 - weekly availability calendar
 - card themes for commander