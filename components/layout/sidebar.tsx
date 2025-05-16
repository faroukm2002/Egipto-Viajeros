"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ChevronLeft, 
  Home, 
  Building, 
  Sailboat, 
  Compass, 
  FileText, 
  Star, 
  MessageSquare, 
  Package, 
  HelpCircle, 
  Newspaper, 
  Mail, 
  Settings as SettingsIcon 
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  
  const sidebarLinks = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Hotels', path: '/hotels', icon: Building },
    { name: 'Yachts', path: '/yachts', icon: Sailboat },
    { name: 'Tours', path: '/tours', icon: Compass },
    { name: 'Articles', path: '/articles', icon: FileText },
    { name: 'Reviews', path: '/reviews', icon: Star },
    { name: 'Inquiries', path: '/inquiries', icon: MessageSquare },
    { name: 'Packages', path: '/packages', icon: Package },
    { name: 'FAQs', path: '/faqs', icon: HelpCircle },
    { name: 'News', path: '/news', icon: Newspaper },
    { name: 'Emails', path: '/emails', icon: Mail },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col border-r bg-background transition-all duration-300",
        open ? "w-64" : "w-[70px]"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        {open ? (
          <span className="flex items-center">
            <Compass className="h-6 w-6 text-primary mr-2" />
            <span className="font-semibold">Egipto Viajeros</span>
          </span>
        ) : (
          <Compass className="h-6 w-6 text-primary mx-auto" />
        )}
        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:flex"
          onClick={() => setOpen(!open)}
        >
          <ChevronLeft className={cn("h-5 w-5 transition-all", !open && "rotate-180")} />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>
      <ScrollArea className="flex flex-col flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {sidebarLinks.map((link) => (
            <Button
              key={link.path}
              asChild
              variant={pathname === link.path ? "secondary" : "ghost"}
              size={open ? "default" : "icon"}
              className={cn(
                "justify-start",
                !open && "justify-center",
                pathname === link.path && "bg-secondary text-secondary-foreground"
              )}
            >
              <Link href={link.path}>
                <link.icon className={cn("h-5 w-5", open && "mr-2")} />
                {open && <span>{link.name}</span>}
              </Link>
            </Button>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}