import { recordingRouter } from './recording';
import { createTRPCRouter } from '../init';
import { meetingRouter } from './meeting';
import { projectRouter } from './project';

export const appRouter = createTRPCRouter({
    meeting: meetingRouter,
    recording: recordingRouter,
    project: projectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;