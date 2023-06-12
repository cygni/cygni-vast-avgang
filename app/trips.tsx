"use client";
import Dropdown from "@components/Dropdown";
import TripCard from "@components/TripCard";
import { Trip } from "@models/Trip";
import { STOP_AREAS, VEHICLETYPES } from "@models/enums";
import Image from "next/image";
import { useEffect, useState } from "react";
//import mock from "@mock/data.json";

let deviceId = new Date().getTime();

async function getToken() {
  deviceId = deviceId || new Date().getTime();
  try {
    const res = await fetch("https://ext-api.vasttrafik.se/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${process.env.NEXT_PUBLIC_VASTTRAFIK_AUTH_KEY}`,
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

async function fetchTrips(stopArea: string) {
  const token: string = (await getToken()) ?? "";

  try {
    const res = await fetch(
      `https://ext-api.vasttrafik.se/pr/v4/stop-areas/${stopArea}/departures?&limit=20&offset=0`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
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
      transportMode: t.serviceJourney.line.transportMode,
    }));
  } catch (error) {
    console.error(error);
  }
}

export default function Trips() {
  const [activeFilters, setActiveFilters] = useState<string[]>([
    "train, tram, bus",
  ]);
  const [tripList, setTripList] = useState<Trip[]>([]);
  const [selectedStopArea, setSelectedStopArea] = useState<string>(
    STOP_AREAS.KUNGSPORTSPLATSEN
  );
  let interval: any = null;

  const fetchData = async (stopAreaId?: string) => {
    const trips = await fetchTrips(stopAreaId ?? selectedStopArea);
    setTripList(trips);
  };
  const refresh = async (id?: string) => {
    console.log("Refreshed");
    if (id) {
      setSelectedStopArea(id);
    }
    fetchData(id);
    /*     interval = setInterval(() => {
      console.log("[REFRESH] 1 MIN PASSED. FETCHING DATA AGAIN!");
      fetchData();
    }, 60000); */
  };

  useEffect(() => {
    fetchData();
    /* interval = setInterval(() => {
      console.log("[USEEFFECT] 1 MIN PASSED. FETCHING DATA AGAIN!");
      fetchData();
    }, 5000); */
  }, []);

  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono">
      <div className="flex justify-between">
        <div className="flex items-center gap-4 mb-2">
          <Image
            src="/assets/logo.svg"
            alt="logo"
            width={65}
            height={65}
            className="object-contain"
          />
          <h1 className="mt-4 text-2xl">Cygni |</h1>
        </div>
        <div className="flex items-center justify-center">
          <Dropdown refresh={async (id) => refresh(id)} />
        </div>
        <button
          onClick={async () => {
            refresh();
          }}
        >
          <Image
            src="/assets/refresh.svg"
            alt="refresh"
            width={50}
            height={50}
            className="object-contain cursor-pointer transition rounded-full hover:backdrop-brightness-90"
          />
        </button>
        <button>
          <Image
            src="/assets/filter.svg"
            alt="filter"
            width={50}
            height={50}
            className="object-contain cursor-pointer transition rounded-full hover:backdrop-brightness-90"
          />
        </button>
      </div>

      <div>
        {tripList.map((trip: Trip, idx: number) => (
          <TripCard key={idx} trip={trip} />
        ))}
      </div>
    </div>
  );
}
