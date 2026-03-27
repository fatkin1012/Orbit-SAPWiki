import { IAppContext } from '@toolbox/sdk';

type Listener = (payload: any) => void;

type Bus = {
  emit: (event: string, payload: any) => void;
  on: (event: string, handler: Listener) => void;
  off: (event: string, handler: Listener) => void;
};

const createMemoryBus = (): Bus => {
  const listeners = new Map<string, Set<Listener>>();

  const emit = (event: string, payload: any) => {
    listeners.get(event)?.forEach((handler) => handler(payload));
  };

  const on = (event: string, handler: Listener) => {
    const set = listeners.get(event) ?? new Set<Listener>();
    set.add(handler);
    listeners.set(event, set);
  };

  const off = (event: string, handler: Listener) => {
    const set = listeners.get(event);
    if (!set) return;
    set.delete(handler);
    if (!set.size) {
      listeners.delete(event);
    }
  };

  return { emit, on, off };
};

const storageKey = 'sapwiki-dev-storage';

const createMockContext = (): IAppContext => {
  const eventBus = createMemoryBus();
  const storage = {
    async get<T>(key: string): Promise<T | null> {
      try {
        const raw = localStorage.getItem(`${storageKey}-${key}`);
        return raw ? (JSON.parse(raw) as T) : null;
      } catch (error) {
        console.error('mock storage get failed', error);
        return null;
      }
    },
    async save<T>(key: string, data: T, _version?: string): Promise<void> {
      try {
        localStorage.setItem(`${storageKey}-${key}`, JSON.stringify(data));
      } catch (error) {
        console.error('mock storage save failed', error);
      }
    },
  };

  return {
    storage,
    eventBus,
    theme: 'light',
    runtimeConfig: {},
  };
};

export default createMockContext;
