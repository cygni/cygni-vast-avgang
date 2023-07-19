"use client";
import { useEffect, useState } from "react";

const Clock = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [weekNr, setWeekNr] = useState("");

  const week = [
    "Söndag",
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
  ];

  const month = [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "September",
    "Oktober",
    "November",
    "December",
  ];

  setInterval(() => {
    const currentDate: Date = new Date();
    setTime(
      zeroPadding(currentDate.getHours(), 2) +
        ":" +
        zeroPadding(currentDate.getMinutes(), 2) +
        ":" +
        zeroPadding(currentDate.getSeconds(), 2)
    );
    setDate(
      week[currentDate.getDay()] +
        " " +
        zeroPadding(currentDate.getDate(), 2) +
        " " +
        month[currentDate.getMonth()] +
        " " +
        zeroPadding(currentDate.getFullYear(), 4)
    );
    setWeekNr("Vecka " + ISO8601_week_nr(currentDate));
  }, 1000);

  function zeroPadding(num: number, digit: number) {
    let zero = "";
    for (let i: number = 0; i < digit; i++) {
      zero += "0";
    }
    return (zero + num).slice(-digit);
  }

  function ISO8601_week_nr(dt: Date) {
    let tdt: any = new Date(dt.valueOf());
    let dayn: number = (dt.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    let firstThursday: number = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) {
      tdt.setMonth(0, 1 + ((4 - tdt.getDay() + 7) % 7));
    }
    return 1 + Math.ceil((firstThursday - tdt) / 604800000);
  }

  return (
    <>
      <div className="fixed -z-10 bottom-0 left-1/2 transform -translate-x-1/2 transition font-chivo-mono flex flex-col justify-center items-center pb-5">
        <p className="text-10xl">{time}</p>
        <p className="text-7xl">{date}</p>
        <p className="text-7xl">{weekNr}</p>
      </div>
    </>
  );
};

export default Clock;
