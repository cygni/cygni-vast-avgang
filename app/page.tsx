import Trips from "@app/trips";

export default async function Home() {
  return (
    <main className="min-h-screen pt-0">
      <Trips />
    </main>
  );
}