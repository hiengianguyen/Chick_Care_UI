import { Bell } from "lucide-react";
import { useState } from "react";
import chickLogo from "../public/img/chick.png";

const Header = ({ currentTime }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

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
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 relative group transition-all"
          >
            <Bell size={20} className="text-slate-600 group-hover:rotate-12 transition-transform" />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full" />
          </button>
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
              <div className="p-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800">Thông báo</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {/* Placeholder cho thông báo - bạn có thể map data ở đây */}
                <div className="p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer">
                  <p className="text-sm text-slate-700">Thông báo mẫu 1</p>
                  <p className="text-xs text-slate-500 mt-1">Mô tả thông báo...</p>
                </div>
                <div className="p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer">
                  <p className="text-sm text-slate-700">Thông báo mẫu 2</p>
                  <p className="text-xs text-slate-500 mt-1">Mô tả thông báo...</p>
                </div>
                <div className="p-4 hover:bg-slate-50 cursor-pointer">
                  <p className="text-sm text-slate-700">Thông báo mẫu 3</p>
                  <p className="text-xs text-slate-500 mt-1">Mô tả thông báo...</p>
                </div>
              </div>
              <div className="p-4 border-t border-slate-200 text-center">
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">Xem tất cả thông báo</button>
              </div>
            </div>
          )}
        </div>
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200 cursor-pointer overflow-hidden">
          <img src="https://ui-avatars.com/api/?name=Admin&background=4f46e5&color=fff" alt="User" />
        </div>
      </div>
    </header>
  );
};

export default Header;
