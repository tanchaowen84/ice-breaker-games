'use client';

import { useMounted } from '@/hooks/use-mounted';
import type { TableOfContents } from '@/lib/blog/toc';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface TocProps {
  toc: TableOfContents;
}

export function BlogToc({ toc }: TocProps) {
  const itemIds = React.useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split('#')[1])
        : [],
    [toc]
  );
  const activeHeading = useActiveItem(itemIds);
  const mounted = useMounted();

  if (!toc?.items) {
    return null;
  }

  return mounted ? (
    <div className="space-y-2">
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  ) : null;
}

function useActiveItem(itemIds: (string | undefined)[]) {
  const [activeId, setActiveId] = React.useState<string>('');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    for (const id of itemIds) {
      if (!id) {
        continue;
      }

      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      for (const id of itemIds) {
        if (!id) {
          continue;
        }

        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      }
    };
  }, [itemIds]);

  return activeId;
}

interface TreeProps {
  tree: TableOfContents;
  level?: number;
  activeItem?: string | null;
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  if (!tree?.items?.length || level > 2) {
    return null;
  }

  return (
    <ul
      className={cn('m-0 list-none space-y-1.5', {
        'ml-2 border-l border-border/40 pl-3': level !== 1,
      })}
    >
      {tree.items.map((item, index) => {
        return (
          <li key={index} className="mt-0">
            <a
              href={item.url}
              className={cn(
                'block rounded-md px-2 py-1 text-sm leading-relaxed no-underline transition-colors hover:bg-muted hover:text-foreground',
                item.url === `#${activeItem}`
                  ? 'bg-muted font-medium text-foreground shadow-sm'
                  : 'text-muted-foreground'
              )}
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem} />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
