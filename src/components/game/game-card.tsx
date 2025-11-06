import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LocaleLink } from '@/i18n/navigation';
import { formatDate } from '@/lib/formatter';
import type { Game } from 'content-collections';
import { CalendarIcon, ClockIcon, UsersIcon } from 'lucide-react';
import { getSceneBadgeClass } from './scene-badge';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const publishDate = formatDate(new Date(game.date));

  return (
    <LocaleLink href={`/games/${game.slugAsParams}`} className="block h-full">
      <Card className="h-full transition hover:-translate-y-1 hover:shadow-lg">
        <CardHeader className="space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
            {Array.isArray(game.scenes) && game.scenes.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {game.scenes.slice(0, 3).map((scene, index) => (
                  <Badge
                    key={scene}
                    variant="outline"
                    className={getSceneBadgeClass(scene, index)}
                  >
                    {scene}
                  </Badge>
                ))}
                {game.scenes.length > 3 ? <span>+{game.scenes.length - 3}</span> : null}
              </div>
            ) : (
              <span>&nbsp;</span>
            )}
          </div>
          <CardTitle className="text-xl font-semibold text-foreground">
            {game.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {game.description}
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarIcon className="size-4" />
            <span>{publishDate}</span>
          </div>
          {game.duration ? (
            <div className="flex items-center gap-2">
              <ClockIcon className="size-4" />
              <span>{game.duration}</span>
            </div>
          ) : null}
          {game.participants ? (
            <div className="flex items-center gap-2">
              <UsersIcon className="size-4" />
              <span>{game.participants}</span>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </LocaleLink>
  );
}
