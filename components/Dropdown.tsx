"use client";
import Image from "next/image";
import { useState } from "react";

interface Props {
  refresh: (id: string) => void;
}
type StopArea = {
  id: string;
  name: string;
};
const stopAreas: StopArea[] = [
  { name: "Kungsportsplatsen", id: "9021014004090000" },
  { name: "Brunsparken", id: "9021014001760000" },
  { name: "Centralstationen", id: "9021014008000000" },
];

const Dropdown = (props: Props) => {
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState(stopAreas[0].name);
  const handleOpen = () => {
    setOpen(!isOpen);
  };
  const handleSelected = (stopArea: StopArea) => {
    setSelected(stopArea.name);
    setOpen(false);
    props.refresh(stopArea.id);
  };

  return (
    <div className="relative flex flex-col items-center rounded min-w-[400px]">
      <button
        className="text-2xl p-3 w-full flex items-center justify-center rounded-lg tracking-wider border-4 border-transparent transition hover:border-white"
        onClick={handleOpen}
      >
        <h3 className="font-bold">{selected}</h3>
        <Image
          src={isOpen ? "/assets/arrow-up.svg" : "/assets/arrow-down.svg"}
          alt="logo"
          width={25}
          height={25}
          className="object-contain ml-4"
        />
      </button>

      {isOpen && (
        <div className="absolute top-20 flex flex-col items-start rounded-lg p-2 w-full bg-gray-50">
          {stopAreas.map((stopArea, index) => (
            <div
              key={index}
              onClick={() => handleSelected(stopArea)}
              className="flex w-full p-4 hover:bg-blue-300 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4"
            >
              <h3 className="font-bold">{stopArea.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
