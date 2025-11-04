import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';
import type React from 'react';

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
                <Badge
                  variant="secondary"
                  className="bg-indigo-50 text-indigo-600"
                >
                  Soon
                </Badge>
              </div>
              <div className="text-sm text-slate-600">
                <p>{t(`categories.${key}.helper.description` as any)}</p>
                <p className="mt-2 pl-4 italic text-slate-500">
                  <span className="not-italic font-semibold text-slate-600">
                    e.g.
                  </span>{' '}
                  {(() => {
                    const text = t(`categories.${key}.helper.examples` as any);
                    // 使用正则表达式匹配引号内的内容（包括单引号和双引号）
                    const parts = text.split(/(['"]).*?\1/);
                    const matches = text.match(/(['"]).*?\1/g) || [];

                    const elements: React.JSX.Element[] = [];
                    parts.forEach((part, index) => {
                      // 添加普通文本部分
                      if (part) {
                        elements.push(
                          <span key={`text-${index}`}>{part}</span>
                        );
                      }
                      // 添加匹配的引号内容（加粗显示）
                      if (matches[index]) {
                        const quoteContent = matches[index].slice(1, -1); // 去掉引号
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
                    });

                    return elements;
                  })()}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
