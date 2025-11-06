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
      <Card className="flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lg md:flex-row">
        <div className="relative h-52 w-full flex-shrink-0 bg-muted md:h-auto md:w-64 lg:w-72">
          {game.image ? (
            <Image
              src={game.image}
              alt={game.imageAlt || game.title || 'Game cover'}
              fill
              sizes="(min-width: 1024px) 320px, (min-width: 768px) 40vw, 100vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={PLACEHOLDER_IMAGE}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <ImageOffIcon className="size-6" />
            </div>
          )}
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
