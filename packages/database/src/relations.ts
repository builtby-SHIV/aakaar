/**
 * Drizzle ORM relations declarations.
 *
 * These define the relationships between tables for use with
 * Drizzle's relational query API (db.query.*).
 *
 * @see https://orm.drizzle.team/docs/relations
 */
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

// ─── Users ───────────────────────────────────────────────────────────────────

export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    sessions: many(sessions),
    authenticators: many(authenticators),
    projects: many(projects),
}));

// ─── Accounts ────────────────────────────────────────────────────────────────

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, {
        fields: [accounts.userId],
        references: [users.id],
    }),
}));

// ─── Sessions ────────────────────────────────────────────────────────────────

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}));

// ─── Authenticators ──────────────────────────────────────────────────────────

export const authenticatorsRelations = relations(authenticators, ({ one }) => ({
    user: one(users, {
        fields: [authenticators.userId],
        references: [users.id],
    }),
}));

// ─── Projects ────────────────────────────────────────────────────────────────

export const projectsRelations = relations(projects, ({ one, many }) => ({
    user: one(users, {
        fields: [projects.userId],
        references: [users.id],
    }),
    videos: many(videos),
}));

// ─── Videos ──────────────────────────────────────────────────────────────────

export const videosRelations = relations(videos, ({ one, many }) => ({
    project: one(projects, {
        fields: [videos.projectId],
        references: [projects.id],
    }),
    chunks: many(videoChunks),
    edits: many(videoEdits),
}));

// ─── Video Chunks ────────────────────────────────────────────────────────────

export const videoChunksRelations = relations(videoChunks, ({ one }) => ({
    video: one(videos, {
        fields: [videoChunks.videoId],
        references: [videos.id],
    }),
}));

// ─── Video Edits ─────────────────────────────────────────────────────────────

export const videoEditsRelations = relations(videoEdits, ({ one }) => ({
    video: one(videos, {
        fields: [videoEdits.videoId],
        references: [videos.id],
    }),
}));
