import { db, isUsingMemoryStore } from "@/db";
import {
  projects as projectsTable,
  skills as skillsTable,
  experience as experienceTable,
  type Project,
  type Skill,
  type Experience,
} from "@/db/schema";
import {
  projectsStore,
  skillsStore,
  experienceStore,
} from "@/db/static-data";

export async function getProjects(): Promise<Project[]> {
  if (isUsingMemoryStore) {
    return [...projectsStore].sort((a, b) => a.displayOrder - b.displayOrder || a.id - b.id);
  }
  try {
    const { asc } = await import("drizzle-orm");
    return await db!
      .select()
      .from(projectsTable)
      .orderBy(asc(projectsTable.displayOrder), asc(projectsTable.id));
  } catch {
    return [];
  }
}

export async function getSkills(): Promise<Skill[]> {
  if (isUsingMemoryStore) {
    return [...skillsStore].sort((a, b) => a.displayOrder - b.displayOrder || a.id - b.id);
  }
  try {
    const { asc } = await import("drizzle-orm");
    return await db!
      .select()
      .from(skillsTable)
      .orderBy(asc(skillsTable.displayOrder), asc(skillsTable.id));
  } catch {
    return [];
  }
}

export async function getExperience(): Promise<Experience[]> {
  if (isUsingMemoryStore) {
    return [...experienceStore].sort((a, b) => a.displayOrder - b.displayOrder || a.id - b.id);
  }
  try {
    const { asc } = await import("drizzle-orm");
    return await db!
      .select()
      .from(experienceTable)
      .orderBy(asc(experienceTable.displayOrder), asc(experienceTable.id));
  } catch {
    return [];
  }
}
