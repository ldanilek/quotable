import { mutation } from "./_generated/server";

export default mutation(async ({ db, auth }, { quoteId }) => {
  const identity = await auth.getUserIdentity();
  if (identity == null) {
    throw new Error("Unauthenticated call to mutation");
  }
  const { tokenIdentifier } = identity;
  const quote = await db.get(quoteId);
  if (quote.contributor !== tokenIdentifier) {
    throw new Error("you can only delete quotes you contributed");
  }
  await db.delete(quoteId);
});
