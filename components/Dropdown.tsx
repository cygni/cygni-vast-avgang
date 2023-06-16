"use client";
import { Menu, Transition } from "@headlessui/react";
import { StopAreas } from "@models/Models";
import { StopArea } from "@models/Trip";
import Image from "next/image";
import { Fragment, useState } from "react";

interface Props {
  refresh: (id: string) => void;
}

const Dropdown = (props: Props) => {
  const [selected, setSelected] = useState(StopAreas[0].name);
  const handleSelected = (stopArea: StopArea) => {
    if (stopArea.name === selected) {
      return;
    }
    setSelected(stopArea.name);
    props.refresh(stopArea.id);
  };
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Menu
      as="div"
      className="relative inline-block min-w-[350px] font-semibold"
    >
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="text-lg w-full inline-flex justify-between items-center transition duration-200 p-4 rounded-lg bg-white shadow ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              {selected}
              <Image
                src="/assets/arrow.svg"
                alt="logo"
                width={25}
                height={25}
                style={{
                  transform: open ? "rotate(0deg)" : "rotate(-180deg)",
                }}
                className="object-contain ml-4 transition duration-200"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 min-w-[350px] rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {StopAreas.map((sa) => (
                <Menu.Item key={sa.id}>
                  {({ active }) => (
                    <div
                      onClick={() => handleSelected(sa)}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "p-4 border-b last:border-b-0"
                      )}
                    >
                      {sa.name}
                    </div>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default Dropdown;
