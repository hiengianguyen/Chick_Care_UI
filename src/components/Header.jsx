import React, { useContext } from "react";
import { Bell } from "lucide-react";
import chickLogo from "../public/img/chick.png";
import { GlobalContext } from "./GlobalContext";

const Header = ({ currentTime }) => {
  return (
    <header className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-100 overflow-hidden">
          <img src={chickLogo} alt="ChickenCare logo" className="w-10 h-10 object-contain" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">ChickenCare AI Dashboard</h1>
          <p className="text-slate-500 text-sm font-medium">Hệ thống giám sát gà con và điều khiển thông minh</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block mr-4">
          <p className="text-sm font-bold text-slate-700">
            {currentTime.toLocaleDateString("vi-VN", {
              weekday: "long",
              day: "numeric",
              month: "long"
            })}
          </p>
          <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">{currentTime.toLocaleTimeString("vi-VN")}</p>
        </div>
        <button className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 relative group transition-all">
          <Bell size={20} className="text-slate-600 group-hover:rotate-12 transition-transform" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full" />
        </button>
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200 cursor-pointer overflow-hidden">
          <img src="https://ui-avatars.com/api/?name=Admin&background=4f46e5&color=fff" alt="User" />
        </div>
      </div>
    </header>
  );
};

export default Header;
