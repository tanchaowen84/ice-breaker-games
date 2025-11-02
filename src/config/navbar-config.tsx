'use client';

import { Routes } from '@/routes';
import type { NestedMenuItem } from '@/types';
import { useTranslations } from 'next-intl';

export function getNavbarLinks(): NestedMenuItem[] {
  // keep hook for potential locale-aware routing in the future
  useTranslations('Marketing.navbar');

  return [
    { title: 'Games', href: Routes.Games, external: false },
    { title: 'Questions', href: Routes.Questions, external: false },
    { title: 'Tools', href: Routes.Tools, external: false },
    { title: 'Blog', href: Routes.Blog, external: false },
  ];
}
