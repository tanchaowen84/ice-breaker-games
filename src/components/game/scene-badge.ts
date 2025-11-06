import { cn } from '@/lib/utils';

const scenePaletteMap: Record<string, string> = {
  'team-building': 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-900',
  'team building': 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-900',
    // support alternate slug
  remote: 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-950/60 dark:text-sky-200 dark:border-sky-900',
  virtual: 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-950/60 dark:text-sky-200 dark:border-sky-900',
  meeting: 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-200 dark:border-indigo-900',
  classroom: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-100 dark:border-amber-900',
  social: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-200 dark:border-rose-900',
  icebreaker: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-200 dark:border-purple-900',
};

const fallbackPalette = [
  'bg-lime-100 text-lime-800 border-lime-200 dark:bg-lime-950/60 dark:text-lime-200 dark:border-lime-900',
  'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-100 dark:border-amber-900',
  'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-200 dark:border-rose-900',
  'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/60 dark:text-blue-200 dark:border-blue-900',
  'bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-950/60 dark:text-violet-200 dark:border-violet-900',
  'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-950/60 dark:text-slate-200 dark:border-slate-900',
];

export function getSceneBadgeClass(scene: string, index = 0) {
  const key = scene.trim().toLowerCase();
  const color = scenePaletteMap[key];
  const fallback = fallbackPalette[index % fallbackPalette.length];

  return cn(
    'border px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase',
    color ?? fallback
  );
}
