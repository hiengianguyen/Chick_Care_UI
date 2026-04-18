import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import getTime from "../utils/getTime";
import getTimeAgo from "../utils/getTimeAgo";
const socket = io("http://localhost:5000");

const AlertsWidget = () => {
  const navigation = useNavigate();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/noti-alerts?limit=4");
        const data = response.data;
        const mappedAlerts = data.alerts.map((alert) => {
          const createdDate = getTime(alert);
          return {
            title: alert.shortTitle || alert.title,
            desc: alert.message,
            time: getTimeAgo(createdDate),
            isRead: alert.isRead
          };
        });
        setAlerts(mappedAlerts);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };

    fetchAlerts();
  }, []);

  useEffect(() => {
    const handler = (data) => {
      setAlerts((prev) => {
        const finalData = {
          title: data.shortTitle || data.title,
          desc: data.message,
          isRead: data.isRead,
          time: getTimeAgo(createdDate)
        };

        return [finalData, ...prev];
      });
    };
    socket.on("chicken_alert", handler);

    return () => {
      socket.off("chicken_alert", handler);
    };
  }, []);

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
            className={`p-4 rounded-2xl border cursor-pointer hover:border-slate-300 transition-all ${
              !item.isRead ? "bg-amber-50 border-amber-100" : "bg-slate-50 border-slate-200"
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
