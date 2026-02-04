"use client";

import React from 'react';
import { BarChartBase } from "@/components/ui/charts/BarChartBase";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

// --- Mock Data for the Narrative ---
const stats = [ 
  { label: "Total Shipments", value: "1,284", change: "+12%", color: "text-blue-500" },
  { label: "Delayed", value: "23", change: "-2%", color: "text-red-500" },
  { label: "In Transit", value: "458", change: "+5%", color: "text-emerald-500" },
];

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 p-8 space-y-10">
      
      {/* 1. Header & Narrative */}
      <header className="max-w-4xl">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
          Fleet Command
        </h1>
        <p className="mt-4 text-zinc-400 text-lg leading-relaxed">
          Operational overview of global logistics. This dashboard aggregates live telemetry 
          from active carriers to provide a bird's-eye view of supply chain velocity.
        </p>
      </header>

      {/* 2. Stat Cards (The "Quick Look" for Level 1 Users) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all">
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">{stat.label}</p>
            <div className="flex items-baseline gap-3 mt-2">
              <span className="text-3xl font-bold">{stat.value}</span>
              <span className={`text-xs font-bold ${stat.color}`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Analytics Section with ErrorBoundary */}
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Weekly Throughput</h2>
          <p className="text-sm text-zinc-500">Volume comparison across primary transit hubs.</p>
        </div>

        <div className="h-[300px] w-full">
          <ErrorBoundary 
            fallback={
              <div className="h-full w-full flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl">
                <p className="text-zinc-600 italic">Visualizer temporarily offline</p>
              </div>
            }
          >
            <BarChartBase />
          </ErrorBoundary>
        </div>
      </section>

      {/* 4. The Main Table Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Active Manifest</h2>
          <button className="bg-zinc-100 text-black px-4 py-2 rounded-lg font-medium text-sm hover:bg-white transition-colors">
            Manage Fleet
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-800/50 text-zinc-400 text-xs uppercase">
              <tr>
                <th className="p-4 font-semibold">ID</th>
                <th className="p-4 font-semibold">Destination</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">ETA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {/* This is where your actual table map would go */}
              <tr className="hover:bg-zinc-800/50 transition-colors cursor-pointer group">
                <td className="p-4 text-sm font-mono text-zinc-500">#SHP-9921</td>
                <td className="p-4 text-sm font-medium">Rotterdam, NL</td>
                <td className="p-4 text-sm">
                  <span className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                    In Transit
                  </span>
                </td>
                <td className="p-4 text-sm text-right text-zinc-500">Feb 12, 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}