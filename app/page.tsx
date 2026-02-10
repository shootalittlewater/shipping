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

export default function GenericComponentPage() {
  return (
    <div className="min-h-screen bg-background p-8 space-y-8">
      
  {/* 1. Menubar: Typically for App-level actions */}
      <header className="border-b pb-4">
        <Menubar className="w-fit">
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New Tab</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Undo</MenubarItem>
              <MenubarItem>Redo</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </header>    

      {/* 2. Navigation Menu: Main Site Navigation */}
      <nav className="flex justify-center">
        <NavigationMenu>
          <NavigationMenuList className="gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink className="font-medium hover:text-primary cursor-pointer">
                Dashboard
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="font-medium hover:text-primary cursor-pointer">
                Analytics
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="font-medium hover:text-primary cursor-pointer">
                Settings
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      <main className="max-w-4xl mx-auto space-y-12 py-10">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Component Integration</h1>
          <p className="text-muted-foreground">
            Mixing overlays, menus, and navigation in a single view.
          </p>
        </section>

        {/* 3. & 4. Button & Dialog: Primary Actions */}
        <section className="flex flex-col items-center gap-4 p-10 border rounded-xl bg-card">
          <h2 className="text-xl font-semibold">User Actions</h2>
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default">Open Action Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-3 mt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button variant="destructive">Confirm</Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* 5. Popover: For small contextual info */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">View Quick Info</Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="space-y-2">
                  <h4 className="font-medium">System Status</h4>
                  <p className="text-sm text-muted-foreground">
                    All systems are operational. Last sync was 2 minutes ago.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </section>

        {/* 6. Pagination: Data Navigation */}
        <section className="pt-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </section>
      </main>
    </div>
  );
}