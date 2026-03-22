import React from "react";
import { LayoutDashboard } from "lucide-react";

const zones = [
  { label: "Khu A (Trung tâm)", count: 450, cap: 500, color: "bg-emerald-500" },
  { label: "Khu B (Cửa Tây)", count: 380, cap: 400, color: "bg-indigo-500" },
  { label: "Khu C (Cửa Đông)", count: 420, cap: 400, color: "bg-rose-500" }
];

const DensityWidget = () => {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
      <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
        <LayoutDashboard size={18} className="text-indigo-500" /> Mật độ phân bổ
      </h3>
      <div className="space-y-5">
        {zones.map((zone) => (
          <div key={zone.label} className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-sm font-bold text-slate-700">{zone.label}</span>
              <span className="text-xs font-bold text-slate-400">
                {zone.count}/{zone.cap} con
              </span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${zone.color} rounded-full transition-all duration-1000`}
                style={{ width: `${(zone.count / zone.cap) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DensityWidget;
