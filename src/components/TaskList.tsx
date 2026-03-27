import React from 'react';
import { Task } from '../types';

type Props = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, patch: Partial<Task>) => void;
};

const TaskList = ({ tasks, onDelete, onUpdate }: Props) => {
  if (!tasks.length) {
    return (
      <div className="empty card">
        <h3>No tasks yet</h3>
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
            <label>Requirement</label>
            <textarea
              defaultValue={task.requirement}
              onBlur={(e) => onUpdate(task.id, { requirement: e.target.value })}
              rows={3}
            />
          </div>

          <div className="field">
            <label>Steps</label>
            <textarea
              defaultValue={task.steps}
              onBlur={(e) => onUpdate(task.id, { steps: e.target.value })}
              rows={4}
            />
          </div>

          {task.imageData ? (
            <div className="field">
              <label>Image</label>
              <img src={task.imageData} alt={task.title} className="preview" />
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
};

export default TaskList;
