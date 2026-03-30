import React from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRef } from 'react';
import { Task } from '../types';

type Props = {
  onSubmit: (input: Partial<Task> & { title: string }) => void;
};

const TaskForm = ({ onSubmit }: Props) => {
  const [title, setTitle] = useState('');
  const [tCodesText, setTCodesText] = useState('');
  const [requirement, setRequirement] = useState('');
  const [steps, setSteps] = useState('');
  const [images, setImages] = useState<string[]>([]);

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

  const handleImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !files.length) return;
    try {
      const arr = Array.from(files);
      const data = await Promise.all(arr.map((f) => readFileAsDataURL(f)));
      setImages(data);
    } catch (error) {
      console.error('failed to read images', error);
    }
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLDivElement>) => {
    try {
      const items = e.clipboardData?.items;
      if (!items) return;
      const files: File[] = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file' && item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) files.push(file);
        }
      }
      if (!files.length) return;
      e.preventDefault();
      const data = await Promise.all(files.map((f) => readFileAsDataURL(f)));
      setImages((prev) => [...prev, ...data]);
    } catch (err) {
      console.error('failed to paste image', err);
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dragCounterRef = useRef(0);
  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounterRef.current++;
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounterRef.current--;
    if (dragCounterRef.current <= 0) {
      dragCounterRef.current = 0;
      setDragging(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    dragCounterRef.current = 0;
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
    if (!files.length) return;
    try {
      const data = await Promise.all(files.map((f) => readFileAsDataURL(f)));
      setImages((prev) => [...prev, ...data]);
    } catch (err) {
      console.error('failed to drop images', err);
    }
  };

  const removeImage = (idx: number) => setImages((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    const codes = tCodesText
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    onSubmit({
      title: trimmed,
      tCodes: codes,
      requirement,
      steps,
      images,
    });

    setTitle('');
    setTCodesText('');
    setRequirement('');
    setSteps('');
    setImages([]);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="field">
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Entry title" />
      </div>
      <div className="field">
        <label>T-Codes / Tag</label>
        <input
          value={tCodesText}
          onChange={(e) => setTCodesText(e.target.value)}
          placeholder="SE16, MM03"
        />
      </div>
      <div className="field">
        <label>Description</label>
        <textarea value={requirement} onChange={(e) => setRequirement(e.target.value)} placeholder="What are we solving?" />
      </div>
      <div className="field steps-field">
        <label>Steps</label>
        <textarea
          className="steps-input"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          placeholder="Step-by-step or reminders"
        />
      </div>
      <div
        className={`field attach-field ${dragging ? 'drag-over' : ''}`}
        onPaste={handlePaste}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        tabIndex={0}
        onClick={() => fileInputRef.current?.click()}
      >
        <label>
          Attach screenshots (optional)
        </label> 
        <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImage} style={{ display: 'none' }} />

        {images && images.length ? (
          <div className="attach-previews">
            {images.map((src, idx) => (
              <div className="attach-preview" key={idx}>
                <img src={src} alt={`attachment-${idx}`} />
                <button
                  type="button"
                  className="remove"
                  aria-label="Remove image"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(idx);
                  }}
                >
                  −
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="attach-hint">Drop or paste images here, or click to select</div>
        )}
      </div>
      <div className="actions">
        <button type="submit">Save entry</button>
      </div>
    </form>
  );
};

export default TaskForm;
