"use client";
import Header from "@components/Header";
import Spinner from "@components/Spinner";
import TripCard from "@components/TripCard";
import { Transition } from "@headlessui/react";
import { StopAreas } from "@models/Models";
import { Trip } from "@models/Trip";
import { fetchTrips } from "@services/TripsService";
import { useEffect, useState } from "react";
//import mock from "@mock/data.json";

export default function Trips() {
  /*   const [activeFilters, setActiveFilters] = useState<string[]>([
    "train, tram, bus",
  ]); */
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tripList, setTripList] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [selectedStopArea, setSelectedStopArea] = useState<string>(
    StopAreas[0].id
  );
  let interval: any = null;
  const fetchData = async (stopAreaId?: string) => {
    setIsLoading(true);
    const trips = (await fetchTrips(stopAreaId ?? selectedStopArea)) ?? [];
    setTripList(trips);
    setIsLoading(false);
  };
  const refresh = async (id?: string) => {
    if (id) {
      setSelectedStopArea(id);
    }
    fetchData(id);
  };

  useEffect(() => {
    fetchData();
    /*     interval = setInterval(() => {
      console.log("[USEEFFECT] 1 MIN PASSED. FETCHING DATA AGAIN!");
      fetchData();
    }, 60000); */
  }, []);

  return (
    <div className="z-0 w-full max-w-5xl items-center justify-between font-mono">
      <Header refresh={async (id) => refresh(id)} />
      <div>
        {isLoading && <Spinner />}
        {
          <Transition
            appear={true}
            show={!isLoading}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {tripList.map((trip: Trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </Transition>
        }
      </div>
    </div>
  );
}
