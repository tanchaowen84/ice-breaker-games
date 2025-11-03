'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the spinning wheel component with SSR disabled
const SpinningWheel = dynamic(() => import('@/components/wheel/spinning-wheel').then(mod => ({ default: mod.SpinningWheel })), {
  ssr: false,
  loading: () => {
    // Import skeleton component lazily to avoid SSR issues
    return (
      <div className="relative flex w-full max-w-md flex-col items-center justify-center">
        <div className="relative flex size-[320px] items-center justify-center rounded-full border border-[#10204b]/20 bg-white/80 p-6 shadow-xl">
          {/* Wheel skeleton */}
          <div className="absolute inset-0 animate-pulse">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 opacity-60" />
          </div>

          {/* Center star skeleton */}
          <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-gray-300 shadow-lg">
            <div className="h-8 w-8 text-gray-400">⭐</div>
          </div>

          {/* Pointer skeleton */}
          <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
            <div className="relative -top-7 flex flex-col items-center">
              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300 shadow-lg" />
              <div className="-mt-1 h-6 w-3 animate-pulse rounded-b-full bg-gray-300" />
            </div>
          </div>
        </div>

        {/* Text skeleton */}
        <div className="mt-4 w-full max-w-xs">
          <div className="h-4 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-3 w-3/4 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    );
  }
});

export default function HeroSection() {
  const t = useTranslations('HomePage.hero');
  const [mustSpin, setMustSpin] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const handleSpin = useCallback(() => {
    if (mustSpin) return;
    setMustSpin(true);
  }, [mustSpin]);

  const handleSpinComplete = useCallback((game: string) => {
    setSelectedGame(game);
    setMustSpin(false);
  }, []);

  const spinHint = useMemo(() => {
    return mustSpin ? t('spinning') : t('hint');
  }, [mustSpin, t]);

  const scenePhrases = (t.raw('scenes') as string[]) ?? [];
  const sceneCore = t('core');
  const [sceneIndex, setSceneIndex] = useState(0);
  const activeScene = scenePhrases.length ? scenePhrases[sceneIndex] : '';

  useEffect(() => {
    if (!scenePhrases?.length) return;
    const interval = setInterval(() => {
      setSceneIndex((prev) => (prev + 1) % scenePhrases.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [scenePhrases]);

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/60 py-12 sm:py-12"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-14 px-6 lg:flex-row lg:items-stretch lg:gap-20">
        <div className="flex w-full max-w-xl flex-col items-start text-left">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-3 text-4xl font-bricolage-grotesque font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            <h1>
              {t('intro')}{' '}
              <span className="inline-block">{sceneCore}</span>
            </h1>
            <div className="flex items-baseline gap-x-2">
              <span>{t('for')}</span>
              <div className="relative inline-flex">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${sceneIndex}-${activeScene}`}
                    initial={{ opacity: 0, y: '40%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: '-40%' }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className={cn(
                      'inline-flex rounded-lg px-3 py-1 text-4xl font-semibold sm:text-5xl',
                      sceneIndex % 5 === 0 && 'bg-[#fde68a] text-[#b45309]',
                      sceneIndex % 5 === 1 && 'bg-[#fee2e2] text-[#b91c1c]',
                      sceneIndex % 5 === 2 && 'bg-[#e0f2fe] text-[#0369a1]',
                      sceneIndex % 5 === 3 && 'bg-[#dcfce7] text-[#15803d]',
                      sceneIndex % 5 === 4 && 'bg-[#ede9fe] text-[#6d28d9]'
                    )}
                  >
                    {activeScene}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>
          <p className="mt-5 text-balance text-base text-muted-foreground sm:text-lg">
            {t('description')}
          </p>

          <div className="mt-9 flex flex-col gap-4">
            <Button
              size="lg"
              className="cursor-pointer rounded-xl bg-gradient-to-r from-[#f97316] via-[#f97316] to-[#fb923c] px-8 text-base font-semibold uppercase tracking-wide text-white shadow-[0_10px_25px_-12px_rgba(249,115,22,0.8)] transition hover:brightness-105"
              disabled={mustSpin}
              onClick={handleSpin}
            >
              {t('cta')}
            </Button>

            <p className="text-sm text-muted-foreground">{spinHint}</p>

            {selectedGame && (
              <div className="rounded-2xl border border-dashed border-[#5647e1]/30 bg-white/90 p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#5647e1]">
                  {t('resultHeading')}
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {selectedGame}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="relative flex w-full max-w-md flex-col items-center justify-center">
          <SpinningWheel
            mustSpin={mustSpin}
            onSpin={handleSpin}
            selectedGame={selectedGame}
            spinHint={t('tap')}
            onSpinComplete={handleSpinComplete}
            accessibilityLabel={t('hint')}
          />
        </div>
      </div>
    </section>
  );
}