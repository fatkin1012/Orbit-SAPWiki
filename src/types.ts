import { z } from 'zod';

export const STORAGE_KEY = 'tasks';
export const STORAGE_VERSION = '1.0.0';
export const TASK_COUNT_CHANGED = 'TASK_COUNT_CHANGED';
export const PLUGIN_ID = 'sapwiki';
export const PLUGIN_ROOT_ID = `plugin-${PLUGIN_ID}`;

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  requirement: z.string().optional().default(''),
  steps: z.string().optional().default(''),
  tCode: z.string().optional().default(''),
  tCodes: z.array(z.string()).optional().default([]),
  createdAt: z.number().default(() => Date.now()),
  imageData: z.string().optional(),
});

export type Task = z.infer<typeof TaskSchema>;
export const TaskListSchema = z.array(TaskSchema);

export type RestoreSource = 'raw' | 'data' | 'value' | 'payload' | 'tasks' | 'cases';
