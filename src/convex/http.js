import { httpRouter } from "convex/server";
import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from "discord-interactions";
import { httpEndpoint } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/discord",
  method: "POST",
  handler: httpEndpoint(async ({ runQuery, runMutation }, request) => {
    const bodyText = await request.text();

    // Check signature -- uses discord-interactions package
    const isValidSignature = verifyKey(
      bodyText,
      request.headers.get("X-Signature-Ed25519"),
      request.headers.get("X-Signature-Timestamp"),
      process.env.DISCORD_PUBLIC_KEY
    );
    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }
    const body = JSON.parse(bodyText);

    // Handle ping
    if (body.type === InteractionType.PING) {
      return new Response(
        JSON.stringify({ type: InteractionResponseType.PONG }),
        { status: 200 }
      );
    }

    const response = (botResponse) => {
      return new Response(
        JSON.stringify({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: { content: botResponse },
        }),
        { headers: { "Content-Type": "application/json" }, status: 200 }
      );
    };

    if (body.type === InteractionType.APPLICATION_COMMAND) {
      const data = body.data;
      if (data.name === "random_quote") {
        const randomQuote = await runQuery("getRandomQuote");
        const botResponse = randomQuote.quote;
        return response(botResponse);
      } else if (data.name === "subscribe_quotes") {
        const channelId = body.channel.id;
        await runMutation("subscribe", { channelId });
        const botResponse = "subscribed";
        return response(botResponse);
      } else if (data.name === "unsubscribe_quotes") {
        const channelId = body.channel.id;
        await runMutation("unsubscribe", { channelId });
        const botResponse = "unsubscribed";
        return response(botResponse);
      } else if (data.name === "add_quote") {
        const q = data.options[0].value;
        const attributedTo = data.options[1].value;
        const contributor = `discord|${body.member.user.id}`;
        await runMutation("addQuote:internal", {
          quote: q,
          attributedTo,
          contributor,
        });
        const botResponse = "quote saved";
        return response(botResponse);
      } else {
        console.error(`Unknown command ${data.name}`);
      }
    }
    console.error(`Bad request type ${body.type}`);
    return new Response("Unknown request", { status: 500 });
  }),
});

export default http;
