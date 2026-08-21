import { router } from "./trpc";
import { meetingRouter } from "./routers/meeting";

export const appRouter = router({
    meeting: meetingRouter,
});

export type AppRouter = typeof appRouter;