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
  const [imageData, setImageData] = useState<string | undefined>();

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageData(typeof reader.result === 'string' ? reader.result : undefined);
    };
    reader.readAsDataURL(file);
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
      imageData,
    });

    setTitle('');
    setTCode('');
    setTCodesText('');
    setRequirement('');
    setSteps('');
    setImageData(undefined);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="field">
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Case title" />
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
        <label>Attach screenshot / diagram</label>
        <input type="file" accept="image/*" onChange={handleImage} />
        {imageData ? <small>Image attached ({Math.round((imageData.length * 3) / 4 / 1024)} KB)</small> : null}
      </div>
      <div className="actions">
        <button type="submit">Save task</button>
      </div>
    </form>
  );
};

export default TaskForm;
