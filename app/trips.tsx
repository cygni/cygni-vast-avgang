"use client";
import Header from "@components/Header";
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
      <Header refresh={async (id) => refresh(id)} />
      <div>
        {tripList.map((trip: Trip, idx: number) => (
          <TripCard key={idx} trip={trip} />
        ))}
      </div>
    </div>
  );
}
