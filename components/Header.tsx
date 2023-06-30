"use client";
import Image from "next/image";

interface Props {
  refresh: (id?: string) => void;
}

const Header = (props: Props) => {
  return (
    <>
      <div className="flex justify-between mb-4">
        <a
          href="https://cygni.se/region-vast/"
          target="_blank"
          className="flex items-center justify-start gap-4"
        >
          <Image
            src="/assets/logo.svg"
            alt="logo"
            width={65}
            height={65}
            className="object-contain"
          />
          <h1 className="text-2xl mt-4 font-semibold">Cygni</h1>
          <h1 className="text-2xl mt-4 font-semibold">|</h1>
          <h1 className="text-2xl mt-4 font-semibold">Avgång</h1>
        </a>
        {/*         <div className="flex items-center justify-center">
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
              width={65}
              height={65}
              className="object-contain cursor-pointer transition duration-300 rounded-full hover:bg-slate-100"
            />
          </button>
          <button>
            <Image
              src="/assets/filter.svg"
              alt="filter"
              width={50}
              height={50}
              className="object-contain cursor-pointer transition rounded-full hover:backdrop-brightness-90"
            />
          </button>
        </div> */}
      </div>
    </>
  );
};

export default Header;
