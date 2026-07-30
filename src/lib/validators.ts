import { z } from "zod";

/** Request DTOs — mirror of the database entities with validation rules. */

const nullableUrl = z
  .string()
  .url()
  .or(z.literal(""))
  .optional()
  .nullable()
  .transform((v) => (v ? v : null));

const translationsSchema = z
  .object({
    ar: z.record(z.string(), z.string()).optional(),
    ru: z.record(z.string(), z.string()).optional(),
    fr: z.record(z.string(), z.string()).optional(),
  })
  .optional()
  .default({});

export const projectInputSchema = z.object({
  title: z.string().min(2).max(160),
  slug: z
    .string()
    .min(2)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be kebab-case"),
  shortDescription: z.string().min(10).max(600),
  fullDescription: z.string().min(10),
  problem: z.string().min(5),
  solution: z.string().min(5),
  architecture: z.string().min(5),
  features: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
  githubUrl: nullableUrl,
  liveUrl: nullableUrl,
  imageUrl: nullableUrl,
  featured: z.boolean().default(false),
  displayOrder: z.number().int().min(0).default(0),
  translations: translationsSchema,
});
export const projectUpdateSchema = projectInputSchema.partial();

export const skillInputSchema = z.object({
  name: z.string().min(1).max(80),
  category: z.enum(["frontend", "backend", "database", "tools"]),
  iconName: z.string().max(80).default(""),
  proficiency: z.number().int().min(0).max(100).default(80),
  displayOrder: z.number().int().min(0).default(0),
});
export const skillUpdateSchema = skillInputSchema.partial();

export const experienceInputSchema = z.object({
  role: z.string().min(2).max(160),
  company: z.string().min(2).max(160),
  period: z.string().min(4).max(60),
  description: z.string().min(10),
  technologies: z.array(z.string()).default([]),
  displayOrder: z.number().int().min(0).default(0),
  translations: translationsSchema,
});
export const experienceUpdateSchema = experienceInputSchema.partial();

export const contactInputSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(160),
  subject: z.string().trim().min(3).max(180),
  message: z.string().trim().min(10).max(5000),
});

/** Flatten a ZodError into `{ field: [messages] }` for the API envelope. */
export function zodFieldErrors(error: z.ZodError): Record<string, string[]> {
  const fields: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_form";
    (fields[key] ??= []).push(issue.message);
  }
  return fields;
}
