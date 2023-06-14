import { Trip } from "@models/Trip";

function formatDate(dateStr: string): any {
  if (dateStr) {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("sv-SE", {
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  }
}
function timeUntilDepature(estimatedDepartureTime: string): string {
  const diff = Number(new Date(estimatedDepartureTime)) - Number(new Date());
  const diffInMinutes = Math.floor(diff / 1000 / 60);
  if (diffInMinutes === 0) {
    return `Avgår om mindre än 1 min`;
  }
  return diff > 0 ? `Avgår om ${diffInMinutes.toString()} min` : `Avgår nu`;
}

const TripCard = (props: { trip: Trip }) => {
  const trip = props.trip;
  return (
    <div className="p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow transition duration-500 hover:brightness-90 cursor-pointer">
      <div className="flex items-center w-full">
        <div
          style={{
            color: trip.colors.foregroundColor,
            backgroundColor: trip.colors.backgroundColor,
            minWidth: 50,
          }}
          className="flex justify-center rounded-lg shadow mr-4 px-4 py-2"
        >
          {trip.number}
        </div>
        <div className="flex items-center justify-between w-full">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {trip.direction}
          </h2>
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {trip.platform}
          </h2>
        </div>
      </div>
      <div className="pt-2 flex items-center justify-between w-full">
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Avgång: {formatDate(trip.estimatedDepartureTime)}
        </p>
        <p>{timeUntilDepature(trip.estimatedDepartureTime)}</p>
      </div>
    </div>
  );
};

export default TripCard;
