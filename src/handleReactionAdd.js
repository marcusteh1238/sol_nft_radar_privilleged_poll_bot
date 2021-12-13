const solNftRadarServerId = "892235360501923850";
// privilleged poll active in this channel.
const privillegedPollChannels = ["896571025125421066"];
// can vote if have any one of these roles.
const privillegedPollRoles = ["908565702099730504", "896571850153418773"];

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
