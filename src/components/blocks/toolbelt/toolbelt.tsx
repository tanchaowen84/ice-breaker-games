import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const IDEA_KEYS = ['timer', 'splitter', 'picker', 'spinner'];

export default function ToolbeltSection() {
  const t = useTranslations('HomePage.toolbelt');

  return (
    <section id="tools" className="bg-white px-6 py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <div className="order-1">
          <div className="relative mx-auto max-w-xl overflow-hidden rounded-3xl border border-slate-100 bg-slate-50/70 p-6 shadow-lg ring-1 ring-slate-100">
            <Image
              src="/blocks/payments-light.png"
              alt={t('imageAlt')}
              width={1024}
              height={768}
              className="w-full rounded-2xl object-cover"
            />
            <div className="absolute left-6 top-6 rounded-full bg-emerald-500/90 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow">
              {t('imageBadge')}
            </div>
          </div>
        </div>

        <div className="order-2 space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#14b8a6]">
            {t('eyebrow')}
          </p>
          <h2 className="text-balance text-3xl font-bricolage-grotesque font-semibold text-slate-900 sm:text-4xl">
            {t('title')}
          </h2>
          <p className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t('description')}
          </p>

          <div className="space-y-3">
            {IDEA_KEYS.map((key) => (
              <div
                key={key}
                className="flex items-center justify-between rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {t(`ideas.${key}.title`)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {t(`ideas.${key}.description`)}
                  </p>
                </div>
                <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                  Soon
                </Badge>
              </div>
            ))}
          </div>

          <p className="text-sm text-slate-500">{t('footnote')}</p>
        </div>
      </div>
    </section>
  );
}
