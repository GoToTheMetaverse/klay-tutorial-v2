const { token } = require("./config.js");
const { Client, Intents } = require("discord.js");

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
