import { cronJobs } from "./_generated/server";

const crons = cronJobs();

crons.interval(
  "deliver subscriptions",
  { minutes: 1 },
  "deliverSubscriptions"
);

export default crons;
