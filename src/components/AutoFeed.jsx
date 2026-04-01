import { Plus, UtensilsCrossed, X } from "lucide-react";
import { useState } from "react";

function AutoFeed() {
  const [feederConfig, setFeederConfig] = useState({
    active: true,
    amount: "Vừa",
    mode: "Hằng ngày",
    times: ["07:00"],
    selectedDays: []
  });

  const addFeedingTime = () => {
    if (feederConfig.times.length < 6) {
      setFeederConfig({
        ...feederConfig,
        times: [...feederConfig.times, "12:00"]
      });
    }
  };

  const removeFeedingTime = (index) => {
    if (feederConfig.times.length > 1) {
      const newTimes = feederConfig.times.filter((_, i) => i !== index);
      setFeederConfig({ ...feederConfig, times: newTimes });
    }
  };

  const updateFeedingTime = (index, value) => {
    const newTimes = [...feederConfig.times];
    newTimes[index] = value;
    setFeederConfig({ ...feederConfig, times: newTimes });
  };

  const toggleDay = (day) => {
    const currentDays = [...feederConfig.selectedDays];
    if (currentDays.includes(day)) {
      setFeederConfig({
        ...feederConfig,
        selectedDays: currentDays.filter((d) => d !== day)
      });
    } else {
      setFeederConfig({
        ...feederConfig,
        selectedDays: [...currentDays, day]
      });
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:border-emerald-200 transition-all">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div
              className={`p-4 rounded-[1.5rem] ${feederConfig.active ? "bg-emerald-500 text-white shadow-xl shadow-emerald-100" : "bg-slate-100 text-slate-400"}`}
            >
              <UtensilsCrossed size={28} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Hệ thống cho ăn tự động</h3>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                Chế độ:{" "}
                <span className={feederConfig.active ? "text-emerald-500 font-bold" : ""}>
                  {feederConfig.active ? "ĐANG BẬT" : "ĐANG NGHỈ"}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
            <button
              onClick={() => setFeederConfig({ ...feederConfig, active: !feederConfig.active })}
              className={`w-14 h-7 rounded-full relative transition-all shadow-inner ${feederConfig.active ? "bg-emerald-500" : "bg-slate-300"}`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all ${feederConfig.active ? "right-1" : "left-1"}`}
              ></div>
            </button>
            <span className="text-[10px] font-black text-slate-500 uppercase">{feederConfig.active ? "Hoạt động" : "Tắt"}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* 1. Lượng thức ăn & Lịch trình (5/12) */}
          <div className="xl:col-span-5 space-y-8">
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Lượng thức ăn mỗi bữa</p>
              <div className="flex gap-2">
                {["Ít", "Vừa", "Nhiều"].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setFeederConfig({ ...feederConfig, amount: lvl })}
                    className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${feederConfig.amount === lvl ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100" : "bg-white border-slate-200 text-slate-500 hover:border-emerald-200"}`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Chu kỳ lặp lại</p>
              <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                {["Hằng ngày", "Chọn ngày"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setFeederConfig({ ...feederConfig, mode: m })}
                    className={`flex-1 py-2 rounded-lg text-[10px] font-black transition-all ${feederConfig.mode === m ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400"}`}
                  >
                    {m.toUpperCase()}
                  </button>
                ))}
              </div>
              {feederConfig.mode === "Chọn ngày" && (
                <div className="flex flex-wrap gap-2 pt-2 animate-in fade-in slide-in-from-top-2">
                  {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
                    <button
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`w-9 h-9 rounded-lg border flex items-center justify-center text-[10px] font-bold transition-all ${feederConfig.selectedDays.includes(day) ? "bg-emerald-500 border-emerald-500 text-white shadow-md" : "bg-white border-slate-200 text-slate-400 hover:border-emerald-200"}`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 2. Danh sách giờ cho ăn (7/12) */}
          <div className="xl:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Danh sách giờ cho ăn ({feederConfig.times.length})
              </p>
              <button
                onClick={addFeedingTime}
                className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-[10px] font-black shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all active:scale-95"
              >
                <Plus size={14} /> THÊM BỮA
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
              {feederConfig.times.map((time, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-slate-50 border border-slate-100 p-3 rounded-2xl group hover:border-emerald-200 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-black">
                      {index + 1}
                    </div>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => updateFeedingTime(index, e.target.value)}
                      className="bg-transparent text-sm font-black text-slate-700 border-none p-0 focus:ring-0 cursor-pointer w-20 pe-2"
                    />
                  </div>
                  {feederConfig.times.length > 1 && (
                    <button onClick={() => removeFeedingTime(index)} className="p-1.5 text-slate-300 hover:text-rose-500 transition-colors">
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AutoFeed;
