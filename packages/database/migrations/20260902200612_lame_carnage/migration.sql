CREATE TABLE "videoEdits" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "videoEdits_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"video_id" integer,
	"zoom" jsonb,
	"blur" jsonb,
	"trim" jsonb
);
--> statement-breakpoint
CREATE TABLE "videos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "videos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"project_id" integer
);
--> statement-breakpoint
CREATE INDEX "name_idx" ON "projects" ("name");--> statement-breakpoint
CREATE INDEX "name_idx" ON "users" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "email_idx" ON "users" ("email");--> statement-breakpoint
CREATE INDEX "zoom_idx" ON "videoEdits" ("zoom");--> statement-breakpoint
CREATE INDEX "trim_idx" ON "videoEdits" ("trim");--> statement-breakpoint
CREATE INDEX "blur_idx" ON "videoEdits" ("blur");--> statement-breakpoint
CREATE INDEX "name_idx" ON "videos" ("name");--> statement-breakpoint
ALTER TABLE "videoEdits" ADD CONSTRAINT "videoEdits_video_id_videos_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id");--> statement-breakpoint
ALTER TABLE "videos" ADD CONSTRAINT "videos_project_id_projects_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id");