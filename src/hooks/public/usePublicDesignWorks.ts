import { PROJECTS, type Project } from '@/data/projects';

export function usePublicDesignWorks(limit?: number) {
  const data = limit ? PROJECTS.slice(0, limit) : PROJECTS;
  return { data, loading: false };
}

export type { Project };
