import React from 'react';
import { Task } from '../types';

type Props = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, patch: Partial<Task>) => void;
  onOpenViewer?: (taskId: string, images: string[], index: number, title?: string) => void;
};

const TaskList = ({ tasks, onDelete, onUpdate }: Props) => {
  if (!tasks.length) {
    return (
      <div className="empty card">
        <h3>No entries yet</h3>
        <p className="muted">Add a new entry or import from your legacy backup.</p>
      </div>
    );
  }

  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <article className="card task-card" key={task.id}>
          <header className="task-header">
            <div>
              <div className="eyebrow">{new Date(task.createdAt).toLocaleString()}</div>
              <h3>{task.title}</h3>
              <div className="tags">
                {task.tCode ? <span className="pill">{task.tCode}</span> : null}
                {task.tCodes?.map((code) => (
                  <span key={`${task.id}-${code}`} className="pill">
                    {code}
                  </span>
                ))}
              </div>
            </div>
            <button className="ghost" onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </header>

          <div className="field">
            <label>Description</label>
            <textarea
              defaultValue={task.requirement}
              onBlur={(e) => onUpdate(task.id, { requirement: e.target.value })}
              rows={3}
            />
          </div>

          <div className="field">
            <label>Steps / Notes</label>
            <textarea
              defaultValue={task.steps}
              onBlur={(e) => onUpdate(task.id, { steps: e.target.value })}
              rows={4}
            />
          </div>

          {
            // prefer `images` array; fallback to single `imageData` for older entries
          }
          {(() => {
            const imgs: string[] = Array.isArray((task as any).images) && (task as any).images.length
              ? (task as any).images
              : task.imageData
              ? [task.imageData]
              : [];
            if (!imgs.length) return null;
            return (
              <div className="field images">
                <label>Image(s)</label>
                <div className="image-row">
                        {imgs.map((src, idx) => (
                          <img
                            key={`${task.id}-img-${idx}`}
                            src={src}
                            alt={`${task.title} ${idx + 1}`}
                            className="preview clickable"
                            onClick={() => {
                              if (typeof (TaskList as any).openViewerCallback === 'function') {
                                (TaskList as any).openViewerCallback(task.id, imgs, idx, task.title);
                              }
                            }}
                          />
                        ))}
                </div>
              </div>
            );
          })()}
        </article>
      ))}
    </div>
  );
};

export default TaskList;
