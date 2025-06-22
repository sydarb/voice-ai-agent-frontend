import type { AppConfig } from './lib/types';

export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'Genesys',
  pageTitle: 'Voice AI Agent',
  pageDescription: 'A Voice AI Agent built for Genesys with LiveKit',

  suportsChatInput: true,
  suportsVideoInput: true,
  suportsScreenShare: true,

  logo: '/genesys-logo-light.png',
  accent: '#002cf2',
  logoDark: '/genesys-logo-dark.webp',
  accentDark: '#1fd5f9',
  startButtonText: 'Start call',
};
