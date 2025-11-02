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

        <div className="flex flex-col divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-sm">
          {SCENE_KEYS.map((key, index) => (
            <details
              key={key}
              className="group"
              data-slot="scene-item"
              open={index === 0}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
                <span className="flex items-center gap-3">
                  <h3 className="text-base font-semibold text-slate-900">
                    {t(`scenes.${key}.label`)}
                  </h3>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                    Soon
                  </Badge>
                </span>
              </summary>
              <div className="space-y-3 bg-slate-50/60 px-5 pb-5 pt-3 text-sm text-slate-600">
                <p>{t(`scenes.${key}.helper`)}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#0ea5e9] hover:text-[#0284c7]"
                >
                  {t('scenes.cta')}
                </a>
              </div>
            </details>
          ))}
        </div>

        <p className="text-sm text-slate-500">{t('footnote')}</p>
      </div>
    </section>
  );
}
