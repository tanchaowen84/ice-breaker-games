import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function QuickStartSection() {
  const t = useTranslations('HomePage.quickStart');

  return (
    <section id="quick-start" className="px-6 py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <div className="order-2 space-y-6 lg:order-1">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#f97316]">
            {t('eyebrow')}
          </p>
          <h2 className="text-balance text-3xl font-bricolage-grotesque font-semibold text-slate-900 sm:text-4xl">
            {t('title')}
          </h2>
          <p className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t('description')}
          </p>
          <div className="flex items-center gap-3 rounded-xl border border-dashed border-slate-200/70 bg-white/90 px-4 py-3 shadow-sm">
            <Badge variant="secondary" className="bg-slate-100 text-slate-600">
              Soon
            </Badge>
            <p className="text-sm text-slate-600">
              {t('soonNote')}
            </p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto max-w-xl overflow-hidden rounded-3xl border border-slate-100 bg-white/60 p-6 shadow-lg ring-1 ring-slate-100">
            <Image
              src="/blocks/exercice.png"
              alt={t('imageAlt')}
              width={1024}
              height={768}
              className="w-full rounded-2xl object-cover"
              priority
            />
            <div className="absolute left-6 top-6 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 shadow-sm">
              {t('imageBadge')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
