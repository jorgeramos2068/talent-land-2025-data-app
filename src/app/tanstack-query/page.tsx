import { Query } from './_components/query';

export default function Page() {
  return (
    <div className="w-full">
      <h1 className="my-4 text-2xl">Fetching with TanStack Query.</h1>
      <Query />
    </div>
  );
}
