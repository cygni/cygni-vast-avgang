"use client";
import Header from "@components/Header";
import Spinner from "@components/Spinner";
import TripCard from "@components/TripCard";
import { Transition } from "@headlessui/react";
import { StopAreas } from "@models/Models";
import { Column, ColumnWrapper } from "@models/Trip";
import { fetchAllTrips } from "@services/TripsService";
import { useEffect, useState } from "react";
//import mock from "../mock/data2.json";

export default function Trips() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [columnWrapper, setColumnWrapper] = useState<ColumnWrapper>();
  const [selectedStopArea, setSelectedStopArea] = useState<string>(
    StopAreas[0].id
  );
  let interval: any = null;

  const fetchData = async (stopAreaId?: string) => {
    setIsLoading(true);

    //const trips = mock;
    //const trips = (await fetchTrips(stopAreaId ?? selectedStopArea)) ?? [];
    const trips = await fetchAllTrips();
    setColumnWrapper(trips);
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
    interval = setInterval(() => {
      console.log("[USEEFFECT] 5 MIN PASSED. FETCHING DATA AGAIN!");
      fetchData();
    }, 300000);
  }, []);

  const renderContent = (col: Column) => {
    return (
      <>
        <div className="flex justify-center items-center bg-gray-50 rounded-lg mb-4 py-2 shadow-md">
          <h1 className="self-center text-2xl">{col.title}</h1>
        </div>
        {col.trips.map((t: any) => (
          <TripCard key={t.id} trip={t} />
        ))}
      </>
    );
  };

  return (
    <div className="z-0 w-full">
      {isLoading && <Spinner />}
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
        <div className="flex justify-center">
          <Header refresh={async (id) => refresh(id)} />
        </div>
        <div className="flex justify-between">
          {columnWrapper && (
            <>
              <div className="w-1/3 pr-4">
                {columnWrapper.colLeft.map((col: any) => (
                  <div key={col.title} className="flex flex-col mb-6">
                    {renderContent(col)}
                  </div>
                ))}
              </div>
              <div className="w-1/3 px-4">
                {columnWrapper.colMiddle.map((col: any) => (
                  <div key={col.title} className="flex flex-col">
                    {renderContent(col)}
                  </div>
                ))}
              </div>
              <div className="w-1/3 pl-4">
                {columnWrapper.colRight.map((col: any) => (
                  <div key={col.title} className="flex flex-col mb-6">
                    {renderContent(col)}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </Transition>

      {/*       <div>
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
      </div> */}
    </div>
  );
}
