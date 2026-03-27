import { IAppContext } from '@toolbox/sdk';
import { Task, TaskListSchema, RestoreSource, STORAGE_KEY, STORAGE_VERSION } from './types';

const PREVIEW_LIMIT = 240;

type Envelope = { data?: unknown; value?: unknown; payload?: unknown; tasks?: unknown } | null;

const safePreview = (value: unknown) => {
  try {
    const text = typeof value === 'string' ? value : JSON.stringify(value);
    return text.length > PREVIEW_LIMIT ? `${text.slice(0, PREVIEW_LIMIT)}...` : text;
  } catch (error) {
    return `[unserializable ${String(error)}]`;
  }
};

const parseJSON = (raw: unknown) => {
  if (typeof raw !== 'string') return raw;
  try {
    return JSON.parse(raw);
  } catch (error) {
    return raw;
  }
};

const extractArray = (raw: unknown): { candidate: unknown; source: RestoreSource } => {
  const parsed = parseJSON(raw) as Envelope | unknown;
  if (Array.isArray(parsed)) {
    return { candidate: parsed, source: 'raw' };
  }

  if (parsed && typeof parsed === 'object') {
    const envelope = parsed as Envelope;
    const keys: RestoreSource[] = ['data', 'value', 'payload', 'tasks', 'cases'];
    for (const key of keys) {
      const value = parseJSON((envelope as Record<string, unknown>)[key]);
      if (Array.isArray(value)) {
        return { candidate: value, source: key };
      }
    }
  }

  return { candidate: [], source: 'raw' };
};

export const coerceTasksFromUnknown = (raw: unknown): { tasks: Task[]; source: RestoreSource; ok: boolean } => {
  const { candidate, source } = extractArray(raw);
  const parsed = TaskListSchema.safeParse(candidate);
  if (!parsed.success) {
    console.error('[task-board] restore failed', parsed.error);
    return { tasks: [], source, ok: false };
  }
  return { tasks: parsed.data, source, ok: true };
};

export const restoreTasks = async (context: IAppContext): Promise<Task[]> => {
  console.info('[task-board] restore start');
  try {
    const raw = await context.storage.get<unknown>(STORAGE_KEY);
    const { tasks, source, ok } = coerceTasksFromUnknown(raw);
    console.info('[task-board] restore payload', {
      preview: safePreview(raw),
      extractedPath: source,
    });

    if (ok) {
      console.info('[task-board] restore success', {
        count: tasks.length,
        source,
      });
    }

    return tasks;
  } catch (error) {
    console.error('[task-board] restore failed', error);
    return [];
  }
};

export const saveTasks = async (context: IAppContext, tasks: Task[]): Promise<void> => {
  console.info(`[task-board] save triggered (count=${tasks.length})`);
  const validated = TaskListSchema.safeParse(tasks);
  if (!validated.success) {
    console.error('[task-board] save failed', validated.error);
    return;
  }
  try {
    await context.storage.save(STORAGE_KEY, validated.data, STORAGE_VERSION);
  } catch (error) {
    console.error('[task-board] save failed', error);
  }
};
