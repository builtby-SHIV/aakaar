import { index, integer, jsonb, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    email: varchar().unique().notNull(),
}, (table) => [
    index("name_idx").on(table.name),
    uniqueIndex("email_idx").on(table.email)
]);

export const projectsTable = pgTable("projects", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    userId: integer("user_id").references(() => usersTable.id),
}, (table) => [
    index("name_idx").on(table.name),
]);

export const videosTable = pgTable("videos", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    projectId: integer("project_id").references(() => projectsTable.id),
}, (table) => [
    index("name_idx").on(table.name),
]);

export const videoEditsTable = pgTable("videoEdits", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    videoId: integer("video_id").references(() => videosTable.id),
    zoom: jsonb(),
    blur: jsonb(),
    trim: jsonb(),
}, (table) => [
    index("zoom_idx").on(table.zoom),
    index("trim_idx").on(table.trim),
    index("blur_idx").on(table.blur),
]);