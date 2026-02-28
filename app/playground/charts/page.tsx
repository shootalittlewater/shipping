"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";

const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 300, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 300, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 200, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 278, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 189, pv: 3800, amt: 2500 },
];

const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const radarData = [
  { subject: "Design", A: 120, B: 110, fullMark: 150 },
  { subject: "Development", A: 98, B: 130, fullMark: 150 },
  { subject: "Marketing", A: 86, B: 130, fullMark: 150 },
  { subject: "Sales", A: 99, B: 100, fullMark: 150 },
  { subject: "Support", A: 85, B: 90, fullMark: 150 },
  { subject: "Analytics", A: 65, B: 85, fullMark: 150 },
];

const COLORS = [
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#ef4444",
];

const GRADIENT_COLORS = [
  { start: "#8b5cf6", end: "#ec4899" },
  { start: "#ec4899", end: "#f59e0b" },
  { start: "#10b981", end: "#3b82f6" },
];

export default function ChartsPlayground() {
  type ChartType = "bar" | "line" | "area" | "pie" | "radar";

  const [activeChart, setActiveChart] = useState<ChartType>("bar");

  const [animationKey, setAnimationKey] = useState(0);
  const [liveData, setLiveData] = useState(data);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData((prev) =>
        prev.map((item) => ({
          ...item,
          uv: Math.floor(Math.random() * 400) + 100,
          pv: Math.floor(Math.random() * 5000) + 1000,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const changeChart = (chart: typeof activeChart) => {
    setActiveChart(chart);
    setAnimationKey((prev) => prev + 1);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-purple-200 dark:border-purple-800">
          <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-950 dark:to-pink-950 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            Charts Playground
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Interactive data visualization with live updates
          </p>
        </div>

        {/* Chart Type Selector */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { type: "bar", icon: "📊", label: "Bar Chart" },
            { type: "line", icon: "📈", label: "Line Chart" },
            { type: "area", icon: "🌊", label: "Area Chart" },
            { type: "pie", icon: "🥧", label: "Pie Chart" },
            { type: "radar", icon: "🎯", label: "Radar Chart" },
          ].map(({ type, icon, label }) => (
            <Button
              key={type}
              onClick={() => changeChart(type as typeof activeChart)}
              variant={activeChart === type ? "default" : "outline"}
              className={`transition-all duration-300 ${
                activeChart === type
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 scale-110 shadow-lg"
                  : "hover:scale-105"
              }`}
            >
              <span className="mr-2">{icon}</span>
              {label}
            </Button>
          ))}
        </div>

        {/* Main Chart Display */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-purple-200 dark:border-purple-800 transition-all duration-500 hover:shadow-purple-500/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {activeChart.charAt(0).toUpperCase() + activeChart.slice(1)}{" "}
              Visualization
            </h2>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Live Data
              </span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            {activeChart === "bar" && (
              <BarChart key={animationKey} data={liveData}>
                <defs>
                  {GRADIENT_COLORS.map((color, index) => (
                    <linearGradient
                      key={index}
                      id={`colorGradient${index}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor={color.start} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={color.end} stopOpacity={0.8} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  style={{ fontSize: "14px" }}
                />
                <YAxis stroke="#6b7280" style={{ fontSize: "14px" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="uv"
                  fill="url(#colorGradient0)"
                  radius={[8, 8, 0, 0]}
                  animationDuration={1000}
                />
              </BarChart>
            )}

            {activeChart === "line" && (
              <LineChart key={animationKey} data={liveData}>
                <defs>
                  <linearGradient id="lineGradient1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  style={{ fontSize: "14px" }}
                />
                <YAxis stroke="#6b7280" style={{ fontSize: "14px" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="uv"
                  stroke="url(#lineGradient1)"
                  strokeWidth={3}
                  dot={{ fill: "#8b5cf6", r: 6 }}
                  activeDot={{ r: 8 }}
                  animationDuration={1000}
                />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", r: 6 }}
                  animationDuration={1000}
                />
              </LineChart>
            )}

            {activeChart === "area" && (
              <AreaChart key={animationKey} data={liveData}>
                <defs>
                  <linearGradient id="areaGradient1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="areaGradient2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  style={{ fontSize: "14px" }}
                />
                <YAxis stroke="#6b7280" style={{ fontSize: "14px" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#8b5cf6"
                  fill="url(#areaGradient1)"
                  strokeWidth={2}
                  animationDuration={1000}
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stroke="#ec4899"
                  fill="url(#areaGradient2)"
                  strokeWidth={2}
                  animationDuration={1000}
                />
              </AreaChart>
            )}

            {activeChart === "pie" && (
              <PieChart key={animationKey}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={1000}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            )}

            {activeChart === "radar" && (
              <RadarChart key={animationKey} data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" style={{ fontSize: "12px" }} />
                <PolarRadiusAxis />
                <Radar
                  name="Team A"
                  dataKey="A"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.6}
                  animationDuration={1000}
                />
                <Radar
                  name="Team B"
                  dataKey="B"
                  stroke="#ec4899"
                  fill="#ec4899"
                  fillOpacity={0.6}
                  animationDuration={1000}
                />
                <Legend />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Total Views", value: "12,345", icon: "👁️", color: "purple" },
            { label: "Active Users", value: "3,456", icon: "👥", color: "pink" },
            { label: "Revenue", value: "$45,678", icon: "💰", color: "orange" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className="text-4xl">{stat.icon}</div>
              </div>
              <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 animate-pulse`}
                  style={{ width: "70%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}