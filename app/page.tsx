import Spinner from "@components/Spinner";
import Trips from "./trips";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <Suspense fallback={<Spinner />}>
        <Trips />
      </Suspense>
    </main>
  );
}
