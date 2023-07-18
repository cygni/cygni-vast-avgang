"use client";
import Image from "next/image";

const Header = () => {
  return (
    <>
      <div className="flex mb-4">
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
          <h1 className="text-3xl mt-4 font-semibold">Cygni</h1>
          <h1 className="text-3xl mt-4 font-semibold">|</h1>
          <h1 className="text-3xl mt-4 font-semibold">Avgång</h1>
        </a>
      </div>
    </>
  );
};

export default Header;
