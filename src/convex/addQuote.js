import { internalMutation, mutation } from "./_generated/server";

const inner = async (db, quote, attributedTo, contributor) => {
  await db.insert("quotes", {
    quote,
    attributedTo,
    contributor,
  });
};

export default mutation(async ({ db, auth }, { quote, attributedTo }) => {
  const identity = await auth.getUserIdentity();
  if (identity == null) {
    throw new Error("Unauthenticated call to mutation");
  }
  const { tokenIdentifier } = identity;
  await inner(db, quote, attributedTo, tokenIdentifier);
});

export const internal = internalMutation(
  async ({ db }, { quote, attributedTo, contributor }) => {
    await inner(db, quote, attributedTo, contributor);
  }
);

export const python = mutation(async ({ db }, { quote, attributedTo }) => {
  await inner(db, quote, attributedTo, "python");
});
