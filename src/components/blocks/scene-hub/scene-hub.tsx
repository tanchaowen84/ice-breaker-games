import { Badge } from '@/components/ui/badge';
import { LocaleLink } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import type React from 'react';

const SCENE_KEYS = [
  'meetings',
  'adults',
  'kids',
  'teens',
  'teamBuilding',
  'largeGroups',
];

// Game links mapping for internal linking
const GAME_LINKS: Record<string, string> = {
  'Jenga Questions': '/games/jenga-questions',
  'Would You Rather': '/games/would-you-rather',
  'Two Truths and a Lie': '/games/two-truths-and-a-lie',
  // Add more games as needed
};

// Helper function to render examples with internal game links
function renderExamplesWithLinks(examplesText: string): React.ReactNode {
  // Split by quotes and process each part
  const parts = examplesText.split(/(['"]).*?\1/);
  const matches = examplesText.match(/(['"]).*?\1/g) || [];

  const elements: React.ReactNode[] = [];
  parts.forEach((part, index) => {
    // Add regular text parts
    if (part) {
      elements.push(<span key={`text-${index}`}>{part}</span>);
    }

    // Process quoted content
    if (matches[index]) {
      const quoteContent = matches[index].slice(1, -1); // Remove quotes

      // Check if this is a known game
      if (GAME_LINKS[quoteContent]) {
        elements.push(
          <LocaleLink
            key={`link-${index}`}
            href={GAME_LINKS[quoteContent]}
            className="font-semibold not-italic text-slate-700 underline underline-offset-2 hover:text-primary transition-colors"
          >
            {matches[index][0]}
            {quoteContent}
            {matches[index][0]}
          </LocaleLink>
        );
      } else {
        // Regular bold text for non-game content
        elements.push(
          <strong
            key={`quote-${index}`}
            className="font-semibold not-italic text-slate-700"
          >
            {matches[index][0]}
            {quoteContent}
            {matches[index][0]}
          </strong>
        );
      }
    }
  });

  return elements;
}

export default function SceneHubSection() {
  const t = useTranslations('HomePage.sceneHub');

  return (
    <section id="scene-hub" className="bg-slate-50/60 px-6 py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#0ea5e9]">
            {t('eyebrow')}
          </p>
          <h2 className="text-balance text-3xl font-bricolage-grotesque font-semibold text-slate-900 sm:text-4xl">
            {t('title')}
          </h2>
          <p className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t('description')}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {SCENE_KEYS.map((key) => (
            <article
              key={key}
              className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm transition hover:border-slate-300"
            >
              <div className="flex items-center gap-3">
                <h3 className="text-base font-semibold text-slate-900">
                  {t(`scenes.${key}.label` as any)}
                </h3>
                <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                  Soon
                </Badge>
              </div>
              <div className="text-sm text-slate-600">
                <p>{t(`scenes.${key}.helper.description` as any)}</p>
                <p className="mt-2 pl-4 italic text-slate-500">
                  <span className="not-italic font-semibold text-slate-600">
                    e.g.
                  </span>{' '}
                  {renderExamplesWithLinks(t(`scenes.${key}.helper.examples` as any))}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="text-sm text-slate-500">{t('footnote')}</p>
      </div>
    </section>
  );
}
