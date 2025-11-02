import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';

const CATEGORY_KEYS = [
  'work',
  'adults',
  'teamMeetings',
  'teens',
  'dating',
  'smallGroups',
];

export default function QuestionBankSection() {
  const t = useTranslations('HomePage.questionBank');

  return (
    <section id="questions" className="px-6 py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#6366f1]">
            {t('eyebrow')}
          </p>
          <h2 className="text-balance text-3xl font-bricolage-grotesque font-semibold text-slate-900 sm:text-4xl">
            {t('title')}
          </h2>
          <p className="text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t('description')}
          </p>
        </div>

        <div className="flex flex-col divide-y divide-indigo-100 overflow-hidden rounded-2xl border border-indigo-100 bg-white/95 shadow-sm">
          {CATEGORY_KEYS.map((key, index) => (
            <details key={key} className="group" open={index === 0}>
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-slate-900 transition hover:bg-indigo-50/60">
                <span className="flex items-center gap-3">
                  <h3 className="text-base font-semibold text-slate-900">
                    {t(`categories.${key}.label`)}
                  </h3>
                  <Badge variant="secondary" className="bg-indigo-50 text-indigo-600">
                    Soon
                  </Badge>
                </span>
              </summary>
              <div className="space-y-3 bg-indigo-50/40 px-5 pb-5 pt-3 text-sm text-slate-600">
                <p>{t(`categories.${key}.helper`)}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-indigo-500 hover:text-indigo-600"
                >
                  {t('categories.cta')}
                </a>
              </div>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
}
