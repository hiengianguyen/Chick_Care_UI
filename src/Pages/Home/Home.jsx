import { useEffect, useState } from "react";
import Header from "../../components/Header";
import CameraSection from "../../components/CameraSection";
import EnvironmentWidget from "../../components/EnvironmentWidget";
import DensityWidget from "../../components/DensityWidget";
import AlertsWidget from "../../components/AlertsWidget";
import ActivityLog from "../../components/ActivityLog";
import ListStatCard from "../../components/ListStatCard";
import CardRedirectFeatures from "../../components/CardRedirectFeatures";

// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Home = () => {
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

export default Home;
