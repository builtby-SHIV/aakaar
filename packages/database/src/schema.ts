import { 
    boolean, 
    index, 
    integer, 
    jsonb, 
    pgTable, 
    primaryKey, 
    text, 
    timestamp, 
    varchar 
} from "drizzle-orm/pg-core";

export const users = pgTable("user", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
}, (table) => [
        index("user_name_idx").on(table.name)
]);

export const accounts = pgTable("account",{
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<"oauth">().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
},(account) => [
    {
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    },
]);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable("verificationToken", {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
}, (verificationToken) => [
    {
        compositePk: primaryKey({
            columns: [verificationToken.identifier, verificationToken.token],
        }),
    },
]);

export const authenticators = pgTable("authenticator", {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
}, (authenticator) => [{
        compositePK: primaryKey({
            columns: [authenticator.userId, authenticator.credentialID],
        }),
    },
]);

export const projects = pgTable("projects", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    userId: text("user_id").references(() => users.id),
}, (table) => [
        index("project_name_idx").on(table.name),
]);

export const videos = pgTable("videos", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    projectId: integer("project_id").references(() => projects.id),
}, (table) => [
        index("video_name_idx").on(table.name),
]);

export const videoEdits = pgTable("videoEdits", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    videoId: integer("video_id").references(() => videos.id),
    zoom: jsonb(),
    blur: jsonb(),
    trim: jsonb(),
}, (table) => [
        index("zoom_idx").on(table.zoom),
        index("trim_idx").on(table.trim),
        index("blur_idx").on(table.blur),
]);