import { mutation } from "./_generated/server";

export default mutation(async ({ db }, { quote, attributedTo }) => {
  const q = { quote, attributedTo };
  await db.insert("quotes", q);
});
