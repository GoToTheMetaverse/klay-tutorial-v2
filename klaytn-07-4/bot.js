const { token } = require("./config.js");
const { Client, Intents } = require("discord.js");
const Verify = require("./bot-verify");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

const GUILD_ID = "965956663985176616";
const ROLE_GOOD_ID = "965961509698174996";
const MEMBER_ID = "960006962265870406";
const CHANNEL_ID = "965956663985176619";
client.once("ready", async () => {
  console.log(`Ready!`);

  const guild = client.guilds.cache.get(GUILD_ID);
  const channel = guild.channels.cache.get(CHANNEL_ID);
  //   console.log("channel", channel);
  const role = guild.roles.cache.get(ROLE_GOOD_ID);
  const member = await guild.members.fetch(MEMBER_ID);
  //   console.log("member", member);
  member.roles.add(role);
  //   member.roles.remove(role);
  channel.send("bot start");

  const ch_verify = guild.channels.cache.get(Verify.channel_id);
  const old_msg = await ch_verify.messages.fetch();
  ch_verify.bulkDelete(old_msg);

  Verify.ready(client);
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (user.bot) return;
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (!reaction.message.guild) return;

  if (reaction.message.channelId == Verify.channel_id) {
    Verify.reaction(reaction, user);
  } else {
    console.error("messageReactionAdd no ch");
  }
});

client.on("messageCreate", async (msg) => {
  //
  if (msg.author.bot) return;

  if (msg.content == "a") {
    msg.reply("b");
  } else {
    console.log("msg.content", msg.content);
  }
});

client.login(token);
console.log("login");
