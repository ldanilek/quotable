import { cronJobs } from "./_generated/server";

const crons = cronJobs();

crons.interval(
  "deliver subscriptions",
  { hours: 1 },
  "deliverSubscriptions"
);

export default crons;
