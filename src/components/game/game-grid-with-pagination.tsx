import type { Game } from 'content-collections';
import CustomPagination from '@/components/shared/pagination';
import { GameCard } from './game-card';

interface GameGridWithPaginationProps {
  games: Game[];
  totalPages: number;
  routePrefix: string;
  emptyMessage: string;
}

export default function GameGridWithPagination({
  games,
  totalPages,
  routePrefix,
  emptyMessage,
}: GameGridWithPaginationProps) {
  if (games.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-muted p-12 text-center text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-6">
        {games.map((game) => (
          <GameCard key={game.slugAsParams} game={game} />
        ))}
      </div>

      <div className="flex items-center justify-center">
        <CustomPagination routePrefix={routePrefix} totalPages={totalPages} />
      </div>
    </div>
  );
}
