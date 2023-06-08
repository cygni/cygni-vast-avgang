import Spinner from "@components/Spinner";
import TripCard from "@components/TripCard";
//import mock from "@mock/data.json";
import { Trip } from "@models/Trip";
import Image from "next/image";

async function getToken() {
  //TODO: The given Auth token is wrong?? Works in postman. Find out why
  try {
    const res = await fetch("https://ext-api.vasttrafik.se/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${process.env.VASTTRAFIK_AUTH_KEY}`,
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }).toString(),
    });
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}
async function getTrips(token: string) {
  try {
    //standard endpoint to get all departues from Kungsportsplatsen
    const res = await fetch(
      "https://ext-api.vasttrafik.se/pr/v4/stop-areas/9021014004090000/departures",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    //const data = mock;
    console.log(data);

    return data.results?.map((t: any) => ({
      id: t.serviceJourney.gid,
      platform: `Läge ${t.stopPoint.platform}`,
      direction: t.serviceJourney.direction,
      number: t.serviceJourney.line.designation,
      estimatedDepartureTime: t.estimatedTime ?? t.plannedTime,
      colors: {
        foregroundColor: t.serviceJourney.line.foregroundColor,
        backgroundColor: t.serviceJourney.line.backgroundColor,
      },
    }));
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const isLoading = false;
  const token: string = (await getToken()) ?? "";
  const trips: Trip[] = (await getTrips(token)) ?? [];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono">
          <div className="flex justify-between">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/assets/logo.svg"
                alt="logo"
                width={65}
                height={65}
                className="object-contain"
              />
              <h1 className="mt-4 text-2xl">Cygni |</h1>
              {/* <h1 className="mt-4 text-2xl">{originName}</h1> */}
            </div>
            <button>
              <Image
                src="/assets/refresh.svg"
                alt="refresh"
                width={65}
                height={65}
                className="object-contain cursor-pointer transition rounded-full hover:backdrop-brightness-90"
              />
            </button>
          </div>

          {trips.map((trip, idx) => (
            <TripCard key={idx} trip={trip} />
          ))}
        </div>
      )}
    </main>
  );
}
