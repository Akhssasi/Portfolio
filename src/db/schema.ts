import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

/**
 * Per-locale translation payloads stored as JSONB.
 * e.g. { ar: { title: "...", shortDescription: "..." }, ru: {...}, fr: {...} }
 */
export type TranslationMap = {
  ar?: Record<string, string>;
  ru?: Record<string, string>;
  fr?: Record<string, string>;
};

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  problem: text("problem").notNull(),
  solution: text("solution").notNull(),
  architecture: text("architecture").notNull(),
  features: text("features").array().notNull().default([]),
  techStack: text("tech_stack").array().notNull().default([]),
  githubUrl: text("github_url"),
  liveUrl: text("live_url"),
  imageUrl: text("image_url"),
  featured: boolean("featured").notNull().default(false),
  displayOrder: integer("display_order").notNull().default(0),
  translations: jsonb("translations")
    .$type<TranslationMap>()
    .notNull()
    .default({}),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // frontend | backend | database | tools
  iconName: text("icon_name").notNull().default(""),
  proficiency: integer("proficiency").notNull().default(80), // 0 - 100
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const experience = pgTable("experience", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  period: text("period").notNull(),
  description: text("description").notNull(),
  technologies: text("technologies").array().notNull().default([]),
  displayOrder: integer("display_order").notNull().default(0),
  translations: jsonb("translations")
    .$type<TranslationMap>()
    .notNull()
    .default({}),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"), // new | read | replied
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Project = typeof projects.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Experience = typeof experience.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
