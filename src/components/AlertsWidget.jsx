import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AlertsWidget = () => {
  const navigation = useNavigate();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/noti-alerts?limit=4");
        const data = response.data;
        const mappedAlerts = data.alerts.map((alert) => {
          let createdDate;
          if (alert.createdAt && alert.createdAt.toDate) {
            // Firestore Timestamp
            createdDate = alert.createdAt.toDate();
          } else if (alert.createdAt && typeof alert.createdAt === "string") {
            // String ISO
            createdDate = new Date(alert.createdAt);
          } else if (alert.createdAt && alert.createdAt.seconds) {
            // Timestamp object
            createdDate = new Date(alert.createdAt.seconds * 1000);
          } else {
            // Fallback
            createdDate = new Date();
          }
          return {
            title: alert.shortTitle || alert.title,
            desc: alert.message,
            time: getTimeAgo(createdDate)
          };
        });
        setAlerts(mappedAlerts);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };

    fetchAlerts();
  }, []);

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else {
      return `${diffInDays}d`;
    }
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-2">
          <Bell size={18} className="text-rose-500" /> Cảnh báo AI
        </h3>
        <span className="px-2 py-1 bg-rose-100 text-rose-600 text-xs font-black rounded-lg">MỚI</span>
      </div>
      <div className="space-y-4">
        {alerts.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-2xl flex items-center justify-between border cursor-pointer hover:border-slate-300 transition-all ${
              index === 0 ? "bg-amber-50 border-amber-100" : "bg-slate-50 border-slate-200"
            }`}
          >
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{item.title}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-400">{item.time}</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => navigation("/notifications")}
        className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 rounded-2xl text-xs font-black text-slate-400 uppercase tracking-[0.2em] hover:bg-slate-50 hover:border-slate-300 transition-all"
      >
        Lịch sử thông báo
      </button>
    </div>
  );
};

export default AlertsWidget;
