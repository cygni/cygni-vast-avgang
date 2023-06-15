"use client";
import Image from "next/image";
import Dropdown from "./Dropdown";

interface Props {
  refresh: (id?: string) => void;
}

const Header = (props: Props) => {
  return (
    <>
      <div className="flex justify-between mb-2">
        <div className="flex items-center justify-start gap-4 mb-2">
          <Image
            src="/assets/logo.svg"
            alt="logo"
            width={65}
            height={65}
            className="object-contain"
          />
          <h1 className="mt-4 text-2xl cursor-default">Cygni |</h1>
        </div>
        <div className="flex items-center justify-center">
          <Dropdown refresh={async (id) => props.refresh(id)} />
        </div>
        <div className="flex items-center justify-end">
          <button
            onClick={async () => {
              props.refresh();
            }}
          >
            <Image
              src="/assets/refresh.svg"
              alt="refresh"
              width={50}
              height={50}
              className="object-contain cursor-pointer transition rounded-full hover:backdrop-brightness-90"
            />
          </button>
          {/*           <button >
            <Image
              src="/assets/filter.svg"
              alt="filter"
              width={50}
              height={50}
              className="object-contain cursor-pointer transition rounded-full hover:backdrop-brightness-90"
            />
          </button> */}
        </div>
      </div>
    </>
  );
};

export default Header;
