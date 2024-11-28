import Navbar from "@/app/_components/navbar/Navbar";
import React from "react";

const ProtectedLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <Navbar />
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  );
};

export default ProtectedLayout;
