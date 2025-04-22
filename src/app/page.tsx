import { HomeContent } from './_components/home-content';

export default function Home() {
  return (
    <div className="flex flex-1 flex-row flex-wrap">
      <main className="flex-1 h-[calc(100vh-4em)] px-8 py-5 w-full">
        <HomeContent />
      </main>
    </div>
  );
}
