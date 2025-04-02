'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Minus } from 'lucide-react';

interface CategoryItem {
  name: string;
  href: string;
  isNew?: boolean; // Added isNew property
}

interface CategoryType {
  category: string;
  items: CategoryItem[];
}

interface ComponentSidebarClientProps {
  categories: CategoryType[];
}

export const ComponentSidebarClient: React.FC<ComponentSidebarClientProps> = ({ categories }) => {
  const currentPath = usePathname();
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    
    if (!scrollContainer) return;
    
    let scrollTimer: NodeJS.Timeout;
    
    const handleScroll = () => {
      setIsScrolling(true);
      
      // Clear the existing timer
      clearTimeout(scrollTimer);
      
      // Set a new timer to hide the scrollbar after scrolling stops
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };
    
    scrollContainer.addEventListener('scroll', handleScroll);
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      clearTimeout(scrollTimer);
    };
  }, []);
  
  return (
    <div
      ref={scrollContainerRef}
      className={cn(
        "h-full overflow-y-auto transition-all duration-300",
        isScrolling
          ? "pr-2  hide-scrollbar scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/30"
          : "pr-4 scrollbar-no"
      )}
    >
      <div className="space-y-8 hide-scrollbar">
        {categories.map((category) => {
          return (
            <div key={category.category} className="space-y-3">
              <div className="text-xs font-bold text-primary/80 dark:text-primary/70 uppercase tracking-wider px-2">
                {category.category}
              </div>
              <div className="space-y-0.5">
                {category.items.map((item) => {
                  const isActive = currentPath === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex items-center w-full text-sm py-2 rounded-md transition-all duration-200",
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      {isActive && (
                        <Minus className="mr-1 text-blue-500" size={24} fill="#3455eb" style={{ transform: 'rotate(90deg)' }} />
                      )}
                      <span className={cn(
                        "truncate",
                        isActive ? "ml-0" : "ml-4 group-hover:ml-2 transition-all duration-200"
                      )}>
                        {item.name}
                      </span>
                      
                      {/* NEW badge */}
                      {item.isNew && (
                        <span className="ml-2 px-1.5 py-0.5 text-xs font-medium border-2 border-blue-500 text-blue-500 dark:text-white rounded-md">
                          New
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
