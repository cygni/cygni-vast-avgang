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
  useOutsideClickHandler(wrapperRef);
  function useOutsideClickHandler(ref: any) {
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
    <div className="relative  min-w-[350px] mt-2 z-10" ref={wrapperRef}>
      <button
        className="text-2xl p-3 w-full flex justify-center items-center rounded-lg tracking-wider transition hover:bg-slate-100"
        onClick={handleOpen}
      >
        <h3 className="font-bold">{selected}</h3>
        <Image
          src="/assets/arrow.svg"
          alt="logo"
          width={25}
          height={25}
          style={{
            transform: isOpen ? "rotate(0deg)" : "rotate(-180deg)",
          }}
          className="object-contain ml-4 transition duration-300"
        />
      </button>

      {isOpen && (
        <div className="absolute top-16 flex flex-col items-start rounded-lg p-2 w-full bg-white shadow">
          {StopAreas.map((stopArea, index) => (
            <div
              key={index}
              onClick={() => handleSelected(stopArea)}
              className="flex w-full p-4 hover:bg-blue-200 cursor-pointer rounded-lg border-b last:border-b-0"
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
