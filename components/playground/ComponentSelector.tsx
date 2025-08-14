"use client"

import type React from "react"

import { motion } from "motion/react"
import { ChevronDown, Grid3X3, Check, Search } from "lucide-react"
import type { ComponentRegistry } from "./types"
import { useState, useEffect, useRef } from "react"

interface ComponentSelectorProps {
  components: ComponentRegistry
  selectedComponent: string
  onSelect: (componentKey: string) => void
}

const ComponentSelector = ({ components, selectedComponent, onSelect }: ComponentSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const componentEntries = Object.entries(components)
  const selectedComponentData = components[selectedComponent]

  const filteredComponents = componentEntries.filter(
    ([key, component]) =>
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      key.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
    setHighlightedIndex(-1)
  }, [isOpen])

  useEffect(() => {
    if (filteredComponents.length > 0) {
      setHighlightedIndex(0)
    } else {
      setHighlightedIndex(-1)
    }
  }, [searchQuery, filteredComponents.length])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault()
        setHighlightedIndex((prev) => (prev < filteredComponents.length - 1 ? prev + 1 : 0))
        break
      case "ArrowUp":
        event.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filteredComponents.length - 1))
        break
      case "Enter":
        event.preventDefault()
        const indexToSelect = highlightedIndex >= 0 ? highlightedIndex : 0
        if (filteredComponents.length > 0 && indexToSelect < filteredComponents.length) {
          const [key] = filteredComponents[indexToSelect]
          onSelect(key)
          setIsOpen(false)
          setSearchQuery("")
        }
        break
      case "Escape":
        setIsOpen(false)
        setSearchQuery("")
        break
    }
  }

  const handleToggleDropdown = () => {
    if (isOpen) {
      setSearchQuery("")
    }
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="border border-border shadow-sm">
        <button
          onClick={handleToggleDropdown}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors rounded-sm"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md">
              <Grid3X3 className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-medium text-sm block truncate">
                {selectedComponentData ? selectedComponentData.name : "Select a Component"}
              </span>
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 ml-2 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-sm shadow-lg z-50 max-h-80 overflow-hidden"
          >
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div className="overflow-y-auto max-h-64">
              <div className="p-2">
                {filteredComponents.length > 0 ? (
                  filteredComponents.map(([key, component], index) => (
                    <motion.button
                      key={key}
                      onClick={() => {
                        onSelect(key)
                        setIsOpen(false)
                        setSearchQuery("")
                      }}
                      className={`w-full text-left p-3 rounded-md transition-all duration-200 ${
                        selectedComponent === key
                          ? "bg-primary/10 border border-primary/30 text-primary"
                          : highlightedIndex === index
                            ? "bg-muted border border-border text-foreground"
                            : "hover:bg-muted/50 border border-transparent hover:border-border text-muted-foreground hover:text-foreground"
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium text-sm truncate">{component.name}</h4>
                        </div>
                        {selectedComponent === key && <Check className="w-4 h-4 text-primary flex-shrink-0 ml-2" />}
                      </div>
                    </motion.button>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Search className="w-8 h-8 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No components found</p>
                    <p className="text-xs mt-1">Try a different search term</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {componentEntries.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Grid3X3 className="w-8 h-8 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No components available</p>
        </div>
      )}
    </div>
  )
}

export default ComponentSelector
