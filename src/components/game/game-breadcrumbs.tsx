import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { LocaleLink } from '@/i18n/navigation';

interface GameBreadcrumbsProps {
  homeLabel: string;
  gamesLabel: string;
  currentLabel?: string;
}

export function GameBreadcrumbs({
  homeLabel,
  gamesLabel,
  currentLabel,
}: GameBreadcrumbsProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <LocaleLink href="/">{homeLabel}</LocaleLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {currentLabel ? (
            <BreadcrumbLink asChild>
              <LocaleLink href="/games">{gamesLabel}</LocaleLink>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage>{gamesLabel}</BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {currentLabel ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentLabel}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : null}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
