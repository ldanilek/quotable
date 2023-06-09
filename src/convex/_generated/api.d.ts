/* eslint-disable */
/**
 * Generated API.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@0.12.2.
 * To regenerate, run `npx convex codegen`.
 * @module
 */

import type { ApiFromModules } from "convex/api";
import type * as actions_sendQuotes from "../actions/sendQuotes";
import type * as addQuote from "../addQuote";
import type * as crons from "../crons";
import type * as deleteQuote from "../deleteQuote";
import type * as deliverSubscriptions from "../deliverSubscriptions";
import type * as getQuotes from "../getQuotes";
import type * as getRandomQuote from "../getRandomQuote";
import type * as http from "../http";
import type * as likeQuote from "../likeQuote";
import type * as subscribe from "../subscribe";
import type * as unsubscribe from "../unsubscribe";

/**
 * A type describing your app's public Convex API.
 *
 * This `API` type includes information about the arguments and return
 * types of your app's query and mutation functions.
 *
 * This type should be used with type-parameterized classes like
 * `ConvexReactClient` to create app-specific types.
 */
export type API = ApiFromModules<{
  "actions/sendQuotes": typeof actions_sendQuotes;
  addQuote: typeof addQuote;
  crons: typeof crons;
  deleteQuote: typeof deleteQuote;
  deliverSubscriptions: typeof deliverSubscriptions;
  getQuotes: typeof getQuotes;
  getRandomQuote: typeof getRandomQuote;
  http: typeof http;
  likeQuote: typeof likeQuote;
  subscribe: typeof subscribe;
  unsubscribe: typeof unsubscribe;
}>;
