import React from "react";
import SideSection from "./SideSection";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row min-h-screen min-w-screen  bg-black overflow-hidden">
      <SideSection />
      {children}
    </div>
  );
};

export default Layout;
