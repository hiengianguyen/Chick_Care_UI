import React from "react";
import { ClipboardList } from "lucide-react";

const logs = [
  { user: "Admin", action: "Bật sưởi", time: "08:12" },
  { user: "AI", action: "Đã kiểm đếm", time: "08:00" }
];

const ActivityLog = () => {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
      <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
        <ClipboardList size={18} className="text-slate-400" /> Nhật ký vận hành
      </h3>
      <div className="space-y-4">
        {logs.map((log) => (
          <div
            key={`${log.action}-${log.time}`}
            className="flex items-center justify-between text-xs border-b border-slate-50 pb-3 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
              <span className="font-bold text-slate-700">{log.action}</span>
            </div>
            <span className="text-slate-400 font-mono italic">{log.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
