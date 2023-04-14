import { internalMutation } from "./_generated/server";

export default internalMutation(async ({ db }, { channelId }) => {
  const sub = await db
    .query("subscriptions")
    .filter((q) => q.eq(q.field("channelId"), channelId))
    .first();
  if (sub) {
    await db.delete(sub._id);
  }
});
