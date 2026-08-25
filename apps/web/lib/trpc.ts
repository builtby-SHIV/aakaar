import { createTRPCContext } from '@trpc/tanstack-react-query';
import type { AppRouter } from '@repo/api/root';

export const { TRPCProvider, useTRPC, useTRPCClient } = createTRPCContext<AppRouter>();