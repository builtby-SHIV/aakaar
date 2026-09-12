import { recordingRouter } from './recording';
import { createTRPCRouter } from '../init';
import { meetingRouter } from './meeting';
import { projectRouter } from './project';
import { videoRouter } from './video';
import { videoChunkRouter } from './videoChunk';

export const appRouter = createTRPCRouter({
    meeting: meetingRouter,
    recording: recordingRouter,
    project: projectRouter,
    video: videoRouter,
    videoChunk: videoChunkRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;