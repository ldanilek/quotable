import { internalMutation } from "./_generated/server";

export default internalMutation(async ({ db }, { channelId }) => {
  if (
    await db
      .query("subscriptions")
      .filter((q) => q.eq(q.field("channelId"), channelId))
      .first()
  ) {
    console.log("already subscribed");
    return;
  }
  await db.insert("subscriptions", { channelId });
});
