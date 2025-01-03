import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href={"/dashboard"}
      className="font-bold text-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text cursor-pointer"
    >
      فرم ساز
    </Link>
  );
};
export default Logo;
