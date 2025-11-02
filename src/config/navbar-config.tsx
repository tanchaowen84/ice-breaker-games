'use client';

import { Routes } from '@/routes';
import type { NestedMenuItem } from '@/types';

export function getNavbarLinks(): NestedMenuItem[] {
  return [
    { title: 'Games', href: Routes.Games, external: false },
    { title: 'Questions', href: Routes.Questions, external: false },
    { title: 'Tools', href: Routes.Tools, external: false },
    { title: 'Blog', href: Routes.Blog, external: false },
  ];
}
