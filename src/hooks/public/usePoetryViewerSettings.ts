export type PoetryMode = 'modern' | 'antique';

export interface PoetryViewerSettings {
  defaultMode: PoetryMode;
  showToggle: boolean;
  loading: boolean;
}

export function usePoetryViewerSettings(): PoetryViewerSettings {
  return {
    defaultMode: 'modern',
    showToggle: true,
    loading: false,
  };
}
