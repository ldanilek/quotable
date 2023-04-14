import { mutation } from "./_generated/server";

export default mutation(async ({ db, auth }, { quoteId }) => {
  const identity = await auth.getUserIdentity();
  if (identity == null) {
    throw new Error("Unauthenticated call to mutation");
  }
  const { tokenIdentifier } = identity;
  const quote = await db.get(quoteId);
  const likes = quote.likes ?? [];
  const likeIndex = likes.indexOf(tokenIdentifier);
  if (likeIndex >= 0) {
    likes.splice(likeIndex, 1);
  } else {
    likes.push(tokenIdentifier);
  }
  await db.patch(quoteId, { likes });
});
