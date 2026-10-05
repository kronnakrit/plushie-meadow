import type { Container } from 'pixi.js';
import type { Save } from '../engine/save';
import type { Stage } from '../engine/stage';

export type SceneName = 'splash' | 'meadow' | 'berry';

export interface Scene {
  root: Container;
  /** called after the scene is on screen */
  enter?(): void;
  /** called before the scene is removed */
  leave?(): void;
}

export interface Ctx {
  stage: Stage;
  save: Save;
  /** tier steps taken this visit (the design allows one) */
  visit: { steps: number };
  go(name: SceneName): void;
  persist(): void;
}
