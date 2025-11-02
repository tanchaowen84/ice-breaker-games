import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const MOOD_KEYS = ['funny', 'deep', 'work', 'teens', 'kids', 'meetings'];

export default function QuestionBankSection() {
  const t = useTranslations('HomePage.questionBank');

  return (
    <section id="questions" className="px-6 py-20">
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <div className="order-2 space-y-6 lg:order-1">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#6366f1]">
            {t('eyebrow')}
          </p>
          <h2 className="text-balance text-3xl font-bricolage-grotesque font-semibold text-slate-900 sm:text-4xl">
            {t('title')}
          </h2>
          <p className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t('description')}
          </p>

          <div className="flex flex-wrap gap-2">
            {MOOD_KEYS.map((key) => (
              <Badge
                key={key}
                variant="secondary"
                className="cursor-not-allowed rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700"
              >
                {t(`moods.${key}`)}
              </Badge>
            ))}
          </div>

          <div className="rounded-2xl border border-dashed border-indigo-100 bg-white/90 p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <Badge className="bg-slate-100 text-slate-600" variant="secondary">
                Soon
              </Badge>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {t('highlight.title')}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {t('highlight.description')}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-indigo-500">
                  {t('highlight.cta')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto max-w-xl overflow-hidden rounded-3xl border border-indigo-100 bg-indigo-50/60 p-6 shadow-lg">
            <Image
              src="/blocks/mail2-light.png"
              alt={t('imageAlt')}
              width={1024}
              height={768}
              className="w-full rounded-2xl object-cover"
            />
            <div className="absolute left-6 top-6 rounded-full bg-white/85 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-600 shadow">
              {t('imageBadge')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
