import { StopAreas } from "@models/Models";
import { ColumnWrapper, Trip } from "@models/Trip";
import { VEHICLETYPES } from "@models/enums";
import { delay } from "@utils/delay";
import Cookies from "js-cookie";
import { getToken } from "./TokenService";

export async function fetchAllTrips() {
  const token = await getTokenFromCookieOrApi();
  const columnWrapper: ColumnWrapper = {
    colLeft: [],
    colMiddle: [],
    colRight: [],
  };

  try {
    await delay(); /* For testing loading indicatior */
    for (let stopArea of StopAreas) {
      let res = await fetch(
        `https://ext-api.vasttrafik.se/pr/v4/stop-areas/${stopArea.id}/departures?&limit=${stopArea.limit}&offset=${stopArea.offset}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      const column = {
        title: stopArea.name,
        trips: mapToTrips(data.results),
      };

      switch (stopArea.id) {
        case "9021014001760000": //Brunsparken
        case "9021014004945000": //Nordstan
          columnWrapper.colLeft.push(column);
          break;
        case "9021014004090000": //Kungsportsplatsen
          columnWrapper.colMiddle.push(column);
          break;
        case "9021014001950000": //Centralstationen
        case "9021014008000000": //Centralstationen tåg
          columnWrapper.colRight.push(column);
          break;
      }
    }
    return columnWrapper;
  } catch (error) {
    /* TODO: Implement error handling */
    console.error(error);
    alert("Could not get trips");
  }
}

export async function fetchTrips(stopArea: string) {
  const token = await getTokenFromCookieOrApi();
  try {
    await delay(); /* For testing loading indicatior */
    const res = await fetch(
      `https://ext-api.vasttrafik.se/pr/v4/stop-areas/${stopArea}/departures?&limit=25&offset=0`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    return mapToTrips(data.results);
  } catch (error) {
    /* TODO: Implement error handling */
    console.error(error);
    alert("Could not get trips");
  }
}

/* 
Checks if the access token exists in cookies, otherwise get a new one from the backend. The token expires in 1 day.
Not the most secure solution, but works for this project :p 
*/
async function getTokenFromCookieOrApi() {
  let token = Cookies.get("token") ?? "";
  if (!token) {
    token = await getToken();
    Cookies.set("token", token, { expires: 1 });
  }
  return token;
}

function mapToTrips(results: any[]) {
  return results.map((t: any) => ({
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
  })) as Trip[];
}
