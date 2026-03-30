import React, { useState } from 'react';
import { Task } from '../types';

type Props = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, patch: Partial<Task>) => void;
  onOpenViewer?: (taskId: string, images: string[], index: number, title?: string) => void;
};

const TaskList = ({ tasks, onDelete, onUpdate, onOpenViewer }: Props) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const readFileAsDataURL = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') resolve(reader.result);
        else reject(new Error('invalid file result'));
      };
      reader.onerror = () => reject(new Error('file read error'));
      reader.readAsDataURL(file);
    });

  const handleAddImages = async (taskId: string, files: FileList | null) => {
    if (!files || !files.length) return;
    try {
      const arr = Array.from(files).filter((f) => f.type.startsWith('image/'));
      if (!arr.length) return;
      const data = await Promise.all(arr.map((f) => readFileAsDataURL(f)));
      const task = tasks.find((t) => t.id === taskId);
      const existing: string[] = Array.isArray((task as any)?.images) && (task as any).images.length
        ? (task as any).images
        : (task as any)?.imageData
        ? [(task as any).imageData]
        : [];
      onUpdate(taskId, { images: [...existing, ...data] });
    } catch (err) {
      console.error('failed to add images', err);
    }
  };
  const handleRemoveImage = (taskId: string, idx: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    const imgs: string[] = Array.isArray((task as any).images) && (task as any).images.length
      ? (task as any).images
      : (task as any).imageData
      ? [(task as any).imageData]
      : [];
    const updated = imgs.filter((_, i) => i !== idx);
    if (updated.length) {
      onUpdate(taskId, { images: updated });
    } else {
      onUpdate(taskId, { images: [], imageData: undefined });
    }
  };
  const invokeOpenViewer = (taskId: string, images: string[], index: number, title?: string) => {
    if (typeof onOpenViewer === 'function') {
      onOpenViewer(taskId, images, index, title);
      return;
    }
    if (typeof (TaskList as any).openViewerCallback === 'function') {
      (TaskList as any).openViewerCallback(taskId, images, index, title);
    }
    try {
      const ev = new CustomEvent('sapwiki:openViewer', { detail: { taskId, images, index, title } });
      window.dispatchEvent(ev);
    } catch (err) {
      // ignore
    }
  };
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
                {editingId === task.id ? (
                  <>
                    <input
                      className="edit-tcodes-input"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      placeholder="SE16, MM03"
                    />
                    <div className="edit-actions">
                      <button
                        type="button"
                        className="ghost small"
                        onClick={() => {
                          const parsed = editingText
                            .split(',')
                            .map((c) => c.trim())
                            .filter(Boolean);
                          onUpdate(task.id, { tCodes: parsed, tCode: '' });
                          setEditingId(null);
                        }}
                      >
                        Save
                      </button>
                      <button type="button" className="ghost small" onClick={() => setEditingId(null)}>
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {task.tCode ? <span className="pill">{task.tCode}</span> : null}
                    {task.tCodes?.map((code) => (
                      <span key={`${task.id}-${code}`} className="pill">
                        {code}
                      </span>
                    ))}
                    <button
                      type="button"
                      className="ghost small"
                      onClick={() => {
                        const start = [
                          ...(Array.isArray(task.tCodes) ? task.tCodes : []),
                        ];
                        if (task.tCode && !start.includes(task.tCode)) start.unshift(task.tCode);
                        setEditingText(start.join(', '));
                        setEditingId(task.id);
                      }}
                    >
                      Edit
                    </button>
                  </>
                )}
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

          <div className="field notes-field">
            <label>Steps / Notes</label>
            <textarea
              className="notes-input"
              defaultValue={task.steps}
              onBlur={(e) => onUpdate(task.id, { steps: e.target.value })}
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
                <label>
                  Image(s)
                  <button
                    type="button"
                    className="ghost small"
                    onClick={() => {
                      const el = document.getElementById(`add-img-${task.id}`) as HTMLInputElement | null;
                      el?.click();
                    }}
                    style={{ marginLeft: 8 }}
                  >
                    Add Image
                  </button>
                </label>

                <input
                  id={`add-img-${task.id}`}
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                  onChange={(e) => handleAddImages(task.id, e.target.files)}
                />

                <div className="image-row">
                  {imgs.map((src, idx) => (
                    <div
                      className="attach-preview"
                      key={`${task.id}-img-${idx}`}
                      onClick={() => invokeOpenViewer(task.id, imgs, idx, task.title)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') invokeOpenViewer(task.id, imgs, idx, task.title);
                      }}
                    >
                      <img
                        src={src}
                        alt={`${task.title} ${idx + 1}`}
                        className="preview clickable"
                      />
                      <button
                        type="button"
                        className="remove"
                        aria-label="Delete image"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(task.id, idx);
                        }}
                      >
                        −
                      </button>
                    </div>
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
