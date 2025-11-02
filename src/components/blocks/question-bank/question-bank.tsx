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

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {CATEGORY_KEYS.map((key) => (
            <article
              key={key}
              className="flex flex-col gap-2 rounded-2xl border border-indigo-100 bg-white/95 p-5 shadow-sm transition hover:border-indigo-200"
            >
              <div className="flex items-center gap-3">
                <h3 className="text-base font-semibold text-slate-900">
                  {t(`categories.${key}.label` as any)}
                </h3>
                <Badge variant="secondary" className="bg-indigo-50 text-indigo-600">
                  Soon
                </Badge>
              </div>
              <p className="text-sm text-slate-600">
                {t(`categories.${key}.helper` as any)}
              </p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
