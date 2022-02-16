require("dotenv-safe").config();
const { Client, Intents, GuildMemberManager, Guild } = require("discord.js");
const { solNftRadarServerId, privillegedPollChannels } = require("./src/constants");
const handleReactionAdd = require("./src/handleReactionAdd");

process.on("uncaughtException", err => console.error(err));
process.on("unhandledRejection", err => console.error(err));

const client = new Client({ 
  intents: [
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.GUILD_MEMBERS, 
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
  ]
})

client.on('ready', async () => {
  const guilds = await client.guilds.fetch();
  const partialRadarDaoGuild = guilds.get(solNftRadarServerId)
  if (partialRadarDaoGuild) {
    const radarDaoGuild = await partialRadarDaoGuild.fetch();
    await Promise.all(privillegedPollChannels.map(async channelId => {
      const channel = await radarDaoGuild.channels.fetch(channelId);
      channel.messages.fetch();
    }))
  } else {
    console.log(`Warning: Unable to fetch messages from RadarDAO`);
  }
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageReactionAdd', (reaction, user) => handleReactionAdd(client, reaction, user))

client.login(process.env.BOT_TOKEN);
