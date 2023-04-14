import { query } from "./_generated/server";

export default query(async ({ db }) => {
    const allQuotes = await db.query("quotes").collect();
    return allQuotes[Math.floor(Math.random() * allQuotes.length)];
});
