import {
    defaultShouldDehydrateQuery,
    MutationCache,
    QueryCache,
    QueryClient,
} from '@tanstack/react-query';
import { notifyTRPCError } from '../lib/handle-error';

export function makeQueryClient() {
    return new QueryClient({
        queryCache: new QueryCache({
            onError: (error, query) => {
                // Allow queries to opt out of global toast notification
                if (query.meta?.suppressToast) return;
                notifyTRPCError(error);
            },
        }),
        mutationCache: new MutationCache({
            onError: (error, _variables, _context, mutation) => {
                // Allow mutations to opt out of global toast notification
                if (mutation.meta?.suppressToast) return;
                notifyTRPCError(error);
            },
        }),
        defaultOptions: {
            queries: {
                staleTime: 30 * 1000,
                retry: (failureCount, error) => {
                    // Avoid retrying on client errors (4xx)
                    const status = (error as { data?: { httpStatus?: number } })?.data?.httpStatus;
                    if (status && status >= 400 && status < 500) {
                        return false;
                    }
                    return failureCount < 2;
                },
            },
            dehydrate: {
                shouldDehydrateQuery: (query) =>
                    defaultShouldDehydrateQuery(query) ||
                    query.state.status === 'pending',
            },
        },
    });
}