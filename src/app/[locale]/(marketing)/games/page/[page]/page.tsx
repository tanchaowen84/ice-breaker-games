import Container from '@/components/layout/container';
import GameGridWithPagination from '@/components/game/game-grid-with-pagination';
import { LOCALES } from '@/i18n/routing';
import { getPaginatedGames } from '@/lib/game/data';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

interface GamesPaginationPageProps {
  params: Promise<{
    locale: Locale;
    page: string;
  }>;
}

export function generateStaticParams() {
  const params: { locale: string; page: string }[] = [];

  for (const locale of LOCALES) {
    const { totalPages } = getPaginatedGames({ locale, page: 1 });

    for (let page = 2; page <= totalPages; page++) {
      params.push({ locale, page: String(page) });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: GamesPaginationPageProps): Promise<Metadata | undefined> {
  const { locale, page } = await params;
  const t = await getTranslations({ locale, namespace: 'GamesIndex' });
  const meta = await getTranslations({ locale, namespace: 'Metadata' });
  const canonicalPath = `/games/page/${page}`;

  return constructMetadata({
    title: `${t('title')} | ${meta('title')}`,
    description: t('description'),
    canonicalUrl: getUrlWithLocale(canonicalPath, locale),
  });
}

export default async function GamesPaginationPage({
  params,
}: GamesPaginationPageProps) {
  const { locale, page } = await params;
  const currentPage = Number(page);
  const { paginatedGames, totalPages } = getPaginatedGames({
    locale,
    page: currentPage,
  });
  const t = await getTranslations({ locale, namespace: 'GamesIndex' });

  return (
    <Container className="py-16 px-4">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
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
