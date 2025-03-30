"use client";
import { ExpandingCircleMenu } from "@/nyxui/components/ExpandingCircleMenu";
import {
  Home,
  Settings,
  User,
  Bell,
  Search,
  Mail,
  Heart,
  Star,
  Bookmark,
  Share,
} from "lucide-react";

export function ExpandingCircleMenuDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      {/* Primary (Blue) Menu - Bottom Right */}
      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Primary (Blue) - <span className="text-blue-600">Bottom Right</span>
        </div>
        <div className="relative h-80 w-80 border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden bg-white dark:bg-zinc-900">
          <ExpandingCircleMenu
            items={[
              {
                icon: <Home size={20} />,
                label: "Home",
                onClick: () => alert("Home clicked"),
              },
              {
                icon: <Settings size={20} />,
                label: "Settings",
                onClick: () => alert("Settings clicked"),
              },
              {
                icon: <User size={20} />,
                label: "Profile",
                onClick: () => alert("Profile clicked"),
              },
              {
                icon: <Bell size={20} />,
                label: "Notifications",
                onClick: () => alert("Notifications clicked"),
              },
              {
                icon: <Search size={20} />,
                label: "Search",
                onClick: () => alert("Search clicked"),
              },
            ]}
            config={{
              position: "bottom-right",
              color: "rgb(59, 130, 246)",
              hoverColor: "rgb(37, 99, 235)",
              size: 48,
              initiallyOpen: true,
              containedMode: true,
            }}
            className="m-4"
          />
        </div>
      </div>

      {/* Purple Menu - Center */}
      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Purple - <span className="text-purple-600">Center Position</span>
        </div>
        <div className="relative h-80 w-80 border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden bg-white dark:bg-zinc-900">
          <ExpandingCircleMenu
            items={[
              {
                icon: <Mail size={20} />,
                label: "Mail",
                onClick: () => alert("Mail clicked"),
              },
              {
                icon: <Heart size={20} />,
                label: "Favorites",
                onClick: () => alert("Favorites clicked"),
              },
              {
                icon: <Star size={20} />,
                label: "Star",
                onClick: () => alert("Star clicked"),
              },
              {
                icon: <Bookmark size={20} />,
                label: "Bookmark",
                onClick: () => alert("Bookmark clicked"),
              },
              {
                icon: <Share size={20} />,
                label: "Share",
                onClick: () => alert("Share clicked"),
              },
              {
                icon: <Settings size={20} />,
                label: "Settings",
                onClick: () => alert("Settings clicked"),
              },
            ]}
            config={{
              position: "center",
              color: "rgb(168, 85, 247)",
              hoverColor: "rgb(147, 51, 234)",
              size: 48,
              initiallyOpen: true,
              containedMode: true,
            }}
          />
        </div>
      </div>

      {/* Green Menu - Top Left with Arc */}
      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Green - <span className="text-green-600">Top Left with Arc</span>
        </div>
        <div className="relative h-80 w-80 border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden bg-white dark:bg-zinc-900">
          <ExpandingCircleMenu
            items={[
              {
                icon: <Home size={20} />,
                label: "Home",
                onClick: () => alert("Home clicked"),
              },
              {
                icon: <Settings size={20} />,
                label: "Settings",
                onClick: () => alert("Settings clicked"),
              },
              {
                icon: <User size={20} />,
                label: "Profile",
                onClick: () => alert("Profile clicked"),
              },
            ]}
            config={{
              position: "top-left",
              color: "rgb(34, 197, 94)",
              hoverColor: "rgb(22, 163, 74)",
              size: 48,
              initiallyOpen: true,
              containedMode: true,
              startAngle: 0,
              endAngle: 180,
            }}
            className="m-4"
          />
        </div>
      </div>

      {/* Red Menu - Top Right with Backdrop */}
      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Red - <span className="text-red-600">Top Right with Backdrop</span>
        </div>
        <div className="relative h-80 w-80 border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden bg-white dark:bg-zinc-900">
          <ExpandingCircleMenu
            items={[
              {
                icon: <Mail size={20} />,
                label: "Mail",
                onClick: () => alert("Mail clicked"),
              },
              {
                icon: <Heart size={20} />,
                label: "Favorites",
                onClick: () => alert("Favorites clicked"),
              },
              {
                icon: <Star size={20} />,
                label: "Star",
                onClick: () => alert("Star clicked"),
              },
              {
                icon: <Bookmark size={20} />,
                label: "Bookmark",
                onClick: () => alert("Bookmark clicked"),
              },
            ]}
            config={{
              position: "top-right",
              color: "rgb(239, 68, 68)",
              hoverColor: "rgb(220, 38, 38)",
              size: 48,
              initiallyOpen: true,
              containedMode: true,
              backdrop: true,
            }}
            className="m-4"
          />
        </div>
      </div>

      {/* Custom Colors - Bottom Left with Individual Colors */}
      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Custom - <span className="text-neutral-600">Bottom Left with Individual Colors</span>
        </div>
        <div className="relative h-80 w-80 border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden bg-white dark:bg-zinc-900">
          <ExpandingCircleMenu
            items={[
              {
                icon: <Mail size={20} />,
                label: "Mail",
                color: "rgb(239, 68, 68)",
                onClick: () => alert("Mail clicked"),
              },
              {
                icon: <Heart size={20} />,
                label: "Favorites",
                color: "rgb(34, 197, 94)",
                onClick: () => alert("Favorites clicked"),
              },
              {
                icon: <Star size={20} />,
                label: "Star",
                color: "rgb(234, 179, 8)",
                onClick: () => alert("Star clicked"),
              },
              {
                icon: <Bookmark size={20} />,
                label: "Bookmark",
                color: "rgb(59, 130, 246)",
                onClick: () => alert("Bookmark clicked"),
              },
            ]}
            config={{
              position: "bottom-left",
              color: "rgb(75, 85, 99)",
              hoverColor: "rgb(55, 65, 81)",
              size: 48,
              initiallyOpen: true,
              containedMode: true,
              showLabelOnHover: true,
            }}
            className="m-4"
          />
        </div>
      </div>

      {/* Teal - Custom Animation & Spacing */}
      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Teal - <span className="text-teal-600">Custom Animation & Spacing</span>
        </div>
        <div className="relative h-80 w-80 border border-gray-200 dark:border-zinc-700 rounded-lg overflow-hidden bg-white dark:bg-zinc-900">
          <ExpandingCircleMenu
            items={[
              {
                icon: <Home size={20} />,
                label: "Home",
                onClick: () => alert("Home clicked"),
              },
              {
                icon: <Settings size={20} />,
                label: "Settings",
                onClick: () => alert("Settings clicked"),
              },
              {
                icon: <User size={20} />,
                label: "Profile",
                onClick: () => alert("Profile clicked"),
              },
              {
                icon: <Bell size={20} />,
                label: "Notifications",
                onClick: () => alert("Notifications clicked"),
              },
            ]}
            config={{
              position: "bottom-right",
              color: "rgb(20, 184, 166)",
              hoverColor: "rgb(13, 148, 136)",
              size: 48,
              distance: 60,
              animationDuration: 500,
              initiallyOpen: true,
              containedMode: true,
              startAngle: 180,
              endAngle: 360,
            }}
            className="m-4"
          />
        </div>
      </div>
    </div>
  );
}
