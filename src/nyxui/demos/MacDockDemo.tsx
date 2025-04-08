"use client";
import { useState, useEffect } from "react";
import { MacDock } from "@/nyxui/components/MacDock";

export const MacDockDemo = () => {
  const [activeApp, setActiveApp] = useState("Finder");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleAppClick = (appName: string) => {
    setActiveApp(appName);
    console.log(`Opening ${appName}`);
  };

  const allDockApps = [
    {
      id: "1",
      name: "Finder",
      iconSrc:
        "https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853981255cc36b3a37af_finder.png",
      isActive: activeApp === "Finder",
      onClick: () => handleAppClick("Finder"),
    },
    {
      id: "5",
      name: "Notes",
      iconSrc:
        "https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853c849ec3735b52cef9_notes.png",
      isActive: activeApp === "Notes",
      onClick: () => handleAppClick("Notes"),
    },
    {
      id: "6",
      name: "Reminders",
      iconSrc:
        "https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853d44d99641ce69afeb_reminders.png",
      isActive: activeApp === "Reminders",
      onClick: () => handleAppClick("Reminders"),
    },
    {
      id: "7",
      name: "Photos",
      iconSrc:
        "https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853c55558a2e1192ee09_photos.png",
      isActive: activeApp === "Photos",
      onClick: () => handleAppClick("Photos"),
    },
    {
      id: "10",
      name: "Music",
      iconSrc:
        "https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853ba0782d6ff2aca6b3_music.png",
      isActive: activeApp === "Music",
      onClick: () => handleAppClick("Music"),
    },
    {
      id: "11",
      name: "Podcasts",
      iconSrc:
        "https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853cc718ba9ede6888f9_podcasts.png",
      isActive: activeApp === "Podcasts",
      onClick: () => handleAppClick("Podcasts"),
    },
    {
      id: "13",
      name: "App Store",
      iconSrc:
        "https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853270b5e2ccfd795b49_appstore.png",
      isActive: activeApp === "App Store",
      onClick: () => handleAppClick("App Store"),
    },
    {
      id: "14",
      name: "Safari",
      iconSrc:
        "https://uploads-ssl.webflow.com/5f7081c044fb7b3321ac260e/5f70853ddd826358438eda6d_safari.png",
      isActive: activeApp === "Safari",
      onClick: () => handleAppClick("Safari"),
    },
    {
      id: "15",
      name: "Bin",
      iconSrc:
        "https://findicons.com/files/icons/569/longhorn_objects/128/trash.png",
      isSeparator: true,
      isActive: activeApp === "Bin",
      onClick: () => handleAppClick("Bin"),
    },
  ];

  const dockApps = isMobile ? allDockApps.slice(0, 5) : allDockApps;

  return (
    <main className="relative w-full flex flex-col items-center justify-center p-6">
      <div className="bg-white/30 backdrop-blur-lg p-6 rounded-xl shadow-xl mb-8 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600">
        <h1 className="text-2xl font-bold text-white mb-2">
          Active Application: {activeApp}
        </h1>
        <p className="text-white/90">
          Click any icon in the dock to switch applications.
        </p>
      </div>
      <MacDock apps={dockApps} />
    </main>
  );
}