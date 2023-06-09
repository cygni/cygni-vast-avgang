import Spinner from "@components/Spinner";
import TripCard from "@components/TripCard";
//import mock from "@mock/data.json";
import { use } from "react";
import { Trip } from "@models/Trip";
import Image from "next/image";

let deviceId = new Date().getTime();

enum VEHICLETYPES {
  Train = "train",
  Tram = "tram",
  Bus = "bus",
}

async function getToken() {
  console.log(new Date().getTime());
  deviceId = deviceId || new Date().getTime();
  const credentials = btoa(
    process.env.VASTTRAFIK_CLIENT + ":" + process.env.VASTTRAFIK_SECRET
  );
  //TODO: The given Auth token is wrong?? Works in postman. Find out why
  try {
    const res = await fetch("https://ext-api.vasttrafik.se/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + credentials,
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        scope: `device_${deviceId}`,
      }).toString(),
    });
    const data = await res.json();
    return data?.access_token;
  } catch (error) {
    console.error(error);
  }
}

async function fetchTrips() {
  const token: string = (await getToken()) ?? "";

  try {
    // göteborg central "https://ext-api.vasttrafik.se/pr/v4/stop-areas/9021014008000000/departures"
    // kungsports platsen "https://ext-api.vasttrafik.se/pr/v4/stop-areas/9021014004090000/departures",

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
    console.log("inside get trips", data);

    return data.results?.map((t: any) => ({
      id: t.serviceJourney.gid,
      platform:
        t.serviceJourney.line.transportMode === VEHICLETYPES.Train
          ? t.serviceJourney.line.name
          : `Läge ${t.stopPoint.platform}`,
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

// async function getTrips() {
//   const tripsList: Trip[] = (await fetchTrips()) ?? [];
//   return tripsList;
// }

export default function Trips() {
  const tripsList = use(fetchTrips());
  return (
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

      {tripsList.map((trip: Trip, idx: number) => (
        <TripCard key={idx} trip={trip} />
      ))}
    </div>
  );
}
