import React from 'react';
import { ChangeEvent, useEffect, useRef } from 'react';
import { IAppContext } from '@toolbox/sdk';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useTasks } from './hooks/useTasks';
import { Task } from './types';
import { coerceTasksFromUnknown } from './storage';

type Props = {
  context: IAppContext;
};

const App = ({ context }: Props) => {
  const { tasks, hydrated, addTask, removeTask, updateTask, replaceTasks, stats } = useTasks(context);
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
    a.download = 'sapwiki-tasks.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app" data-theme={context.theme}>
      <header className="hero card">
        <div className="hero-copy">
          <p className="eyebrow">SAPWiki</p>
          <h1>Local task board</h1>
          <p className="muted">
            Persisted locally with host storage. Import legacy backups, add notes, and keep images with each entry.
          </p>
          <div className="chips">
            <span className={`chip ${hydrated ? 'chip-ok' : 'chip-warn'}`}>
              <span className="dot" /> {hydrated ? 'Ready' : 'Restoring data...'}
            </span>
            <span className="chip soft">{stats.total} tasks</span>
          </div>
        </div>
        <div className="hero-actions">
          <button className="ghost" onClick={triggerFilePick} disabled={!hydrated}>
            Import JSON
          </button>
          <button onClick={handleExport} disabled={!hydrated || !tasks.length}>
            Export
          </button>
          <input ref={fileInputRef} type="file" accept="application/json" hidden onChange={handleFileSelection} />
        </div>
      </header>

      <section className="layout">
        <div className="panel card">
          <div className="panel-header">
            <div>
              <p className="label">Capture</p>
              <h2>Create a task</h2>
              <p className="muted">Quickly log SAP cases with codes, steps, and visuals.</p>
            </div>
          </div>
          <TaskForm onSubmit={addTask} />
        </div>

        <div className="panel card">
          <div className="panel-header">
            <div>
              <p className="label">Board</p>
              <h2>Recent entries</h2>
              <p className="muted">Edit inline, keep evidence, and clean up when done.</p>
            </div>
          </div>
          <TaskList tasks={tasks} onDelete={removeTask} onUpdate={handlePatch} />
        </div>
      </section>
    </div>
  );
};

export default App;
