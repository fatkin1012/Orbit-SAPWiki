import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { IAppContext, IPlugin } from '@toolbox/sdk';
import App from './App';
import { PLUGIN_ROOT_ID, PLUGIN_ID } from './types';
import styles from './index.css?inline';
import pkg from '../package.json';

let root: Root | null = null;
let mountedContainer: HTMLElement | null = null;
let styleTag: HTMLStyleElement | null = null;

const ensureContainer = (host: HTMLElement) => {
  const existing = host.querySelector(`#${PLUGIN_ROOT_ID}`) as HTMLElement | null;
  if (existing) return existing;
  const shell = document.createElement('div');
  shell.id = PLUGIN_ROOT_ID;
  host.appendChild(shell);
  return shell;
};

const ensureStyles = () => {
  if (styleTag) return;
  styleTag = document.createElement('style');
  styleTag.id = `${PLUGIN_ROOT_ID}-style`;
  styleTag.textContent = styles;
  document.head.appendChild(styleTag);
};

const plugin: IPlugin = {
  id: PLUGIN_ID,
  name: 'SAPWiki',
  version: pkg?.version || '0.0.0',
  mount(container: HTMLElement, context: IAppContext) {
    // Defensive reset for host reload cycles.
    document.body.style.removeProperty('overflow');
    document.documentElement.style.removeProperty('--pv-vh');

    ensureStyles();
    const target = ensureContainer(container);
    mountedContainer = target;

    if (root) {
      root.unmount();
    }

    root = createRoot(target);
    root.render(
      <React.StrictMode>
        <App context={context} />
      </React.StrictMode>
    );
  },
  unmount(container: HTMLElement) {
    if (root) {
      root.unmount();
      root = null;
    }
    if (mountedContainer) {
      mountedContainer.replaceChildren();
      mountedContainer = null;
    }
    // Defensive cleanup in case host provides a fresh container
    const orphan = container.querySelector(`#${PLUGIN_ROOT_ID}`);
    if (orphan) {
      orphan.replaceChildren();
    }

    if (styleTag) {
      styleTag.remove();
      styleTag = null;
    }

    // Ensure host scrolling always recovers after plugin teardown.
    document.body.style.removeProperty('overflow');
    document.documentElement.style.removeProperty('--pv-vh');
  },
};

export default plugin;
