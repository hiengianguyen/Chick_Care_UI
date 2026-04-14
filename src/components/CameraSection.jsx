import { useEffect, useState, useContext } from "react";
import { Maximize2, Loader2 } from "lucide-react";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const REFRESH_INTERVAL_MS = 800; // Tần suất lấy dữ liệu & frame từ server

const CameraSection = () => {
  const { setData } = useContext(GlobalContext);
  const [streamActive, setStreamActive] = useState(false);
  const [annotatedImageUrl, setAnnotatedImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [lastResult, setLastResult] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Khi component mount, yêu cầu backend bật stream 1 lần
    const startStream = async () => {
      try {
        await axios.post(`${API_BASE}/api/start-stream`);
        setStreamActive(true);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || err.message || "Không thể bật stream từ server");
        setStreamActive(false);
      }
    };

    startStream();
  }, []);

  useEffect(() => {
    if (!streamActive) return;

    let cancelled = false;

    const refresh = async () => {
      try {
        // Cập nhật URL ảnh để tránh cache
        setAnnotatedImageUrl(`${API_BASE}/api/stream-frame?t=${Date.now()}`);

        const { data } = await axios.get(`${API_BASE}/api/latest-data`);

        if (!cancelled) {
          setData((prev) => {
            if (data?.alerts?.length) {
              return data;
            } else return { ...data, alerts: prev?.alerts || [] };
          });
          setLastResult((prev) => {
            if (data?.alerts?.length) {
              return data;
            } else return { ...data, alerts: prev?.alerts || [] };
          });
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.error || err.message || "Lỗi lấy dữ liệu từ API");
        }
      }
    };

    // Gọi ngay lần đầu
    refresh();
    const interval = setInterval(refresh, REFRESH_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [streamActive]);

  const CameraPlaceholder = () => {
    return (
      <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center overflow-hidden">
        {/* Nội dung chính ở giữa - Đơn giản với Spinner */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-md border border-slate-200">
            <Loader2 size={32} className="text-indigo-600 animate-spin" />
          </div>

          <div className="text-center">
            <h3 className="text-sm font-black text-slate-700 uppercase tracking-tight">Vui lòng đợi</h3>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-1">Kết nối camera hiện trường</p>
          </div>
        </div>

        {/* Thông tin kỹ thuật góc dưới */}
        <div className="absolute bottom-6 right-6">
          <span className="text-[9px] font-mono text-slate-300 uppercase tracking-tighter">Status: Connecting_to_node_01</span>
        </div>
      </div>
    );
  };

  const content = (
    <>
      <div
        className={
          "absolute top-0 inset-x-0 p-8 bg-gradient-to-b to-transparent z-10 flex items-center justify-between pointer-events-none" +
          " " +
          (!error && "from-black/80 via-black/20")
        }
      >
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
            <div className={`w-2 h-2 rounded-full ${streamActive ? "bg-emerald-500 animate-pulse" : "bg-slate-500"}`} />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
              {!error ? "Live Stream: Zone A1" : "Đang tải luồng video..."}
            </span>
          </div>
          {lastResult && streamActive && <span className="text-[10px] text-white/80">Phát hiện: {lastResult.predictions_count} gà</span>}
        </div>
        <div className="flex gap-3 pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsFullscreen((prev) => !prev)}
            className={`backdrop-blur-md text-white p-2.5 rounded-xl transition-all border ${
              isFullscreen
                ? "bg-emerald-500/20 border-emerald-400 hover:bg-emerald-500/30"
                : "bg-white/10 border-white/10 hover:bg-white/20"
            }`}
          >
            <Maximize2 size={18} />
          </button>
        </div>
      </div>

      <div className="w-full h-full flex items-center justify-center relative min-h-[320px]">
        {error && <CameraPlaceholder />}
        {!error && <img src={annotatedImageUrl} alt="Camera stream" className="absolute inset-0 w-full h-full object-cover" />}
      </div>
    </>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="rounded-[2rem] overflow-hidden border relative group w-[94vw] h-[88vh] max-w-7xl mx-4 shadow-2xl">{content}</div>
      </div>
    );
  }

  return (
    <div className="rounded-[1.5rem] overflow-hidden shadow-xl borde relative group aspect-video lg:aspect-auto lg:h-[500px]">
      {content}
    </div>
  );
};

export default CameraSection;
