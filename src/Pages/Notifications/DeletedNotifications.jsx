import { ArrowLeft, RotateCcw, Trash2, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DeletedNotifications = () => {
  const navigation = useNavigate();

  return (
    <div className="min-h-screen bg-[#f1f5f9] animate-in fade-in duration-500">
      <div className="mx-auto p-4 md:p-10 space-y-8" style={{ maxWidth: "65rem" }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigation("/notifications")}
            className="p-3 bg-white rounded-2xl text-slate-400 hover:text-slate-800 transition-all shadow-sm border border-slate-200"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Thùng rác thông báo</h1>
          <div className="w-12"></div>
        </div>

        {/* Deleted Notifications List */}
        <div className="space-y-6">
          {/* Deleted Notification 1 */}
          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-white hover:shadow-slate-300/60 transition-all">
            <div className="relative h-max w-full overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
                alt="Báo cáo phân tích sức khỏe tuần 14"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

              <div className="absolute top-6 left-6 flex gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg bg-slate-500 text-white">
                  <Trash2 size={16} />
                  Đã xoá
                </div>
              </div>
            </div>

            <div className="p-8 space-y-4">
              <div>
                <h3 className="text-xl font-black text-slate-800 leading-tight uppercase tracking-tight">
                  Báo cáo phân tích sức khỏe tuần 14
                </h3>
                <div className="flex items-center gap-2 mt-1 text-slate-400">
                  <Clock size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">10 phút trước</span>
                </div>
              </div>

              <p className="text-slate-500 font-medium leading-relaxed">
                Hệ thống AI đã hoàn tất phân tích dữ liệu cân nặng và mức tiêu thụ thức ăn. Có sự tăng trưởng ổn định 12% so với tuần trước.
                Các chỉ số về vận động của vật nuôi đạt mức tối ưu trong 7 ngày qua.
              </p>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-50">
                <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-200">
                  <Trash2 size={14} />
                  Xoá vĩnh viễn
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                  <RotateCcw size={14} />
                  Khôi phục
                </button>
              </div>
            </div>
          </div>

          {/* Deleted Notification 2 */}
          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-white hover:shadow-slate-300/60 transition-all">
            <div className="relative h-max w-full overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
                alt="Cảnh báo độ ẩm Khu vực B"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

              <div className="absolute top-6 left-6 flex gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg bg-slate-500 text-white">
                  <Trash2 size={16} />
                  Đã xoá
                </div>
              </div>
            </div>

            <div className="p-8 space-y-4">
              <div>
                <h3 className="text-xl font-black text-slate-800 leading-tight uppercase tracking-tight">Cảnh báo độ ẩm Khu vực B</h3>
                <div className="flex items-center gap-2 mt-1 text-slate-400">
                  <Clock size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">2 giờ trước</span>
                </div>
              </div>

              <p className="text-slate-500 font-medium leading-relaxed">
                Độ ẩm giảm xuống dưới mức 45%. Hình ảnh từ camera nhiệt cho thấy sự khô hạn cục bộ tại góc phía Đông dãy chuồng. Hệ thống
                phun sương đã được kích hoạt để cân bằng lại.
              </p>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-50">
                <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-200">
                  <Trash2 size={14} />
                  Xoá vĩnh viễn
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                  <RotateCcw size={14} />
                  Khôi phục
                </button>
              </div>
            </div>
          </div>

          {/* Deleted Notification 3 */}
          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-white hover:shadow-slate-300/60 transition-all">
            <div className="relative h-max w-full overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
                alt="Hoàn tất bảo trì hệ thống quạt"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

              <div className="absolute top-6 left-6 flex gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg bg-slate-500 text-white">
                  <Trash2 size={16} />
                  Đã xoá
                </div>
              </div>
            </div>

            <div className="p-8 space-y-4">
              <div>
                <h3 className="text-xl font-black text-slate-800 leading-tight uppercase tracking-tight">Hoàn tất bảo trì hệ thống quạt</h3>
                <div className="flex items-center gap-2 mt-1 text-slate-400">
                  <Clock size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">5 giờ trước</span>
                </div>
              </div>

              <p className="text-slate-500 font-medium leading-relaxed">
                Hình ảnh nghiệm thu sau khi thay mới motor cho quạt số 04 tại Khu A. Tất cả các cánh quạt đã được vệ sinh và cân bằng động
                lại.
              </p>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-50">
                <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-200">
                  <Trash2 size={14} />
                  Xoá vĩnh viễn
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                  <RotateCcw size={14} />
                  Khôi phục
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletedNotifications;
