import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 className="font-bold text-2xl">Welcome to the Books Data App</h1>
      <p className="my-4 text-lg">Please, select any of the following options.</p>

      <div className="flex flex-col items-start justify-center gap-4">
        <Link href={'/traditional'} className="text-blue-500 hover:underline">
          Traditional Fetching
        </Link>

        <Link href={'/tanstack-query'} className="text-blue-500 hover:underline">
          Fetching with TanStack Query
        </Link>
      </div>
    </div>
  );
}
