import { useEffect, useState } from "react";
import Header from "./components/Header";
import CameraSection from "./components/CameraSection";
import IotDevices from "./components/IotDevices";
import EnvironmentWidget from "./components/EnvironmentWidget";
import DensityWidget from "./components/DensityWidget";
import AlertsWidget from "./components/AlertsWidget";
import ActivityLog from "./components/ActivityLog";
import ListStatCard from "./components/ListStatCard";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [iotDevices, setIotDevices] = useState([
    { name: "Hệ thống quạt", status: "60%", icon: "Wind", active: true },
    { name: "Đèn sưởi ấm", status: "Auto", icon: "Sun", active: true },
    { name: "Máy phun sương", status: "Tắt", icon: "Droplets", active: false }
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleDevice = async (name, index) => {
    console.log("Calling");
    await axios.get(`${API_BASE}/api/get_data?d=` + (!iotDevices[index].active ? "1" : "0"));

    setIotDevices((prev) =>
      prev.map((device) =>
        device.name === name
          ? {
              ...device,
              active: !device.active
            }
          : device
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-4 md:p-8">
      <Header currentTime={currentTime} />

      <main className="max-w-[1600px] mx-auto space-y-6">
        <ListStatCard />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-8 space-y-6">
            <CameraSection />

            <IotDevices devices={iotDevices} onToggle={handleToggleDevice} />
          </div>

          <div className="xl:col-span-4 space-y-6">
            <EnvironmentWidget />
            <DensityWidget />
            <AlertsWidget />
            <ActivityLog />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
