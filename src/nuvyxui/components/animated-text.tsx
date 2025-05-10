"use client";

import { FC, useRef, useEffect } from "react";
import {
  HTMLMotionProps,
  motion,
  useAnimation,
  useInView,
} from "framer-motion";

type AnimationType =
  | "blink"
  | "rise"
  | "expand"
  | "glide"
  | "cascade"
  | "flicker"
  | "elastic"
  | "float";

interface Props extends HTMLMotionProps<"div"> {
  text: string;
  type?: AnimationType;
  delay?: number;
  duration?: number;
  custom?: number;
}

const animationVariants = {
  blink: {
    container: {
      hidden: { opacity: 0 },
      visible: (i: number = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: i * 0.3 },
      }),
    },
    child: {
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 100,
          y: {
            type: "keyframes",
            times: [0, 0.5, 1],
            values: [0, -10, 0],
          },
        },
      },
      hidden: { opacity: 0, y: 10 },
    },
  },
  rise: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
      },
    },
    child: {
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      hidden: { opacity: 0, y: 20 },
    },
  },
  expand: {
    container: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.2 },
      },
    },
    child: {
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          damping: 15,
          stiffness: 400,
          scale: {
            type: "keyframes",
            times: [0, 0.6, 1],
            values: [0, 1.1, 1],
          },
        },
      },
      hidden: { opacity: 0, scale: 0 },
    },
  },
  float: {
    container: {
      hidden: {},
      visible: (i: number = 1) => ({
        transition: { staggerChildren: 0.03, delayChildren: 0.2 * i },
      }),
    },
    child: {
      hidden: {
        y: 50,
        opacity: 0,
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    },
  },
  glide: {
    container: {
      hidden: {},
      visible: (i: number = 1) => ({
        transition: { staggerChildren: 0.03, delayChildren: 0.2 * i },
      }),
    },
    child: {
      hidden: {
        y: 20,
        opacity: 0,
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
  },
  elastic: {
    container: {
      hidden: {},
      visible: (i: number = 1) => ({
        transition: { staggerChildren: 0.03, delayChildren: 0.2 * i },
      }),
    },
    child: {
      hidden: {
        y: 50,
        opacity: 0,
      },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10,
        },
      },
    },
  },
  cascade: {
    container: {
      hidden: {},
      visible: {},
    },
    child: {
      hidden: {
        opacity: 0,
        y: `0.25em`,
      },
      visible: {
        opacity: 1,
        y: `0em`,
        transition: {
          duration: 0.65,
          ease: [0.65, 0, 0.75, 1],
        },
      },
    },
  },
  flicker: {
    container: {
      hidden: {},
      visible: {},
    },
    child: {
      hidden: {
        opacity: 0,
        y: `0.35em`,
      },
      visible: {
        opacity: 1,
        y: `0em`,
        transition: {
          duration: 0.45,
          ease: [0.85, 0.1, 0.9, 1.2],
        },
      },
    },
  },
};

export const AnimateText: FC<Props> = ({
  text,
  type = "elastic",
  custom = 1,
  className = "",
  ...props
}: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const ctrls = useAnimation();

  useEffect(() => {
    if (isInView) {
      ctrls.start("visible");
    } else {
      ctrls.start("hidden");
    }
  }, [isInView, ctrls]);

  const letters = Array.from(text);
  const { container, child } = animationVariants[type];

  if (type === "cascade" || type === "flicker") {
    return (
      <h2
        ref={ref}
        className={`mt-6 text-3xl font-bold text-black dark:text-neutral-100 py-4 px-4 md:text-4xl ${className}`}
      >
        {text.split(" ").map((word, index) => {
          return (
            <motion.span
              className="inline-block mr-[0.25em] whitespace-nowrap"
              aria-hidden="true"
              key={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={container}
              transition={{
                delayChildren: index * 0.13,
                staggerChildren: 0.025,
              }}
            >
              {word.split("").map((character, index) => {
                return (
                  <motion.span
                    aria-hidden="true"
                    key={index}
                    variants={child}
                    className="inline-block -mr-[0.01em]"
                  >
                    {character}
                  </motion.span>
                );
              })}
            </motion.span>
          );
        })}
      </h2>
    );
  }

  return (
    <motion.h2
      ref={ref}
      style={{ display: "flex", overflow: "hidden" }}
      role="heading"
      variants={container}
      initial="hidden"
      animate={ctrls}
      custom={custom}
      className={`mt-6 text-3xl font-bold text-black dark:text-neutral-100 py-4 px-4 md:text-4xl ${className}`}
      {...props}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h2>
  );
};
