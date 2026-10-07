import type { QualityProfile } from "@/lib/quality";
import { detectQuality } from "@/lib/quality";

export type ServiceMode =
  | "idle"
  | "websites"
  | "bots"
  | "automation"
  | "crm"
  | "assistants"
  | "ai";

export type SceneSection =
  | "hero"
  | "services"
  | "about"
  | "philosophy"
  | "process"
  | "contact";

export type SceneState = {
  scrollProgress: number;
  pointerX: number;
  pointerY: number;
  serviceMode: ServiceMode;
  section: SceneSection;
  ready: boolean;
  reducedMotion: boolean;
  quality: QualityProfile;
};

const state: SceneState = {
  scrollProgress: 0,
  pointerX: 0,
  pointerY: 0,
  serviceMode: "idle",
  section: "hero",
  ready: false,
  reducedMotion: false,
  quality: detectQuality(),
};

type Listener = () => void;
const listeners = new Set<Listener>();

export function getSceneState(): SceneState {
  return state;
}

export function subscribeScene(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify(): void {
  listeners.forEach((listener) => listener());
}

export function patchScene(partial: Partial<SceneState>, notifyReact = false): void {
  Object.assign(state, partial);
  if (notifyReact) notify();
}

export function setScrollProgress(value: number): void {
  state.scrollProgress = value;
}

export function setPointer(x: number, y: number): void {
  state.pointerX = x;
  state.pointerY = y;
}

export function setServiceMode(mode: ServiceMode): void {
  state.serviceMode = mode;
}

export function setSection(section: SceneSection): void {
  state.section = section;
}

export function initSceneRuntime(): void {
  state.quality = detectQuality();
  state.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
