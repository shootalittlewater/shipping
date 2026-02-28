import React, { useEffect, useRef } from "react";
import {
  Menubar, MenubarContent, MenubarItem,
  MenubarMenu, MenubarSeparator, MenubarTrigger,
} from "@/components/ui/menubar";
import {
  NavigationMenu, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination";
import { Package, Truck, AlertCircle, MoreHorizontal, Radio } from "lucide-react";

// ─── Font injection
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Outfit:wght@300;400;500;600&display=swap');
  .font-display { font-family: 'Orbitron', monospace; }
  .font-body    { font-family: 'Outfit', sans-serif; }
`;

// ─── Data
const SUMMARY_CARDS = [
  { label: "Active Shipments", value: "1,284", color: "text-white" },
  { label: "In Transit",       value: "942",   color: "text-blue-400",  icon: <Truck className="h-4 w-4 text-blue-400/40" /> },
  { label: "Delays",           value: "12",    color: "text-red-400",   icon: <AlertCircle className="h-4 w-4 text-red-400" /> },
];

const SHIPMENTS = [
  { id: "SHP-7721", destination: "Berlin, DE",   status: "In Transit", eta: "2026-02-05", carrier: "DHL" },
  { id: "SHP-8840", destination: "New York, US", status: "Delivered",  eta: "2026-02-01", carrier: "FedEx" },
  { id: "SHP-1209", destination: "Tokyo, JP",    status: "Processing", eta: "2026-02-10", carrier: "UPS" },
  { id: "SHP-4432", destination: "London, UK",   status: "Delayed",    eta: "2026-02-08", carrier: "Royal Mail" },
];

const NAV_LINKS = ["Fleet Map", "Shipments", "Inventory"];

const STATUS_STYLES = {
  Delivered:    "bg-green-900/30 text-green-400",
  Delayed:      "bg-red-900/30 text-red-400",
  Processing:   "bg-amber-900/30 text-amber-400",
  "In Transit": "bg-blue-900/30 text-blue-400",
};

// ─── Map config
const HUB = { lon: -90, lat: 38 };
const CITIES = [
  { name: "Berlin",    lon: 13.4,   lat: 52.5,  color: "#60a5fa" },
  { name: "New York",  lon: -74.0,  lat: 40.7,  color: "#34d399" },
  { name: "Tokyo",     lon: 139.7,  lat: 35.7,  color: "#a78bfa" },
  { name: "London",    lon: -0.1,   lat: 51.5,  color: "#f87171" },
  { name: "Sydney",    lon: 151.2,  lat: -33.9, color: "#60a5fa" },
  { name: "Dubai",     lon: 55.3,   lat: 25.2,  color: "#fbbf24" },
  { name: "São Paulo", lon: -46.6,  lat: -23.5, color: "#34d399" },
  { name: "Mumbai",    lon: 72.8,   lat: 19.1,  color: "#60a5fa" },
];

function hexToRgba(hex, a) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function project(lon, lat, w, h) {
  const x      = ((lon + 180) / 360) * w;
  const latRad = (lat * Math.PI) / 180;
  const mercN  = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y      = h / 2 - (w * mercN) / (2 * Math.PI);
  return { x, y };
}

// ─── Fleet Map component
function FleetMap() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const routes    = useRef(
    CITIES.map((city) => ({ city, t: Math.random(), speed: 0.002 + Math.random() * 0.002, dir: 1 }))
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = canvas.parentElement.clientWidth;
      canvas.height = 300;
    };
    resize();
    window.addEventListener("resize", resize);

    const drawGrid = (w, h) => {
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth   = 1;
      for (let lon = -180; lon <= 180; lon += 30) {
        const p1 = project(lon, 85,  w, h);
        const p2 = project(lon, -85, w, h);
        ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
      }
      for (let lat = -60; lat <= 75; lat += 30) {
        const p1 = project(-180, lat, w, h);
        const p2 = project(180,  lat, w, h);
        ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
      }
    };

    const drawRoute = (from, to, t, color, w, h) => {
      const p1 = project(from.lon, from.lat, w, h);
      const p2 = project(to.lon,   to.lat,   w, h);
      const mx = (p1.x + p2.x) / 2;
      const my = (p1.y + p2.y) / 2 - 55;

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.quadraticCurveTo(mx, my, p2.x, p2.y);
      ctx.strokeStyle = hexToRgba(color, 0.15);
      ctx.lineWidth   = 1.5;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Moving orb along bezier
      const bx = (1 - t) ** 2 * p1.x + 2 * (1 - t) * t * mx + t ** 2 * p2.x;
      const by = (1 - t) ** 2 * p1.y + 2 * (1 - t) * t * my + t ** 2 * p2.y;

      const grd = ctx.createRadialGradient(bx, by, 0, bx, by, 8);
      grd.addColorStop(0, hexToRgba(color, 0.8));
      grd.addColorStop(1, hexToRgba(color, 0));
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(bx, by, 8,  0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(bx, by, 3, 0, Math.PI * 2); ctx.fill();
    };

    const drawCity = (city, w, h) => {
      const p     = project(city.lon, city.lat, w, h);
      const pulse = (Date.now() % 2000) / 2000;
      const pr    = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 14 * pulse);
      pr.addColorStop(0, hexToRgba(city.color, 0.3 * (1 - pulse)));
      pr.addColorStop(1, hexToRgba(city.color, 0));
      ctx.fillStyle = pr;
      ctx.beginPath(); ctx.arc(p.x, p.y, 14, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle   = city.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.lineWidth   = 1;
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font      = "600 9px Outfit, sans-serif";
      ctx.fillText(city.name, p.x + 7, p.y + 3);
    };

    const drawHub = (w, h) => {
      const p     = project(HUB.lon, HUB.lat, w, h);
      const pulse = (Date.now() % 1500) / 1500;
      const pr    = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 18 * pulse);
      pr.addColorStop(0, `rgba(37,99,235,${0.4 * (1 - pulse)})`);
      pr.addColorStop(1, "rgba(37,99,235,0)");
      ctx.fillStyle = pr;
      ctx.beginPath(); ctx.arc(p.x, p.y, 18, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle   = "#2563eb";
      ctx.beginPath(); ctx.arc(p.x, p.y, 6,  0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.8)";
      ctx.lineWidth   = 1.5;
      ctx.stroke();
      ctx.fillStyle = "#fff";
      ctx.font      = "bold 9px Outfit, sans-serif";
      ctx.fillText("HUB", p.x + 9, p.y + 3);
    };

    const animate = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, "#0a1628");
      bg.addColorStop(1, "#0d1117");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      drawGrid(w, h);
      routes.current.forEach((r) => {
        drawRoute(HUB, r.city, r.t, r.city.color, w, h);
        r.t += r.speed * r.dir;
        if (r.t > 1) { r.t = 1; r.dir = -1; }
        if (r.t < 0) { r.t = 0; r.dir =  1; }
      });
      CITIES.forEach((c) => drawCity(c, w, h));
      drawHub(w, h);

      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full block" />;
}

// ─── Sub-components
function SummaryCard({ label, value, color, icon }) {
  return (
    <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 font-body">
      <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold mb-2">{label}</p>
      <div className="flex items-center gap-2">
        <p className={`text-3xl font-display font-black leading-none ${color}`}>{value}</p>
        {icon}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide font-body ${STATUS_STYLES[status] ?? "bg-zinc-800 text-zinc-400"}`}>
      {status}
    </span>
  );
}

function ShipmentRow({ id, destination, status, eta, carrier }) {
  return (
    <tr className="hover:bg-zinc-800/50 transition-colors font-body">
      <td className="p-4 font-mono text-blue-400 text-sm">{id}</td>
      <td className="p-4 text-sm">{destination}</td>
      <td className="p-4"><StatusBadge status={status} /></td>
      <td className="p-4 text-zinc-400 text-sm">{eta}</td>
      <td className="p-4 text-right">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-zinc-800">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 bg-zinc-900 border-zinc-800 text-zinc-100 shadow-xl">
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-bold text-zinc-500 px-2 py-1 uppercase">Carrier: {carrier}</p>
              <Button variant="ghost" className="justify-start text-sm h-8">View Route</Button>
              <Button variant="ghost" className="justify-start text-sm h-8 text-red-400 hover:text-red-300">Flag Incident</Button>
            </div>
          </PopoverContent>
        </Popover>
      </td>
    </tr>
  );
}

// ─── Main
export default function ShippingDashboard() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 space-y-6 font-body">
      <style>{fontStyle}</style>

      {/* HEADER */}
      <header className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-4">
          <Truck className="h-8 w-8 text-blue-500" />
          <Menubar className="bg-zinc-900 border-zinc-800">
            <MenubarMenu>
              <MenubarTrigger className="focus:bg-zinc-800 font-body">System</MenubarTrigger>
              <MenubarContent className="bg-zinc-900 text-zinc-100 border-zinc-800 font-body">
                <MenubarItem>Network Status</MenubarItem>
                <MenubarSeparator className="bg-zinc-800" />
                <MenubarItem>API Logs</MenubarItem>
                <MenubarItem>Export Data (.csv)</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>

        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex gap-8">
            {NAV_LINKS.map((link) => (
              <NavigationMenuItem key={link}>
                <NavigationMenuLink className={`text-sm font-semibold font-body cursor-pointer transition-colors
                  ${link === "Shipments" ? "text-white underline underline-offset-4" : "text-zinc-400 hover:text-white"}`}>
                  {link}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Button variant="outline" className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800 font-body">
          Sign Out
        </Button>
      </header>

      <main className="max-w-6xl mx-auto space-y-6">
        {/* SUMMARY CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SUMMARY_CARDS.map((card) => <SummaryCard key={card.label} {...card} />)}
        </section>

        {/* FLEET MAP */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
            <h2 className="text-sm font-display tracking-wide flex items-center gap-2">
              <Radio className="h-4 w-4 text-blue-400" />
              Global Fleet Map
            </h2>
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-green-400 bg-green-900/20 border border-green-900/40 px-2.5 py-1 rounded-full font-body">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              LIVE
            </span>
          </div>
          <FleetMap />
        </section>

        {/* DATA TABLE */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
            <h2 className="text-lg font-bold font-display tracking-wide flex items-center gap-2">
              <Package className="h-5 w-5 text-zinc-400" />
              Recent Shipments
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-body">
                  Create New Shipment
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 font-body">
                <DialogHeader>
                  <DialogTitle className="font-display">Manifest Details</DialogTitle>
                  <DialogDescription className="text-zinc-400">
                    Enter destination and carrier details to generate a tracking ID.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-3 text-sm">
                  {["Destination Address...", "Weight (kg)"].map((placeholder) => (
                    <div key={placeholder} className="h-10 w-full bg-zinc-800 rounded border border-zinc-700 px-3 flex items-center text-zinc-500">
                      {placeholder}
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-blue-600 font-body">Generate Label</Button>
              </DialogContent>
            </Dialog>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-950/50 text-zinc-500 text-[10px] uppercase tracking-widest font-body">
                {["ID", "Destination", "Status", "ETA", "Actions"].map((h, i) => (
                  <th key={h} className={`p-4 font-semibold ${i === 4 ? "text-right" : ""}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {SHIPMENTS.map((s) => <ShipmentRow key={s.id} {...s} />)}
            </tbody>
          </table>

          <div className="p-4 border-t border-zinc-800">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" className="hover:bg-zinc-800 text-zinc-400 font-body" />
                </PaginationItem>
                {[1, 2].map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === 1}
                      className={page === 1 ? "bg-blue-600 border-blue-600 font-body" : "hover:bg-zinc-800 border-zinc-800 font-body"}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext href="#" className="hover:bg-zinc-800 text-zinc-400 font-body" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </section>
      </main>
    </div>
  );
}
