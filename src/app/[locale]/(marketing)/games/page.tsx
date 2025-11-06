import Container from '@/components/layout/container';
import { GameCard } from '@/components/game/game-card';
import { getGames } from '@/lib/game/get-game';
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
  });
}

export default async function GamesIndexPage({
  params,
}: GamesIndexPageProps) {
  const { locale } = await params;
  const games = getGames(locale);
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

        {games.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {games.map((game) => (
              <GameCard key={game.slugAsParams} game={game} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-muted p-12 text-center text-muted-foreground">
            {t('empty')}
          </div>
        )}
      </div>
    </Container>
  );
}
