import React from 'react';
import { Lightbulb, ChevronRight, BookOpen, Coffee, MessageSquare } from "lucide-react";

export default function DocsSidebar() {
  const sections = [
    { id: "introduction", name: "Introduction", icon: <BookOpen className="size-4" /> },
    { id: "faq", name: "FAQ", icon: <MessageSquare className="size-4" /> },
    { id: "philosophy", name: "Philosophy", icon: <Lightbulb className="size-4" /> },
  ];

  return (
    <aside className="hidden text-sm xl:block">
      <div className="sticky right-0 top-16 w-64">
        <div className="relative overflow-hidden rounded-xl">
          <div className="space-y-6 p-3 overflow-y-auto">
            <div className="space-y-4">
              <p className="font-semibold text-base tracking-tight border-b pb-2 mb-1">On This Page</p>
              <ul className="list-none m-0 space-y-3">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex items-center gap-2 rounded-md py-1 px-2 font-medium no-underline text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 dark:text-gray-300 dark:hover:bg-gray-800/70 dark:hover:text-white"
                    >
                      {section.icon}
                      <span>{section.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full flex-col items-center justify-center gap-3 rounded-xl bg-gradient-to-br from-purple-500 via-violet-500 to-pink-500 p-4 text-center font-medium shadow-md hover:shadow-lg transition-all duration-300 ease-out transform hover:-translate-y-1"
                href="#"
              >
                <div className="flex items-center justify-center bg-white/10 rounded-full p-2 mb-1">
                  <Coffee className="size-5 text-white" />
                </div>
                <h2 className="text-xl font-bold font-display tracking-tight text-white">
                  Coming Soon
                </h2>
                <p className="text-sm text-white/90">
                  ✨ Portfolio Template
                  <ChevronRight className="size-4 ml-1 transition-all duration-300 ease-out group-hover:translate-x-1 inline-block" />
                </p>
                <div className="w-full overflow-hidden rounded-lg shadow-lg ring-1 ring-white/20">
                  <div className="relative aspect-video w-full bg-gray-900">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        src="/saas.mp4"
                        className="w-full h-full object-cover rounded-lg"
                      ></video>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}