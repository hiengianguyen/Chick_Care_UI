import React, { useEffect, useState } from "react";
import { Thermometer, Droplets, Wifi } from "lucide-react";
import axios from "axios";

const EnvironmentWidget = () => {
  const [data, setData] = useState("");

  // useEffect(() => {
  //   const fetchData = () => {
  //     axios
  //       .get("http://localhost:5000/api/temp-sensor")
  //       .then((res) => {
  //         console.log(res.data);
  //         setData(res.data);
  //       })
  //       .catch((err) => console.error(err));
  //   };

  //   fetchData();
  //   const interval = setInterval(fetchData, 2000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="bg-indigo-600 rounded-[1.5rem] p-8 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group">
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-100">Chỉ số chuồng nuôi</h3>
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10">
            <Wifi size={12} className="text-emerald-400" />
            <span className="text-[10px] font-bold">LIVE</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-all">
            <Thermometer size={20} className="mb-3 text-orange-300" />
            <p className="text-[10px] text-indigo-100 uppercase font-bold mb-1">Nhiệt độ</p>
            <p className="text-2xl font-black">{data.temp ? data.temp : 0}°C</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-all">
            <Droplets size={20} className="mb-3 text-blue-300" />
            <p className="text-[10px] text-indigo-100 uppercase font-bold mb-1">Độ ẩm</p>
            <p className="text-2xl font-black">{data.hum ? data.hum : 0}%</p>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-[60px] group-hover:bg-white/20 transition-all" />
    </div>
  );
};

export default EnvironmentWidget;
