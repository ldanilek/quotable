import { query } from "./_generated/server";

export default query(async ({ db }, { filter }) => {
  let quotes = [];
  if (filter && filter.length > 0) {
    quotes = await db
      .query("quotes")
      .withSearchIndex("quote_text", (q) => q.search("quote", filter))
      .collect();
  } else {
    quotes = await db.query("quotes").order("desc").collect();
  }
  // js sort is stable
  quotes.sort((a, b) => (b.likes ?? []).length - (a.likes ?? []).length);
  return quotes;
});
