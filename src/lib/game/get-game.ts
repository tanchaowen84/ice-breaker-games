import { DEFAULT_LOCALE } from '@/i18n/routing';
import { allGames } from 'content-collections';
import type { Locale } from 'next-intl';

interface GetGamesOptions {
  includeDrafts?: boolean;
}

export function getGame(slug: string, locale: Locale) {
  const normalizedSlug = slug.trim();

  const game = allGames.find(
    (entry) => entry.slugAsParams === normalizedSlug && entry.locale === locale
  );

  if (game) {
    return game;
  }

  return allGames.find((entry) => entry.slugAsParams === normalizedSlug);
}

export function getGames(locale: Locale, options: GetGamesOptions = {}) {
  const { includeDrafts = false } = options;

  const publishedGames = includeDrafts
    ? allGames
    : allGames.filter((entry) => entry.published);

  const localizedGames = publishedGames.filter(
    (entry) => entry.locale === locale
  );

  if (localizedGames.length > 0) {
    return localizedGames;
  }

  return publishedGames.filter((entry) => entry.locale === DEFAULT_LOCALE);
}

export function getAllPublishedGames() {
  return allGames.filter((entry) => entry.published);
}
