import { Trip } from "@models/Trip";
import { useEffect, useState } from "react";

interface Props {
  trip: Trip;
}

function formatDate(dateStr: string): any {
  if (dateStr) {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("sv-SE", {
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  }
}
function calculateTimeUntilDepature(estimatedDepartureTime: string): string {
  const diff = Number(new Date(estimatedDepartureTime)) - Number(new Date());
  const diffInMinutes = Math.floor(diff / 1000 / 60);
  if (diffInMinutes === 0) {
    return `Avgår om mindre än 1 min`;
  }
  return diff > 0 ? `Avgår om ${diffInMinutes.toString()} min` : `Avgår nu`;
}

const TripCard = (props: Props) => {
  const trip = props.trip;
  const [timeUntilDepartue, setTimeUntilDepartue] = useState(
    calculateTimeUntilDepature(trip.estimatedDepartureTime)
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeUntilDepartue(
        calculateTimeUntilDepature(trip.estimatedDepartureTime)
      );
    }, 60000);

    return () => clearInterval(interval);
  });

  return (
    <div className="p-4 mb-4 bg-gray-50 rounded-lg shadow-md transition border">
      <div className="flex items-center">
        <div
          style={{
            color: trip.colors.foregroundColor,
            backgroundColor: trip.colors.backgroundColor,
          }}
          className="flex justify-center min-w-[55px] border rounded-lg shadow mr-4 py-1"
        >
          {trip.number}
        </div>
        <div className="xl:flex xl:items-center xl:justify-between w-full">
          <div className="pr-18">
            <h2 className="text-2xl font-bold">{trip.direction}</h2>
          </div>
          <h2 className="text-2xl font-bold">{trip.platform}</h2>
        </div>
      </div>
      <div className="pt-3 flex items-center justify-between w-full">
        <p>Avgång: {formatDate(trip.estimatedDepartureTime)}</p>
        <p>{timeUntilDepartue}</p>
      </div>
    </div>
  );
};

export default TripCard;
