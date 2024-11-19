import { Button } from "@/app/_components/ui/shadcn/button";
import Link from "next/link";
import React from "react";
import UserButton from "../auth/user-button";
import ThemeSwitcher from "../ui/global/ThemeSwitcher";
import Logo from "../ui/global/Logo";

const Navbar = () => {
  return (
    <nav className="flex justify-between border-b border-border h=[60px] px-4 py-2 items-center">
      <Logo />
      <div className="flex gap-4 items-center">
        <ThemeSwitcher />
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
