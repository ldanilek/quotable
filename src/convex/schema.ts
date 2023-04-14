import { defineSchema, defineTable, s } from "convex/schema";

export default defineSchema({
  quotes: defineTable({
    attributedTo: s.string(),
    contributor: s.string(),
    likes: s.optional(s.array(s.string())),
    quote: s.string(),
  }).searchIndex('quote_text', {searchField: "quote"}),
  subscriptions: defineTable({ channelId: s.string(), cursor: s.number() }),
});
