import express from "express";
import cors from "cors";
import { ENV } from "./lib/env";
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from '@repo/api/root';

const app = express();
const corsOptions = { 
    origin: ENV.CLIENT_URL, 
    // credentials: true 
};

app.use(cors(corsOptions));
app.use(express.json());
app.options("/{*path}", cors(corsOptions));
app.use('/trpc', trpcExpress.createExpressMiddleware({ router: appRouter }));
app.listen(ENV.PORT);