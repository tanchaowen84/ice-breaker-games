import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ClockIcon, PackageIcon, ShieldIcon, UsersIcon } from 'lucide-react';

interface GameMetaCardProps {
  duration?: string;
  participants?: string;
  materials?: string[];
  difficulty?: string;
  labels: {
    quickFacts: string;
    duration: string;
    participants: string;
    materials: string;
    noMaterials: string;
    difficulty: string;
  };
}

export function GameMetaCard({
  duration,
  participants,
  materials,
  difficulty,
  labels,
}: GameMetaCardProps) {
  const items = [
    {
      icon: ClockIcon,
      label: labels.duration,
      value: duration,
    },
    {
      icon: UsersIcon,
      label: labels.participants,
      value: participants,
    },
    {
      icon: ShieldIcon,
      label: labels.difficulty,
      value: difficulty,
    },
  ].filter((item) => Boolean(item.value));

  const renderedMaterials =
    materials && materials.length > 0 ? (
      <ul className="mt-3 list-inside list-disc text-sm text-muted-foreground">
        {materials.map((material) => (
          <li key={material}>{material}</li>
        ))}
      </ul>
    ) : (
      <p className="mt-3 text-sm text-muted-foreground">{labels.noMaterials}</p>
    );

  return (
    <Card className="border-dashed border-muted-foreground/30">
      <CardHeader>
        <CardTitle className="text-base font-medium text-muted-foreground">
          {labels.quickFacts}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <span className="mt-1 flex size-9 items-center justify-center rounded-full bg-muted">
                <Icon className="size-4 text-muted-foreground" />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-sm text-muted-foreground">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className={cn('flex items-center gap-2 text-sm font-medium')}>
            <PackageIcon className="size-4 text-muted-foreground" />
            <span>{labels.materials}</span>
          </div>
          {renderedMaterials}
        </div>
      </CardContent>
    </Card>
  );
}
