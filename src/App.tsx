import React from 'react';
import { ChangeEvent, useEffect, useRef, useState, useMemo } from 'react';
import { IAppContext } from '@toolbox/sdk';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import PictureViewer from './components/PictureViewer';
import { useTasks } from './hooks/useTasks';
import { Task } from './types';
import { coerceTasksFromUnknown } from './storage';

type Props = {
  context: IAppContext;
};

const App = ({ context }: Props) => {
  const { tasks, hydrated, addTask, removeTask, updateTask, replaceTasks, stats } = useTasks(context);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState<string[]>([]);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [viewerTitle, setViewerTitle] = useState('');
  const [viewerTaskId, setViewerTaskId] = useState<string | null>(null);

  const openViewer = (taskId: string, images: string[], index: number, title?: string) => {
    if (!images || !images.length) return;
    setViewerTaskId(taskId);
    setViewerImages(images);
    setViewerIndex(index || 0);
    setViewerTitle(title || '');
    setViewerOpen(true);
  };

  // expose callback so TaskList image clicks can open the viewer without changing many call sites
  (TaskList as any).openViewerCallback = openViewer;
  useEffect(() => {
    const handler = (e: Event) => {
      const d = (e as CustomEvent)?.detail as { taskId?: string; images?: string[]; index?: number; title?: string } | undefined;
      if (!d || !d.images) return;
      openViewer(d.taskId || '', d.images, d.index || 0, d.title || '');
    };
    window.addEventListener('sapwiki:openViewer', handler as EventListener);
    return () => window.removeEventListener('sapwiki:openViewer', handler as EventListener);
  }, [openViewer]);
  const [query, setQuery] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const importHandler = (payload: unknown) => {
      const { tasks: incoming, ok } = coerceTasksFromUnknown(payload);
      if (ok && incoming.length) {
        replaceTasks(incoming);
      }
    };

    context.eventBus.on('SAPWIKI_IMPORT', importHandler);
    return () => {
      context.eventBus.off('SAPWIKI_IMPORT', importHandler);
    };
  }, [context, replaceTasks]);

  const handlePatch = (id: string, patch: Partial<Task>) => {
    updateTask(id, (task) => ({ ...task, ...patch }));
  };

  const handleFileSelection = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const text = await file.text();
    const { tasks: incoming, ok } = coerceTasksFromUnknown(text);
    if (ok) {
      replaceTasks(incoming);
    }
  };

  const triggerFilePick = () => fileInputRef.current?.click();

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const filename =
      `LocalWiki_Backup_${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(
        now.getHours()
      )}${pad(now.getMinutes())}${pad(now.getSeconds())}.json`;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app" data-theme={context.theme}>
      <header className="hero card">
        <div className="hero-copy">
          <h1>Local wiki 123</h1>
          <p className="muted">
            Persisted locally with host storage. Import legacy backups, add notes, and keep images with each entry.
          </p>
          <div className="chips">
            <span className={`chip ${hydrated ? 'chip-ok' : 'chip-warn'}`}>
              <span className="dot" /> {hydrated ? 'Ready' : 'Restoring data...'}
            </span>
            <span className="chip soft">{stats.total} entries</span>
          </div>
        </div>
          <div className="hero-actions">
          <button className="ghost" onClick={triggerFilePick} disabled={!hydrated}>
            Import
          </button>
          <button onClick={handleExport} disabled={!hydrated || !tasks.length}>
            Export
          </button>
          <input ref={fileInputRef} type="file" accept="application/json" hidden onChange={handleFileSelection} />
          {/* search placed under buttons visually via CSS */}
          <div className="header-search">
            <input
              aria-label="Search entries"
              className="search-input"
              placeholder="Search title, description, steps, or T-code"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <section className="layout">
        <div className="panel card">
          <div className="panel-header">
            <div>
              <h2>Add an entry</h2>
              <p className="muted">Quickly record SAP cases, solutions, and visuals for future reference.</p>
            </div>
          </div>
          <TaskForm onSubmit={addTask} />
        </div>

        <div className="panel card">
          <div className="panel-header">
            <div>
              <h2>Notes</h2>
              <p className="muted">Edit inline, keep evidence, and tidy up when complete.</p>
            </div>
          </div>
          <TaskList
            tasks={useMemo(() => {
              const q = query.trim().toLowerCase();
              if (!q) return tasks;
              return tasks.filter((t) => {
                const hay = [t.title, t.requirement || '', t.steps || '', t.tCode || '', (t.tCodes || []).join(' ')]
                  .join(' ')
                  .toLowerCase();
                return hay.includes(q);
              });
            }, [tasks, query])}
            onDelete={removeTask}
            onUpdate={handlePatch}
          />
        </div>
      </section>

      <PictureViewer
        isOpen={viewerOpen}
        images={viewerImages}
        initialIndex={viewerIndex}
        title={viewerTitle}
        onClose={() => setViewerOpen(false)}
        onSaveAnnotated={(annotated, sourceIndex) => {
          if (!viewerTaskId) return;
          updateTask(viewerTaskId, (task) => {
            const imgs = Array.isArray((task as any).images) ? (task as any).images.slice() : [];
            imgs[sourceIndex] = annotated;
            return { ...task, images: imgs, imageData: imgs[0] } as any;
          });
          setViewerOpen(false);
        }}
      />
    </div>
  );
};

export default App;
