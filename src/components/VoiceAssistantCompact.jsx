import axios from "axios";
import { Mic } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import speak from "../utils/speak";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const VoiceAssistantCompact = () => {
  const [isListening, setIsListening] = useState(false);

  const [text, setText] = useState("");
  const [reply, setReply] = useState("");
  const recognitionRef = useRef(null);

  const examples = ["Bật quạt thông gió", "Kiểm tra nhiệt độ", "Cho gà ăn ngay"];

  // 🎤 setup speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Trình duyệt không hỗ trợ voice");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "vi-VN";
    recognition.interimResults = false;

    recognition.onresult = async (event) => {
      const voiceText = event.results[0][0].transcript;
      setText(voiceText);

      try {
        const res = await axios.post(API_BASE + "/api/chat", {
          message: voiceText
        });

        setIsListening(false);
        setReply(res.data.reply);
        speak(res.data.reply);
      } catch (err) {
        console.error(err);
      }
    };

    recognitionRef.current = recognition;
  }, []);

  // 🎙️ start voice
  const startVoice = () => {
    setIsListening(true);
    recognitionRef.current.start();
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#5c5cfc] to-[#4338ca] p-8 rounded-[2.5rem] shadow-xl shadow-indigo-200 relative overflow-hidden group">
      {/* Trang trí nền */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
      <div className="absolute right-20 top-0 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl">
                <Mic size={18} className="text-white" />
              </div>
              <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">ĐIỀU KHIỂN BẰNG GIỌNG NÓI</h3>
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-[9px] font-black text-indigo-200 uppercase tracking-widest">Ví dụ:</span>
              {examples.map((ex, idx) => (
                <span
                  key={idx}
                  className="text-[9px] font-bold text-white/60 border border-white/10 px-2 py-1 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                >
                  "{ex}"
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-[10px] font-black text-indigo-200 uppercase w-10">Lệnh:</span>
              <p className="text-white font-black italic text-sm">{text}</p>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-[10px] font-black text-indigo-200 uppercase w-10">Bot:</span>
              <p className="text-white font-black text-sm">{reply}</p>
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <button
            onClick={startVoice}
            className={`px-8 py-3 bg-white text-indigo-600 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg hover:shadow-white/20 hover:-translate-y-1 transition-all active:scale-95 ${isListening ? "animate-pulse ring-4 ring-white/20" : ""}`}
          >
            KÍCH HOẠT MIC
          </button>
        </div>
        {isListening && (
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-1 h-3 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceAssistantCompact;
