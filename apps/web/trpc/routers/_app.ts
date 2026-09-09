import { recordingRouter } from './recording';
import { createTRPCRouter } from '../init';
import { meetingRouter } from './meeting';

export const appRouter = createTRPCRouter({
    meeting: meetingRouter,
    recording: recordingRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;