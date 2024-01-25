import React from "react";
import Header from "../components/Header.tsx";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <Header />
      <div className="w-screen min-h-screen flex flex-col items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
