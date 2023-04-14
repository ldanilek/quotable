import { internalMutation } from "./_generated/server";

const getMinCursor = (subscriptions) => {
  const cursors = [];
  for (const subscription of subscriptions) {
    if (subscription.cursor) {
      cursors.push(subscription.cursor);
    }
  }
  if (!cursors.length) {
    return 0;
  }
  return Math.max(...cursors);
};

export default internalMutation(async ({ db, scheduler }) => {
  const subscriptions = await db.query("subscriptions").collect();
  const minCursor = getMinCursor(subscriptions);
  const quotes = await db
    .query("quotes")
    .withIndex("by_creation_time", (q) => q.gt("_creationTime", minCursor))
    .collect();
  for (const subscription of subscriptions) {
    const quotesToSend = [];
    for (const quote of quotes) {
      if (subscription.cursor && quote._creationTime <= subscription.cursor) {
        continue;
      }
      quotesToSend.push([quote.quote, quote.attributedTo]);
      await db.patch(subscription._id, { cursor: quote._creationTime });
    }
    if (quotesToSend.length > 0) {
        await scheduler.runAfter(0, "actions/sendQuotes", {
            quotesToSend,
            channelId: subscription.channelId,
        });
    }
  }
});
