const {
  solNftRadarServerId,
  privillegedPollChannels,
  privillegedPollRoles
} = require("./constants");

async function handleReactionAdd(client, reaction, user) {
  if (
    reaction.message.guildId !== solNftRadarServerId ||
    !privillegedPollChannels.includes(reaction.message.channelId)
    ) {
    return;
  }
  const guild = await client.guilds.cache.get(reaction.message.guildId);
  const member = await guild.members.fetch(user.id);
  if (!member) return;
  if (!member._roles || !containsOneIn(member._roles, privillegedPollRoles)) return reaction.users.remove(user.id);
}

function containsOneIn(arr, toCheck) {
  return toCheck.some(element => arr.includes(element));
}

module.exports = handleReactionAdd;
