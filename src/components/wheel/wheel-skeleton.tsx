'use client';

import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

export function WheelSkeleton() {
  return (
    <div className="relative flex w-full max-w-md flex-col items-center justify-center">
      <div className="relative flex size-[320px] items-center justify-center rounded-full border border-[#10204b]/20 bg-white/80 p-6 shadow-xl">
        {/* Wheel skeleton */}
        <div className="absolute inset-0 animate-pulse">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 opacity-60" />
        </div>

        {/* Center star skeleton */}
        <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-gray-300 shadow-lg">
          <Star
            className="h-8 w-8 text-gray-400"
            stroke="transparent"
            fill="currentColor"
          />
        </div>

        {/* Pointer skeleton */}
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
          <div className="relative -top-7 flex flex-col items-center">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300 shadow-lg" />
            <div className="-mt-1 h-6 w-3 animate-pulse rounded-b-full bg-gray-300" />
          </div>
        </div>
      </div>

      {/* Text skeleton */}
      <div className="mt-4 w-full max-w-xs">
        <div className="h-4 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-3 w-3/4 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}