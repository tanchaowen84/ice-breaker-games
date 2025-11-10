import { Badge } from '@/components/ui/badge';
import { LocaleLink } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function QuickStartSection() {
  const t = useTranslations('HomePage.quickStart');

  return (
    <section id="quick-start" className="px-6 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
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
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-xl overflow-hidden rounded-3xl border border-slate-100 bg-white/60 p-6 shadow-lg ring-1 ring-slate-100">
              <Image
                src="https://cdn.icebreakergame.net/blocks/quicksection.webp"
                alt={t('imageAlt')}
                width={1024}
                height={768}
                className="w-full rounded-2xl object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Card 1 */}
          <LocaleLink
            href="/games/two-truths-and-a-lie"
            className="rounded-xl border border-slate-200 bg-white/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300"
          >
            <h3 className="font-bricolage-grotesque font-semibold text-slate-800">
              {t('quickGames.game1.title')}
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              {t('quickGames.game1.description')}
            </p>
          </LocaleLink>
          {/* Card 2 */}
          <div className="rounded-xl border border-slate-200 bg-white/80 p-5 shadow-sm">
            <h3 className="font-bricolage-grotesque font-semibold text-slate-800">
              {t('quickGames.game2.title')}
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              {t('quickGames.game2.description')}
            </p>
          </div>
          {/* Card 3 */}
          <LocaleLink
            href="/games/would-you-rather"
            className="rounded-xl border border-slate-200 bg-white/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300"
          >
            <h3 className="font-bricolage-grotesque font-semibold text-slate-800">
              {t('quickGames.game3.title')}
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              {t('quickGames.game3.description')}
            </p>
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
