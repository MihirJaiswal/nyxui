import { GrainyBackground } from "@/registry/ui/grainy-background";
import {
  Zap,
  Sparkles,
  Crown,
  Palette,
  Shapes,
  Bot,
  Star,
  TrendingUp,
  LifeBuoy,
  Hash,
  Diamond,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  label: string;
  icon: LucideIcon;
}

interface Plan {
  name: string;
  description: string;
  price: string;
  cta: string;
  icon: LucideIcon;
  colors: string[];
  animationType: "flow" | "mesh" | "waves" | "aurora" | "spiral" | "pulse";
  grainType: "digital" | "plasma" | "scratches" | "paper" | "noise" | "dust";
  hexGradient: string;
  badge?: string;
  featured?: boolean;
  features: Feature[];
  renewal: string;
  renewalNote: string;
}

const plans: Plan[] = [
  {
    name: "Web Studio",
    description: "Get access to React library components and features",
    price: "$299",
    cta: "Get Web plan",
    icon: Zap,
    colors: ["#1e6068", "#0f3a42", "#145d6c", "#0a2a30"],
    animationType: "spiral",
    grainType: "digital",
    hexGradient: "linear-gradient(180deg, #388EF8 0%, #90D7F6 100%)",
    features: [
      { label: "Pro React components", icon: Shapes },
      { label: "Premium templates", icon: Palette },
      { label: "Pro AI (Skills and MCPs)", icon: Bot },
      { label: "500 AI credits included", icon: Star },
      { label: "Premium design systems", icon: Palette },
      { label: "Pro design systems", icon: Diamond },
      { label: "Private Discord channel", icon: Hash },
      { label: "Prioritized issues", icon: TrendingUp },
      { label: "Priority support", icon: LifeBuoy },
    ],
    renewal: "Optional updates renewal at $99/yr",
    renewalNote:
      "Get another year of updates, or keep using your current version. No pressure.",
  },
  {
    name: "Mobile Studio",
    description: "Get access to React Native library components and features",
    price: "$299",
    cta: "Get Mobile plan",
    icon: Sparkles,
    colors: ["#32173b", "#1a0b20", "#331634", "#160710"],
    animationType: "waves",
    grainType: "plasma",
    hexGradient: "linear-gradient(180deg, #7538F8 0%, #F690EC 100%)",
    features: [
      { label: "Pro React Native components", icon: Shapes },
      { label: "Premium templates", icon: Palette },
      { label: "Pro AI (Skills and MCPs)", icon: Bot },
      { label: "500 AI credits included", icon: Star },
      { label: "Premium design systems", icon: Palette },
      { label: "Pro design systems", icon: Diamond },
      { label: "Private Discord channel", icon: Hash },
      { label: "Prioritized issues", icon: TrendingUp },
      { label: "Priority support", icon: LifeBuoy },
    ],
    renewal: "Optional updates renewal at $99/yr",
    renewalNote:
      "Get another year of updates, or keep using your current version. No pressure.",
  },
  {
    name: "Studio Pro",
    description: "The full system. React and React Native, together",
    price: "$399",
    cta: "Get Studio Pro",
    icon: Crown,
    colors: ["#342801", "#1c1400", "#5c4601", "#0e0a00"],
    animationType: "aurora",
    grainType: "scratches",
    hexGradient: "linear-gradient(180deg, #FDBB23 0%, #FECE30 100%)",
    badge: "Save $199 with the bundle",
    featured: true,
    features: [
      { label: "All Pro components (React + React Native)", icon: Shapes },
      { label: "Premium templates", icon: Palette },
      { label: "Pro AI (Skills and MCPs)", icon: Bot },
      { label: "1000 AI credits included", icon: Star },
      { label: "Premium design systems", icon: Palette },
      { label: "Pro design systems", icon: Diamond },
      { label: "Private Discord channels", icon: Hash },
      { label: "Prioritized issues", icon: TrendingUp },
      { label: "Priority support", icon: LifeBuoy },
    ],
    renewal: "Optional updates renewal at $129/yr",
    renewalNote:
      "Get another year of updates, or keep using your current version. No pressure.",
  },
];

function HexIcon({
  gradientId,
  icon: Icon,
}: {
  gradientId: string;
  icon: LucideIcon;
}) {
  return (
    <div className="relative size-6 shrink-0">
      <svg
        className="block size-full"
        fill="none"
        viewBox="0 0 20 22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="10"
            x2="10"
            y1="0"
            y2="22"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor={
                gradientId === "hex-blue"
                  ? "#388EF8"
                  : gradientId === "hex-purple"
                    ? "#7538F8"
                    : "#FDBB23"
              }
            />
            <stop
              offset="1"
              stopColor={
                gradientId === "hex-blue"
                  ? "#90D7F6"
                  : gradientId === "hex-purple"
                    ? "#F690EC"
                    : "#FECE30"
              }
            />
          </linearGradient>
        </defs>
        <path
          d="M7.5 0.54C8.74 -0.18 10.26 -0.18 11.5 0.54L17.05 3.73C18.29 4.44 19.05 5.76 19.05 7.19V13.57C19.05 15 18.29 16.32 17.05 17.04L11.5 20.23C10.26 20.94 8.74 20.94 7.5 20.23L2 17.04C0.76 16.32 0 15 0 13.57V7.19C0 5.76 0.76 4.44 2 3.73L7.5 0.54Z"
          fill={`url(#${gradientId})`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className="h-3 w-3 text-white" strokeWidth={2.5} fill="white" />
      </div>
    </div>
  );
}

function CardHeader({ plan, index }: { plan: Plan; index: number }) {
  const gradientIds = ["hex-blue", "hex-purple", "hex-gold"];
  return (
    <div className="relative mx-2 mb-2 mt-2 h-[255px] overflow-hidden rounded-2xl">
      <GrainyBackground
        animationType={plan.animationType}
        grainType={plan.grainType}
        grainIntensity={35}
        grainSize={100}
        speed={0.8}
        colors={plan.colors}
        className="h-full"
      >
        {/* Content overlay */}
        <div className="relative z-10 flex h-full flex-col px-4">
          <div className="flex items-center gap-2 pt-4">
            <HexIcon gradientId={gradientIds[index]} icon={plan.icon} />
            {plan.badge && (
              <p className="text-xs font-medium text-yellow-400">
                {plan.badge}
              </p>
            )}
          </div>
          <p className="mt-3 text-xl font-semibold leading-none text-white">
            {plan.name}
          </p>
          <p className="mt-1 max-w-[214px] text-xs leading-[1.34] text-white/80">
            {plan.description}
          </p>
          <div className="mt-5">
            <div className="flex items-baseline gap-2">
              <span className="text-[2rem] font-semibold text-white">
                {plan.price}
              </span>
            </div>
          </div>
          <p className="mt-[7px] text-xs font-medium text-white/60">
            Perpetual license
          </p>
          <button
            className={`mt-3 min-h-8 w-full rounded-lg py-2 text-sm font-medium transition-opacity hover:opacity-90 ${
              plan.featured
                ? "bg-white text-neutral-950"
                : "bg-white text-neutral-950"
            }`}
          >
            {plan.cta}
          </button>
        </div>
      </GrainyBackground>
    </div>
  );
}

export default function GrainyBackgroundDemo2() {
  return (
    <div className="flex w-full flex-col items-center gap-4 px-6 pb-20 max-md:px-4">
      {/* Pricing label */}
      <div className="flex items-center justify-center gap-2">
        <p className="text-center text-base font-medium text-blue-500 max-md:text-sm">
          Pricing
        </p>
      </div>

      {/* Title */}
      <div className="text-center text-5xl leading-none tracking-tight max-md:text-4xl">
        <p className="mb-0 text-neutral-900 dark:text-white">
          Build like a Studio.
        </p>
        <p className="text-neutral-400">Ship with confidence.</p>
      </div>

      {/* Subtitle */}
      <p className="mt-2 max-w-[520px] text-center text-base font-normal leading-[1.5] text-neutral-500">
        Pick your stack. Start building products you're proud to launch.
      </p>

      {/* Cards */}
      <div className="flex items-start justify-center gap-4 max-lg:w-full max-lg:flex-wrap max-md:flex-col pt-6">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className="flex w-[320px] flex-col rounded-3xl bg-white shadow-lg dark:bg-neutral-900 max-lg:w-[calc(50%-8px)] max-md:w-full"
          >
            <CardHeader plan={plan} index={index} />
            {/* Features */}
            <div className="flex flex-col items-start gap-3 px-5 pb-5 pt-5">
              {plan.features.map((feature) => {
                const FeatureIcon = feature.icon;
                return (
                  <div key={feature.label} className="flex items-center gap-2">
                    <div className="flex size-4 shrink-0 items-center justify-center opacity-30">
                      <FeatureIcon
                        className="size-4 text-neutral-900 dark:text-white"
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="text-xs font-normal leading-[1.34] text-neutral-900 dark:text-white">
                      {feature.label}
                    </p>
                  </div>
                );
              })}
            </div>
            {/* Footer */}
            <div className="border-t border-neutral-200 px-5 py-4 dark:border-neutral-800">
              <p className="text-xs font-medium leading-[1.34] text-neutral-900 dark:text-white">
                {plan.renewal}
              </p>
              <p className="mt-1 text-xs leading-[1.34] text-neutral-500">
                {plan.renewalNote}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <p className="mt-4 max-w-[500px] text-center text-sm font-normal leading-[1.43] text-neutral-500">
        <span className="mr-1 font-medium text-neutral-900 dark:text-white">
          Note:
        </span>
        <span>
          If you're a NyxUI v2 Pro customer, you're eligible for an upgrade
          discount, use the same email address or contact us{" "}
          <a
            className="text-neutral-900 hover:underline dark:text-white"
            href="mailto:support@nyxui.com"
          >
            support@nyxui.com
          </a>
        </span>
      </p>
      <p className="text-center text-sm text-neutral-500">
        Looking for NyxUI Pro v2?{" "}
        <a
          className="text-neutral-900 hover:underline dark:text-white"
          href="https://v2.nyxui.com"
        >
          Go to v2 →
        </a>
      </p>
    </div>
  );
}
