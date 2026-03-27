import React from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Task } from '../types';

type Props = {
  onSubmit: (input: Partial<Task> & { title: string }) => void;
};

const TaskForm = ({ onSubmit }: Props) => {
  const [title, setTitle] = useState('');
  const [tCode, setTCode] = useState('');
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
      tCode: tCode.trim(),
      tCodes: codes,
      requirement,
      steps,
      images,
    });

    setTitle('');
    setTCode('');
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
      <div className="field two-col">
        <div>
          <label>T-Code</label>
          <input value={tCode} onChange={(e) => setTCode(e.target.value)} placeholder="e.g. ZSE16" />
        </div>
        <div>
          <label>T-Codes (comma)</label>
          <input
            value={tCodesText}
            onChange={(e) => setTCodesText(e.target.value)}
            placeholder="SE16, MM03"
          />
        </div>
      </div>
      <div className="field">
        <label>Requirement</label>
        <textarea value={requirement} onChange={(e) => setRequirement(e.target.value)} placeholder="What are we solving?" />
      </div>
      <div className="field">
        <label>Steps</label>
        <textarea
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          placeholder="Step-by-step or reminders"
          rows={4}
        />
      </div>
      <div className="field">
        <label>Attach screenshots / diagrams (optional)</label>
        <input type="file" accept="image/*" multiple onChange={handleImage} />
        {images && images.length ? (
          <small>{images.length} image(s) attached ({Math.round((images.reduce((s, i) => s + i.length, 0) * 3) / 4 / 1024)} KB)</small>
        ) : null}
      </div>
      <div className="actions">
        <button type="submit">Save entry</button>
      </div>
    </form>
  );
};

export default TaskForm;
