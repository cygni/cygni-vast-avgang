"use client";
import Dropdown from "@components/Dropdown";
import TripCard from "@components/TripCard";
import { Trip } from "@models/Trip";
import { STOP_AREAS } from "@models/enums";
import { fetchTrips } from "@services/TripsService";
import Image from "next/image";
import { useEffect, useState } from "react";
//import mock from "@mock/data.json";

export default function Trips() {
  /*   const [activeFilters, setActiveFilters] = useState<string[]>([
    "train, tram, bus",
  ]); */
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
        <div className="flex items-center justify-center">
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
        </div>
        {/*         <button disabled>
          <Image
            src="/assets/filter.svg"
            alt="filter"
            width={50}
            height={50}
            className="object-contain cursor-pointer transition rounded-full hover:backdrop-brightness-90"
          />
        </button> */}
      </div>

      <div>
        {tripList.map((trip: Trip, idx: number) => (
          <TripCard key={idx} trip={trip} />
        ))}
      </div>
    </div>
  );
}
