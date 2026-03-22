import React from "react";
import { Wind, Sun, Droplets } from "lucide-react";

const DEVICE_ICON_MAP = {
  Wind,
  Sun,
  Droplets
};

const IotDevices = ({ devices, onToggle }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {devices.map((device, index) => {
        const Icon = DEVICE_ICON_MAP[device.icon];
        return (
          <div
            key={device.name}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-all cursor-pointer"
            onClick={() => onToggle && onToggle(device.name, index)}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-4 rounded-2xl ${
                  device.active ? "bg-indigo-50 text-indigo-600" : "bg-slate-50 text-slate-400"
                } group-hover:scale-110 transition-transform`}
              >
                {Icon && <Icon size={24} />}
              </div>
              <div>
                <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{device.name}</p>
                <p className="text-xs font-medium text-slate-400">{device.active ? `Đang chạy: ${device.status}` : "Đang nghỉ"}</p>
              </div>
            </div>
            <div className={`w-12 h-6 rounded-full relative transition-all ${device.active ? "bg-indigo-600" : "bg-slate-200"}`}>
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${device.active ? "right-1" : "left-1"}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IotDevices;
