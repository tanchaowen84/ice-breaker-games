import { websiteConfig } from '@/config/website';
import { getGames } from './get-game';
import type { Locale } from 'next-intl';

export function getPaginatedGames({
  locale,
  page = 1,
}: {
  locale: Locale | string;
  page?: number;
}) {
  const allLocalizedGames = getGames(locale as Locale);

  const sortedGames = [...allLocalizedGames].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const paginationSize = websiteConfig.blog.paginationSize;
  const startIndex = (page - 1) * paginationSize;
  const endIndex = startIndex + paginationSize;
  const paginatedGames = sortedGames.slice(startIndex, endIndex);
  const totalPages = Math.max(1, Math.ceil(sortedGames.length / paginationSize));

  return {
    paginatedGames,
    totalPages,
    totalItems: sortedGames.length,
  };
}
