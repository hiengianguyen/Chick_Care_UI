import { useEffect, useState } from "react";
import Header from "../../components/Header";
import CameraSection from "../../components/CameraSection";
import EnvironmentWidget from "../../components/EnvironmentWidget";
import AlertsWidget from "../../components/AlertsWidget";
import ActivityLog from "../../components/ActivityLog";
import ListStatCard from "../../components/ListStatCard";
import CardRedirectFeatures from "../../components/CardRedirectFeatures";
import VoiceAssistantCompact from "../../components/VoiceAssistantCompact";

const DashBoard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-4 md:p-8">
      <Header currentTime={currentTime} />

      <main className="max-w-[1600px] mx-auto space-y-6">
        <ListStatCard />
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-8 space-y-6">
            <CameraSection />
            <CardRedirectFeatures />
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-3">
              Hệ thống điều khiển bằng giọng nói
            </h2>

            <VoiceAssistantCompact />
          </div>

          <div className="xl:col-span-4 space-y-6">
            <EnvironmentWidget />
            <AlertsWidget />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
