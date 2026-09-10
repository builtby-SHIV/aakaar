import { relations } from "drizzle-orm";
import {
    users,
    accounts,
    sessions,
    authenticators,
    projects,
    videos,
    videoChunks,
    videoEdits,
} from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    sessions: many(sessions),
    authenticators: many(authenticators),
    projects: many(projects),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, {
        fields: [accounts.userId],
        references: [users.id],
    }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}));

export const authenticatorsRelations = relations(authenticators, ({ one }) => ({
    user: one(users, {
        fields: [authenticators.userId],
        references: [users.id],
    }),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
    user: one(users, {
        fields: [projects.userId],
        references: [users.id],
    }),
    videos: many(videos),
}));

export const videosRelations = relations(videos, ({ one, many }) => ({
    project: one(projects, {
        fields: [videos.projectId],
        references: [projects.id],
    }),
    chunks: many(videoChunks),
    edits: many(videoEdits),
}));

export const videoChunksRelations = relations(videoChunks, ({ one }) => ({
    video: one(videos, {
        fields: [videoChunks.videoId],
        references: [videos.id],
    }),
}));

export const videoEditsRelations = relations(videoEdits, ({ one }) => ({
    video: one(videos, {
        fields: [videoEdits.videoId],
        references: [videos.id],
    }),
}));
