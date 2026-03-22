import React from "react";
import { Bell } from "lucide-react";

const alerts = [
  { title: "Bất thường #045", desc: "Đứng yên quá 15 phút", time: "2m", type: "alert" },
  {
    title: "Tách đàn #102",
    desc: "Di chuyển ra khu vực trống",
    time: "12m",
    type: "info"
  }
];

const AlertsWidget = () => {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
          <Bell size={18} className="text-rose-500" /> Cảnh báo AI
        </h3>
        <span className="px-2 py-1 bg-rose-100 text-rose-600 text-xs font-black rounded-lg">
          MỚI
        </span>
      </div>
      <div className="space-y-4">
        {alerts.map((item) => (
          <div
            key={item.title}
            className={`p-4 rounded-2xl flex items-center justify-between border cursor-pointer hover:border-slate-300 transition-all ${
              item.type === "alert"
                ? "bg-amber-50 border-amber-100"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-2 h-2 rounded-full ${
                  item.type === "alert" ? "bg-amber-500" : "bg-indigo-500"
                }`}
              />
              <div>
                <p className="text-sm font-black text-slate-800 uppercase tracking-tight">
                  {item.title}
                </p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-400">
              {item.time}
            </span>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 rounded-2xl text-xs font-black text-slate-400 uppercase tracking-[0.2em] hover:bg-slate-50 hover:border-slate-300 transition-all"
      >
        Lịch sử cảnh báo
      </button>
    </div>
  );
};

export default AlertsWidget;

