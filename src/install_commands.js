///
/// Run this with
/// DISCORD_TOKEN=<token> APP_ID=1096229575995965552 node install_commands.js


async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = "https://discord.com/api/v10/" + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use node-fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      "Content-Type": "application/json; charset=UTF-8",
      "User-Agent":
        "DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)",
    },
    ...options,
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

async function InstallGlobalCommands(appId, commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await DiscordRequest(endpoint, { method: "PUT", body: commands });
  } catch (err) {
    console.error(err);
  }
}

// Simple test command
const RANDOM_COMMAND = {
  name: "random_quote",
  description: "Fetch a random quote",
  type: 1,
};

const SUBSCRIBE_COMMAND = {
  name: "subscribe_quotes",
  description: "Get a digest of new quotes every hour",
  type: 1,
};

const UNSUBSCRIBE_COMMAND = {
  name: "unsubscribe_quotes",
  description: "Unsubscribe from quotes digest",
  type: 1,
};

// Command containing options
const ADD_QUOTE_COMMAND = {
  name: "add_quote",
  description: "Add a quote",
  options: [
    {
      type: 3,
      name: "quote",
      description: "What's the quote?",
      required: true,
    },
    {
      type: 3,
      name: "attribution",
      description: "Who said it?",
      required: true,
    },
  ],
  type: 1,
};

const ALL_COMMANDS = [
  RANDOM_COMMAND,
  SUBSCRIBE_COMMAND,
  UNSUBSCRIBE_COMMAND,
  ADD_QUOTE_COMMAND,
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
