"use client";
import { StopAreas } from "@models/Models";
import { StopArea } from "@models/Trip";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Props {
  refresh: (id: string) => void;
}

const Dropdown = (props: Props) => {
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState(StopAreas[0].name);
  const handleOpen = () => {
    setOpen(!isOpen);
  };
  const handleSelected = (stopArea: StopArea) => {
    setSelected(stopArea.name);
    setOpen(false);
    props.refresh(stopArea.id);
  };

  /* Handles click outside of dropdown */
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <div
      className="relative flex flex-col items-center rounded min-w-[350px] mt-2 z-10"
      ref={wrapperRef}
    >
      <button
        className="text-2xl p-2 w-full flex items-center justify-center rounded-lg tracking-wider border-4 border-transparent transition hover:border-white"
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
        <div className="absolute top-16 flex flex-col items-start rounded-lg p-2 w-full bg-gray-50">
          {StopAreas.map((stopArea, index) => (
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
