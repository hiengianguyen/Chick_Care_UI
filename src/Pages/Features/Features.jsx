import React, { useState, useEffect } from "react";
import {
  Activity,
  Bell,
  Droplets,
  Wind,
  Sun,
  Clock,
  Plus,
  Timer,
  UtensilsCrossed,
  X,
  Percent,
  Smartphone,
  Power,
  MoveLeft,
  ChevronRight,
  Cog
} from "lucide-react";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Features = () => {
  const navigator = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // --- STATE QUẢN LÝ THIẾT BỊ ---

  // 1. Quạt (Fan)
  const [fanConfig, setFanConfig] = useState({
    active: true,
    thresholdTemp: 30,
    power: 80,
    mode: "Tự động", // 'Tự động' hoặc 'Hẹn giờ'
    times: ["08:00"],
    selectedDays: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    isEditTime: false
  });

  // 2. Đèn Sưởi (Heater)
  const [lightConfig, setLightConfig] = useState({
    active: true,
    times: ["18:00"],
    power: 80,
    selectedDays: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    isEditTime: false
  });

  // 3. Cho ăn (Feeder)
  const [feederConfig, setFeederConfig] = useState({
    active: true,
    amount: "Vừa",
    times: ["07:00", "16:30"],
    selectedDays: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    isEditTime: false
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- HÀM XỬ LÝ CHUNG ---

  const resetStateIsEditTime = () => {
    setFanConfig((prev) => {
      return { ...prev, isEditTime: false };
    });
    setLightConfig((prev) => {
      return { ...prev, isEditTime: false };
    });
    setFeederConfig((prev) => {
      return { ...prev, isEditTime: false };
    });
  };

  const handleData = () => {
    const dataList = {
      fan: fanConfig,
      light: lightConfig,
      feed: feederConfig
    };

    const sendData = async () => {
      await axios.post(`${API_BASE}/api/get_data_device`, dataList).finally(() => resetStateIsEditTime());
    };
    sendData();
  };

  const toggleDay = (config, setConfig, day) => {
    const currentDays = [...config.selectedDays];
    const newDays = currentDays.includes(day) ? currentDays.filter((d) => d !== day) : [...currentDays, day];
    setConfig({ ...config, selectedDays: newDays, isEditTime: true });
  };

  const addTime = (config, setConfig) => {
    if (config.times.length < 5) {
      setConfig({ ...config, times: [...config.times, "12:00"], isEditTime: true });
    }
  };

  const removeTime = (config, setConfig, index) => {
    if (config.times.length > 1) {
      const newTimes = config.times.filter((_, i) => i !== index);
      setConfig({ ...config, times: newTimes, isEditTime: true });
    }
  };

  const updateTime = (config, setConfig, index, value) => {
    const newTimes = [...config.times];
    newTimes[index] = value;
    setConfig({ ...config, times: newTimes, isEditTime: true });
  };

  // --- GIAO DIỆN COMPONENT CON ---
  const DayPicker = ({ config, setConfig, color }) => (
    <div className="flex flex-wrap gap-1.5">
      {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
        <button
          key={day}
          onClick={() => toggleDay(config, setConfig, day)}
          className={`w-8 h-8 rounded-lg border text-[10px] font-bold transition-all ${config.selectedDays.includes(day) ? `bg-${color} border-${color} text-white shadow-sm` : "bg-white border-slate-200 text-slate-400 hover:border-indigo-200"}`}
        >
          {day}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f1f5f9] p-4 md:p-8 font-sans text-slate-900">
      <header className="max-w-[1400px] mx-auto mb-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-200">
            <Smartphone className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-800">SmartFarm Pro Control</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{currentTime.toLocaleTimeString()}</p>
          </div>
        </div>

        <div
          className="px-2 py-1 bg-emerald-50 rounded-lg border border-emerald-100 w-max"
          title="Các thiết bị sẽ tự động chạy khi thoả mãn điều kiện mà không cần bật tắt thủ công"
        >
          <span className="text-[12px] font-black text-emerald-600 uppercase">Đang kích hoạt tự động</span>
        </div>
      </header>
      <div>
        <div className="d-flex justify-end ms-40">
          <MoveLeft size={30} className="cursor-pointer" onClick={() => navigator(-1)} />
        </div>
        <main className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* --- KHỐI QUẠT (FAN) --- */}
          <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl bg-blue-500 text-white`}>
                  <Wind size={24} />
                </div>
                <div>
                  <h2 className="font-black text-slate-800 uppercase text-sm">Hệ thống Quạt Gió</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Theo dõi cảm biến</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Bật thủ công</span>
                <button
                  onClick={() => setFanConfig({ ...fanConfig, active: !fanConfig.active })}
                  className={`w-14 h-8 rounded-full relative transition-all duration-300 shadow-inner ${fanConfig.active ? "bg-blue-500" : "bg-slate-200"}`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 flex items-center justify-center ${fanConfig.active ? "right-1" : "left-1"}`}
                  >
                    <Power size={12} className={fanConfig.active ? "text-blue-500" : "text-slate-300"} />
                  </div>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Thiết lập vận hành</label>
                <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-500">NHIỆT ĐỘ KÍCH HOẠT</span>
                    <span className="text-xs font-black text-blue-600">{fanConfig.thresholdTemp}°C</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="40"
                    value={fanConfig.thresholdTemp}
                    onChange={(e) => setFanConfig({ ...fanConfig, thresholdTemp: e.target.value, isEditTime: false })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg Featuresearance-none cursor-pointer accent-blue-500"
                  />

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[10px] font-bold text-slate-500">CÔNG SUẤT</span>
                    <div className="text-blue-600 flex items-center w-max text-xs font-black">
                      <p>{fanConfig.power}</p>
                      <Percent size={14} />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="10"
                    value={fanConfig.power}
                    onChange={(e) => setFanConfig({ ...fanConfig, power: Number(e.target.value), isEditTime: false })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg Featuresearance-none cursor-pointer accent-blue-500"
                  />
                </div>
                <DayPicker config={fanConfig} setConfig={setFanConfig} color={"blue-500"} />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Giờ hoạt động</label>
                  <button onClick={() => addTime(fanConfig, setFanConfig)} className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                    <Plus size={14} />
                  </button>
                </div>
                <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                  {fanConfig.times.map((time, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <Clock size={14} className="text-blue-400" />
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => updateTime(fanConfig, setFanConfig, idx, e.target.value)}
                        className="bg-transparent text-xs font-black w-full outline-none"
                      />
                      <button onClick={() => removeTime(fanConfig, setFanConfig, idx)} className="text-slate-300 hover:text-rose-500">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* --- KHỐI ĐÈN SƯỞI (HEATER) --- */}
          <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-100`}>
                  <Sun size={24} />
                </div>
                <div>
                  <h2 className="font-black text-slate-800 uppercase text-sm">Đèn Sưởi Ấm</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Hẹn giờ linh hoạt</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Bật thủ công</span>
                <button
                  onClick={() => setLightConfig({ ...lightConfig, active: !lightConfig.active, isEditTime: false })}
                  className={`w-14 h-8 rounded-full relative transition-all duration-300 shadow-inner ${lightConfig.active ? "bg-orange-500" : "bg-slate-200"}`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 flex items-center justify-center ${lightConfig.active ? "right-1" : "left-1"}`}
                  >
                    <Power size={12} className={lightConfig.active ? "text-orange-500" : "text-slate-300"} />
                  </div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Thiết lập vận hành</label>
                <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-500">CÔNG SUẤT</span>
                    <div className="text-orange-500 flex items-center w-max text-xs font-black">
                      <p>{lightConfig.power}</p>
                      <Percent size={14} />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="10"
                    value={lightConfig.power}
                    onChange={(e) => setLightConfig({ ...lightConfig, power: Number(e.target.value), isEditTime: false })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg Featuresearance-none cursor-pointer accent-orange-500"
                  />
                </div>
                <DayPicker config={lightConfig} setConfig={setLightConfig} color={"orange-500"} />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Danh sách giờ bật</label>
                  <button onClick={() => addTime(lightConfig, setLightConfig)} className="p-1.5 bg-orange-100 text-orange-600 rounded-lg">
                    <Plus size={14} />
                  </button>
                </div>
                <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                  {lightConfig.times.map((time, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <Timer size={14} className="text-orange-400" />
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => updateTime(lightConfig, setLightConfig, idx, e.target.value)}
                        className="bg-transparent text-xs font-black w-full outline-none"
                      />
                      <button onClick={() => removeTime(lightConfig, setLightConfig, idx)} className="text-slate-300 hover:text-rose-500">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* --- KHỐI CHO ĂN (FEEDER) - GIỮ LẠI ĐỂ ĐỒNG BỘ --- */}
          <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl bg-emerald-500 text-white`}>
                  <UtensilsCrossed size={24} />
                </div>
                <div>
                  <h2 className="font-black text-slate-800 uppercase text-sm">Cho Ăn Tự Động</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Khối lượng: {feederConfig.amount}</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Bật thủ công</span>
                <button
                  onClick={() => setFeederConfig({ ...feederConfig, active: !feederConfig.active, isEditTime: false })}
                  className={`w-14 h-8 rounded-full relative transition-all duration-300 shadow-inner ${feederConfig.active ? "bg-emerald-500" : "bg-slate-200"}`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 flex items-center justify-center ${feederConfig.active ? "right-1" : "left-1"}`}
                  >
                    <Power size={12} className={feederConfig.active ? "text-emerald-500" : "text-slate-300"} />
                  </div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Chu kỳ ngày</label>
                <DayPicker config={feederConfig} setConfig={setFeederConfig} color={"emerald-500"} />
                <div className="flex gap-2 pt-2">
                  {["Ít", "Vừa", "Nhiều"].map((lv) => (
                    <button
                      key={lv}
                      onClick={() => setFeederConfig({ ...feederConfig, amount: lv, isEditTime: false })}
                      className={`flex-1 py-2 rounded-lg text-[10px] font-black border transition-all ${feederConfig.amount === lv ? "bg-emerald-500 border-emerald-500 text-white shadow-md" : "bg-white text-slate-400 border-slate-100"}`}
                    >
                      {lv}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bữa ăn trong ngày</label>
                  <button
                    onClick={() => addTime(feederConfig, setFeederConfig)}
                    className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                  {feederConfig.times.map((time, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <span className="w-5 h-5 bg-emerald-100 text-emerald-600 text-[9px] font-black flex items-center justify-center rounded-md">
                        {idx + 1}
                      </span>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => updateTime(feederConfig, setFeederConfig, idx, e.target.value)}
                        className="bg-transparent text-xs font-black w-full outline-none"
                      />
                      <button onClick={() => removeTime(feederConfig, setFeederConfig, idx)} className="text-slate-300 hover:text-rose-500">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        <div className="pt-6 border-t border-slate-100 flex justify-center">
          <button
            onClick={() => handleData()}
            className="group relative flex items-center gap-3 px-12 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-200 transition-all duration-300 active:scale-95"
          >
            <div className="p-2 bg-white/10 rounded-xl group-hover:rotate-90 transition-transform duration-500">
              <Cog size={20} />
            </div>
            Bắt đầu cấu hình & Thiết lập
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
      `
        }}
      />
    </div>
  );
};

export default Features;
