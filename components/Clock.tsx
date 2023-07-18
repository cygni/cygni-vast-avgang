"use client";

const Clock = () => {
  let time: String = "";
  let date: String = "";
  const timer = setInterval(updateTime, 1000);

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

  updateTime();
  function updateTime() {
    const currentDate: Date = new Date();
    time =
      zeroPadding(currentDate.getHours(), 2) +
      ":" +
      zeroPadding(currentDate.getMinutes(), 2) +
      ":" +
      zeroPadding(currentDate.getSeconds(), 2);
    date =
      week[currentDate.getDay()] +
      " " +
      zeroPadding(currentDate.getDate(), 2) +
      " " +
      month[currentDate.getMonth()] +
      " " +
      zeroPadding(currentDate.getFullYear(), 4);
  }

  function zeroPadding(num: number, digit: number) {
    let zero = "";
    for (let i: number = 0; i < digit; i++) {
      zero += "0";
    }
    return (zero + num).slice(-digit);
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center absolute right-5 top-5 p-3 mb-3 bg-gray-50 rounded-lg shadow-md transition border">
        <p className="text-md">{date}</p>
        <p className="text-2xl">{time}</p>
      </div>
    </>
  );
};

export default Clock;
