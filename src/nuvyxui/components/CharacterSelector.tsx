"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  CSSProperties,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Undo2, Plus, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export type Character = {
  id: string;
  name: string;
  image: string;
  category?: string;
  demoImage?: string;
};

export type CharacterSelectorProps = {
  cardsCount?: number;
  cardImage?: string;
  characterImages: Character[];
  demoImage?: string;
  gridColumns?: number;
  multiSelect?: boolean;
  enableSearch?: boolean;
  lazyLoad?: boolean;
  animationType?: "fade" | "slide" | "scale" | "none";
  enableConfirmation?: boolean;
  enableReset?: boolean;
  customClass?: string;
  cardHeight?: string | number;
  cardWidth?: string | number;
  dialogCardHeight?: string | number;
  dialogCardWidth?: string | number;
  cardBorderRadius?: string | number;
  cardGap?: string | number;
  displayMode?: "grid" | "flex";
  cardAspectRatio?: string;
  hoverEffect?: "scale" | "glow" | "lift" | "none";
  selectedEffect?: "border" | "overlay" | "checkmark" | "multiple";
  backgroundColor?: string;
  textColor?: string;
  imageObjectFit?: "cover" | "contain" | "fill" | "none";
  shadowEffect?: "none" | "subtle" | "medium" | "strong";
  selectionIndicatorPosition?:
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";
  selectionIndicatorSize?: string | number;
  animationDuration?: number;
  cardPadding?: string | number;
  gridAutoFlow?: "row" | "column" | "dense";
  gridAutoRows?: string;
  gridAutoColumns?: string;
  enableCardShadow?: boolean;
  enableCardBorder?: boolean;
  borderColor?: string;
  nameVisibility?: "always" | "hover" | "selected" | "never";
  emptyCardStyle?: "minimal" | "dashed" | "highlighted" | "custom";
  cancelButtonText?: string;
  confirmButtonText?: string;
  resetButtonText?: string;
  dialogTitle?: string;
  noResultsText?: string;
  clearFiltersText?: string;
  searchPlaceholder?: string;
  showDialogHeader?: boolean;
  showDialogFooter?: boolean;
  showSelectionCount?: boolean;
  maxDialogHeight?: string | number;
  dialogWidth?: string | number;
  onSelectionChange?: (selectedCharacters: Character[]) => void;
  onConfirm?: (selectedCharacters: Character[]) => void;
};

export function CharacterSelector({
  cardsCount = 3,
  cardImage,
  characterImages = [],
  gridColumns = 4,
  multiSelect = true,
  enableSearch = true,
  lazyLoad = true,
  animationType = "fade",
  enableConfirmation = true,
  enableReset = true,
  customClass = "",
  onSelectionChange,
  onConfirm,
  cardHeight = "auto",
  cardWidth = "auto",
  dialogCardHeight = "auto",
  dialogCardWidth = "auto",
  cardBorderRadius = 16,
  cardGap = 16,
  displayMode = "grid",
  cardAspectRatio = "1/1",
  hoverEffect = "scale",
  selectedEffect = "multiple",
  backgroundColor = "",
  textColor = "",
  imageObjectFit = "cover",
  shadowEffect = "medium",
  selectionIndicatorPosition = "topRight",
  selectionIndicatorSize = 24,
  animationDuration = 200,
  cardPadding = 0,
  gridAutoFlow = "row",
  gridAutoRows = "auto",
  gridAutoColumns = "auto",
  enableCardShadow = true,
  enableCardBorder = true,
  borderColor = "",
  nameVisibility = "hover",
  emptyCardStyle = "minimal",
  cancelButtonText = "Cancel",
  confirmButtonText = "Confirm",
  resetButtonText = "Reset",
  dialogTitle = "Select Characters",
  noResultsText = "No characters found",
  clearFiltersText = "Clear filters",
  searchPlaceholder = "Search characters...",
  showDialogHeader = true,
  showDialogFooter = true,
  showSelectionCount = true,
  maxDialogHeight = "90vh",
  dialogWidth = "800px",
}: CharacterSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const visibleItems = 12;

  const filteredCharacters = useMemo(() => {
    return characterImages.filter((character) => {
      return character.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [characterImages, searchQuery]);

  const displayedCharacters = useMemo(() => {
    return lazyLoad
      ? filteredCharacters.slice(0, visibleItems)
      : filteredCharacters;
  }, [filteredCharacters, lazyLoad, visibleItems]);

  const handleSelectCharacter = useCallback(
    (character: Character) => {
      setSelectedCharacters((prev) => {
        const isSelected = prev.some((c) => c.id === character.id);

        if (isSelected) {
          return prev.filter((c) => c.id !== character.id);
        } else {
          if (multiSelect) {
            return [...prev, character];
          } else {
            return [character];
          }
        }
      });
    },
    [multiSelect]
  );

  const handleReset = useCallback(() => {
    setSelectedCharacters([]);
  }, []);

  const handleConfirm = useCallback(() => {
    if (enableConfirmation) {
      setShowConfirmation(true);
    } else {
      onConfirm?.(selectedCharacters);
      setIsOpen(false);
    }
  }, [enableConfirmation, selectedCharacters, onConfirm]);

  const handleFinalConfirm = useCallback(() => {
    onConfirm?.(selectedCharacters);
    setShowConfirmation(false);
    setIsOpen(false);
  }, [selectedCharacters, onConfirm]);

  useEffect(() => {
    onSelectionChange?.(selectedCharacters);
  }, [selectedCharacters, onSelectionChange]);

  const animationVariants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -20, opacity: 0 },
    },
    scale: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.9, opacity: 0 },
    },
    none: {
      initial: {},
      animate: {},
      exit: {},
    },
  };

  const getCardContainerStyle = (): CSSProperties => {
    if (displayMode === "flex") {
      return {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap" as const,
        gap: typeof cardGap === "number" ? `${cardGap}px` : cardGap,
      };
    } else {
      return {
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, minmax(${
          typeof cardWidth === "number" ? `${cardWidth}px` : cardWidth
        }, 1fr))`,
        gap: typeof cardGap === "number" ? `${cardGap}px` : cardGap,
        gridAutoFlow: gridAutoFlow as "row" | "column" | "dense",
        gridAutoRows,
        gridAutoColumns,
      };
    }
  };

  const getShadowClass = () => {
    if (!enableCardShadow) return "";

    switch (shadowEffect) {
      case "subtle":
        return "shadow-sm";
      case "medium":
        return "shadow-md";
      case "strong":
        return "shadow-lg";
      default:
        return "";
    }
  };

  const getHoverEffectClass = () => {
    switch (hoverEffect) {
      case "scale":
        return "hover:scale-105";
      case "glow":
        return "hover:shadow-lg hover:shadow-primary/30";
      case "lift":
        return "hover:-translate-y-1";
      default:
        return "";
    }
  };

  return (
    <div className={cn("character-selector", customClass)}>
      <div style={getCardContainerStyle()}>
        {Array.from({ length: cardsCount }).map((_, index) => (
          <CharacterCard
            key={index}
            character={selectedCharacters[index]}
            onClick={() => setIsOpen(true)}
            showPlus={!selectedCharacters[index]}
            cardImage={cardImage}
            cardHeight={cardHeight}
            cardWidth={cardWidth}
            cardBorderRadius={cardBorderRadius}
            cardPadding={cardPadding}
            cardAspectRatio={cardAspectRatio}
            imageObjectFit={imageObjectFit}
            shadowEffect={getShadowClass()}
            hoverEffectClass={getHoverEffectClass()}
            backgroundColor={backgroundColor}
            enableCardBorder={enableCardBorder}
            borderColor={borderColor}
            emptyCardStyle={emptyCardStyle}
          />
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className={`max-h-[${
            typeof maxDialogHeight === "number"
              ? `${maxDialogHeight}px`
              : maxDialogHeight
          }] flex flex-col bg-gradient-to-b from-background/50 dark:from-background/30 to-muted/30 backdrop-blur-sm border border-gray-500`}
          style={{
            maxWidth:
              typeof dialogWidth === "number"
                ? `${dialogWidth}px`
                : dialogWidth,
          }}
        >
          {showDialogHeader && (
            <DialogHeader className="border-b border-muted/10">
              <DialogTitle className="text-2xl font-bold tracking-tight">
                {dialogTitle}
              </DialogTitle>
            </DialogHeader>
          )}

          <div className="flex flex-col gap-6 flex-1 overflow-hidden py-3">
            {enableSearch && (
              <div className="relative flex-1 mx-4">
                <Search className="absolute left-3 top-1/2 h-5 w-5 transform -translate-y-1/2 opacity-80" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white/20 dark:bg-background/20 dark:text-white dark:placeholder-white transition duration-200"
                />
              </div>
            )}

            <ScrollArea className="h-[400px] p-2">
              <AnimatePresence>
                <motion.div
                  variants={animationVariants[animationType]}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{
                    duration: animationDuration / 1000,
                    staggerChildren: 0.05,
                  }}
                >
                  <CharacterGrid
                    characters={displayedCharacters}
                    selectedCharacters={selectedCharacters}
                    onSelectCharacter={handleSelectCharacter}
                    gridColumns={gridColumns}
                    cardHeight={dialogCardHeight}
                    cardWidth={dialogCardWidth}
                    cardBorderRadius={cardBorderRadius}
                    imageObjectFit={imageObjectFit}
                    selectedEffect={selectedEffect}
                    nameVisibility={nameVisibility}
                    textColor={textColor}
                    selectionIndicatorPosition={selectionIndicatorPosition}
                    selectionIndicatorSize={selectionIndicatorSize}
                    hoverEffect={getHoverEffectClass()}
                    shadowEffect={getShadowClass()}
                  />

                  {filteredCharacters.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-40 text-center">
                      <p className="text-muted-foreground">
                        🔍 {noResultsText}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSearchQuery("");
                        }}
                        className="mt-4 rounded-lg border-muted/30 hover:bg-muted/20"
                      >
                        {clearFiltersText}
                      </Button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </ScrollArea>
          </div>

          {showDialogFooter && (
            <DialogFooter className="flex justify-between sm:justify-between pt-4 border-t border-muted/10">
              <div className="flex gap-2">
                {enableReset && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    disabled={selectedCharacters.length === 0}
                    className="rounded-lg border-muted/30 hover:bg-muted/20"
                  >
                    <Undo2 className="mr-2 h-4 w-4" />
                    {resetButtonText}
                  </Button>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg border-muted/30 hover:bg-muted/20"
                >
                  {cancelButtonText}
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={selectedCharacters.length === 0}
                  className="rounded-lg bg-primary hover:bg-primary/90"
                >
                  {confirmButtonText}{" "}
                  {showSelectionCount &&
                    selectedCharacters.length > 0 &&
                    `(${selectedCharacters.length})`}
                </Button>
              </div>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      {enableConfirmation && (
        <ConfirmationModal
          open={showConfirmation}
          onOpenChange={setShowConfirmation}
          selectedCharacters={selectedCharacters}
          onConfirm={handleFinalConfirm}
          onCancel={() => setShowConfirmation(false)}
          confirmButtonText={confirmButtonText}
          cancelButtonText={cancelButtonText}
        />
      )}
    </div>
  );
}

interface CharacterCardProps {
  character?: Character;
  onClick: () => void;
  showPlus?: boolean;
  cardImage?: string;
  cardHeight?: string | number;
  cardWidth?: string | number;
  cardBorderRadius?: string | number;
  cardPadding?: string | number;
  cardAspectRatio?: string;
  imageObjectFit?: "cover" | "contain" | "fill" | "none";
  shadowEffect?: string;
  hoverEffectClass?: string;
  backgroundColor?: string;
  enableCardBorder?: boolean;
  borderColor?: string;
  emptyCardStyle?: "minimal" | "dashed" | "highlighted" | "custom";
}

function CharacterCard({
  character,
  onClick,
  showPlus = true,
  cardImage,
  cardHeight = "auto",
  cardWidth = "auto",
  cardBorderRadius = 16,
  cardPadding = 0,
  cardAspectRatio = "1/1",
  imageObjectFit = "cover",
  shadowEffect = "",
  hoverEffectClass = "",
  backgroundColor = "",
  enableCardBorder = true,
  borderColor = "",
  emptyCardStyle = "minimal",
}: CharacterCardProps) {
  const cardStyle: CSSProperties = {
    height: typeof cardHeight === "number" ? `${cardHeight}px` : cardHeight,
    width: typeof cardWidth === "number" ? `${cardWidth}px` : cardWidth,
    borderRadius:
      typeof cardBorderRadius === "number"
        ? `${cardBorderRadius}px`
        : cardBorderRadius,
    padding: typeof cardPadding === "number" ? `${cardPadding}px` : cardPadding,
    aspectRatio: cardAspectRatio,
    backgroundColor: backgroundColor || undefined,
    borderColor: borderColor || undefined,
    borderStyle: enableCardBorder
      ? emptyCardStyle === "dashed" && !character
        ? "dashed"
        : "solid"
      : "none",
    borderWidth: enableCardBorder ? "2px" : "0",
  };

  const getEmptyCardStyle = () => {
    if (!character) {
      switch (emptyCardStyle) {
        case "dashed":
          return "border-dashed border-2 border-muted/40";
        case "highlighted":
          return "bg-muted/70";
        case "custom":
          return backgroundColor
            ? ""
            : "bg-gradient-to-br from-muted/20 to-muted/10";
        default:
          return "bg-gradient-to-br from-muted/20 to-muted/5";
      }
    }
    return "";
  };

  return (
    <div className="card-wrapper relative">
      <Card
        className={cn(
          "overflow-hidden cursor-pointer transition-all duration-300 rounded-none relative z-10",
          shadowEffect,
          hoverEffectClass,
          "transition-all",
          getEmptyCardStyle(),
          "border-transparent"
        )}
        style={{ ...cardStyle, position: "relative", zIndex: 1 }}
        onClick={onClick}
      >
        <CardContent className="p-0 relative flex items-center justify-center h-full overflow-hidden group">
          {character ? (
            <div className="w-full h-full border border-gray-500">
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-full flex-grow">
                  <Image
                    src={character.image || "/placeholder.svg"}
                    alt={character.name}
                    width={500}
                    height={500}
                    loading="lazy"
                    quality={100}
                    className={cn("w-full h-full", `object-${imageObjectFit}`)}
                  />
                </div>
                <div className="w-full bg-black absolute bottom-0">
                  <div className="w-full h-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 animate-pulse" />
                    <div className="absolute inset-0 separator-shine" />
                  </div>
                  <h1 className="text-white font-medium text-sm text-center py-3">
                    {character.name}
                  </h1>
                </div>
              </div>
            </div>
          ) : (
            <>
              {cardImage ? (
                <Image
                  src={cardImage || "/placeholder.svg"}
                  alt="Card background"
                  width={500}
                  height={500}
                  loading="lazy"
                  quality={100}
                  className={cn("w-full h-full", `object-${imageObjectFit}`)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="Placeholder"
                    width={80}
                    height={80}
                    loading="lazy"
                    quality={100}
                    className="w-10 h-10 opacity-30"
                  />
                </div>
              )}
              {showPlus && (
                <div className="absolute inset-0 flex items-center border border-gray-500 justify-center bg-white dark:bg-black">
                  <motion.div
                    className="text-primary p-2 "
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="h-10 w-10" />
                  </motion.div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

interface CharacterGridProps {
  characters: Character[];
  selectedCharacters: Character[];
  onSelectCharacter: (character: Character) => void;
  gridColumns?: number;
  cardHeight?: string | number;
  cardWidth?: string | number;
  cardBorderRadius?: string | number;
  imageObjectFit?: "cover" | "contain" | "fill" | "none";
  selectedEffect?: "border" | "overlay" | "checkmark" | "multiple";
  nameVisibility?: "always" | "hover" | "selected" | "never";
  textColor?: string;
  selectionIndicatorPosition?:
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";
  selectionIndicatorSize?: string | number;
  hoverEffect?: string;
  shadowEffect?: string;
}

function CharacterGrid({
  characters,
  selectedCharacters,
  onSelectCharacter,
  gridColumns = 4,
  cardHeight = "auto",
  cardWidth = "auto",
  cardBorderRadius = 16,
  imageObjectFit = "cover",
  selectedEffect = "multiple",
  nameVisibility = "hover",
  textColor = "",
  selectionIndicatorPosition = "topRight",
  selectionIndicatorSize = 24,
  hoverEffect = "",
  shadowEffect = "",
}: CharacterGridProps) {
  const getIndicatorPosition = (position: string) => {
    switch (position) {
      case "topLeft":
        return "top-2 left-2";
      case "topRight":
        return "top-2 right-2";
      case "bottomLeft":
        return "bottom-2 left-2";
      case "bottomRight":
        return "bottom-2 right-2";
      default:
        return "top-2 right-2";
    }
  };

  const showName = (isSelected: boolean) => {
    switch (nameVisibility) {
      case "always":
        return true;
      case "hover":
        return true;
      case "selected":
        return isSelected;
      case "never":
        return false;
      default:
        return true;
    }
  };

  return (
    <motion.div
      className={cn(
        "grid gap-6 p-[14px]",
        gridColumns === 3 && "grid-cols-2 sm:grid-cols-3",
        gridColumns === 4 && "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
        gridColumns === 5 &&
          "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
        gridColumns === 6 &&
          "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      )}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {characters.map((character) => {
        const isSelected = selectedCharacters.some(
          (c) => c.id === character.id
        );
        const cardStyle: CSSProperties = {
          borderRadius:
            typeof cardBorderRadius === "number"
              ? `${cardBorderRadius}px`
              : cardBorderRadius,
          height:
            typeof cardHeight === "number" ? `${cardHeight}px` : cardHeight,
          width: typeof cardWidth === "number" ? `${cardWidth}px` : cardWidth,
        };

        return (
          <motion.div
            key={character.id}
            className={cn(
              "relative aspect-square overflow-hidden cursor-pointer group",
              hoverEffect,
              shadowEffect,
              isSelected
                ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                : "",
              "border-muted/20",
              "rounded-xl border"
            )}
            style={cardStyle}
            onClick={() => onSelectCharacter(character)}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            variants={{
              hidden: {
                opacity: 0,
                y: 20,
                scale: 0.9,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  damping: 12,
                  stiffness: 200,
                },
              },
            }}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectCharacter(character);
              }
            }}
          >
            <div className="flex flex-col items-center justify-center h-full relative group overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md transform transition-all duration-300 hover:scale-105 rounded-sm">
              <div className="w-full h-64 overflow-hidden">
                <Image
                  src={character.demoImage || "/placeholder.svg"}
                  alt={character.name}
                  width={500}
                  height={500}
                  loading="lazy"
                  quality={100}
                  className={`w-full h-full bg-white dark:bg-black object-${imageObjectFit} transition-transform duration-300 group-hover:scale-105`}
                />
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 animate-pulse" />
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-shine" />
              </div>
              <div className="w-full py-1 px-4 bg-gray-900 dark:bg-black">
                <span className="text-white font-medium text-center block text-sm">
                  {character.name}
                </span>
              </div>
            </div>
            {showName(isSelected) && (
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center bg-black/40",
                  nameVisibility === "hover" && !isSelected
                    ? "opacity-0 hover:opacity-100"
                    : "opacity-100",
                  "transition-opacity"
                )}
                style={{ color: textColor || undefined }}
              />
            )}
            {isSelected &&
              (selectedEffect === "checkmark" ||
                selectedEffect === "multiple") && (
                <div
                  className={cn(
                    "absolute bg-primary text-primary-foreground rounded-full flex items-center justify-center",
                    getIndicatorPosition(selectionIndicatorPosition)
                  )}
                  style={{
                    width:
                      typeof selectionIndicatorSize === "number"
                        ? `${selectionIndicatorSize}px`
                        : selectionIndicatorSize,
                    height:
                      typeof selectionIndicatorSize === "number"
                        ? `${selectionIndicatorSize}px`
                        : selectionIndicatorSize,
                  }}
                >
                  <Check className="w-4 h-4" />
                </div>
              )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCharacters: Character[];
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

function ConfirmationModal({
  open,
  onOpenChange,
  selectedCharacters,
  onConfirm,
  onCancel,
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
}: ConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-xl border-0 shadow-lg">
        <DialogHeader className="space-y-2 pb-4 border-b border-gray-100 dark:border-gray-800">
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <div className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-md px-2 py-1">
              {selectedCharacters.length}
            </div>
            Character Selection
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            You are about to select {selectedCharacters.length} character
            {selectedCharacters.length !== 1 ? "s" : ""}. Are you sure you want
            to proceed?
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <ScrollArea className="max-h-64 px-1">
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {selectedCharacters.map((character) => (
                <div
                  key={character.id}
                  className="flex flex-col items-center group"
                >
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden shadow-md ring-2 ring-blue-500/20 group-hover:ring-blue-500/50 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Image
                      src={character.image || "/placeholder.svg"}
                      alt={character.name}
                      width={64}
                      height={64}
                      loading="lazy"
                      quality={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium mt-2 text-center truncate w-full text-gray-700 dark:text-gray-200">
                    {character.name}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter className="flex justify-end space-x-2 pt-4 border-t border-gray-100 dark:border-gray-800">
          <Button
            variant="outline"
            onClick={onCancel}
            className="rounded-lg border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <X className="mr-2 h-4 w-4" />
            {cancelButtonText}
          </Button>
          <Button
            onClick={onConfirm}
            className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:bg-blue-700 text-white transition-colors duration-200"
          >
            <Check className="mr-2 h-4 w-4" />
            {confirmButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
