"use client";
import Header from "@components/Header";
import TripCard from "@components/TripCard";
import { StopAreas } from "@models/Models";
import { Trip } from "@models/Trip";
import { fetchTrips } from "@services/TripsService";
import { useEffect, useState } from "react";
//import mock from "@mock/data.json";

export default function Trips() {
  /*   const [activeFilters, setActiveFilters] = useState<string[]>([
    "train, tram, bus",
  ]); */
  const [tripList, setTripList] = useState<Trip[]>([]);
  const [selectedStopArea, setSelectedStopArea] = useState<string>(
    StopAreas[0].id
  );
  let interval: any = null;

  const fetchData = async (stopAreaId?: string) => {
    const trips = (await fetchTrips(stopAreaId ?? selectedStopArea)) ?? [];
    setTripList(trips);
  };
  const refresh = async (id?: string) => {
    if (id) {
      setSelectedStopArea(id);
    }
    fetchData(id);
  };

  useEffect(() => {
    fetchData();
    /* interval = setInterval(() => {
      console.log("[USEEFFECT] 1 MIN PASSED. FETCHING DATA AGAIN!");
      fetchData();
    }, 5000); */
  }, []);

  return (
    <div className="z-0 w-full max-w-5xl items-center justify-between font-mono">
      <Header refresh={async (id) => refresh(id)} />
      <div>
        {tripList.map((trip: Trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
}
