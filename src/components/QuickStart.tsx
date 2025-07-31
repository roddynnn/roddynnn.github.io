import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QuickStart = () => {
  const codeExample = `const { Aqua, Client } = require("discord.js");
const client = new Client({ intents: ["Guilds", "GuildVoiceStates"] });

const aqua = Aqua(client, [{
  host: "127.0.0.1",
  password: "yourpass",
  port: 233,
  secure: false,
  name: "localhost"
}], {
  defaultSearchPlatform: "ytsearch",
  restVersion: "v4"
});

client.aqua = aqua;

client.once("ready", () => aqua.init(client.user.id));

client.on("messageCreate", async (message) => {
  if (message.content.startsWith("!play")) {
    const query = message.content.slice(6);
    const player = aqua.createConnection({
      guildId: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id
    });
    
    const resolve = await aqua.resolve({
      query,
      requester: message.member
    });
    
    if (resolve.loadType === 'track') {
      player.queue.add(resolve.tracks[0]);
      await message.channel.send(\`Added **\${resolve.tracks[0].info.title}** to the queue.\`);
      if (!player.playing) player.play();
    }
  }
});

client.login("Yourtokenhere");`;

  return (
    <section className="py-24 px-4 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Quick Start
          </h2>
        </div>
        
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">Get up and running in minutes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="code-block">
              <pre className="text-sm">
                <code className="text-foreground">{codeExample}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default QuickStart;