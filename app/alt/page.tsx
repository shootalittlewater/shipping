import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Package, Truck, AlertCircle, MoreHorizontal } from "lucide-react";

const shipments = [
  { id: "SHP-7721", destination: "Berlin, DE", status: "In Transit", eta: "2026-02-05", carrier: "DHL" },
  { id: "SHP-8840", destination: "New York, US", status: "Delivered", eta: "2026-02-01", carrier: "FedEx" },
  { id: "SHP-1209", destination: "Tokyo, JP", status: "Processing", eta: "2026-02-10", carrier: "UPS" },
  { id: "SHP-4432", destination: "London, UK", status: "Delayed", eta: "2026-02-08", carrier: "Royal Mail" },
];

export default function ShippingDashboard() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 space-y-6">
      
      {/* GLOBAL UTILITIES */}
      <header className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-4">
          <Truck className="h-8 w-8 text-blue-500" />
          <Menubar className="bg-zinc-900 border-zinc-800">
            <MenubarMenu>
              <MenubarTrigger className="focus:bg-zinc-800">System</MenubarTrigger>
              <MenubarContent className="bg-zinc-900 text-zinc-100 border-zinc-800">
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
            <NavigationMenuItem>
              <NavigationMenuLink className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer">
                Fleet Map
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="text-sm font-medium text-white cursor-pointer underline underline-offset-4">
                Shipments
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer">
                Inventory
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Button variant="outline" className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800">
          Sign Out
        </Button>
      </header>

      <main className="max-w-6xl mx-auto space-y-6">
        {/* SUMMARY CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Active Shipments</p>
            <p className="text-2xl font-bold mt-1">1,284</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">In Transit</p>
            <p className="text-2xl font-bold mt-1 text-blue-400">942</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Delays</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold mt-1 text-red-400">12</p>
              <AlertCircle className="h-5 w-5 text-red-400 mt-1" />
            </div>
          </div>
        </section>

        {/* DATA TABLE */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Package className="h-5 w-5 text-zinc-400" />
              Recent Shipments
            </h2>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Create New Shipment
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                <DialogHeader>
                  <DialogTitle>Manifest Details</DialogTitle>
                  <DialogDescription className="text-zinc-400">
                    Enter the destination and carrier details to generate a tracking ID.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4 text-sm">
                  <div className="h-10 w-full bg-zinc-800 rounded border border-zinc-700 px-3 flex items-center">Destination Address...</div>
                  <div className="h-10 w-full bg-zinc-800 rounded border border-zinc-700 px-3 flex items-center">Weight (kg)</div>
                </div>
                <Button className="w-full bg-blue-600">Generate Label</Button>
              </DialogContent>
            </Dialog>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-950/50 text-zinc-500 text-xs uppercase tracking-widest">
                <th className="p-4 font-semibold">ID</th>
                <th className="p-4 font-semibold">Destination</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">ETA</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-sm">
              {shipments.map((ship) => (
                <tr key={ship.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="p-4 font-mono text-blue-400">{ship.id}</td>
                  <td className="p-4">{ship.destination}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      ship.status === 'Delivered' ? 'bg-green-900/30 text-green-400' :
                      ship.status === 'Delayed' ? 'bg-red-900/30 text-red-400' : 'bg-blue-900/30 text-blue-400'
                    }`}>
                      {ship.status}
                    </span>
                  </td>
                  <td className="p-4 text-zinc-400">{ship.eta}</td>
                  <td className="p-4 text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-zinc-800">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-48 bg-zinc-900 border-zinc-800 text-zinc-100 shadow-xl">
                        <div className="flex flex-col gap-1">
                          <p className="text-xs font-bold text-zinc-500 px-2 py-1 uppercase">Carrier: {ship.carrier}</p>
                          <Button variant="ghost" className="justify-start text-sm h-8">View Route</Button>
                          <Button variant="ghost" className="justify-start text-sm h-8 text-red-400 hover:text-red-300">Flag Incident</Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="p-4 border-t border-zinc-800">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" className="hover:bg-zinc-800 text-zinc-400" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive className="bg-blue-600 border-blue-600">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" className="hover:bg-zinc-800 border-zinc-800">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" className="hover:bg-zinc-800 text-zinc-400" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </section>
      </main>
    </div>
  );
}