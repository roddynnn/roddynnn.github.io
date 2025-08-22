import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Sidebar = ({
   activeSection,
   onSectionChange,
   isOpen,
   onClose,
}: {
   activeSection: string;
   onSectionChange: (section: string) => void;
   isOpen: boolean;
   onClose: () => void;
}) => {
   const sections = {
      guides: [
         { id: 'getting-started', name: 'Getting Started' },
         { id: 'initialization', name: 'Initialization' },
      ],
      classes: [
         { id: 'aqua-options', name: 'Aqua (Options)' },
         { id: 'player', name: 'Player' },
         { id: 'queue-class', name: 'Queue Class' },
         { id: 'node-class', name: 'Node Class' },
      ],
      usage: [
         { id: 'playing-tracks', name: 'Playing Tracks' },
         { id: 'searching', name: 'Searching' },
         { id: 'playback-control', name: 'Playback Control' },
         { id: 'queue-management', name: 'Queue Management' },
         { id: 'audio-filters', name: 'Audio Filters' },
      ],
      events: [{ id: 'all-events', name: 'All Events' }],
      more: [{ id: 'troubleshooting', name: 'Troubleshooting' }],
   };

   const handleSectionClick = (sectionId: string) => {
      onSectionChange(sectionId);
      onClose();
   };

   return (
      <div
         className={`fixed top-0 left-0 z-50 w-72 bg-card/80 backdrop-blur-lg border-r border-border/50 h-full overflow-y-auto p-6 pt-12 transition-transform duration-300 ease-in-out md:sticky md:top-0 md:translate-x-0 md:w-80 md:h-screen md:z-10 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
         }`}
      >
         <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 md:hidden"
         >
            <X className="w-6 h-6" />
         </Button>
         {Object.entries(sections).map(([category, items]) => (
            <div key={category} className="mb-8">
               <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  {category}
               </h3>
               <div className="space-y-2">
                  {items.map((item) => (
                     <button
                        key={item.id}
                        onClick={() => handleSectionClick(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                           activeSection === item.id
                              ? 'bg-primary/10 text-primary font-semibold'
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

const CodeBlock = ({
   children,
   onCopy,
}: {
   children: string;
   onCopy?: () => void;
}) => {
   const [copied, setCopied] = useState(false);

   const handleCopy = () => {
      if (copied) return;
      if (onCopy) {
         onCopy();
      }
      setCopied(true);
      setTimeout(() => {
         setCopied(false);
      }, 2000);
   };

   return (
      <div className="relative">
         <SyntaxHighlighter
            language="javascript"
            style={vscDarkPlus}
            className="code-block text-sm overflow-x-auto"
         >
            {children}
         </SyntaxHighlighter>
         {onCopy && (
            <Button
               variant="ghost"
               size="sm"
               onClick={handleCopy}
               className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            >
               {copied ? (
                  <Check className="w-4 h-4" />
               ) : (
                  <Copy className="w-4 h-4" />
               )}
               <span className="ml-2">{copied ? 'Copied!' : 'Copy'}</span>
            </Button>
         )}
      </div>
   );
};

const DocsContent = ({ activeSection }: { activeSection: string }) => {
   const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text);
   };

   if (activeSection === 'getting-started') {
      return (
         <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-5 mt-8">Getting Started</h1>
            <p className="text-lg text-muted-foreground mb-12">
               Welcome to the AquaLink documentation. This guide will walk you
               through the installation process and help you get your first
               music bot running in minutes. AquaLink is designed for both
               beginners and experienced developers, offering a powerful yet
               easy-to-use interface for Lavalink.
            </p>

            <section className="mb-12">
               <h2 className="text-2xl font-semibold mb-6">Installation</h2>
               <CodeBlock
                  onCopy={() => copyToClipboard('npm install aqualink')}
               >
                  npm install aqualink
               </CodeBlock>
            </section>

            <section className="mb-12">
               <h2 className="text-2xl font-semibold mb-6">Lavalink Setup</h2>
               <p className="text-muted-foreground mb-4">
                  Before using AquaLink, you need a running Lavalink server. You
                  can download the latest <code>Lavalink.jar</code> from the{' '}
                  <a
                     href="https://github.com/lavalink-devs/Lavalink/releases"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-primary hover:underline"
                  >
                     official repository
                  </a>
                  . Create an <code>application.yml</code> file in the same
                  directory with the following content:
               </p>
               <CodeBlock
                  onCopy={() =>
                     copyToClipboard(`server:
  port: 2333
password: "youshallnotpass"
logging:
  level:
    root: INFO
    lavalink: INFO`)
                  }
               >
                  {`server:
  port: 2333
password: "youshallnotpass"
logging:
  level:
    root: INFO
    lavalink: INFO`}
               </CodeBlock>
               <p className="text-muted-foreground mt-4">
                  Run Lavalink using <code>java -jar Lavalink.jar</code>. For
                  more advanced configurations, refer to the{' '}
                  <a
                     href="https://lavalink.dev/configuration/config/file.html#example-applicationyml"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-primary hover:underline"
                  >
                     official Lavalink documentation
                  </a>
                  .
               </p>
            </section>

            <section className="mb-12">
               <h2 className="text-2xl font-semibold mb-6">Quick Setup</h2>
               <p className="text-muted-foreground mb-4">
                  Here's a basic example to get your bot online and connected to
                  Lavalink. Make sure to replace `'YOUR_BOT_TOKEN'` with your
                  actual bot token.
               </p>
               <CodeBlock
                  onCopy={() =>
                     copyToClipboard(`const { Client, GatewayIntentBits } = require('discord.js');
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
    console.log('Bot is ready and connected to Lavalink!');
});

client.login('YOUR_BOT_TOKEN');`)
                  }
               >
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
    console.log('Bot is ready and connected to Lavalink!');
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
                        <p className="text-muted-foreground">
                           Support for YouTube, Spotify, SoundCloud, and more
                        </p>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader>
                        <CardTitle>🔧 Advanced Queue Management</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <p className="text-muted-foreground">
                           Shuffle, loop, skip, and manipulate queues with ease
                        </p>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader>
                        <CardTitle>🎛️ Audio Filters</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <p className="text-muted-foreground">
                           Apply equalizer, timescale, and other audio effects
                        </p>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader>
                        <CardTitle>⚡ High Performance</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <p className="text-muted-foreground">
                           Built on Lavalink for optimal performance and
                           reliability
                        </p>
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
               Proper initialization is key to a stable and reliable music bot.
               This section covers the essential steps to configure AquaLink and
               connect it to your Discord bot instance.
            </p>

            <section className="mb-12">
               <h2 className="text-2xl font-semibold mb-6">
                  Step-by-Step Setup
               </h2>

               <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">
                     1. Import Dependencies
                  </h3>
                  <CodeBlock
                     onCopy={() =>
                        copyToClipboard(`const { Client, GatewayIntentBits } = require('discord.js');
const { Aqua } = require('aqualink');`)
                     }
                  >
                     {`const { Client, GatewayIntentBits } = require('discord.js');
const { Aqua } = require('aqualink');`}
                  </CodeBlock>
               </div>

               <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">
                     2. Create Discord Client
                  </h3>
                  <CodeBlock
                     onCopy={() =>
                        copyToClipboard(`const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages
    ]
});`)
                     }
                  >
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
                  <h3 className="text-xl font-semibold mb-4">
                     3. Initialize Aqua
                  </h3>
                  <CodeBlock
                     onCopy={() =>
                        copyToClipboard(`client.aqua = new Aqua(client, {
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
});`)
                     }
                  >
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
                  <h3 className="text-xl font-semibold mb-4">
                     4. Handle Ready Event
                  </h3>
                  <CodeBlock
                     onCopy={() =>
                        copyToClipboard(`client.on('ready', async (client) => {
    console.log('Bot is online!');

    // Initialize Aqua with bot user ID
    await client.aqua.init(client.user.id);

    console.log('Aqua is ready!');
});
// handle raw event for voice state updates
client.on('raw', (packet) => {
    client.aqua.updateVoiceState(packet)
});`)
                     }
                  >
                     {`client.on('ready', async (client) => {
    console.log('Bot is online!');

    // Initialize Aqua with bot user ID
    await client.aqua.init(client.user.id);

    console.log('Aqua is ready!');
});

// handle raw event for voice state updates
client.on('raw', (packet) => {
    client.aqua.updateVoiceState(packet)
});
`}
                  </CodeBlock>
               </div>

               <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">5. Login Bot</h3>
                  <CodeBlock
                     onCopy={() =>
                        copyToClipboard(`client.login('YOUR_BOT_TOKEN');`)
                     }
                  >
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
               Configure AquaLink with various options to customize behavior and
               performance.
            </p>

            <section className="mb-12">
               <h2 className="text-2xl font-semibold mb-6">
                  Complete Configuration
               </h2>
               <CodeBlock
                  onCopy={() =>
                     copyToClipboard(`const { Aqua } = require('aqualink');

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
});`)
                  }
               >
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
               <h2 className="text-2xl font-semibold mb-6">
                  Configuration Options
               </h2>
               <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border rounded-lg">
                     <thead>
                        <tr className="bg-muted/50">
                           <th className="border border-border p-3 text-left font-semibold">
                              Option
                           </th>
                           <th className="border border-border p-3 text-left font-semibold">
                              Type
                           </th>
                           <th className="border border-border p-3 text-left font-semibold">
                              Default
                           </th>
                           <th className="border border-border p-3 text-left font-semibold">
                              Description
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {[
                           [
                              'nodes',
                              'Array<NodeOptions>',
                              '[]',
                              'Array of Lavalink node configurations',
                           ],
                           [
                              'defaultSearchPlatform',
                              'string',
                              'ytsearch',
                              'Default search platform (ytsearch, spsearch, etc.)',
                           ],
                           [
                              'shouldDeleteMessage',
                              'boolean',
                              'false',
                              'Auto-delete bot responses',
                           ],
                           [
                              'leaveOnEnd',
                              'boolean',
                              'true',
                              'Leave voice channel when queue ends',
                           ],
                           [
                              'restVersion',
                              'string',
                              'v4',
                              'Lavalink REST API version',
                           ],
                           [
                              'autoResume',
                              'boolean',
                              'false',
                              'Auto-resume on disconnect',
                           ],
                           [
                              'infiniteReconnects',
                              'boolean',
                              'false',
                              'Enable infinite reconnection attempts',
                           ],
                        ].map(
                           ([option, type, defaultVal, description], index) => (
                              <tr key={index} className="hover:bg-muted/30">
                                 <td className="border border-border p-3 font-mono text-sm">
                                    {option}
                                 </td>
                                 <td className="border border-border p-3 font-mono text-sm text-primary">
                                    {type}
                                 </td>
                                 <td className="border border-border p-3 font-mono text-sm text-accent">
                                    {defaultVal}
                                 </td>
                                 <td className="border border-border p-3 text-sm">
                                    {description}
                                 </td>
                              </tr>
                           )
                        )}
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
               The Player class is the heart of AquaLink's music functionality.
               It manages everything related to a single guild's music session,
               from connection and playback to volume and state.
            </p>
            <section className="mb-12">
               <h2 className="text-2xl font-semibold mb-6">
                  Creating a Player
               </h2>
               <p className="text-muted-foreground mb-4">
                  To start using the player, you first need to create a
                  connection. This is typically done when a user runs a play
                  command. If a player already exists for the guild, you can
                  retrieve it using `getPlayer`.
               </p>
               <CodeBlock
                  onCopy={() =>
                     copyToClipboard(`// Create a new player connection
const player = client.aqua.createConnection({
    guildId: interaction.guild.id,
    textChannel: interaction.channel.id,
    voiceChannel: interaction.member.voice.channel.id,
    deaf: true,
    defaultVolume: 100
});

// Get an existing player
const existingPlayer = client.aqua.players.get(guildId)`)
                  }
               >
                  {`// Create a new player connection
const player = client.aqua.createConnection({
    guildId: interaction.guild.id,
    textChannel: interaction.channel.id,
    voiceChannel: interaction.member.voice.channel.id,
    deaf: true,
    defaultVolume: 100
});

// Get an existing player
const existingPlayer = client.aqua.players.get(guildId);`}
               </CodeBlock>
            </section>
            <section className="mb-12">
               <h2 className="text-2xl font-semibold mb-6">
                  Player Properties
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                     {
                        name: 'playing',
                        type: 'boolean',
                        desc: 'Whether music is currently playing',
                     },
                     {
                        name: 'paused',
                        type: 'boolean',
                        desc: 'Whether playback is paused',
                     },
                     {
                        name: 'volume',
                        type: 'number',
                        desc: 'Current volume (0-1000)',
                     },
                     {
                        name: 'position',
                        type: 'number',
                        desc: 'Current track position in ms',
                     },
                     {
                        name: 'guildId',
                        type: 'string',
                        desc: 'Guild ID this player belongs to',
                     },
                     {
                        name: 'voiceChannel',
                        type: 'string',
                        desc: 'Voice channel ID',
                     },
                     {
                        name: 'textChannel',
                        type: 'string',
                        desc: 'Text channel ID for messages',
                     },
                     {
                        name: 'connected',
                        type: 'boolean',
                        desc: 'Whether the player is connected to a voice channel',
                     },
                     {
                        name: 'destroyed',
                        type: 'boolean',
                        desc: 'Whether the player has been destroyed',
                     },
                     {
                        name: 'isAutoplayEnabled',
                        type: 'boolean',
                        desc: 'Whether autoplay is enabled',
                     },
                     {
                        name: 'current',
                        type: 'Track',
                        desc: 'Currently playing track instance',
                     },
                     {
                        name: 'timestamp',
                        type: 'number',
                        desc: 'Timestamp of last update in ms',
                     },
                     {
                        name: 'ping',
                        type: 'number',
                        desc: 'Player ping in ms',
                     },
                     {
                        name: 'nowPlayingMessage',
                        type: 'string',
                        desc: 'Now playing message instance',
                     },
                     {
                        name: 'deaf',
                        type: 'boolean',
                        desc: 'Whether the bot is deafened in the voice channel',
                     },
                     {
                        name: 'mute',
                        type: 'boolean',
                        desc: 'Whether the bot is muted in the voice channel',
                     },
                     {
                        name: 'previous',
                        type: 'Track',
                        desc: 'Previous track instance',
                     },
                     {
                        name: 'queue',
                        type: 'Queue',
                        desc: 'Player queue instance',
                     },
                  ].map((prop, index) => (
                     <Card key={index}>
                        <CardHeader>
                           <CardTitle className="text-lg flex items-center gap-2">
                              <span className="font-mono">{prop.name}</span>
                              <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                                 {prop.type}
                              </span>
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="text-muted-foreground">{prop.desc}</p>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </section>
            jsx
            <section className="mb-12">
               <h2 className="text-2xl font-semibold mb-6">Player Methods</h2>
               <div className="space-y-6">
                  <div>
                     <h3 className="text-xl font-semibold mb-3">
                        play(track?)
                     </h3>
                     <p className="text-muted-foreground mb-3">
                        Start playing the current queue or a specific track
                     </p>
                     <CodeBlock
                        onCopy={() =>
                           copyToClipboard(`player.play(); // Play queue
player.queue.add(track); // Play specific track`)
                        }
                     >
                        {`player.play(); // Play queue
player.queue.add(track); // Play specific track`}
                     </CodeBlock>
                  </div>
                  <div>
                     <h3 className="text-xl font-semibold mb-3">
                        pause(state)
                     </h3>
                     <p className="text-muted-foreground mb-3">
                        Pause or resume playback
                     </p>
                     <CodeBlock
                        onCopy={() =>
                           copyToClipboard(`player.pause(true);  // Pause
player.pause(false); // Resume`)
                        }
                     >
                        {`player.pause(true);  // Pause
player.pause(false); // Resume`}
                     </CodeBlock>
                  </div>
                  <div>
                     <h3 className="text-xl font-semibold mb-3">stop()</h3>
                     <p className="text-muted-foreground mb-3">
                        Stop playback and clear the queue
                     </p>
                     <CodeBlock
                        onCopy={() => copyToClipboard(`player.stop();`)}
                     >
                        player.stop();
                     </CodeBlock>
                  </div>
                  <div>
                     <h3 className="text-xl font-semibold mb-3">skip()</h3>
                     <p className="text-muted-foreground mb-3">
                        Skip to the next track
                     </p>
                     <CodeBlock
                        onCopy={() => copyToClipboard(`player.skip();`)}
                     >
                        player.skip();
                     </CodeBlock>
                  </div>
                  <div>
                     <h3 className="text-xl font-semibold mb-3">
                        seek(position)
                     </h3>
                     <p className="text-muted-foreground mb-3">
                        Seek to a specific position in milliseconds
                     </p>
                     <CodeBlock
                        onCopy={() =>
                           copyToClipboard(
                              `player.seek(60000); // Seek to 1 minute`
                           )
                        }
                     >
                        player.seek(60000); // Seek to 1 minute
                     </CodeBlock>
                  </div>
                  <div>
                     <h3 className="text-xl font-semibold mb-3">
                        setVolume(volume)
                     </h3>
                     <p className="text-muted-foreground mb-3">
                        Set player volume (0-1000)
                     </p>
                     <CodeBlock
                        onCopy={() =>
                           copyToClipboard(
                              `player.setVolume(50); // 50% volume`
                           )
                        }
                     >
                        player.setVolume(50); // 50% volume
                     </CodeBlock>
                  </div>
                  <div>
                     <h3 className="text-xl font-semibold mb-3">destroy()</h3>
                     <p className="text-muted-foreground mb-3">
                        Destroy the player and disconnect
                     </p>
                     <CodeBlock
                        onCopy={() => copyToClipboard(`player.destroy();`)}
                     >
                        player.destroy();
                     </CodeBlock>
                  </div>
                  <div>
                     <h3 className="text-xl font-semibold mb-3">
                        setLoop(none | track | queue)
                     </h3>
                     <p className="text-muted-foreground mb-3">
                        Set the loop mode for the player
                     </p>
                     <CodeBlock
                        onCopy={() =>
                           copyToClipboard(
                              `player.setLoop('track'); // Loop the current track`
                           )
                        }
                     >
                        player.setLoop('track'); // Loop the current track
                     </CodeBlock>
                  </div>
                  <div>
                     <h3 className="text-xl font-semibold mb-3">
                        setTextChannel(channel)
                     </h3>
                     <p className="text-muted-foreground mb-3">
                        Set the text channel for player messages
                     </p>
                     <CodeBlock
                        onCopy={() =>
                           copyToClipboard(`player.setTextChannel(channel);`)
                        }
                     >
                        player.setTextChannel(channel);
                     </CodeBlock>
                  </div>
                  <div>
                     <h3 className="text-xl font-semibold mb-3">
                        setVoiceChannel(channel)
                     </h3>
                     <p className="text-muted-foreground mb-3">
                        Set the voice channel for the player
                     </p>
                     <CodeBlock
                        onCopy={() =>
                           copyToClipboard(`player.setVoiceChannel(channel);`)
                        }
                     >
                        player.setVoiceChannel(channel);
                     </CodeBlock>
                  </div>
                  <div>
                     <h3 className="text-xl font-semibold mb-3">
                        disconnect()
                     </h3>
                     <p className="text-muted-foreground mb-3">
                        Disconnect the player from the voice channel
                     </p>
                     <CodeBlock
                        onCopy={() => copyToClipboard(`player.disconnect();`)}
                     >
                        player.disconnect();
                     </CodeBlock>
                  </div>
                  <div>
                     <h3 className="text-xl font-semibold mb-3">shuffle()</h3>
                     <p className="text-muted-foreground mb-3">
                        Shuffle the current queue
                     </p>
                     <CodeBlock
                        onCopy={() => copyToClipboard(`player.shuffle();`)}
                     >
                        player.shuffle();
                     </CodeBlock>
                  </div>
                  <div>
                     <h3 className="text-xl font-semibold mb-3">replay()</h3>
                     <p className="text-muted-foreground mb-3">
                        Replay the current track
                     </p>
                     <CodeBlock
                        onCopy={() => copyToClipboard(`player.replay();`)}
                     >
                        player.replay();
                     </CodeBlock>
                  </div>
                  <div>
                     <h3 className="text-xl font-semibold mb-3">getLyrics()</h3>
                     <p className="text-muted-foreground mb-3">
                        Get the lyrics of the current track
                     </p>
                     <CodeBlock
                        onCopy={() => copyToClipboard(`player.getLyrics();`)}
                     >
                        player.getLyrics();
                     </CodeBlock>
                  </div>
                  <div>
                     <h3 className="text-xl font-semibold mb-3">
                        subscribeLiveLyrics()
                     </h3>
                     <p className="text-muted-foreground mb-3">
                        Subscribe to live lyrics updates
                     </p>
                     <CodeBlock
                        onCopy={() =>
                           copyToClipboard(`player.subscribeLiveLyrics();`)
                        }
                     >
                        player.subscribeLiveLyrics();
                     </CodeBlock>
                  </div>
                  <div>
                     <h3 className="text-xl font-semibold mb-3">
                        unsubscribeLiveLyrics()
                     </h3>
                     <p className="text-muted-foreground mb-3">
                        Unsubscribe from live lyrics updates
                     </p>
                     <CodeBlock
                        onCopy={() =>
                           copyToClipboard(`player.unsubscribeLiveLyrics();`)
                        }
                     >
                        player.unsubscribeLiveLyrics();
                     </CodeBlock>
                  </div>
                  <div>
                     <h3 className="text-xl font-semibold mb-3">autoplay()</h3>
                     <p className="text-muted-foreground mb-3">
                        Enable autoplay for the player
                     </p>
                     <CodeBlock
                        onCopy={() => copyToClipboard(`player.autoplay();`)}
                     >
                        player.autoplay();
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
               The Queue class provides a robust set of tools for managing your
               music queue. You can add, remove, shuffle, and inspect tracks
               with ease.
            </p>

            <section className="mb-10">
               <h2 className="text-2xl font-semibold mb-6">Queue Methods</h2>

               <section className="mb-10">
                  <div className="flex items-center gap-4 mb-4">
                     <h3 className="text-xl font-semibold">add(track)</h3>
                     <span className="bg-accent/10 text-accent px-2 py-1 rounded text-sm font-mono">
                        METHOD
                     </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                     Add a single track to the queue.
                  </p>
                  <CodeBlock
                     onCopy={() => copyToClipboard('player.queue.add(track);')}
                  >
                     player.queue.add(track);
                  </CodeBlock>
               </section>
               <section className="mb-10">
                  <div className="flex items-center gap-4 mb-4">
                     <h3 className="text-xl font-semibold">remove(index)</h3>
                     <span className="bg-accent/10 text-accent px-2 py-1 rounded text-sm font-mono">
                        METHOD
                     </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                     Remove a track at the specified index.
                  </p>
                  <CodeBlock
                     onCopy={() =>
                        copyToClipboard(
                           'player.queue.remove(2); // Remove track at index 2'
                        )
                     }
                  >
                     player.queue.remove(2); // Remove track at index 2
                  </CodeBlock>
               </section>
               <section className="mb-10">
                  <div className="flex items-center gap-4 mb-4">
                     <h3 className="text-xl font-semibold">clear()</h3>
                     <span className="bg-accent/10 text-accent px-2 py-1 rounded text-sm font-mono">
                        METHOD
                     </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                     Clear all tracks from the queue.
                  </p>
                  <CodeBlock
                     onCopy={() => copyToClipboard('player.queue.clear();')}
                  >
                     player.queue.clear();
                  </CodeBlock>
               </section>
               <section className="mb-10">
                  <div className="flex items-center gap-4 mb-4">
                     <h3 className="text-xl font-semibold">shuffle()</h3>
                     <span className="bg-accent/10 text-accent px-2 py-1 rounded text-sm font-mono">
                        METHOD
                     </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                     Shuffle the current queue.
                  </p>
                  <CodeBlock
                     onCopy={() => copyToClipboard('player.queue.shuffle();')}
                  >
                     player.queue.shuffle();
                  </CodeBlock>
               </section>
               <section className="mb-10">
                  <div className="flex items-center gap-4 mb-4">
                     <h3 className="text-xl font-semibold">peek()</h3>
                     <span className="bg-accent/10 text-accent px-2 py-1 rounded text-sm font-mono">
                        METHOD
                     </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                     View the first track in the queue without removing it.
                  </p>
                  <CodeBlock
                     onCopy={() =>
                        copyToClipboard('const track = player.queue.peek();')
                     }
                  >
                     const track = player.queue.peek();
                  </CodeBlock>
               </section>
               <section className="mb-10">
                  <div className="flex items-center gap-4 mb-4">
                     <h3 className="text-xl font-semibold">first()</h3>
                     <span className="bg-accent/10 text-accent px-2 py-1 rounded text-sm font-mono">
                        METHOD
                     </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                     Get the first track in the queue.
                  </p>
                  <CodeBlock
                     onCopy={() =>
                        copyToClipboard(
                           'const firstTrack = player.queue.first();'
                        )
                     }
                  >
                     const firstTrack = player.queue.first();
                  </CodeBlock>
               </section>
               <section className="mb-10">
                  <div className="flex items-center gap-4 mb-4">
                     <h3 className="text-xl font-semibold">last()</h3>
                     <span className="bg-accent/10 text-accent px-2 py-1 rounded text-sm font-mono">
                        METHOD
                     </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                     Get the last track in the queue.
                  </p>
                  <CodeBlock
                     onCopy={() =>
                        copyToClipboard(
                           'const lastTrack = player.queue.last();'
                        )
                     }
                  >
                     const lastTrack = player.queue.last();
                  </CodeBlock>
               </section>
               <section className="mb-10">
                  <div className="flex items-center gap-4 mb-4">
                     <h3 className="text-xl font-semibold">at(index)</h3>
                     <span className="bg-accent/10 text-accent px-2 py-1 rounded text-sm font-mono">
                        METHOD
                     </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                     Get the track at the specified index.
                  </p>
                  <CodeBlock
                     onCopy={() =>
                        copyToClipboard('const track = player.queue.at(1);')
                     }
                  >
                     const track = player.queue.at(1);
                  </CodeBlock>
               </section>
               <section className="mb-10">
                  <div className="flex items-center gap-4 mb-4">
                     <h3 className="text-xl font-semibold">enqueue(track)</h3>
                     <span className="bg-accent/10 text-accent px-2 py-1 rounded text-sm font-mono">
                        METHOD
                     </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                     Add a track to the end of the queue.
                  </p>
                  <CodeBlock
                     onCopy={() =>
                        copyToClipboard('player.queue.enqueue(track);')
                     }
                  >
                     player.queue.enqueue(track);
                  </CodeBlock>
               </section>
               <section className="mb-10">
                  <div className="flex items-center gap-4 mb-4">
                     <h3 className="text-xl font-semibold">dequeue()</h3>
                     <span className="bg-accent/10 text-accent px-2 py-1 rounded text-sm font-mono">
                        METHOD
                     </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                     Remove and return the first track in the queue.
                  </p>
                  <CodeBlock
                     onCopy={() =>
                        copyToClipboard('const track = player.queue.dequeue();')
                     }
                  >
                     const track = player.queue.dequeue();
                  </CodeBlock>
               </section>
               <section className="mb-10">
                  <div className="flex items-center gap-4 mb-4">
                     <h3 className="text-xl font-semibold">isEmpty()</h3>
                     <span className="bg-accent/10 text-accent px-2 py-1 rounded text-sm font-mono">
                        METHOD
                     </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                     Check if the queue is empty.
                  </p>
                  <CodeBlock
                     onCopy={() =>
                        copyToClipboard('const empty = player.queue.isEmpty();')
                     }
                  >
                     const empty = player.queue.isEmpty();
                  </CodeBlock>
               </section>
               <section className="mb-10">
                  <h2 className="text-2xl font-semibold mb-6">Properties</h2>

                  <div className="mb-6">
                     <div className="flex items-center gap-4 mb-2">
                        <h4 className="text-lg font-medium">tracks</h4>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-mono">
                           ARRAY
                        </span>
                     </div>
                     <p className="text-muted-foreground mb-3">
                        Array of all tracks in the queue.
                     </p>
                     <CodeBlock
                        onCopy={() =>
                           copyToClipboard(
                              'console.log(player.queue.tracks); // Array of tracks'
                           )
                        }
                     >
                        console.log(player.queue.tracks); // Array of tracks
                     </CodeBlock>
                  </div>
                  <div className="mb-6">
                     <div className="flex items-center gap-4 mb-2">
                        <h4 className="text-lg font-medium">current</h4>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-mono">
                           OBJECT
                        </span>
                     </div>
                     <p className="text-muted-foreground mb-3">
                        Currently playing track.
                     </p>
                     <CodeBlock
                        onCopy={() =>
                           copyToClipboard(
                              'console.log(player.current); // Current track object'
                           )
                        }
                     >
                        console.log(player.current); // Current track object
                     </CodeBlock>
                  </div>
                  <div className="mb-6">
                     <div className="flex items-center gap-4 mb-2">
                        <h4 className="text-lg font-medium">size</h4>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-mono">
                           NUMBER
                        </span>
                     </div>
                     <p className="text-muted-foreground mb-3">
                        Total number of tracks in the queue.
                     </p>
                     <CodeBlock
                        onCopy={() =>
                           copyToClipboard(
                              'console.log(player.queue.size); // Queue size'
                           )
                        }
                     >
                        console.log(player.queue.size); // Queue size
                     </CodeBlock>
                  </div>
               </section>
            </section>
         </div>
      );
   }

   if (activeSection === 'node-class') {
      return (
         <div className="max-w-5xl">
            <h1 className="text-4xl font-bold mb-8 mt-12">Node Class</h1>
            <p className="text-lg text-muted-foreground mb-12">
               The Node class represents a connection to a Lavalink server. You
               can manage multiple nodes, monitor their status, and handle
               failover scenarios.
            </p>

            <section className="mb-12">
               <h2 className="text-2xl font-semibold mb-6">
                  Node Configuration
               </h2>
               <CodeBlock
                  onCopy={() =>
                     copyToClipboard(`const nodeOptions = {
  host: 'localhost',
  port: 2333,
  password: 'youshallnotpass',
  secure: false,
  name: 'main-node',
  retryAmount: 5,
  retryDelay: 30000,
  requestTimeout: 10000
};`)
                  }
               >
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
                     <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-mono">
                        BOOLEAN
                     </span>
                  </div>
                  <p className="text-muted-foreground mb-3">
                     Whether the node is currently connected.
                  </p>
                  <CodeBlock
                     onCopy={() =>
                        copyToClipboard(
                           'console.log(node.connected); // true/false'
                        )
                     }
                  >
                     console.log(node.connected); // true/false
                  </CodeBlock>
               </div>

               <div className="mb-6">
                  <div className="flex items-center gap-4 mb-2">
                     <h4 className="text-lg font-medium">stats</h4>
                     <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-mono">
                        OBJECT
                     </span>
                  </div>
                  <p className="text-muted-foreground mb-3">
                     Node statistics including CPU, memory, and player count.
                  </p>
                  <CodeBlock
                     onCopy={() =>
                        copyToClipboard(`console.log(node.stats);
// { players: 0, playingPlayers: 0, uptime: 123456 }`)
                     }
                  >
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
               This section demonstrates how to search for and play tracks. It
               covers the entire process from handling a user command to getting
               music playing in a voice channel.
            </p>

            <section className="mb-12">
               <h2 className="text-2xl font-semibold mb-6">
                  Complete Play Command Example
               </h2>
               <p className="text-muted-foreground mb-4">
                  This example shows a complete play command for a Discord bot
                  using slash commands.
               </p>
               <CodeBlock
                  onCopy={() =>
                     copyToClipboard(`client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand() || interaction.commandName !== 'play') return;

    const query = interaction.options.getString('query');
    const member = interaction.member;

    if (!member.voice.channel) {
        return interaction.reply({ content: 'You must be in a voice channel to play music.', ephemeral: true });
    }

    const player = client.aqua.createConnection({
        guildId: interaction.guild.id,
        textChannel: interaction.channel.id,
        voiceChannel: member.voice.channel.id,
        deaf: true
    });

    const result = await client.aqua.resolve({ query, member })


    if (!result.tracks.length) {
        return interaction.reply({ content: 'No tracks found.', ephemeral: true });
    }

    player.queue.add(result.tracks[0]);
    await interaction.reply({ content: \`Added **\${result.tracks[0].title}** to the queue.\` });

    if (!player.playing && !player.paused) {
        player.play();
    }
});`)
                  }
               >
                  {`client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand() || interaction.commandName !== 'play') return;

    const query = interaction.options.getString('query');
    const member = interaction.member;

    if (!member.voice.channel) {
        return interaction.reply({ content: 'You must be in a voice channel to play music.', ephemeral: true });
    }

    const player = client.aqua.createConnection({
        guildId: interaction.guild.id,
        textChannel: interaction.channel.id,
        voiceChannel: member.voice.channel.id,
        deaf: true
    });

    const result = await client.aqua.search(query, member);

    if (!result.tracks.length) {
        return interaction.reply({ content: 'No tracks found.', ephemeral: true });
    }

    player.queue.add(result.tracks[0]);
    await interaction.reply({ content: \`Added **\${result.tracks[0].title}** to the queue.\` });

    if (!player.playing && !player.paused) {
        player.play();
    }
});`}
               </CodeBlock>
            </section>

            <section className="mb-12">
               <h2 className="text-2xl font-semibold mb-6">
                  Track Information
               </h2>
               <CodeBlock
                  onCopy={() =>
                     copyToClipboard(`// Get current playing track
const currentTrack = player.current;

if (currentTrack) {
    console.log('Title:', currentTrack.title);
    console.log('Author:', currentTrack.author);
    console.log('Duration:', currentTrack.duration);
    console.log('URL:', currentTrack.uri);
}`)
                  }
               >
                  {`// Get current playing track
const currentTrack = player.current;

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
               Search for tracks across different platforms and handle various
               search result types.
            </p>

            <section className="mb-12">
               <h2 className="text-2xl font-semibold mb-6">Basic Search</h2>
               <CodeBlock
                  onCopy={() =>
                     copyToClipboard(`// Basic YouTube search
const member = interaction.member;
const result = await client.aqua.resolve({
    query: 'Rick Astley Never Gonna Give You Up',
    member
});

console.log('Search results:');
console.log('Type:', result.type); // 'TRACK', 'PLAYLIST', or 'SEARCH'
console.log('Tracks found:', result.tracks.length);

if (result.tracks.length > 0) {
    const track = result.tracks[0];
    console.log('First result:', track.title, 'by', track.author);
}`)
                  }
               >
                  {`// Basic YouTube search
const member = interaction.member;
const result = await client.aqua.resolve({
    query: 'Rick Astley Never Gonna Give You Up',
    member
});

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
               <h2 className="text-2xl font-semibold mb-6">
                  Platform-Specific Searches
               </h2>
               <CodeBlock
                  onCopy={() =>
                     copyToClipboard(`const member = interaction.member;
// YouTube search
const ytResult = await client.aqua.resolve({
    query: 'Imagine Dragons Believer',
    defaultSearchPlatform: 'ytsearch', // or ytmsearch
    member
});

// Spotify search
const spotifyResult = await client.aqua.resolve({
    query: 'The Weeknd Blinding Lights',
    defaultSearchPlatform: 'spsearch',
    member
});

// SoundCloud search
const scResult = await client.aqua.resolve({
    query: 'Lofi Hip Hop',
    defaultSearchPlatform: 'scsearch',
    member
});`)
                  }
               >
                  {`
const member = interaction.member;
// YouTube search
const ytResult = await client.aqua.resolve({
    query: 'Imagine Dragons Believer',
    defaultSearchPlatform: 'ytsearch', // or ytmsearch
    member
});

// Spotify search
const spotifyResult = await client.aqua.resolve({
    query: 'The Weeknd Blinding Lights',
    defaultSearchPlatform: 'spsearch',
    member
});

// SoundCloud search
const scResult = await client.aqua.resolve({
    query: 'Lofi Hip Hop',
    defaultSearchPlatform: 'scsearch',
    member
});`}
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
               Control audio playback with play, pause, skip, volume, and
               seeking functions.
            </p>

            <section className="mb-12">
               <h2 className="text-2xl font-semibold mb-6">
                  Basic Playback Controls
               </h2>

               <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Play/Pause</h3>
                  <CodeBlock
                     onCopy={() =>
                        copyToClipboard(`// Start playback
player.play();

// Pause playback
player.pause(true);

// Resume playback
player.pause(false);

// Toggle pause state
const isPaused = player.paused;
player.pause(!isPaused);`)
                     }
                  >
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
                  <CodeBlock
                     onCopy={() =>
                        copyToClipboard(`// Stop current track and clear
player.stop();

// Skip to next track
player.skip();`)
                     }
                  >
                     {`// Stop current track and clear
player.stop();

// Skip to next track
player.skip();`}
                  </CodeBlock>
               </div>
            </section>

            <section className="mb-12">
               <h2 className="text-2xl font-semibold mb-6">Volume Control</h2>
               <CodeBlock
                  onCopy={() =>
                     copyToClipboard(`// Set volume (0-1000, where 100 = 100%)
player.setVolume(50);   // 50%
player.setVolume(100);  // 100% (default)
player.setVolume(150);  // 150% (amplified)

// Get current volume
console.log('Current volume:', player.volume);`)
                  }
               >
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
               <CodeBlock
                  onCopy={() =>
                     copyToClipboard(`// Seek to specific position (milliseconds)
player.seek(60000);  // Seek to 1 minute
player.seek(120000); // Seek to 2 minutes

// Seek to percentage of track
function seekToPercentage(percentage) {
    const track = player.current;
    if (track && track.isSeekable) {
        const position = (track.duration * percentage) / 100;
        player.seek(position);
        console.log(\`Seeked to \${percentage}%\`);
    }
}

// Usage examples
seekToPercentage(50);  // Seek to middle of track`)
                  }
               >
                  {`// Seek to specific position (milliseconds)
player.seek(60000);  // Seek to 1 minute
player.seek(120000); // Seek to 2 minutes

// Seek to percentage of track
function seekToPercentage(percentage) {
    const track = player.current;
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
               Advanced queue operations including shuffling, looping, and track
               manipulation.
            </p>

            <section className="mb-12">
               <h2 className="text-2xl font-semibold mb-6">Queue Operations</h2>
               <CodeBlock
                  onCopy={() =>
                     copyToClipboard(`// Add single track
player.queue.add(track);

// Add multiple tracks
for (const track of tracks) {
  player.queue.add(track);
}
// Remove track by index
player.queue.remove(2);

// Clear entire queue
player.queue.clear();

// Shuffle queue
player.queue.shuffle();

// Get queue info
console.log('Queue size:', player.queue.size);
console.log('Current track:', player.current?.title);`)
                  }
               >
                  {`// Add single track
player.queue.add(track);

// Add multiple tracks
for (const track of tracks) {
  player.queue.add(track);
}

// Remove track by index
player.queue.remove(2);

// Clear entire queue
player.queue.clear();

// Shuffle queue
player.queue.shuffle();

// Get queue info
console.log('Queue size:', player.queue.size);
console.log('Current track:', player.current?.title);`}
               </CodeBlock>
            </section>

            <section className="mb-12">
               <h2 className="text-2xl font-semibold mb-6">Loop Modes</h2>
               <CodeBlock
                  onCopy={() =>
                     copyToClipboard(`// Set loop modes
player.setLoop('none');     // No looping
player.setLoop('track');    // Loop current track
player.setLoop('queue');    // Loop entire queue

// Check current loop mode
console.log('Loop mode:', player.loop);`)
                  }
               >
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
               Apply various audio effects and filters to enhance playback
               experience.
            </p>

            <section className="mb-12">
               <h2 className="text-2xl font-semibold mb-6">Equalizer</h2>
               <CodeBlock
                  onCopy={() =>
                     copyToClipboard(`// Set equalizer bands (14 bands, -0.25 to 1.0)
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

player.setEqualizer(bands);`)
                  }
               >
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
               <CodeBlock
                  onCopy={() =>
                     copyToClipboard(`// Bass boost preset
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

player.setEqualizer(bassBoost);`)
                  }
               >
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
               AquaLink emits a variety of events to keep you informed about the
               state of your music players and Lavalink nodes. You can listen
               for these events to build a responsive and interactive bot.
            </p>

            <section className="mb-12">
               <h2 className="text-2xl font-semibold mb-6">Player Events</h2>
               <CodeBlock
                  onCopy={() =>
                     copyToClipboard(`// Track start event
client.aqua.on('trackStart', (player, track) => {
    console.log(\`Started playing: \${track.title}\`);
});

// Track end event
client.aqua.on('trackEnd', (player, track, payload) => {
    console.log(\`Track ended: \${track.title} (Reason: \${payload})\`);
});

// Track error event
client.aqua.on('trackError', (player, track, payload) => {
    console.log(\`Track error: \${track.title} (Error: \${payload})\`);
});

// Track Stuck event
client.aqua.on('trackStuck', (player, error, track) => {
    console.log(\`Track stuck: \${track.title}\`);
});

// socketClosed event
client.aqua.on('socketClosed', (player, track, payload) => {
    console.log(\`Socket closed: \${error}\`);
});

// lyricsLine event
client.aqua.on('lyricsLine', (player, track, payload) => {
    console.log(\`Lyrics: \${payload}\`);
});

// lyricsFound event
client.aqua.on('lyricsFound', (player, track, payload) => {
    console.log(\`Lyrics found: \${payload}\`);
});

// lyricsNotFound event
client.aqua.on('lyricsNotFound', (player, track, payload) => {
    console.log('Lyrics not found');
});

// Queue end event
client.aqua.on('queueEnd', (player) => {
    console.log('Queue has ended');
});

// Player destroy event
client.aqua.on('playerDestroy', (guildId) => {
    console.log(\`Player destroyed for guild: \${guildId}\`);
});`)
                  }
               >
                  {`/// Track start event
client.aqua.on('trackStart', (player, track) => {
    console.log(\`Started playing: \${track.title}\`);
});

// Track end event
client.aqua.on('trackEnd', (player, track, payload) => {
    console.log(\`Track ended: \${track.title} (Reason: \${payload})\`);
});

// Track error event
client.aqua.on('trackError', (player, track, payload) => {
    console.log(\`Track error: \${track.title} (Error: \${payload})\`);
});

// Track Stuck event
client.aqua.on('trackStuck', (player, error, track) => {
    console.log(\`Track stuck: \${track.title}\`);
});

// socketClosed event
client.aqua.on('socketClosed', (player, track, payload) => {
    console.log(\`Socket closed: \${error}\`);
});

// lyricsLine event
client.aqua.on('lyricsLine', (player, track, payload) => {
    console.log(\`Lyrics: \${payload}\`);
});

// lyricsFound event
client.aqua.on('lyricsFound', (player, track, payload) => {
    console.log(\`Lyrics found: \${payload}\`);
});

// lyricsNotFound event
client.aqua.on('lyricsNotFound', (player, track, payload) => {
    console.log('Lyrics not found');
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
               <CodeBlock
                  onCopy={() =>
                     copyToClipboard(`// Node connect event
client.aqua.on('nodeConnect', (node) => {
    console.log(\`Node \${node.name} connected\`);
});

// Node disconnect event
client.aqua.on('nodeDisconnect', (node, reason) => {
    console.log(\`Node \${node.name} disconnected: \${reason}\`);
});

// Node Destroy event
client.aqua.on('nodeDestroy', (node) => {
    console.log(\`Node \${node.name} destroyed\`);
});

// Node error event
client.aqua.on('nodeError', (node, error) => {
    console.error(\`Node \${node.name} error:\`, error);
});`)
                  }
               >
                  {`// Node connect event
client.aqua.on('nodeConnect', (node) => {
    console.log(\`Node \${node.name} connected\`);
});

// Node disconnect event
client.aqua.on('nodeDisconnect', (node, reason) => {
    console.log(\`Node \${node.name} disconnected: \${reason}\`);
});

// Node Destroy event
client.aqua.on('nodeDestroy', (node) => {
    console.log(\`Node \${node.name} destroyed\`);
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
               <h2 className="text-2xl font-semibold mb-6">
                  Connection Issues
               </h2>
               <div className="space-y-6">
                  <Card>
                     <CardHeader>
                        <CardTitle>Node Connection Failed</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <p className="text-muted-foreground mb-4">
                           Check if Lavalink server is running and accessible.
                        </p>
                        <CodeBlock
                           onCopy={() =>
                              copyToClipboard(`// Check node status
const node = client.aqua.getNode('main-node');
if (!node.connected) {
    console.log('Node is not connected');
    await node.reconnect();
}`)
                           }
                        >
                           {`// Check node status
const node = client.aqua._leastUsedNodesCache[0].connected
if (!node.connected) {
    console.log('Node is not connected');
}`}
                        </CodeBlock>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardHeader>
                        <CardTitle>Voice Channel Issues</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <p className="text-muted-foreground mb-4">
                           Ensure bot has proper permissions to join voice
                           channels.
                        </p>
                        <CodeBlock
                           onCopy={() =>
                              copyToClipboard(`// Check permissions
const permissions = voiceChannel.permissionsFor(client.user);
if (!permissions.has('Connect') || !permissions.has('Speak')) {
    throw new Error('Missing voice channel permissions');
}`)
                           }
                        >
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
                     <h4 className="font-semibold mb-2">
                        Error: No available nodes
                     </h4>
                     <p className="text-muted-foreground text-sm mb-2">
                        All Lavalink nodes are disconnected
                     </p>
                     <p className="text-sm">
                        Solution: Check node configuration and ensure Lavalink
                        server is running
                     </p>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                     <h4 className="font-semibold mb-2">
                        Error: Track load failed
                     </h4>
                     <p className="text-muted-foreground text-sm mb-2">
                        Track couldn't be loaded or played
                     </p>
                     <p className="text-sm">
                        Solution: Check if the track URL is valid and accessible
                     </p>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                     <h4 className="font-semibold mb-2">
                        Error: Player not found
                     </h4>
                     <p className="text-muted-foreground text-sm mb-2">
                        Trying to control a non-existent player
                     </p>
                     <p className="text-sm">
                        Solution: Create a player connection first before
                        controlling playback
                     </p>
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
            Welcome to AquaLink! A powerful Discord music bot library built on
            top of Lavalink.
         </p>

         <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Installation</h2>
            <CodeBlock onCopy={() => copyToClipboard('npm install aqualink')}>
               npm install aqualink
            </CodeBlock>
         </section>

         <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Quick Setup</h2>
            <CodeBlock
               onCopy={() =>
                  copyToClipboard(`const { Client, GatewayIntentBits } = require('discord.js');
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

client.on('raw', (packet) => {
    aqua.updateVoiceState(packet)
})

client.login('YOUR_BOT_TOKEN');`)
               }
            >
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

client.on('raw', (packet) => {
    aqua.updateVoiceState(packet)
})

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
   const [isSidebarOpen, setSidebarOpen] = useState(false);

   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth >= 768) {
            setSidebarOpen(false);
         }
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   return (
      <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-foreground">
         {/* Background animations */}
         <div className="absolute inset-0">
            <svg
               className="absolute inset-0 w-full h-full"
               xmlns="http://www.w3.org/2000/svg"
            >
               <defs>
                  <pattern
                     id="network"
                     x="0"
                     y="0"
                     width="100"
                     height="100"
                     patternUnits="userSpaceOnUse"
                  >
                     <circle
                        cx="50"
                        cy="50"
                        r="2"
                        fill="rgba(59, 130, 246, 0.3)"
                        className="animate-pulse"
                        style={{
                           animationDelay: '0s',
                           animationDuration: '4s',
                        }}
                     />
                     <circle
                        cx="20"
                        cy="20"
                        r="1.5"
                        fill="rgba(168, 85, 247, 0.4)"
                        className="animate-pulse"
                        style={{
                           animationDelay: '1s',
                           animationDuration: '3s',
                        }}
                     />
                  </pattern>
               </defs>
               <rect width="100%" height="100%" fill="url(#network)" />
            </svg>
         </div>
         <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-transparent to-slate-950/60" />

         {/* Mobile Header */}
         <header className="sticky top-0 z-40 md:hidden flex items-center justify-between h-16 px-4 bg-background/80 backdrop-blur-md border-b border-border/50">
            <a href="/" className="flex items-center">
               <span className="text-2xl font-bold whitespace-nowrap">
                  <span className="text-foreground">Aqua</span>
                  <span className="text-primary">Link</span>
               </span>
            </a>
            <Button
               variant="ghost"
               size="sm"
               onClick={() => setSidebarOpen(true)}
            >
               <Menu className="w-6 h-6" />
            </Button>
         </header>

         <div className="relative z-10 flex bg-transparent">
            <Sidebar
               activeSection={activeSection}
               onSectionChange={setActiveSection}
               isOpen={isSidebarOpen}
               onClose={() => setSidebarOpen(false)}
            />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
               <div className="max-w-full md:max-w-5xl mx-auto">
                  <DocsContent activeSection={activeSection} />
               </div>
            </main>
         </div>
      </div>
   );
};
export default DocsPage;
