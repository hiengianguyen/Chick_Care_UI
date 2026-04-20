import {
  CheckCircle2,
  ArrowRight,
  Cpu,
  Mic,
  Heart,
  TrendingUp,
  Users,
  Layers,
  Search,
  Code,
  ShieldCheck,
  Brain,
  Database,
  LayoutDashboard,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigator = useNavigate();
  const steps = [
    {
      title: "Nghiên cứu & Khảo sát thực địa",
      desc: "Tìm hiểu nhu cầu thực tế và đặc điểm sinh học của đối tượng chăn nuôi.",
      fullDesc:
        "Giai đoạn đầu tiên tập trung vào việc tìm hiểu nhu cầu thực tế. Chúng tôi đã thực hiện các chuyến khảo sát tại các hộ chăn nuôi gà tại địa phương để ghi nhận các vấn đề: nhiệt độ chuồng úm thường xuyên biến động, gà con dễ bị đè chết khi nằm tụm lại, và người nông dân phải thức đêm liên tục để kiểm tra.",
      details: [
        "Khảo sát thực địa tại 5 hộ chăn nuôi quy mô vừa và nhỏ",
        "Phân tích ngưỡng nhiệt độ lý tưởng cho gà con (32-35°C)",
        "Xác định các hành vi bất thường của gà con qua quan sát trực tiếp"
      ],
      image:
        "https://www.vietstock.org/wp-content/uploads/2024/07/ky-thuat-chan-nuoi-ga-con-hieu-qua-cho-nguoi-moi-bat-dau-1-min-1024x640.jpg",
      icon: <Search className="text-blue-500" />
    },
    {
      title: "Thiết kế hệ thống & Lập trình AI",
      desc: "Xây dựng kiến trúc phần cứng và huấn luyện mô hình trí tuệ nhân tạo.",
      fullDesc:
        "Đây là giai đoạn cốt lõi về kỹ thuật. Hệ thống được chia làm 2 phần chính: Phần cứng sử dụng ESP32 kết hợp cảm biến DHT11, Relay; Phần mềm sử dụng Python và thư viện YOLOv8 để nhận diện gà con.",
      details: [
        "Thiết kế mạch điều khiển trung tâm tối ưu hóa điện năng",
        "Huấn luyện Model AI với bộ dữ liệu hơn 2000 hình ảnh thực tế",
        "Lập trình thuật toán phân tích hành vi"
      ],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      icon: <Code className="text-emerald-500" />
    },
    {
      title: "Lắp đặt, Thử nghiệm & Hiệu chỉnh",
      desc: "Triển khai thực tế tại trang trại để tinh chỉnh các thông số vận hành.",
      fullDesc:
        "Hệ thống được đưa vào vận hành thử nghiệm tại một chuồng úm diện tích 40x60cm. Tại đây, chúng tôi kiểm tra độ bền của linh kiện trong môi trường bụi bẩn và độ ẩm cao. Các thuật toán AI được tinh chỉnh để loại bỏ nhiễu ánh sáng, đảm bảo việc nhận diện gà luôn chính xác trong mọi điều kiện.",
      details: [
        "Thử nghiệm vận hành liên tục 24/7 trong thời gian dài",
        "Đo lường và hiệu chuẩn sai số cảm biến xuống dưới 0.5°C",
        "Tối ưu hóa khả năng nhận diện giọng nói trong môi trường ồn ào"
      ],
      image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=800",
      icon: <Layers className="text-orange-500" />
    },
    {
      title: "Hoàn thiện, Đóng gói & Chuyển giao",
      desc: "Tối ưu hóa trải nghiệm người dùng và đóng gói sản phẩm thương mại.",
      fullDesc:
        "Giai đoạn cuối cùng là tối ưu hóa trải nghiệm người dùng. Giao diện được thiết kế trực quan, tối giản hóa để người nông dân lớn tuổi cũng có thể sử dụng dễ dàng. Hệ thống Voice control được nạp tăng tính thân thiện và điều khiển chính xác.",
      details: [
        "Đóng gói vỏ hộp chống bụi và ẩm",
        "Xây dựng bộ tài liệu hướng dẫn sử dụng bằng hình ảnh trực quan",
        "Tổ chức chuyển giao kỹ thuật và hướng dẫn vận hành cho bà con"
      ],
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
      icon: <ShieldCheck className="text-purple-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-xl text-white shadow-lg shadow-emerald-200">
              <Brain size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800 uppercase">
              Chick Care <span className="text-emerald-600">AI</span>
            </span>
          </div>
          <div className="hidden md:flex gap-8 font-medium text-slate-500">
            <a href="#intro" className="hover:text-emerald-600 transition">
              Giới thiệu
            </a>
            <a href="#process" className="hover:text-emerald-600 transition">
              Công đoạn
            </a>
            <a href="#benefits" className="hover:text-emerald-600 transition">
              Lợi ích
            </a>
            <a href="#mission" className="hover:text-emerald-600 transition">
              Ý nghĩa
            </a>
          </div>
          <button
            onClick={() => navigator("/dashboard")}
            className="hidden sm:flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100"
          >
            <LayoutDashboard size={18} />
            Vào Dashboard
          </button>
        </div>
      </nav>
      {/* Hero Section */}
      <section id="intro" className="pt-40 pb-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold mb-8 border border-emerald-100">
            HỘI THI TIN HỌC TRẺ CẤP THÀNH PHỐ LẦN THỨ 29, NĂM 2026
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-8 leading-[1.1]">
            Chăn Nuôi Gà Con <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 uppercase">
              Kỷ Nguyên Công Nghệ Số
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Hệ thống thông minh ứng dụng AI trong giám sát hành vi và IOT điều khiển môi trường chăn nuôi gà con
          </p>
        </div>
      </section>

      {/* Công đoạn thực hiện - FULL VERTICAL LIST (NEW LAYOUT) */}
      <section id="process" className="py-24 bg-slate-50 px-6 border-y border-slate-100">
        <div className="mx-auto" style={{ maxWidth: "80rem" }}>
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-[0.2em] mb-4">Nhật ký dự án</h2>
            <h3 className="text-4xl md:text-3xl font-black text-slate-900">Các công đoạn thực hiện chi tiết</h3>
            <p className="text-slate-500 mt-4 italic">Báo cáo tiến độ từ giai đoạn nghiên cứu đến khi bàn giao thực tế</p>
          </div>

          <div className="space-y-24 relative">
            {/* Center Line for Desktop */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-emerald-200 hidden md:block"></div>

            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-emerald-500 rounded-full z-10 flex items-center justify-center shadow-lg hidden md:flex">
                  <span className="text-emerald-600 font-black text-sm">{index + 1}</span>
                </div>

                <div className={`flex flex-col gap-10 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Image Content */}
                  <div className="md:w-1/2">
                    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white group-hover:scale-[1.02] transition-transform duration-500">
                      <img src={step.image} alt={step.title} className="w-full h-80 object-cover" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="md:w-1/2 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 text-emerald-600 font-black text-sm mb-4 tracking-tighter">
                      <span className="bg-emerald-100 px-3 py-1 rounded-lg">GIAI ĐOẠN 0{index + 1}</span>
                      <div className="h-px w-8 bg-emerald-200"></div>
                      {step.icon}
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h4>
                    <p className="text-slate-600 leading-relaxed mb-6 italic text-sm" style={{ fontSize: "17px" }}>
                      "{step.fullDesc}"
                    </p>

                    <div className="bg-white/50 p-6 rounded-3xl border border-slate-200 backdrop-blur-sm">
                      <h5 className="text-xs font-bold text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-widest">
                        <CheckCircle2 size={14} className="text-emerald-500" /> Kết quả kỹ thuật:
                      </h5>
                      <ul className="space-y-3">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-500 text-base leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lợi ích của dự án */}
      <section id="benefits" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="rounded-[3.5rem] overflow-hidden shadow-2xl relative group">
              <img
                src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=1200&auto=format&fit=crop"
                className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Farmer satisfaction"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-[300px]">
              <div className="flex gap-1 mb-4 text-yellow-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s}>★</span>
                ))}
              </div>
              <p className="text-slate-700 italic text-sm leading-relaxed">
                "AI rất thông minh, giúp tôi quản lý hàng nghìn con gà chỉ qua một vài câu lệnh giọng nói đơn giản."
              </p>
              <p className="mt-4 font-bold text-emerald-600 text-sm">— Nông dân thử nghiệm</p>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">Lợi ích dự án</h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-8 leading-tight text-balance">
              Giải quyết bài toán <br /> thực tiễn cho nông nghiệp
            </h3>
            <div className="space-y-8">
              {[
                {
                  title: "Bảo vệ gà con 24/7",
                  desc: "Tự động điều chỉnh môi trường theo nhu cầu sinh học khắt khe của gà con.",
                  icon: <TrendingUp className="text-emerald-600" />
                },
                {
                  title: "Giải phóng sức lao động",
                  desc: "Giảm 80% thời gian trực chuồng, giúp người dân có thời gian nghỉ ngơi.",
                  icon: <Users className="text-blue-600" />
                },
                {
                  title: "Công nghệ thân thiện",
                  desc: "Tương tác giọng nói tự nhiên, không đòi hỏi kỹ năng sử dụng máy tính phức tạp.",
                  icon: <Mic className="text-purple-600" />
                },
                {
                  title: "Dữ liệu hóa chăn nuôi",
                  desc: "Lưu trữ thông số để phân tích và tối ưu quy trình cho các lứa gà tiếp theo.",
                  icon: <Database className="text-orange-600" />
                }
              ].map((benefit, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:text-white transition-all duration-300">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">{benefit.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ý nghĩa dự án */}
      <section id="mission" className="py-24 bg-slate-950 text-white px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mx-auto mb-20">
            <Heart className="mx-auto text-rose-500 mb-8" size={48} fill="currentColor" />
            <h2 className="text-4xl md:text-2xl font-bold mb-6">Giá trị Nhân văn</h2>
            <p className="text-slate-400 text-lg leading-relaxed italic">
              "Công nghệ chỉ có ý nghĩa thực sự khi nó chạm được vào cuộc sống của những người bình dị nhất."
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-12 rounded-[3rem] bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all">
              <h4 className="text-2xl font-bold mb-6 text-emerald-400">Tầm nhìn hiện đại</h4>
              <p className="text-slate-300 leading-relaxed">
                Chứng minh sức mạnh của AI trong việc chuyển đổi số nông nghiệp, giúp nông sản Việt tăng sức cạnh tranh trên thị trường.
              </p>
            </div>
            <div className="p-12 rounded-[3rem] bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all">
              <h4 className="text-2xl font-bold mb-6 text-emerald-400">Kết nối cộng đồng</h4>
              <p className="text-slate-300 leading-relaxed">
                Dự án mã nguồn mở, dễ dàng nhân rộng để hỗ trợ các hộ gia đình vùng sâu, vùng xa có công cụ thoát nghèo bền vững.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl shadow-emerald-200 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            <div className="relative z-10 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Sẵn sàng điều khiển trang trại?</h3>
              <p className="text-emerald-50 opacity-90 max-w-md">
                Truy cập hệ thống quản lý trực tuyến để theo dõi thông số môi trường, xem camera AI và điều khiển thiết bị bằng giọng nói
                ngay bây giờ.
              </p>
            </div>
            <button
              onClick={() => navigator("/dashboard")}
              className="relative z-10 bg-white text-emerald-700 px-8 py-4 rounded-2xl font-bold hover:bg-emerald-50 hover:scale-105 transition-all flex items-center gap-3 shadow-xl"
            >
              Đến Dashboard điều khiển <ChevronRight size={20} />
            </button>
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-all"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-2 rounded-xl text-white">
              <Brain size={20} />
            </div>
            <span className="font-bold text-slate-800 uppercase tracking-tight">ChickCare AI 2026</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-emerald-600 transition">
              Hướng dẫn
            </a>
            <a href="#" className="hover:text-emerald-600 transition">
              Thư viện
            </a>
            <a href="#" className="hover:text-emerald-600 transition">
              Liên hệ
            </a>
          </div>
          <p>© 2026 Dự án Khoa học Kỹ thuật TP Đà Nẵng</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
