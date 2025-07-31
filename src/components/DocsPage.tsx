import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useState } from "react";

const Sidebar = ({ activeSection, onSectionChange }: { activeSection: string, onSectionChange: (section: string) => void }) => {
  const sections = {
    guides: [
      { id: 'getting-started', name: 'Getting Started' },
      { id: 'initialization', name: 'Initialization' }
    ],
    classes: [
      { id: 'aqua-options', name: 'Aqua (Options)' },
      { id: 'player', name: 'Player' },
      { id: 'queue-class', name: 'Queue Class' },
      { id: 'node-class', name: 'Node Class' }
    ],
    usage: [
      { id: 'playing-tracks', name: 'Playing Tracks' },
      { id: 'searching', name: 'Searching' },
      { id: 'playback-control', name: 'Playback Control' },
      { id: 'queue-management', name: 'Queue Management' },
      { id: 'audio-filters', name: 'Audio Filters' }
    ],
    events: [
      { id: 'all-events', name: 'All Events' }
    ],
    more: [
      { id: 'troubleshooting', name: 'Troubleshooting' }
    ]
  };

  return (
    <div className="w-80 bg-card/30 border-r border-border/50 h-screen overflow-y-auto p-6">
      {Object.entries(sections).map(([category, items]) => (
        <div key={category} className="mb-8">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            {category}
          </h3>
          <div className="space-y-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  activeSection === item.id
                    ? 'bg-primary/10 text-primary border-l-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const CodeBlock = ({ children, onCopy }: { children: string, onCopy?: () => void }) => {
  return (
    <div className="relative">
      <pre className="code-block text-sm overflow-x-auto">
        <code>{children}</code>
      </pre>
      {onCopy && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onCopy}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
        >
          <Copy className="w-4 h-4" />
          Copy
        </Button>
      )}
    </div>
  );
};

const DocsContent = ({ activeSection }: { activeSection: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (activeSection === 'getting-started') {
    return (
      <div className="max-w-4xl">
        <h1 className="text-5xl font-bold mb-5 mt-8">Getting Started</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Welcome to AquaLink! A powerful Discord music bot library built on top of Lavalink.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Installation</h2>
          <CodeBlock onCopy={() => copyToClipboard('npm install aqualink')}>
            npm install aqualink
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Quick Setup</h2>
          <CodeBlock onCopy={() => copyToClipboard(`const { Client, GatewayIntentBits } = require('discord.js');
const { Aqua } = require('aqualink');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages
    ]
});

client.aqua = new Aqua(client, {
    nodes: [{
        host: 'localhost',
        port: 2333,
        password: 'youshallnotpass'
    }]
});

client.on('ready', async () => {
    await client.aqua.init(client.user.id);
    console.log('Bot is ready!');
});

client.login('YOUR_BOT_TOKEN');`)}>
            {`const { Client, GatewayIntentBits } = require('discord.js');
const { Aqua } = require('aqualink');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages
    ]
});

client.aqua = new Aqua(client, {
    nodes: [{
        host: 'localhost',
        port: 2333,
        password: 'youshallnotpass'
    }]
});

client.on('ready', async () => {
    await client.aqua.init(client.user.id);
    console.log('Bot is ready!');
});

client.login('YOUR_BOT_TOKEN');`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🎵 Multi-Platform Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Support for YouTube, Spotify, SoundCloud, and more</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🔧 Advanced Queue Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Shuffle, loop, skip, and manipulate queues with ease</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🎛️ Audio Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Apply equalizer, timescale, and other audio effects</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>⚡ High Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Built on Lavalink for optimal performance and reliability</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  if (activeSection === 'initialization') {
    return (
      <div className="max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 mt-12">Initialization</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Learn how to properly initialize and configure AquaLink in your Discord bot.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Step-by-Step Setup</h2>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">1. Import Dependencies</h3>
            <CodeBlock onCopy={() => copyToClipboard(`const { Client, GatewayIntentBits } = require('discord.js');
const { Aqua } = require('aqualink');`)}>
              {`const { Client, GatewayIntentBits } = require('discord.js');
const { Aqua } = require('aqualink');`}
            </CodeBlock>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">2. Create Discord Client</h3>
            <CodeBlock onCopy={() => copyToClipboard(`const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages
    ]
});`)}>
              {`const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages
    ]
});`}
            </CodeBlock>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">3. Initialize Aqua</h3>
            <CodeBlock onCopy={() => copyToClipboard(`client.aqua = new Aqua(client, {
    nodes: [{
        host: 'localhost',
        port: 2333,
        password: 'youshallnotpass',
        secure: false,
        name: 'main-node'
    }],
    defaultSearchPlatform: 'ytsearch',
    leaveOnEnd: true,
    shouldDeleteMessage: false
});`)}>
              {`client.aqua = new Aqua(client, {
    nodes: [{
        host: 'localhost',
        port: 2333,
        password: 'youshallnotpass',
        secure: false,
        name: 'main-node'
    }],
    defaultSearchPlatform: 'ytsearch',
    leaveOnEnd: true,
    shouldDeleteMessage: false
});`}
            </CodeBlock>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">4. Handle Ready Event</h3>
            <CodeBlock onCopy={() => copyToClipboard(`client.on('ready', async (client) => {
    console.log('Bot is online!');

    // Initialize Aqua with bot user ID
    await client.aqua.init(client.user.id);

    console.log('Aqua is ready!');
});`)}>
              {`client.on('ready', async (client) => {
    console.log('Bot is online!');

    // Initialize Aqua with bot user ID
    await client.aqua.init(client.user.id);

    console.log('Aqua is ready!');
});`}
            </CodeBlock>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">5. Login Bot</h3>
            <CodeBlock onCopy={() => copyToClipboard(`client.login('YOUR_BOT_TOKEN');`)}>
              client.login('YOUR_BOT_TOKEN');
            </CodeBlock>
          </div>
        </section>
      </div>
    );
  }

  if (activeSection === 'aqua-options') {
    return (
      <div className="max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 mt-12">Aqua (Options)</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Configure AquaLink with various options to customize behavior and performance.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Complete Configuration</h2>
          <CodeBlock onCopy={() => copyToClipboard(`const { Aqua } = require('aqualink');

const aqua = new Aqua(client, {
  nodes: [{
    host: 'localhost',
    port: 2333,
    password: 'youshallnotpass',
    secure: false,
    name: 'main-node'
  }],
  defaultSearchPlatform: 'ytsearch',
  shouldDeleteMessage: false,
  leaveOnEnd: true,
  restVersion: 'v4',
  plugins: [],
  autoResume: false,
  infiniteReconnects: false,
  failoverOptions: {
    enabled: true,
    maxRetries: 3,
    retryDelay: 1000,
    preservePosition: true,
    resumePlayback: true,
    cooldownTime: 5000,
    maxFailoverAttempts: 5
  }
});`)}>
            {`const { Aqua } = require('aqualink');

const aqua = new Aqua(client, {
  nodes: [{
    host: 'localhost',
    port: 2333,
    password: 'youshallnotpass',
    secure: false,
    name: 'main-node'
  }],
  defaultSearchPlatform: 'ytsearch',
  shouldDeleteMessage: false,
  leaveOnEnd: true,
  restVersion: 'v4',
  plugins: [],
  autoResume: false,
  infiniteReconnects: false,
  failoverOptions: {
    enabled: true,
    maxRetries: 3,
    retryDelay: 1000,
    preservePosition: true,
    resumePlayback: true,
    cooldownTime: 5000,
    maxFailoverAttempts: 5
  }
});`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Configuration Options</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border rounded-lg">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-border p-3 text-left font-semibold">Option</th>
                  <th className="border border-border p-3 text-left font-semibold">Type</th>
                  <th className="border border-border p-3 text-left font-semibold">Default</th>
                  <th className="border border-border p-3 text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['nodes', 'Array<NodeOptions>', '[]', 'Array of Lavalink node configurations'],
                  ['defaultSearchPlatform', 'string', 'ytsearch', 'Default search platform (ytsearch, spsearch, etc.)'],
                  ['shouldDeleteMessage', 'boolean', 'false', 'Auto-delete bot responses'],
                  ['leaveOnEnd', 'boolean', 'true', 'Leave voice channel when queue ends'],
                  ['restVersion', 'string', 'v4', 'Lavalink REST API version'],
                  ['autoResume', 'boolean', 'false', 'Auto-resume on disconnect'],
                  ['infiniteReconnects', 'boolean', 'false', 'Enable infinite reconnection attempts']
                ].map(([option, type, defaultVal, description], index) => (
                  <tr key={index} className="hover:bg-muted/30">
                    <td className="border border-border p-3 font-mono text-sm">{option}</td>
                    <td className="border border-border p-3 font-mono text-sm text-primary">{type}</td>
                    <td className="border border-border p-3 font-mono text-sm text-accent">{defaultVal}</td>
                    <td className="border border-border p-3 text-sm">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }

  if (activeSection === 'player') {
    return (
      <div className="max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 mt-12">Player</h1>
        <p className="text-lg text-muted-foreground mb-12">
          The Player class manages individual guild music players and their state.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Creating a Player</h2>
          <CodeBlock onCopy={() => copyToClipboard(`// Create a new player connection
const player = client.aqua.createConnection({
    guildId: interaction.guild.id,
    textChannel: interaction.channel.id,
    voiceChannel: interaction.member.voice.channel.id,
    deaf: true,
    volume: 100
});

// Get existing player
const existingPlayer = client.aqua.getPlayer(guildId);`)}>
            {`// Create a new player connection
const player = client.aqua.createConnection({
    guildId: interaction.guild.id,
    textChannel: interaction.channel.id,
    voiceChannel: interaction.member.voice.channel.id,
    deaf: true,
    volume: 100
});

// Get existing player
const existingPlayer = client.aqua.getPlayer(guildId);`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Player Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'playing', type: 'boolean', desc: 'Whether music is currently playing' },
              { name: 'paused', type: 'boolean', desc: 'Whether playback is paused' },
              { name: 'volume', type: 'number', desc: 'Current volume (0-1000)' },
              { name: 'position', type: 'number', desc: 'Current track position in ms' },
              { name: 'guildId', type: 'string', desc: 'Guild ID this player belongs to' },
              { name: 'voiceChannel', type: 'string', desc: 'Voice channel ID' },
              { name: 'textChannel', type: 'string', desc: 'Text channel ID for messages' },
              { name: 'queue', type: 'Queue', desc: 'Player queue instance' }
            ].map((prop, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="font-mono">{prop.name}</span>
                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">{prop.type}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{prop.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Player Methods</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">play(track?)</h3>
              <p className="text-muted-foreground mb-3">Start playing the current queue or a specific track</p>
              <CodeBlock onCopy={() => copyToClipboard(`player.play(); // Play queue
player.play(track); // Play specific track`)}>
                {`player.play(); // Play queue
player.play(track); // Play specific track`}
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">pause(state)</h3>
              <p className="text-muted-foreground mb-3">Pause or resume playback</p>
              <CodeBlock onCopy={() => copyToClipboard(`player.pause(true);  // Pause
player.pause(false); // Resume`)}>
                {`player.pause(true);  // Pause
player.pause(false); // Resume`}
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">stop()</h3>
              <p className="text-muted-foreground mb-3">Stop playback and clear the queue</p>
              <CodeBlock onCopy={() => copyToClipboard(`player.stop();`)}>
                player.stop();
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">skip()</h3>
              <p className="text-muted-foreground mb-3">Skip to the next track</p>
              <CodeBlock onCopy={() => copyToClipboard(`player.skip();`)}>
                player.skip();
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">seek(position)</h3>
              <p className="text-muted-foreground mb-3">Seek to a specific position in milliseconds</p>
              <CodeBlock onCopy={() => copyToClipboard(`player.seek(60000); // Seek to 1 minute`)}>
                player.seek(60000); // Seek to 1 minute
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">setVolume(volume)</h3>
              <p className="text-muted-foreground mb-3">Set player volume (0-1000)</p>
              <CodeBlock onCopy={() => copyToClipboard(`player.setVolume(50); // 50% volume`)}>
                player.setVolume(50); // 50% volume
              </CodeBlock>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">destroy()</h3>
              <p className="text-muted-foreground mb-3">Destroy the player and disconnect</p>
              <CodeBlock onCopy={() => copyToClipboard(`player.destroy();`)}>
                player.destroy();
              </CodeBlock>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (activeSection === 'queue-class') {
    return (
      <div className="max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 mt-12">Queue Class</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Manage track queues with powerful queue manipulation methods.
        </p>

        <section className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <h3 className="text-xl font-semibold">add(track)</h3>
            <span className="bg-accent/10 text-accent px-2 py-1 rounded text-sm font-mono">METHOD</span>
          </div>
          <p className="text-muted-foreground mb-4">Add a single track to the queue.</p>
          <CodeBlock onCopy={() => copyToClipboard('player.queue.add(track);')}>
            player.queue.add(track);
          </CodeBlock>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <h3 className="text-xl font-semibold">addBulk(tracks)</h3>
            <span className="bg-accent/10 text-accent px-2 py-1 rounded text-sm font-mono">METHOD</span>
          </div>
          <p className="text-muted-foreground mb-4">Add multiple tracks to the queue at once.</p>
          <CodeBlock onCopy={() => copyToClipboard('player.queue.addBulk([track1, track2, track3]);')}>
            player.queue.addBulk([track1, track2, track3]);
          </CodeBlock>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <h3 className="text-xl font-semibold">remove(index)</h3>
            <span className="bg-accent/10 text-accent px-2 py-1 rounded text-sm font-mono">METHOD</span>
          </div>
          <p className="text-muted-foreground mb-4">Remove a track at the specified index.</p>
          <CodeBlock onCopy={() => copyToClipboard('player.queue.remove(2); // Remove track at index 2')}>
            player.queue.remove(2); // Remove track at index 2
          </CodeBlock>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <h3 className="text-xl font-semibold">clear()</h3>
            <span className="bg-accent/10 text-accent px-2 py-1 rounded text-sm font-mono">METHOD</span>
          </div>
          <p className="text-muted-foreground mb-4">Clear all tracks from the queue.</p>
          <CodeBlock onCopy={() => copyToClipboard('player.queue.clear();')}>
            player.queue.clear();
          </CodeBlock>
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <h3 className="text-xl font-semibold">shuffle()</h3>
            <span className="bg-accent/10 text-accent px-2 py-1 rounded text-sm font-mono">METHOD</span>
          </div>
          <p className="text-muted-foreground mb-4">Shuffle the current queue.</p>
          <CodeBlock onCopy={() => copyToClipboard('player.queue.shuffle();')}>
            player.queue.shuffle();
          </CodeBlock>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Properties</h2>

          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <h4 className="text-lg font-medium">tracks</h4>
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-mono">ARRAY</span>
            </div>
            <p className="text-muted-foreground mb-3">Array of all tracks in the queue.</p>
            <CodeBlock onCopy={() => copyToClipboard('console.log(player.queue.tracks); // Array of tracks')}>
              console.log(player.queue.tracks); // Array of tracks
            </CodeBlock>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <h4 className="text-lg font-medium">current</h4>
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-mono">OBJECT</span>
            </div>
            <p className="text-muted-foreground mb-3">Currently playing track.</p>
            <CodeBlock onCopy={() => copyToClipboard('console.log(player.queue.current); // Current track object')}>
              console.log(player.queue.current); // Current track object
            </CodeBlock>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <h4 className="text-lg font-medium">size</h4>
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-mono">NUMBER</span>
            </div>
            <p className="text-muted-foreground mb-3">Total number of tracks in the queue.</p>
            <CodeBlock onCopy={() => copyToClipboard('console.log(player.queue.size); // Queue size')}>
              console.log(player.queue.size); // Queue size
            </CodeBlock>
          </div>
        </section>
      </div>
    );
  }

  if (activeSection === 'node-class') {
    return (
      <div className="max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 mt-12">Node Class</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Manage Lavalink nodes, their connections, and monitor their status.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Node Configuration</h2>
          <CodeBlock onCopy={() => copyToClipboard(`const nodeOptions = {
  host: 'localhost',
  port: 2333,
  password: 'youshallnotpass',
  secure: false,
  name: 'main-node',
  retryAmount: 5,
  retryDelay: 30000,
  requestTimeout: 10000
};`)}>
            {`const nodeOptions = {
  host: 'localhost',
  port: 2333,
  password: 'youshallnotpass',
  secure: false,
  name: 'main-node',
  retryAmount: 5,
  retryDelay: 30000,
  requestTimeout: 10000
};`}
          </CodeBlock>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Properties</h2>

          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <h4 className="text-lg font-medium">connected</h4>
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-mono">BOOLEAN</span>
            </div>
            <p className="text-muted-foreground mb-3">Whether the node is currently connected.</p>
            <CodeBlock onCopy={() => copyToClipboard('console.log(node.connected); // true/false')}>
              console.log(node.connected); // true/false
            </CodeBlock>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <h4 className="text-lg font-medium">stats</h4>
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-mono">OBJECT</span>
            </div>
            <p className="text-muted-foreground mb-3">Node statistics including CPU, memory, and player count.</p>
            <CodeBlock onCopy={() => copyToClipboard(`console.log(node.stats);
// { players: 0, playingPlayers: 0, uptime: 123456 }`)}>
              {`console.log(node.stats);
// { players: 0, playingPlayers: 0, uptime: 123456 }`}
            </CodeBlock>
          </div>
        </section>
      </div>
    );
  }

  if (activeSection === 'playing-tracks') {
    return (
      <div className="max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 mt-12">Playing Tracks</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Learn how to play music tracks with AquaLink, from basic playback to advanced features.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Basic Track Playing</h2>
          <CodeBlock onCopy={() => copyToClipboard(`// Create a player connection
const player = client.aqua.createConnection({
    guildId: interaction.guild.id,
    textChannel: interaction.channel.id,
    voiceChannel: interaction.member.voice.channel.id,
    deaf: true
});

// Search for tracks
const result = await client.aqua.search('Never Gonna Give You Up');

if (result.tracks.length > 0) {
    // Add track to queue
    player.queue.add(result.tracks[0]);

    // Start playing
    if (!player.playing && !player.paused) {
        player.play();
    }

    console.log(\`Now playing: \${result.tracks[0].title}\`);
}`)}>
            {`// Create a player connection
const player = client.aqua.createConnection({
    guildId: interaction.guild.id,
    textChannel: interaction.channel.id,
    voiceChannel: interaction.member.voice.channel.id,
    deaf: true
});

// Search for tracks
const result = await client.aqua.search('Never Gonna Give You Up');

if (result.tracks.length > 0) {
    // Add track to queue
    player.queue.add(result.tracks[0]);

    // Start playing
    if (!player.playing && !player.paused) {
        player.play();
    }

    console.log(\`Now playing: \${result.tracks[0].title}\`);
}`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Track Information</h2>
          <CodeBlock onCopy={() => copyToClipboard(`// Get current playing track
const currentTrack = player.queue.current;

if (currentTrack) {
    console.log('Title:', currentTrack.title);
    console.log('Author:', currentTrack.author);
    console.log('Duration:', currentTrack.duration);
    console.log('URL:', currentTrack.uri);
}`)}>
            {`// Get current playing track
const currentTrack = player.queue.current;

if (currentTrack) {
    console.log('Title:', currentTrack.title);
    console.log('Author:', currentTrack.author);
    console.log('Duration:', currentTrack.duration);
    console.log('URL:', currentTrack.uri);
}`}
          </CodeBlock>
        </section>
      </div>
    );
  }

  if (activeSection === 'searching') {
    return (
      <div className="max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 mt-12">Searching</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Search for tracks across different platforms and handle various search result types.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Basic Search</h2>
          <CodeBlock onCopy={() => copyToClipboard(`// Basic YouTube search
const result = await client.aqua.search('Rick Astley Never Gonna Give You Up');

console.log('Search results:');
console.log('Type:', result.type); // 'TRACK', 'PLAYLIST', or 'SEARCH'
console.log('Tracks found:', result.tracks.length);

if (result.tracks.length > 0) {
    const track = result.tracks[0];
    console.log('First result:', track.title, 'by', track.author);
}`)}>
            {`// Basic YouTube search
const result = await client.aqua.search('Rick Astley Never Gonna Give You Up');

console.log('Search results:');
console.log('Type:', result.type); // 'TRACK', 'PLAYLIST', or 'SEARCH'
console.log('Tracks found:', result.tracks.length);

if (result.tracks.length > 0) {
    const track = result.tracks[0];
    console.log('First result:', track.title, 'by', track.author);
}`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Platform-Specific Searches</h2>
          <CodeBlock onCopy={() => copyToClipboard(`// YouTube search
const ytResult = await client.aqua.search('ytsearch:Imagine Dragons Believer');

// Spotify search
const spotifyResult = await client.aqua.search('spsearch:The Weeknd Blinding Lights');

// SoundCloud search
const scResult = await client.aqua.search('scsearch:Lofi Hip Hop');`)}>
            {`// YouTube search
const ytResult = await client.aqua.search('ytsearch:Imagine Dragons Believer');

// Spotify search
const spotifyResult = await client.aqua.search('spsearch:The Weeknd Blinding Lights');

// SoundCloud search
const scResult = await client.aqua.search('scsearch:Lofi Hip Hop');`}
          </CodeBlock>
        </section>
      </div>
    );
  }

  if (activeSection === 'playback-control') {
    return (
      <div className="max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 mt-12">Playback Control</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Control audio playback with play, pause, skip, volume, and seeking functions.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Basic Playback Controls</h2>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Play/Pause</h3>
            <CodeBlock onCopy={() => copyToClipboard(`// Start playback
player.play();

// Pause playback
player.pause(true);

// Resume playback
player.pause(false);

// Toggle pause state
const isPaused = player.paused;
player.pause(!isPaused);`)}>
              {`// Start playback
player.play();

// Pause playback
player.pause(true);

// Resume playback
player.pause(false);

// Toggle pause state
const isPaused = player.paused;
player.pause(!isPaused);`}
            </CodeBlock>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Stop & Skip</h3>
            <CodeBlock onCopy={() => copyToClipboard(`// Stop current track and clear
player.stop();

// Skip to next track
player.skip();`)}>
              {`// Stop current track and clear
player.stop();

// Skip to next track
player.skip();`}
            </CodeBlock>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Volume Control</h2>
          <CodeBlock onCopy={() => copyToClipboard(`// Set volume (0-1000, where 100 = 100%)
player.setVolume(50);   // 50%
player.setVolume(100);  // 100% (default)
player.setVolume(150);  // 150% (amplified)

// Get current volume
console.log('Current volume:', player.volume);`)}>
            {`// Set volume (0-1000, where 100 = 100%)
player.setVolume(50);   // 50%
player.setVolume(100);  // 100% (default)
player.setVolume(150);  // 150% (amplified)

// Get current volume
console.log('Current volume:', player.volume);`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Seeking</h2>
          <CodeBlock onCopy={() => copyToClipboard(`// Seek to specific position (milliseconds)
player.seek(60000);  // Seek to 1 minute
player.seek(120000); // Seek to 2 minutes

// Seek to percentage of track
function seekToPercentage(percentage) {
    const track = player.queue.current;
    if (track && track.isSeekable) {
        const position = (track.duration * percentage) / 100;
        player.seek(position);
        console.log(\`Seeked to \${percentage}%\`);
    }
}

// Usage examples
seekToPercentage(50);  // Seek to middle of track`)}>
            {`// Seek to specific position (milliseconds)
player.seek(60000);  // Seek to 1 minute
player.seek(120000); // Seek to 2 minutes

// Seek to percentage of track
function seekToPercentage(percentage) {
    const track = player.queue.current;
    if (track && track.isSeekable) {
        const position = (track.duration * percentage) / 100;
        player.seek(position);
        console.log(\`Seeked to \${percentage}%\`);
    }
}

// Usage examples
seekToPercentage(50);  // Seek to middle of track`}
          </CodeBlock>
        </section>
      </div>
    );
  }

  if (activeSection === 'queue-management') {
    return (
      <div className="max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 mt-12">Queue Management</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Advanced queue operations including shuffling, looping, and track manipulation.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Queue Operations</h2>
          <CodeBlock onCopy={() => copyToClipboard(`// Add single track
player.queue.add(track);

// Add multiple tracks
player.queue.addBulk([track1, track2, track3]);

// Remove track by index
player.queue.remove(2);

// Clear entire queue
player.queue.clear();

// Shuffle queue
player.queue.shuffle();

// Get queue info
console.log('Queue size:', player.queue.size);
console.log('Current track:', player.queue.current?.title);`)}>
            {`// Add single track
player.queue.add(track);

// Add multiple tracks
player.queue.addBulk([track1, track2, track3]);

// Remove track by index
player.queue.remove(2);

// Clear entire queue
player.queue.clear();

// Shuffle queue
player.queue.shuffle();

// Get queue info
console.log('Queue size:', player.queue.size);
console.log('Current track:', player.queue.current?.title);`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Loop Modes</h2>
          <CodeBlock onCopy={() => copyToClipboard(`// Set loop modes
player.setLoop('none');     // No looping
player.setLoop('track');    // Loop current track
player.setLoop('queue');    // Loop entire queue

// Check current loop mode
console.log('Loop mode:', player.loop);`)}>
            {`// Set loop modes
player.setLoop('none');     // No looping
player.setLoop('track');    // Loop current track
player.setLoop('queue');    // Loop entire queue

// Check current loop mode
console.log('Loop mode:', player.loop);`}
          </CodeBlock>
        </section>
      </div>
    );
  }

  if (activeSection === 'audio-filters') {
    return (
      <div className="max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 mt-12">Audio Filters</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Apply various audio effects and filters to enhance playback experience.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Equalizer</h2>
          <CodeBlock onCopy={() => copyToClipboard(`// Set equalizer bands (14 bands, -0.25 to 1.0)
const bands = [
    { band: 0, gain: 0.1 },   // 25 Hz
    { band: 1, gain: 0.1 },   // 40 Hz
    { band: 2, gain: 0.05 },  // 63 Hz
    { band: 3, gain: 0.0 },   // 100 Hz
    { band: 4, gain: -0.05 }, // 160 Hz
    { band: 5, gain: 0.0 },   // 250 Hz
    { band: 6, gain: 0.0 },   // 400 Hz
    { band: 7, gain: 0.0 },   // 630 Hz
    { band: 8, gain: 0.0 },   // 1 kHz
    { band: 9, gain: 0.0 },   // 1.6 kHz
    { band: 10, gain: 0.0 },  // 2.5 kHz
    { band: 11, gain: 0.05 }, // 4 kHz
    { band: 12, gain: 0.1 },  // 6.3 kHz
    { band: 13, gain: 0.1 }   // 10 kHz
];

player.setEqualizer(bands);`)}>
            {`// Set equalizer bands (14 bands, -0.25 to 1.0)
const bands = [
    { band: 0, gain: 0.1 },   // 25 Hz
    { band: 1, gain: 0.1 },   // 40 Hz
    { band: 2, gain: 0.05 },  // 63 Hz
    { band: 3, gain: 0.0 },   // 100 Hz
    { band: 4, gain: -0.05 }, // 160 Hz
    { band: 5, gain: 0.0 },   // 250 Hz
    { band: 6, gain: 0.0 },   // 400 Hz
    { band: 7, gain: 0.0 },   // 630 Hz
    { band: 8, gain: 0.0 },   // 1 kHz
    { band: 9, gain: 0.0 },   // 1.6 kHz
    { band: 10, gain: 0.0 },  // 2.5 kHz
    { band: 11, gain: 0.05 }, // 4 kHz
    { band: 12, gain: 0.1 },  // 6.3 kHz
    { band: 13, gain: 0.1 }   // 10 kHz
];

player.setEqualizer(bands);`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Filter Presets</h2>
          <CodeBlock onCopy={() => copyToClipboard(`// Bass boost preset
const bassBoost = [
    { band: 0, gain: 0.2 },
    { band: 1, gain: 0.15 },
    { band: 2, gain: 0.1 },
    { band: 3, gain: 0.05 },
    ...Array(10).fill(null).map((_, i) => ({ band: i + 4, gain: 0 }))
];

// Treble boost preset
const trebleBoost = [
    ...Array(10).fill(null).map((_, i) => ({ band: i, gain: 0 })),
    { band: 10, gain: 0.1 },
    { band: 11, gain: 0.15 },
    { band: 12, gain: 0.2 },
    { band: 13, gain: 0.25 }
];

player.setEqualizer(bassBoost);`)}>
            {`// Bass boost preset
const bassBoost = [
    { band: 0, gain: 0.2 },
    { band: 1, gain: 0.15 },
    { band: 2, gain: 0.1 },
    { band: 3, gain: 0.05 },
    ...Array(10).fill(null).map((_, i) => ({ band: i + 4, gain: 0 }))
];

// Treble boost preset
const trebleBoost = [
    ...Array(10).fill(null).map((_, i) => ({ band: i, gain: 0 })),
    { band: 10, gain: 0.1 },
    { band: 11, gain: 0.15 },
    { band: 12, gain: 0.2 },
    { band: 13, gain: 0.25 }
];

player.setEqualizer(bassBoost);`}
          </CodeBlock>
        </section>
      </div>
    );
  }

  if (activeSection === 'all-events') {
    return (
      <div className="max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 mt-12">All Events</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Listen to various events emitted by AquaLink for real-time updates.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Player Events</h2>
          <CodeBlock onCopy={() => copyToClipboard(`// Track start event
client.aqua.on('trackStart', (player, track) => {
    console.log(\`Started playing: \${track.title}\`);
});

// Track end event
client.aqua.on('trackEnd', (player, track, reason) => {
    console.log(\`Track ended: \${track.title} (Reason: \${reason})\`);
});

// Queue end event
client.aqua.on('queueEnd', (player) => {
    console.log('Queue has ended');
});

// Player destroy event
client.aqua.on('playerDestroy', (guildId) => {
    console.log(\`Player destroyed for guild: \${guildId}\`);
});`)}>
            {`// Track start event
client.aqua.on('trackStart', (player, track) => {
    console.log(\`Started playing: \${track.title}\`);
});

// Track end event
client.aqua.on('trackEnd', (player, track, reason) => {
    console.log(\`Track ended: \${track.title} (Reason: \${reason})\`);
});

// Queue end event
client.aqua.on('queueEnd', (player) => {
    console.log('Queue has ended');
});

// Player destroy event
client.aqua.on('playerDestroy', (guildId) => {
    console.log(\`Player destroyed for guild: \${guildId}\`);
});`}
          </CodeBlock>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Node Events</h2>
          <CodeBlock onCopy={() => copyToClipboard(`// Node connect event
client.aqua.on('nodeConnect', (node) => {
    console.log(\`Node \${node.name} connected\`);
});

// Node disconnect event
client.aqua.on('nodeDisconnect', (node, reason) => {
    console.log(\`Node \${node.name} disconnected: \${reason}\`);
});

// Node error event
client.aqua.on('nodeError', (node, error) => {
    console.error(\`Node \${node.name} error:\`, error);
});`)}>
            {`// Node connect event
client.aqua.on('nodeConnect', (node) => {
    console.log(\`Node \${node.name} connected\`);
});

// Node disconnect event
client.aqua.on('nodeDisconnect', (node, reason) => {
    console.log(\`Node \${node.name} disconnected: \${reason}\`);
});

// Node error event
client.aqua.on('nodeError', (node, error) => {
    console.error(\`Node \${node.name} error:\`, error);
});`}
          </CodeBlock>
        </section>
      </div>
    );
  }

  if (activeSection === 'troubleshooting') {
    return (
      <div className="max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 mt-12">Troubleshooting</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Common issues and solutions when working with AquaLink.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Connection Issues</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Node Connection Failed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Check if Lavalink server is running and accessible.</p>
                <CodeBlock onCopy={() => copyToClipboard(`// Check node status
const node = client.aqua.getNode('main-node');
if (!node.connected) {
    console.log('Node is not connected');
    await node.reconnect();
}`)}>
                  {`// Check node status
const node = client.aqua.getNode('main-node');
if (!node.connected) {
    console.log('Node is not connected');
    await node.reconnect();
}`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Voice Channel Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Ensure bot has proper permissions to join voice channels.</p>
                <CodeBlock onCopy={() => copyToClipboard(`// Check permissions
const permissions = voiceChannel.permissionsFor(client.user);
if (!permissions.has('Connect') || !permissions.has('Speak')) {
    throw new Error('Missing voice channel permissions');
}`)}>
                  {`// Check permissions
const permissions = voiceChannel.permissionsFor(client.user);
if (!permissions.has('Connect') || !permissions.has('Speak')) {
    throw new Error('Missing voice channel permissions');
}`}
                </CodeBlock>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Common Errors</h2>
          <div className="space-y-4">
            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Error: No available nodes</h4>
              <p className="text-muted-foreground text-sm mb-2">All Lavalink nodes are disconnected</p>
              <p className="text-sm">Solution: Check node configuration and ensure Lavalink server is running</p>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Error: Track load failed</h4>
              <p className="text-muted-foreground text-sm mb-2">Track couldn't be loaded or played</p>
              <p className="text-sm">Solution: Check if the track URL is valid and accessible</p>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Error: Player not found</h4>
              <p className="text-muted-foreground text-sm mb-2">Trying to control a non-existent player</p>
              <p className="text-sm">Solution: Create a player connection first before controlling playback</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Default content for getting-started
  return (
    <div className="max-w-6xl">
      <h1 className="text-6xl font-bold mb-6">Getting Started</h1>
      <p className="text-lg text-muted-foreground mb-12">
        Welcome to AquaLink! A powerful Discord music bot library built on top of Lavalink.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Installation</h2>
        <CodeBlock onCopy={() => copyToClipboard('npm install aqualink')}>
          npm install aqualink
        </CodeBlock>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Quick Setup</h2>
        <CodeBlock onCopy={() => copyToClipboard(`const { Client, GatewayIntentBits } = require('discord.js');
const { Aqua } = require('aqualink');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.aqua = new Aqua(client, {
    nodes: [{
        host: 'localhost',
        port: 2333,
        password: 'youshallnotpass'
    }]
});

client.on('ready', async () => {
    await client.aqua.init(client.user.id);
    console.log('Bot is ready!');
});

client.login('YOUR_BOT_TOKEN');`)}>
          {`const { Client, GatewayIntentBits } = require('discord.js');
const { Aqua } = require('aqualink');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.aqua = new Aqua(client, {
    nodes: [{
        host: 'localhost',
        port: 2333,
        password: 'youshallnotpass'
    }]
});

client.on('ready', async () => {
    await client.aqua.init(client.user.id);
    console.log('Bot is ready!');
});

client.login('YOUR_BOT_TOKEN');`}
        </CodeBlock>
      </section>
    </div>
  );
};

const DocsPage = () => {
  const [activeSection, setActiveSection] = useState('getting-started');

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 overflow-y-auto p-8">
        <DocsContent activeSection={activeSection} />
      </main>
    </div>
  );
};
export default DocsPage;