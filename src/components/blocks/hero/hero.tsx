'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import { Wheel } from 'react-custom-roulette';

const SURPRISE_OPTION = 'Surprise Pick';

const wheelData = [
  { option: 'Two Truths and a Lie' },
  { option: 'Icebreaker Bingo' },
  { option: 'Speed Networking' },
  { option: 'Word Association' },
  { option: 'Human Knot' },
  { option: 'Movie Pitch' },
  { option: 'Finish the Sentence' },
  { option: 'Zip Zap Zop' },
  { option: 'Beach Ball' },
  { option: 'Guess the Person' },
  { option: 'Egg Drop' },
  { option: 'Balloon Tower' },
  { option: 'Jenga Questions' },
  { option: 'Virtual Coffee Chat' },
  { option: SURPRISE_OPTION },
];

const randomGamePool = [
  'Beach Ball',
  'Spirit Animal',
  'Field Day',
  'Two Truths and a Lie',
  'Egg Drop',
  'Bumper Sticker',
  'Six Word Memoirs',
  'Word Association',
  'Marshmallow Challenge',
  'Zip Zap Zop',
  'Human Knot',
  'Keep It Up',
  'Balloon Tower',
  'Comedy Night',
  'Finish the Sentence',
  'Icebreaker Bingo',
  'Pat on the Back',
  'Picture Scavenger Hunt',
  'Movie Pitch',
  'Which Character Are You?',
  'Character Descriptions',
  'Digging Game',
  'Find Your Twin',
  'Guess the Person',
  'Speed Networking',
  'Seeing the Future',
  'Sentence Completion',
  'Theme Music',
  'Jenga Questions',
  'Hula Hoop Relay',
  'Giant Map',
  'Social Bingo',
  'Telephone Charades',
  'Celebrity Heads',
  'Personality Shapes',
  'Where Were You When…',
  'Ideal Vacation',
  'Meeting Bingo',
  'Social Media Share',
  'Virtual Coffee Chat',
  'Pop a Question',
  'Name Ball',
  'Quotes Game',
  'Blindfolded Obstacle Course',
  'Personal Slogan',
  'Questions Only',
  'Office Escape Room',
  'Song That Describes You',
];

const wheelBackgroundColors = [
  '#f87171',
  '#facc15',
  '#60a5fa',
  '#34d399',
  '#c084fc',
  '#f87171',
  '#facc15',
  '#60a5fa',
  '#34d399',
  '#c084fc',
  '#f87171',
  '#facc15',
  '#60a5fa',
  '#34d399',
  '#c084fc',
];

const wheelTextColors = ['#0b1220'];

export default function HeroSection() {
  const t = useTranslations('HomePage.hero');
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [pendingGame, setPendingGame] = useState<string | null>(null);

  const handleSpin = useCallback(() => {
    if (mustSpin) return;

    const nextGame =
      randomGamePool[Math.floor(Math.random() * randomGamePool.length)];

    const directMatchIndex = wheelData.findIndex(
      (item) => item.option === nextGame
    );
    const surpriseIndex = wheelData.findIndex(
      (item) => item.option === SURPRISE_OPTION
    );

    const nextPrize =
      directMatchIndex !== -1
        ? directMatchIndex
        : surpriseIndex !== -1
          ? surpriseIndex
          : Math.floor(Math.random() * wheelData.length);

    setPendingGame(nextGame ?? null);
    setPrizeNumber(nextPrize);
    setMustSpin(true);
  }, [mustSpin]);

  const handleStop = useCallback(() => {
    setMustSpin(false);
    setSelectedGame(pendingGame ?? wheelData[prizeNumber]?.option ?? null);
    setPendingGame(null);
  }, [pendingGame, prizeNumber]);

  const spinHint = useMemo(() => {
    return mustSpin ? t('spinning') : t('hint');
  }, [mustSpin, t]);

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/60 py-24 sm:py-28"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-14 px-6 lg:flex-row lg:items-stretch lg:gap-20">
        <div className="flex w-full max-w-xl flex-col items-start text-left">
          <h1 className="text-balance text-4xl font-bricolage-grotesque leading-tight tracking-tight text-foreground sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-balance text-base text-muted-foreground sm:text-lg">
            {t('description')}
          </p>

          <div className="mt-9 flex flex-col gap-4">
            <Button
              size="lg"
              className="cursor-pointer bg-[#6655ff] px-7 text-base font-semibold shadow-lg transition hover:bg-[#5647e1]"
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
          <div
            role="button"
            tabIndex={0}
            aria-label={t('hint')}
            className={cn(
              'relative flex size-[320px] items-center justify-center rounded-full border border-[#10204b]/20 bg-white/80 p-6 shadow-xl transition-transform duration-200 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5647e1]',
              mustSpin && 'pointer-events-none opacity-80'
            )}
            onClick={handleSpin}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleSpin();
              }
            }}
          >
            <Wheel
              data={wheelData}
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              onStopSpinning={handleStop}
              backgroundColors={wheelBackgroundColors}
              textColors={wheelTextColors}
              radiusLineWidth={1.5}
              radiusLineColor="#0f172a"
              outerBorderWidth={6}
              outerBorderColor="#10204b"
              innerBorderColor="#ffffff"
              innerBorderWidth={0}
              innerRadius={18}
              fontSize={12}
              fontWeight={600}
              perpendicularText={false}
              textDistance={58}
              spinDuration={0.7}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#182556] shadow-[0_12px_30px_-12px_rgba(16,32,75,0.65)] ring-4 ring-white/40">
                <Star
                  className="h-8 w-8 text-[#facc15]"
                  stroke="transparent"
                  fill="#facc15"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
              <div className="relative -top-7 flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-[#f97316] shadow-lg" />
                <div className="-mt-1 h-6 w-3 rounded-b-full bg-[#f97316]" />
              </div>
            </div>
          </div>

          <span className="mt-4 text-sm text-muted-foreground">{t('tap')}</span>
        </div>
      </div>
    </section>
  );
}
