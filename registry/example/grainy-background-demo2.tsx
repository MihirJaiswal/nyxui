import { GrainyBackground } from "@/registry/ui/grainy-background";
import { Check } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  colors: string[];
  cta: string;
  featured?: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    description: "For tinkerers and side-projects",
    features: ["3 components", "Basic grain presets", "Community support"],
    colors: ["#10b981", "#047857", "#34d399", "#6ee7b7"],
    cta: "Start free",
  },
  {
    name: "Pro",
    price: "$24",
    period: "/mo",
    description: "For shipping production apps",
    features: [
      "All 48+ components",
      "Custom grain & blend modes",
      "Priority support",
      "Early access previews",
    ],
    colors: ["#7c3aed", "#4f46e5", "#a855f7", "#c084fc"],
    cta: "Upgrade to Pro",
    featured: true,
  },
  {
    name: "Team",
    price: "$79",
    period: "/mo",
    description: "For growing engineering teams",
    features: [
      "Everything in Pro",
      "Shared team registry",
      "Dedicated manager",
      "SLA guarantee",
    ],
    colors: ["#f59e0b", "#d97706", "#fbbf24", "#fcd34d"],
    cta: "Contact sales",
  },
];

export default function GrainyBackgroundDemo2() {
  return (
    <div className="w-full py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
            Pay for what you need
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
            Start free, upgrade when you ship. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative overflow-hidden rounded-2xl ${
                plan.featured ? "md:-translate-y-4 md:scale-[1.02]" : ""
              }`}
            >
              <GrainyBackground
                animationType="mesh"
                grainType="paper"
                grainIntensity={32}
                grainSize={95}
                speed={1.1}
                colors={plan.colors}
                className="h-full"
              >
                <div className="relative z-10 flex h-full flex-col p-6 text-white">
                  {plan.featured && (
                    <span className="absolute right-5 top-5 inline-flex items-center rounded-full border border-white/25 bg-white/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                      Popular
                    </span>
                  )}

                  <h3 className="text-lg font-semibold tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-xs text-white/70">
                    {plan.description}
                  </p>

                  <div className="mt-5 flex items-baseline">
                    <span className="text-4xl font-semibold tracking-tight">
                      {plan.price}
                    </span>
                    <span className="ml-1 text-sm text-white/60">
                      {plan.period}
                    </span>
                  </div>

                  <div className="my-6 h-px w-full bg-white/15" />

                  <ul className="flex-1 space-y-2.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2.5 text-[13px] text-white/90"
                      >
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/20">
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className="mt-7 w-full rounded-lg bg-white/95 py-2.5 text-[13px] font-semibold text-neutral-950 transition-colors hover:bg-white">
                    {plan.cta}
                  </button>
                </div>
              </GrainyBackground>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
