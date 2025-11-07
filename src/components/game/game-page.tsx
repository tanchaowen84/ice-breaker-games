import Container from '@/components/layout/container';
import { GameMetaCard } from '@/components/game/game-meta-card';
import { GameBreadcrumbs } from '@/components/game/game-breadcrumbs';
import { getSceneBadgeClass } from '@/components/game/scene-badge';
import { BlogToc } from '@/components/blog/blog-toc';
import { CustomMDXContent } from '@/components/shared/custom-mdx-content';
import { Badge } from '@/components/ui/badge';
import { LocaleLink } from '@/i18n/navigation';
import { formatDate } from '@/lib/formatter';
import { getTableOfContents } from '@/lib/blog/toc';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { getBaseUrl, getImageUrl, getUrlWithLocale } from '@/lib/urls/urls';
import type { Game } from 'content-collections';
import { ArrowLeftIcon, CalendarIcon, Clock3Icon, ImageOffIcon, ListTreeIcon } from 'lucide-react';
import type { Locale } from 'next-intl';
import Image from 'next/image';

interface GamePageProps {
  game: Game;
  locale: Locale;
  labels: {
    home: string;
    games: string;
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

export async function GamePage({ game, labels, locale }: GamePageProps) {
  const publishDate = formatDate(new Date(game.date));
  const toc = await getTableOfContents(game.content);
  const hasToc = Boolean(toc?.items && toc.items.length > 0);
  const pageUrl = getUrlWithLocale(game.slug, locale);
  const structuredData = buildGameJsonLd({ game, locale, pageUrl });

  return (
    <Container className="py-16 px-4">
      <article className="mx-auto flex w-full max-w-4xl flex-col gap-12">
        {structuredData ? (
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        ) : null}
        <GameBreadcrumbs
          homeLabel={labels.home}
          gamesLabel={labels.games}
          currentLabel={game.title}
        />

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

interface BuildSchemaParams {
  game: Game;
  locale: Locale;
  pageUrl: string;
}

function buildGameJsonLd({ game, locale, pageUrl }: BuildSchemaParams) {
  if (!game) {
    return null;
  }

  const baseUrl = getBaseUrl();
  const imageUrl = getImageUrl(game.image ?? '/og.png');
  const faqs = extractFaqEntries(game.content);
  const howToSteps = extractHowToSteps(game.content);
  const videoUrl = extractYoutubeUrl(game.content);
  const videoId = videoUrl ? extractYoutubeId(videoUrl) : null;
  const readTime = game.estimatedTime
    ? `PT${Math.max(1, Number(game.estimatedTime))}M`
    : undefined;
  const facilitationTime = parseDurationToIso(game.duration);
  const publisher = {
    '@type': 'Organization',
    name: 'Ice Breaker Games',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: getImageUrl('/logo.png'),
    },
  };
  const graph: Record<string, any>[] = [];

  graph.push({
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    headline: game.title,
    description: game.description,
    image: imageUrl,
    author: publisher,
    publisher,
    datePublished: new Date(game.date).toISOString(),
    dateModified: new Date(game.date).toISOString(),
    inLanguage: locale,
    mainEntityOfPage: pageUrl,
    wordCount: game.content?.split(/\s+/).filter(Boolean).length,
    keywords: game.scenes?.join(', '),
    about: game.scenes,
    timeRequired: readTime,
    audience: game.participants
      ? {
          '@type': 'Audience',
          audienceType: game.participants,
        }
      : undefined,
  });

  graph.push({
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Games',
        item: getUrlWithLocale('/games', locale),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: game.title,
        item: pageUrl,
      },
    ],
  });

  if (howToSteps.length > 0) {
    graph.push({
      '@type': 'HowTo',
      name: `${game.title} – Official Rules`,
      description:
        'Follow these three facilitation phases to run a polished Two Truths and a Lie session.',
      totalTime: facilitationTime,
      step: howToSteps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.description,
      })),
      supply: Array.isArray(game.materials)
        ? game.materials.map((material) => ({
            '@type': 'HowToSupply',
            name: material,
          }))
        : undefined,
    });
  }

  if (videoUrl && videoId) {
    graph.push({
      '@type': 'VideoObject',
      name: `${game.title} Walkthrough`,
      description: game.description,
      embedUrl: videoUrl,
      contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      publisher,
    });
  }

  if (faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

function extractYoutubeUrl(content: string) {
  if (!content) return undefined;
  const match = content.match(/https:\/\/www\.youtube\.com\/embed\/[\w-]+[?\w=]*/);
  return match ? match[0] : undefined;
}

function extractYoutubeId(url: string) {
  const idMatch = url.match(/embed\/([\w-]+)/);
  return idMatch ? idMatch[1] : undefined;
}

function extractFaqEntries(content: string) {
  if (!content?.includes('Frequently Asked Questions')) {
    return [];
  }
  const faqBlock = content.split('## Frequently Asked Questions')[1] || '';
  const regex = /\*\*Q:\s*([^*]+)\*\*[\s\S]*?\*\*A:\*\*\s*([^\n]+(?:\n(?!\*\*Q:).+)*)/g;
  const faqs: { question: string; answer: string }[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(faqBlock))) {
    const question = cleanMarkdownText(match[1]);
    const answer = cleanMarkdownText(match[2]);
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }
  return faqs;
}

function extractHowToSteps(content: string) {
  if (!content?.includes('Step-by-Step Rules and Mechanics')) {
    return [];
  }
  const section = content
    .split('### Step-by-Step Rules and Mechanics')[1]
    ?.split('### Pro Tips')[0];
  if (!section) {
    return [];
  }

  const lines = section.split('\n');
  const steps: { name: string; description: string }[] = [];
  let current: { name: string; intro: string; details: string[] } | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trimStart();
    const phaseMatch = trimmed.match(/^\* \*\*(Phase \d+: [^*]+)\*\*:\s*(.*)$/);
    if (phaseMatch) {
      if (current) {
        steps.push({
          name: current.name,
          description: cleanMarkdownText(
            [current.intro, ...current.details].join(' ')
          ),
        });
      }
      current = {
        name: cleanMarkdownText(phaseMatch[1]),
        intro: cleanMarkdownText(phaseMatch[2] ?? ''),
        details: [],
      };
      continue;
    }

    if (!current) {
      continue;
    }

    const bulletMatch = trimmed.match(/^\*\s+(.*)$/);
    if (bulletMatch) {
      current.details.push(cleanMarkdownText(bulletMatch[1] ?? ''));
    }
  }

  if (current) {
    steps.push({
      name: current.name,
      description: cleanMarkdownText(
        [current.intro, ...current.details].join(' ')
      ),
    });
  }

  return steps.filter((step) => step.name && step.description);
}

function parseDurationToIso(duration?: string) {
  if (!duration) return undefined;
  const match = duration.match(/(\d+)(?:\s*-\s*(\d+))?\s*(hour|hours|hr|hrs|minute|minutes|min|m|h)/i);
  if (!match) return undefined;
  const start = Number(match[1]);
  const end = match[2] ? Number(match[2]) : undefined;
  let minutes = end ? Math.round((start + end) / 2) : start;
  const unit = match[3].toLowerCase();
  if (unit.startsWith('hour') || unit === 'h' || unit === 'hr' || unit === 'hrs') {
    minutes *= 60;
  }
  return `PT${minutes}M`;
}

function cleanMarkdownText(input?: string) {
  if (!input) return '';
  return input
    .replace(/\*\*/g, '')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/`/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
