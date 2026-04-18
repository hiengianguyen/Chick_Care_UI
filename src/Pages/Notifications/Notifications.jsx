import { AlertTriangle, ArrowLeft, Clock, Trash2, Expand } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import getTimeAgo from "../../utils/getTimeAgo";

const Notifications = () => {
  const navigation = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [expandedImages, setExpandedImages] = useState({});

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/noti-alerts");
        const data = response.data;
        const mappedAlerts = data.alerts.map((alert) => {
          let createdDate;
          if (alert.createdAt && alert.createdAt.toDate) {
            createdDate = alert.createdAt.toDate();
          } else if (alert.createdAt && typeof alert.createdAt === "string") {
            createdDate = new Date(alert.createdAt);
          } else if (alert.createdAt && alert.createdAt.seconds) {
            createdDate = new Date(alert.createdAt.seconds * 1000);
          } else {
            createdDate = new Date();
          }
          const now = new Date();
          const diffInMs = now - createdDate;
          const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
          const isNew = diffInMinutes <= 30;
          return {
            id: alert.id,
            title: alert.shortTitle || alert.title,
            desc: alert.message,
            imageUrl: alert.imageUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
            time: getTimeAgo(createdDate),
            type: "alert",
            isNew
          };
        });
        setAlerts(mappedAlerts);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };

    fetchAlerts();
  }, []);

  const deleteNoti = async (id) => {
    await axios.delete("http://localhost:5000/api/noti/" + id).then((datas) => {
      setAlerts((alerts) => {
        return alerts.filter((alert) => alert.id != datas.data.id);
      });
    });
  };

  const toggleImageExpand = (alertId) => {
    setExpandedImages((prev) => ({
      ...prev,
      [alertId]: !prev[alertId]
    }));
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] animate-in fade-in duration-500">
      <div className="mx-auto p-4 md:p-10 space-y-8" style={{ maxWidth: "65rem" }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigation(-1)}
            className="p-3 bg-white rounded-2xl text-slate-400 hover:text-slate-800 transition-all shadow-sm border border-slate-200"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Thông báo & Báo cáo</h1>
        </div>

        {/* Feed Style List */}
        <div className="space-y-10">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-white">
              <div className="relative w-full overflow-hidden bg-slate-100 h-64">
                <img src={alert.imageUrl} alt={alert.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                <div className="absolute top-6 left-6 flex gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg bg-amber-500 text-white">
                    <AlertTriangle size={16} />
                    Cảnh báo
                  </div>
                  {alert.isNew && (
                    <div className="bg-white text-indigo-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      Mới
                    </div>
                  )}
                </div>

                <button
                  onClick={() => toggleImageExpand(alert.id)}
                  className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all"
                  title="Phóng to ảnh"
                >
                  <Expand size={16} />
                </button>
              </div>

              <div className="p-8 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-black text-slate-800 leading-tight uppercase tracking-tight">{alert.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-slate-400">
                      <Clock size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{alert.time}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteNoti(alert.id)}
                    className="text-slate-300 hover:text-red-600 transition-colors p-1"
                    title="Xoá thông báo"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <p className="text-slate-500 font-medium leading-relaxed">{alert.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="py-10 text-center">
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest italic">Bạn đã xem hết thông báo quan trọng</p>
        </div>
      </div>

      {/* Image Modal */}
      {Object.keys(expandedImages).some((id) => expandedImages[id]) && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setExpandedImages({})}>
          <div className="relative max-w-4xl max-h-[70vh] w-full">
            <img
              src={alerts.find((a) => expandedImages[a.id])?.imageUrl}
              alt={alerts.find((a) => expandedImages[a.id])?.title}
              className="w-full h-full object-contain rounded-2xl"
            />
            <button
              onClick={() => setExpandedImages({})}
              className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Notifications;
