import Container from '@/components/layout/container';
import GameGridWithPagination from '@/components/game/game-grid-with-pagination';
import { GameBreadcrumbs } from '@/components/game/game-breadcrumbs';
import { LOCALES } from '@/i18n/routing';
import { getPaginatedGames } from '@/lib/game/data';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

interface GamesIndexPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: GamesIndexPageProps): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'GamesIndex' });
  const meta = await getTranslations({ locale, namespace: 'Metadata' });

  return constructMetadata({
    title: `${t('title')} | ${meta('title')}`,
    description: t('description'),
    canonicalUrl: getUrlWithLocale('/games', locale),
    noIndex: true,
  });
}

export default async function GamesIndexPage({
  params,
}: GamesIndexPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'GamesIndex' });
  const commonT = await getTranslations({ locale, namespace: 'Common' });
  const { paginatedGames, totalPages } = getPaginatedGames({
    locale,
    page: 1,
  });

  return (
    <Container className="py-16 px-4">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        <GameBreadcrumbs
          homeLabel={commonT('home')}
          gamesLabel={t('title')}
        />

        <header className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t('title')}
          </h1>
          <p className="text-lg text-muted-foreground">{t('description')}</p>
        </header>

        <GameGridWithPagination
          games={paginatedGames}
          totalPages={totalPages}
          routePrefix={'/games'}
          emptyMessage={t('empty')}
        />
      </div>
    </Container>
  );
}
