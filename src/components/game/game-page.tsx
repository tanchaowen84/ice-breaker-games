import Container from '@/components/layout/container';
import { GameMetaCard } from '@/components/game/game-meta-card';
import { getSceneBadgeClass } from '@/components/game/scene-badge';
import { BlogToc } from '@/components/blog/blog-toc';
import { CustomMDXContent } from '@/components/shared/custom-mdx-content';
import { Badge } from '@/components/ui/badge';
import { LocaleLink } from '@/i18n/navigation';
import { formatDate } from '@/lib/formatter';
import { getTableOfContents } from '@/lib/blog/toc';
import type { Game } from 'content-collections';
import { ArrowLeftIcon, CalendarIcon, Clock3Icon, ImageOffIcon, ListTreeIcon } from 'lucide-react';
import Image from 'next/image';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';

interface GamePageProps {
  game: Game;
  labels: {
    backToList: string;
    publishedOn: string;
    readTime: (minutes: number) => string;
    scenes: string;
    quickFacts: string;
    duration: string;
    participants: string;
    materials: string;
    noMaterials: string;
    difficulty: string;
    tableOfContents: string;
    noCover: string;
  };
}

export async function GamePage({ game, labels }: GamePageProps) {
  const publishDate = formatDate(new Date(game.date));
  const toc = await getTableOfContents(game.content);
  const hasToc = Boolean(toc?.items && toc.items.length > 0);

  return (
    <Container className="py-16 px-4">
      <article className="mx-auto flex w-full max-w-4xl flex-col gap-12">
        <header className="space-y-6">
          <LocaleLink
            href="/games"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4" />
            <span>{labels.backToList}</span>
          </LocaleLink>

          <div className="space-y-4">
            {game.image ? (
              <div className="relative aspect-16/9 w-full overflow-hidden rounded-2xl">
                <Image
                  src={game.image}
                  alt={game.imageAlt || game.title || 'Game cover'}
                  fill
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="object-cover"
                  priority
                  placeholder="blur"
                  blurDataURL={PLACEHOLDER_IMAGE}
                />
              </div>
            ) : (
              <div className="flex aspect-16/9 w-full items-center justify-center rounded-2xl border border-dashed border-muted-foreground/40 bg-muted/30 text-sm text-muted-foreground">
                <div className="flex flex-col items-center gap-2">
                  <ImageOffIcon className="size-6" />
                  <span>{labels.noCover ?? 'Cover image coming soon'}</span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {Array.isArray(game.scenes) && game.scenes.length > 0 && (
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                  <span>{labels.scenes}</span>
                  {game.scenes.map((scene, index) => (
                    <Badge key={scene} variant="outline" className={getSceneBadgeClass(scene, index)}>
                      {scene}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {game.title}
              </h1>
              <p className="text-lg text-muted-foreground">{game.description}</p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CalendarIcon className="size-4" />
                <span>
                  {labels.publishedOn} {publishDate}
                </span>
              </span>
              {game.estimatedTime ? (
                <span className="inline-flex items-center gap-2">
                  <Clock3Icon className="size-4" />
                  <span>{labels.readTime(game.estimatedTime)}</span>
                </span>
              ) : null}
            </div>
          </div>
        </header>

      <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex flex-col gap-10">
            <GameMetaCard
              duration={game.duration}
              participants={game.participants}
              materials={game.materials}
              difficulty={game.difficulty}
              labels={{
                quickFacts: labels.quickFacts,
                duration: labels.duration,
                participants: labels.participants,
                materials: labels.materials,
                noMaterials: labels.noMaterials,
                difficulty: labels.difficulty,
              }}
            />

            {hasToc ? (
              <div className="rounded-lg border border-dashed border-muted-foreground/20 bg-muted/30 p-6 lg:hidden">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  <ListTreeIcon className="size-4" />
                  <span>{labels.tableOfContents}</span>
                </div>
                <BlogToc toc={toc} />
              </div>
            ) : null}

            <div className="prose prose-neutral max-w-none dark:prose-invert">
              <CustomMDXContent code={game.body} />
            </div>
          </div>

          {hasToc ? (
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-4 rounded-lg border border-dashed border-muted-foreground/20 bg-muted/30 p-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <ListTreeIcon className="size-4" />
                  <span>{labels.tableOfContents}</span>
                </div>
                <BlogToc toc={toc} />
              </div>
            </aside>
          ) : null}
        </section>
      </article>
    </Container>
  );
}
