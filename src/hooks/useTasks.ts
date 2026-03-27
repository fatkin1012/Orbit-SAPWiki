import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IAppContext } from '@toolbox/sdk';
import { saveTasks, restoreTasks } from '../storage';
import { Task, TaskListSchema, TASK_COUNT_CHANGED } from '../types';

const createTask = (input: Partial<Task> & { title: string }): Task => ({
  id: crypto.randomUUID ? crypto.randomUUID() : `task-${Date.now()}`,
  title: input.title.trim(),
  requirement: input.requirement ?? '',
  steps: input.steps ?? '',
  tCode: input.tCode ?? '',
  tCodes: input.tCodes ?? [],
  createdAt: Date.now(),
  images: input.images ?? [],
  imageData: input.imageData ?? (Array.isArray(input.images) && input.images.length ? input.images[0] : undefined),
});

export const useTasks = (context: IAppContext) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const firstPersistSkipped = useRef(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const restored = await restoreTasks(context);
      if (!active) return;
      setTasks(restored);
      setHydrated(true);
    })();

    return () => {
      active = false;
    };
  }, [context]);

  useEffect(() => {
    if (!hydrated) return;
    if (!firstPersistSkipped.current) {
      firstPersistSkipped.current = true;
      return;
    }
    void saveTasks(context, tasks);
    context.eventBus.emit(TASK_COUNT_CHANGED, { count: tasks.length });
  }, [context, hydrated, tasks]);

  const addTask = useCallback((input: Partial<Task> & { title: string }) => {
    setTasks((prev) => [...prev, createTask(input)]);
  }, []);

  const updateTask = useCallback((id: string, updater: (task: Task) => Task) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? updater(task) : task)));
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const replaceTasks = useCallback((incoming: Task[]) => {
    const parsed = TaskListSchema.safeParse(incoming);
    if (!parsed.success) return;
    setTasks(parsed.data);
  }, []);

  const stats = useMemo(
    () => ({
      total: tasks.length,
    }),
    [tasks]
  );

  return {
    tasks,
    hydrated,
    addTask,
    updateTask,
    removeTask,
    replaceTasks,
    stats,
  };
};
