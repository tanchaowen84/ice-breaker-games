import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const SCENE_KEYS = [
  'work',
  'meetings',
  'adults',
  'teens',
  'kids',
  'largeGroups',
  'quick',
  'fun',
];

export default function SceneHubSection() {
  const t = useTranslations('HomePage.sceneHub');

  return (
    <section id="scene-hub" className="bg-slate-50/60 px-6 py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <div className="order-1">
          <div className="relative mx-auto max-w-xl overflow-hidden rounded-3xl border border-slate-100 bg-white/70 p-6 shadow-lg ring-1 ring-slate-100">
            <Image
              src="/blocks/music.png"
              alt={t('imageAlt')}
              width={1024}
              height={768}
              className="w-full rounded-2xl object-cover"
            />
            <div className="absolute right-6 top-6 rounded-full bg-slate-900/90 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow">
              {t('imageBadge')}
            </div>
          </div>
        </div>

        <div className="order-2 space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#0ea5e9]">
            {t('eyebrow')}
          </p>
          <h2 className="text-balance text-3xl font-bricolage-grotesque font-semibold text-slate-900 sm:text-4xl">
            {t('title')}
          </h2>
          <p className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t('description')}
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {SCENE_KEYS.map((key) => (
              <div
                key={key}
                className="flex flex-col gap-1 rounded-xl border border-dashed border-slate-200 bg-white/90 p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    {t(`scenes.${key}.label`)}
                  </span>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                    Soon
                  </Badge>
                </div>
                <p className="text-xs text-slate-500">
                  {t(`scenes.${key}.helper`)}
                </p>
              </div>
            ))}
          </div>

          <p className="text-sm text-slate-500">
            {t('footnote')}
          </p>
        </div>
      </div>
    </section>
  );
}
