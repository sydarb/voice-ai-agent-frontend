import type { TranscriptionSegment } from 'livekit-client';

export interface CombinedTranscription extends TranscriptionSegment {
  role: 'assistant' | 'user';
  receivedAtMediaTimestamp: number;
  receivedAt: number;
}
export type ThemeMode = 'dark' | 'light' | 'system';

export interface AppConfig {
  pageTitle: string;
  pageDescription: string;
  companyName: string;

  suportsChatInput: boolean;
  suportsVideoInput: boolean;
  suportsScreenShare: boolean;

  logo: string;
  startButtonText: string;
  accent?: string;
  logoDark?: string;
  accentDark?: string;
}

export interface SandboxConfig {
  [key: string]:
    | { type: 'string'; value: string }
    | { type: 'number'; value: number }
    | { type: 'boolean'; value: boolean }
    | null;
}

export interface CarouselCardItem {
  title: string;
  description: string;
  imageUrl: string;
  actionUrl: string;
}

export interface CarouselData {
  type: 'carousel';
  items: CarouselCardItem[];
}

export interface CompositeMessage {
  spokenResponse: string;
  ui: CarouselData;
}