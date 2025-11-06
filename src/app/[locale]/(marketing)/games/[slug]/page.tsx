import { GamePage } from '@/components/game/game-page';
import { LOCALES } from '@/i18n/routing';
import { getGame } from '@/lib/game/get-game';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import { allGames } from 'content-collections';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import '@/styles/mdx.css';

interface GameDetailPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => {
    const games = allGames.filter(
      (game) => game.locale === locale && game.published
    );

    return games.map((game) => ({
      locale,
      slug: game.slugAsParams,
    }));
  });
}

export async function generateMetadata({
  params,
}: GameDetailPageProps): Promise<Metadata | undefined> {
  const { locale, slug } = await params;
  const game = getGame(slug, locale);

  if (!game) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return constructMetadata({
    title: `${game.title} | ${t('title')}`,
    description: game.description,
    canonicalUrl: getUrlWithLocale(game.slug, locale),
  });
}

export default async function GameDetailPage({
  params,
}: GameDetailPageProps) {
  const { locale, slug } = await params;
  const game = getGame(slug, locale);

  if (!game) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'GamePage' });

  return (
    <GamePage
      game={game}
      labels={{
        backToList: t('backToList'),
        publishedOn: t('publishedOn'),
        readTime: (minutes) => t('readTime', { minutes }),
        scenes: t('scenes'),
        quickFacts: t('quickFacts'),
        duration: t('duration'),
        participants: t('participants'),
        materials: t('materials'),
        noMaterials: t('noMaterials'),
        difficulty: t('difficulty'),
        noCover: t('noCover'),
        tableOfContents: t('tableOfContents'),
      }}
    />
  );
}
