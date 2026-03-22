import { useContext } from "react";
import StatCard from "./StatCard";
import { Activity, Users, EyeOff, Maximize } from "lucide-react";
import { GlobalContext } from "./GlobalContext";

const stats = [
  { title: "Tổng đàn gà", value: "0", unit: "con", icon: Users, color: "bg-blue-500", trend: 12 },
  {
    title: "Mật độ cao nhất",
    value: "0",
    unit: "%",
    icon: Maximize,
    color: "bg-indigo-600",
    subValue: "Tại Khu A (Trung tâm)"
  },
  { title: "Đứng yên lâu", value: "0", unit: "con", icon: Activity, color: "bg-amber-500", trend: -5 },
  { title: "Tách đàn lẻ", value: "0", unit: "con", icon: EyeOff, color: "bg-purple-500", trend: 0 }
];

const ListStatCard = () => {
  const { data } = useContext(GlobalContext);
  if (data) {
    stats[0].value = `${data.predictions_count}`;
    stats[1].value = `${data.crowding_alert}`;
    stats[2].value = `${data.alerts.filter((a) => a.type == "stationary").length}`;
    stats[3].value = `${data.alerts.filter((a) => a.type == "separation").length}`;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default ListStatCard;
