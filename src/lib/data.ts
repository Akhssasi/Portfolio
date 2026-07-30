import { asc } from "drizzle-orm";
import { db } from "@/db";
import {
  projects,
  skills,
  experience,
  type Project,
  type Skill,
  type Experience,
} from "@/db/schema";

/**
 * Repository layer used by the Server Components.
 * Every query degrades gracefully (returns []) so the site keeps rendering
 * even before the database has been seeded.
 */
export async function getProjects(): Promise<Project[]> {
  try {
    return await db
      .select()
      .from(projects)
      .orderBy(asc(projects.displayOrder), asc(projects.id));
  } catch {
    return [];
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    return await db
      .select()
      .from(skills)
      .orderBy(asc(skills.displayOrder), asc(skills.id));
  } catch {
    return [];
  }
}

export async function getExperience(): Promise<Experience[]> {
  try {
    return await db
      .select()
      .from(experience)
      .orderBy(asc(experience.displayOrder), asc(experience.id));
  } catch {
    return [];
  }
}
