import React from "react";

const StatCard = ({ title, value, unit, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-${color.split("-")[1]}-600 group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
    </div>
    <div className="space-y-1">
      <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{title}</p>
      <div className="flex items-baseline gap-1">
        <h3 className="text-2xl font-black text-slate-800">{value}</h3>
        <span className="text-slate-400 text-sm font-medium">{unit}</span>
      </div>
    </div>
  </div>
);

export default StatCard;
