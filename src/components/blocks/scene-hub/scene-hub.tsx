import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';

const SCENE_KEYS = [
  'meetings',
  'adults',
  'kids',
  'teens',
  'teamBuilding',
  'largeGroups',
];

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
                <p className="mt-2 text-slate-500">
                  <span className="font-semibold text-slate-600">e.g.</span>{' '}
                  {t(`scenes.${key}.helper.examples` as any)}
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
