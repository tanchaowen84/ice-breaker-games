import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { LocaleLink } from '@/i18n/navigation';
import { formatDate } from '@/lib/formatter';
import type { Game } from 'content-collections';
import { CalendarIcon, ClockIcon, ImageOffIcon, UsersIcon } from 'lucide-react';
import Image from 'next/image';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { getSceneBadgeClass } from './scene-badge';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const publishDate = formatDate(new Date(game.date));

  return (
    <LocaleLink href={`/games/${game.slugAsParams}`} className="block h-full">
      <Card className="group flex h-full flex-col overflow-hidden border border-border/60 bg-gradient-to-br from-background via-background to-muted/40 transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl md:flex-row">
        <div
          className="relative h-52 w-full flex-shrink-0 overflow-hidden rounded-2xl border border-border/40 bg-muted/80 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.6)] transition duration-300 group-hover:border-primary/40 md:h-auto md:w-64 lg:w-72"
        >
          {game.image ? (
            <Image
              src={game.image}
              alt={game.imageAlt || game.title || 'Game cover'}
              fill
              sizes="(min-width: 1024px) 320px, (min-width: 768px) 40vw, 100vw"
              className="object-cover transition duration-500 ease-out group-hover:scale-105"
              placeholder="blur"
              blurDataURL={PLACEHOLDER_IMAGE}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <ImageOffIcon className="size-6" />
            </div>
          )}
          <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-black/25 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-70" />
        </div>

        <div className="flex flex-1 flex-col justify-between gap-6 p-6">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-wide text-muted-foreground">
              {Array.isArray(game.scenes) && game.scenes.length > 0
                ? game.scenes.slice(0, 3).map((scene, index) => (
                    <Badge
                      key={scene}
                      variant="outline"
                      className={getSceneBadgeClass(scene, index)}
                    >
                      {scene}
                    </Badge>
                  ))
                : null}
              {game.scenes && game.scenes.length > 3 ? (
                <span>+{game.scenes.length - 3}</span>
              ) : null}
            </div>

            <h3 className="text-xl font-semibold text-foreground line-clamp-2">
              {game.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {game.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <CalendarIcon className="size-4" />
              <span>{publishDate}</span>
            </span>
            {game.duration ? (
              <span className="inline-flex items-center gap-2">
                <ClockIcon className="size-4" />
                <span>{game.duration}</span>
              </span>
            ) : null}
            {game.participants ? (
              <span className="inline-flex items-center gap-2">
                <UsersIcon className="size-4" />
                <span>{game.participants}</span>
              </span>
            ) : null}
          </div>
        </div>
      </Card>
    </LocaleLink>
  );
}
