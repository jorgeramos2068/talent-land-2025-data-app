'use client';

import * as React from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <div className="sticky top-0 w-full">
      <div className="bg-white border-b flex h-[4em] items-center justify-between px-8 top-0 w-full z-50">
        <div className="flex gap-4 items-center">
          <h1>
            <Link className="font-bold text-xl" href="/">
              Books Data App
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};
