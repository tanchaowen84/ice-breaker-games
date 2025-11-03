'use client';

import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { useCallback, useState } from 'react';
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
  '#c084vc',
  '#f87171',
  '#facc15',
  '#60a5fa',
  '#34d399',
  '#c084fc',
];

const wheelTextColors = ['#0b1220'];

interface SpinningWheelProps {
  mustSpin: boolean;
  onSpin: () => void;
  selectedGame: string | null;
  spinHint: string;
  onSpinComplete: (game: string) => void;
  accessibilityLabel: string;
}

export function SpinningWheel({
  mustSpin,
  onSpin,
  selectedGame,
  spinHint,
  onSpinComplete,
  accessibilityLabel,
}: SpinningWheelProps) {
  const [prizeNumber, setPrizeNumber] = useState(0);
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
    onSpin();
  }, [mustSpin, onSpin]);

  const handleStop = useCallback(() => {
    const finalGame = pendingGame ?? wheelData[prizeNumber]?.option ?? null;
    setPendingGame(null);
    if (finalGame) {
      onSpinComplete(finalGame);
    }
  }, [pendingGame, prizeNumber, onSpinComplete]);

  return (
    <div className="relative flex w-full max-w-md flex-col items-center justify-center">
      <div
        role="button"
        tabIndex={0}
        aria-label={accessibilityLabel}
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

      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">{spinHint}</p>
        {selectedGame && (
          <div className="mt-4 rounded-2xl border border-dashed border-[#5647e1]/30 bg-white/90 p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#5647e1]">
              Today's ice breaker game
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              {selectedGame}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}