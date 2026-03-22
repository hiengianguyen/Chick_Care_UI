import { useEffect, useState, useContext } from "react";
import { Camera, Layers, Maximize2, Loader2 } from "lucide-react";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
const REFRESH_INTERVAL_MS = 800; // Tần suất lấy dữ liệu & frame từ server

const CameraSection = () => {
  const { setData } = useContext(GlobalContext);
  const [streamActive, setStreamActive] = useState(false);
  const [annotatedImageUrl, setAnnotatedImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastResult, setLastResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
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
      setLoading(true);
      try {
        // Cập nhật URL ảnh để tránh cache
        setAnnotatedImageUrl(`${API_BASE}/api/stream-frame?t=${Date.now()}`);

        const { data } = await axios.get(`${API_BASE}/api/latest-data`);
        if (!cancelled) {
          setData(data);
          setLastResult(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.error || err.message || "Lỗi lấy dữ liệu từ API");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
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

  const content = (
    <>
      <div className="absolute top-0 inset-x-0 p-8 bg-gradient-to-b from-black/80 via-black/20 to-transparent z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
            <div className={`w-2 h-2 rounded-full ${streamActive ? "bg-emerald-500 animate-pulse" : "bg-slate-500"}`} />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
              {streamActive ? "Live Stream: Zone A1" : "Đang tắt"}
            </span>
          </div>
          {lastResult && streamActive && <span className="text-[10px] text-white/80">Phát hiện: {lastResult.predictions_count} gà</span>}
        </div>
        <div className="flex gap-3 pointer-events-auto">
          <button
            type="button"
            onClick={() => setShowResult((prev) => !prev)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black transition-all border border-white/10 backdrop-blur-md ${
              showResult ? "bg-orange-500 text-white border-orange-400" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <Layers size={16} /> {showResult ? "XEM CAMERA" : "XEM KẾT QUẢ"}
          </button>
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

      <div className="w-full h-full flex items-center justify-center bg-[#0f172a] relative min-h-[320px]">
        {!streamActive && !annotatedImageUrl && (
          <>
            <Camera size={80} className="text-slate-800 opacity-20" />
            <p className="absolute bottom-1/3 text-slate-500 text-sm">Nhấn "BẬT WEBCAM" để bắt đầu phân tích YOLO</p>
          </>
        )}
        {annotatedImageUrl && !showResult && (
          <img src={annotatedImageUrl} alt="Camera stream" className="absolute inset-0 w-full h-full object-cover" />
        )}
        {annotatedImageUrl && showResult && (
          <img src={annotatedImageUrl} alt="Kết quả phân tích với bounding box" className="absolute inset-0 w-full h-full object-contain" />
        )}
        {loading && error && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 bg-black/60 text-white px-4 py-2 rounded-xl">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm font-medium">Đang phân tích...</span>
          </div>
        )}
        {error && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-rose-500/90 text-white px-4 py-2 rounded-lg text-sm max-w-md text-center">
            {error}
          </div>
        )}
      </div>
    </>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 relative group w-[94vw] h-[88vh] max-w-7xl mx-4 shadow-2xl">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-[1.5rem] overflow-hidden shadow-2xl border border-slate-800 relative group aspect-video lg:aspect-auto lg:h-[500px]">
      {content}
    </div>
  );
};

export default CameraSection;
