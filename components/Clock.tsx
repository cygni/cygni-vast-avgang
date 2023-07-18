"use client";
import { useEffect, useState } from "react";

const Clock = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

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
  }, 1000);

  function zeroPadding(num: number, digit: number) {
    let zero = "";
    for (let i: number = 0; i < digit; i++) {
      zero += "0";
    }
    return (zero + num).slice(-digit);
  }

  return (
    <>
      <div className="font-chivo-mono flex flex-col justify-center items-center p-3 mt-4 -mb-8">
        <p className="text-5xl">{date}</p>
        <p className=" text-9xl">{time}</p>
      </div>
    </>
  );
};

export default Clock;
