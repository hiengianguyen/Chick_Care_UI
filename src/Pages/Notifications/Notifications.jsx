import { AlertTriangle, ArrowLeft, Bell, CheckCircle2, ChevronRight, Clock, FileText, Filter, MoreVertical } from "lucide-react";

const Notifications = ({ onBack }) => {
  const notifications = [
    {
      id: 1,
      title: "Báo cáo phân tích sức khỏe tuần 14",
      description:
        "Hệ thống AI đã hoàn tất phân tích dữ liệu cân nặng và mức tiêu thụ thức ăn. Có sự tăng trưởng ổn định 12% so với tuần trước. Các chỉ số về vận động của vật nuôi đạt mức tối ưu trong 7 ngày qua.",
      time: "10 phút trước",
      type: "report",
      priority: "high",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      status: "unread"
    },
    {
      id: 2,
      title: "Cảnh báo độ ẩm Khu vực B",
      description:
        "Độ ẩm giảm xuống dưới mức 45%. Hình ảnh từ camera nhiệt cho thấy sự khô hạn cục bộ tại góc phía Đông dãy chuồng. Hệ thống phun sương đã được kích hoạt để cân bằng lại.",
      time: "2 giờ trước",
      type: "alert",
      priority: "medium",
      image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800",
      status: "read"
    },
    {
      id: 3,
      title: "Hoàn tất bảo trì hệ thống quạt",
      description:
        "Hình ảnh nghiệm thu sau khi thay mới motor cho quạt số 04 tại Khu A. Tất cả các cánh quạt đã được vệ sinh và cân bằng động lại.",
      time: "5 giờ trước",
      type: "success",
      priority: "low",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
      status: "read"
    }
  ];

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "high":
        return "bg-rose-500 text-white";
      case "medium":
        return "bg-amber-500 text-white";
      default:
        return "bg-indigo-500 text-white";
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "report":
        return <FileText size={16} />;
      case "alert":
        return <AlertTriangle size={16} />;
      case "success":
        return <CheckCircle2 size={16} />;
      default:
        return <Bell size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] animate-in fade-in duration-500">
      <div className="max-w-3xl mx-auto p-4 md:p-10 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-3 bg-white rounded-2xl text-slate-400 hover:text-slate-800 transition-all shadow-sm border border-slate-200"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Thông báo & Báo cáo</h1>
          <button className="p-3 bg-white rounded-2xl text-slate-400 shadow-sm border border-slate-200">
            <Filter size={20} />
          </button>
        </div>

        {/* Feed Style List */}
        <div className="space-y-10">
          {notifications.map((note) => (
            <div key={note.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-white">
              {/* Image directly visible - Large Scale */}
              <div className="relative h-max w-full overflow-hidden bg-slate-100">
                <img src={note.image} alt={note.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Overlay Badges */}
                <div className="absolute top-6 left-6 flex gap-2">
                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${getPriorityStyle(note.priority)}`}
                  >
                    {getIcon(note.type)}
                    {note.type}
                  </div>
                  {note.status === "unread" && (
                    <div className="bg-white text-indigo-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      Mới
                    </div>
                  )}
                </div>
              </div>

              {/* Text Content Below Image */}
              <div className="p-8 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-black text-slate-800 leading-tight uppercase tracking-tight">{note.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-slate-400">
                      <Clock size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{note.time}</span>
                    </div>
                  </div>
                  <button className="text-slate-300 hover:text-slate-600">
                    <MoreVertical size={20} />
                  </button>
                </div>

                <p className="text-slate-500 font-medium leading-relaxed">{note.description}</p>

                <div className="pt-4 flex items-center justify-between border-t border-slate-50">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                      +2
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200">
                    Mở tài liệu đầy đủ
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="py-10 text-center">
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest italic">Bạn đã xem hết thông báo quan trọng</p>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
