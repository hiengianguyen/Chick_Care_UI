import { Bell, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import chickLogo from "../public/img/chick.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = ({ currentTime }) => {
  const navigation = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [headerNotifications, setHeaderNotifications] = useState([]);
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/noti-alerts?limit=5");
        const data = response.data;
        const mappedNotifications = data.alerts.map((alert) => {
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
            description: alert.message,
            time: getTimeAgo(createdDate),
            isNew
          };
        });
        setHeaderNotifications(mappedNotifications);
        setNewCount(mappedNotifications.filter((n) => n.isNew).length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    } else {
      return `${diffInDays} ngày trước`;
    }
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleDeleteNotification = (id) => {
    // For now, just remove from UI (in future, implement soft delete via API)
    const updated = headerNotifications.filter((n) => n.id !== id);
    setHeaderNotifications(updated);
  };

  return (
    <header className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-100 overflow-hidden">
          <img src={chickLogo} alt="ChickenCare logo" className="w-10 h-10 object-contain" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">ChickenCare AI Dashboard</h1>
          <p className="text-slate-500 text-sm font-medium">Hệ thống giám sát gà con và điều khiển thông minh</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block mr-4">
          <p className="text-sm font-bold text-slate-700">
            {currentTime.toLocaleDateString("vi-VN", {
              weekday: "long",
              day: "numeric",
              month: "long"
            })}
          </p>
          <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">{currentTime.toLocaleTimeString("vi-VN")}</p>
        </div>
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 relative group transition-all"
          >
            <Bell size={20} className="text-slate-600 group-hover:rotate-12 transition-transform" />
            {newCount > 0 && <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full" />}
          </button>
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
              <div className="p-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800">Thông báo</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {headerNotifications.length > 0 ? (
                  headerNotifications.map((note) => (
                    <div
                      key={note.id}
                      className="p-4 border-b border-slate-100 hover:bg-slate-50 flex items-start justify-between gap-2 group"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm text-slate-700 font-medium">{note.title}</p>
                          {note.isNew && <span className="px-1.5 py-0.5 bg-rose-100 text-rose-600 text-xs font-bold rounded">Mới</span>}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{note.description}</p>
                        <p className="text-xs text-slate-400 mt-1">{note.time}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteNotification(note.id)}
                        className="text-slate-300 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                        title="Xoá thông báo"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-slate-400 text-sm">Không có thông báo</div>
                )}
              </div>
              <div className="p-4 border-t border-slate-200 text-center">
                <button onClick={() => navigation("/notifications")} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                  Xem tất cả thông báo
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200 cursor-pointer overflow-hidden">
          <img src="https://ui-avatars.com/api/?name=Admin&background=4f46e5&color=fff" alt="User" />
        </div>
      </div>
    </header>
  );
};

export default Header;
