import { Droplets, MousePointer2, Sun, UtensilsCrossed, Wind, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CardRedirectFeatures() {
  navigator("/features");
  const devices = [
    { id: "fan", type: "fan", name: "Hệ thống Quạt", status: "Đang chạy: 60%", icon: Wind, color: "bg-blue-500" },
    { id: "heater", type: "heater", name: "Đèn Sưởi Ấm", status: "Đang chạy: Auto", icon: Sun, color: "bg-orange-500" },
    { id: "mister", type: "mister", name: "Máy Phun Sương", status: "Đang nghỉ", icon: Droplets, color: "bg-cyan-500" },
    { id: "feeder", type: "feeder", name: "Cho Ăn Tự Động", status: "Đang bật", icon: UtensilsCrossed, color: "bg-emerald-500" }
  ];
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">Hệ thống điều khiển</h2>

      <button
        onClick={() => navigator("/features")}
        className="w-full group relative bg-white p-10 rounded-[3.5rem] border-2 border-transparent hover:border-indigo-500 shadow-xl hover:shadow-2xl transition-all duration-500 text-left flex flex-col md:flex-row items-center gap-10 overflow-hidden"
      >
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-700 opacity-50"></div>

        {/* Left side: Icons Grid */}
        <div className="relative z-10 grid grid-cols-2 gap-4 shrink-0">
          {devices.map((device) => (
            <div
              key={device.id}
              className={`w-14 h-14 rounded-2xl ${device.color} text-white flex items-center justify-center shadow-lg shadow-current/10 group-hover:scale-110 transition-transform`}
            >
              <device.icon size={24} />
            </div>
          ))}
        </div>

        {/* Middle: Content */}
        <div className="relative z-10 flex-1 space-y-3">
          <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Trung tâm điều khiển IOT</h3>
          <p className="text-slate-500 font-medium leading-relaxed max-w-lg">
            Quản lý tập trung Hệ thống Quạt, Đèn sưởi, Phun sương và Cho ăn. Tùy chỉnh lịch trình, công suất và ngưỡng cảm biến tự động chỉ
            với một lần nhấn.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              <span className="text-[10px] font-black text-emerald-700 uppercase">3 Thiết bị đang chạy</span>
            </div>
            <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
              <Activity size={10} className="text-amber-600" />
              <span className="text-[10px] font-black text-amber-700 uppercase">Tự động: ON</span>
            </div>
          </div>
        </div>

        {/* Right: CTA */}
        <div className="relative z-10 flex flex-col items-center gap-3 bg-indigo-50 p-6 rounded-[2.5rem] group-hover:bg-indigo-600 transition-colors duration-500 min-w-[160px]">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm group-hover:rotate-45 transition-transform">
            <MousePointer2 size={24} />
          </div>
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest group-hover:text-white">Truy cập ngay</span>
        </div>
      </button>
    </div>
  );
}

export default CardRedirectFeatures;
