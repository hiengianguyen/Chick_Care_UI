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
  MoveLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    selectedDays: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]
  });

  // 2. Đèn Sưởi (Heater)
  const [lightConfig, setLightConfig] = useState({
    active: false,
    times: ["18:00"],
    selectedDays: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]
  });

  // 3. Phun Sương (Mister)
  const [mistConfig, setMistConfig] = useState({
    active: false,
    thresholdTemp: 32,
    thresholdHumid: 50,
    mode: "Cảm biến",
    selectedDays: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]
  });

  // 4. Cho ăn (Feeder)
  const [feederConfig, setFeederConfig] = useState({
    active: true,
    amount: "Vừa",
    times: ["07:00", "16:30"],
    selectedDays: ["T2", "T4", "T6"]
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- HÀM XỬ LÝ CHUNG ---
  const toggleDay = (config, setConfig, day) => {
    const currentDays = [...config.selectedDays];
    const newDays = currentDays.includes(day) ? currentDays.filter((d) => d !== day) : [...currentDays, day];
    setConfig({ ...config, selectedDays: newDays });
  };

  const addTime = (config, setConfig) => {
    if (config.times.length < 5) {
      setConfig({ ...config, times: [...config.times, "12:00"] });
    }
  };

  const removeTime = (config, setConfig, index) => {
    if (config.times.length > 1) {
      const newTimes = config.times.filter((_, i) => i !== index);
      setConfig({ ...config, times: newTimes });
    }
  };

  const updateTime = (config, setConfig, index, value) => {
    const newTimes = [...config.times];
    newTimes[index] = value;
    setConfig({ ...config, times: newTimes });
  };

  // --- GIAO DIỆN COMPONENT CON ---
  const DayPicker = ({ config, setConfig }) => (
    <div className="flex flex-wrap gap-1.5 pt-2">
      {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
        <button
          key={day}
          onClick={() => toggleDay(config, setConfig, day)}
          className={`w-8 h-8 rounded-lg border text-[10px] font-bold transition-all ${config.selectedDays.includes(day) ? "bg-indigo-600 border-indigo-600 text-white shadow-sm" : "bg-white border-slate-200 text-slate-400 hover:border-indigo-200"}`}
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

        <div className="flex gap-2">
          <button className="p-2 bg-white rounded-xl shadow-sm border border-slate-200 text-slate-500">
            <Bell size={20} />
          </button>
          <button className="p-2 bg-white rounded-xl shadow-sm border border-slate-200 text-slate-500">
            <Power size={20} />
          </button>
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
                <div
                  className={`p-4 rounded-2xl ${fanConfig.active ? "bg-blue-500 text-white animate-spin-slow" : "bg-slate-100 text-slate-400"}`}
                >
                  <Wind size={24} />
                </div>
                <div>
                  <h2 className="font-black text-slate-800 uppercase text-sm">Hệ thống Quạt Gió</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Theo dõi cảm biến</p>
                </div>
              </div>
              <button
                onClick={() => setFanConfig({ ...fanConfig, active: !fanConfig.active })}
                className={`w-12 h-6 rounded-full relative transition-all ${fanConfig.active ? "bg-blue-500" : "bg-slate-200"}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${fanConfig.active ? "right-1" : "left-1"}`}
                ></div>
              </button>
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
                    onChange={(e) => setFanConfig({ ...fanConfig, thresholdTemp: e.target.value })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg Featuresearance-none cursor-pointer accent-blue-500"
                  />

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[10px] font-bold text-slate-500">CÔNG SUẤT ({fanConfig.power}%)</span>
                    <Percent size={14} className="text-blue-500" />
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="10"
                    value={fanConfig.power}
                    onChange={(e) => setFanConfig({ ...fanConfig, power: e.target.value })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg Featuresearance-none cursor-pointer accent-blue-500"
                  />
                </div>
                <DayPicker config={fanConfig} setConfig={setFanConfig} />
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
                <div
                  className={`p-4 rounded-2xl ${lightConfig.active ? "bg-orange-500 text-white shadow-lg shadow-orange-100" : "bg-slate-100 text-slate-400"}`}
                >
                  <Sun size={24} />
                </div>
                <div>
                  <h2 className="font-black text-slate-800 uppercase text-sm">Đèn Sưởi Ấm</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Hẹn giờ linh hoạt</p>
                </div>
              </div>
              <button
                onClick={() => setLightConfig({ ...lightConfig, active: !lightConfig.active })}
                className={`w-12 h-6 rounded-full relative transition-all ${lightConfig.active ? "bg-orange-500" : "bg-slate-200"}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${lightConfig.active ? "right-1" : "left-1"}`}
                ></div>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ngày hoạt động</label>
                <DayPicker config={lightConfig} setConfig={setLightConfig} />
                <div className="mt-4 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                  <p className="text-[10px] text-orange-600 font-bold leading-relaxed italic">
                    * Hệ thống sẽ tự động bật đèn sưởi theo danh sách giờ đã thiết lập để đảm bảo thân nhiệt đàn gà.
                  </p>
                </div>
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

          {/* --- KHỐI PHUN SƯƠNG (MISTER) --- */}
          <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl ${mistConfig.active ? "bg-cyan-500 text-white" : "bg-slate-100 text-slate-400"}`}>
                  <Droplets size={24} className={mistConfig.active ? "animate-bounce" : ""} />
                </div>
                <div>
                  <h2 className="font-black text-slate-800 uppercase text-sm">Hệ thống Phun Sương</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Theo dõi cảm biến</p>
                </div>
              </div>
              <button
                onClick={() => setMistConfig({ ...mistConfig, active: !mistConfig.active })}
                className={`w-12 h-6 rounded-full relative transition-all ${mistConfig.active ? "bg-cyan-500" : "bg-slate-200"}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${mistConfig.active ? "right-1" : "left-1"}`}
                ></div>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ngưỡng cảm biến</label>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-slate-500 uppercase">NHIỆT ĐỘ CAO HƠN {">"}</span>
                      <span className="text-cyan-600">{mistConfig.thresholdTemp}°C</span>
                    </div>
                    <input
                      type="range"
                      min="25"
                      max="45"
                      value={mistConfig.thresholdTemp}
                      onChange={(e) => setMistConfig({ ...mistConfig, thresholdTemp: e.target.value })}
                      className="w-full h-1.5 bg-slate-200 rounded-lg Featuresearance-none cursor-pointer accent-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-slate-500 uppercase">ĐỘ ẨM THẤP HƠN {"<"}</span>
                      <span className="text-cyan-600">{mistConfig.thresholdHumid}%</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="80"
                      value={mistConfig.thresholdHumid}
                      onChange={(e) => setMistConfig({ ...mistConfig, thresholdHumid: e.target.value })}
                      className="w-full h-1.5 bg-slate-200 rounded-lg Featuresearance-none cursor-pointer accent-cyan-500"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lịch hoạt động</label>
                <DayPicker config={mistConfig} setConfig={setMistConfig} />
                <div className="flex items-center gap-3 p-3 bg-cyan-50 rounded-xl border border-cyan-100 mt-2">
                  <Activity size={18} className="text-cyan-600" />
                  <p className="text-[10px] font-bold text-cyan-700">
                    Hệ thống sẽ phun khi CẢ 2 ĐIỀU KIỆN trên thỏa mãn vào các ngày đã chọn.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- KHỐI CHO ĂN (FEEDER) - GIỮ LẠI ĐỂ ĐỒNG BỘ --- */}
          <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl ${feederConfig.active ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"}`}>
                  <UtensilsCrossed size={24} />
                </div>
                <div>
                  <h2 className="font-black text-slate-800 uppercase text-sm">Cho Ăn Tự Động</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Khối lượng: {feederConfig.amount}</p>
                </div>
              </div>
              <button
                onClick={() => setFeederConfig({ ...feederConfig, active: !feederConfig.active })}
                className={`w-12 h-6 rounded-full relative transition-all ${feederConfig.active ? "bg-emerald-500" : "bg-slate-200"}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${feederConfig.active ? "right-1" : "left-1"}`}
                ></div>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Chu kỳ ngày</label>
                <DayPicker config={feederConfig} setConfig={setFeederConfig} />
                <div className="flex gap-2 pt-2">
                  {["Ít", "Vừa", "Nhiều"].map((lv) => (
                    <button
                      key={lv}
                      onClick={() => setFeederConfig({ ...feederConfig, amount: lv })}
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
