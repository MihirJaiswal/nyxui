"use client";
import { useState, lazy, Suspense } from "react";
import { Volume2, ChevronLeft, ChevronRight, Copy, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SVGProps } from "react";

const MusicPlayer = lazy(() =>
  import("@/registry/ui/music-player").then((module) => ({
    default: module.MusicPlayer,
  })),
);

const Cursor = lazy(() =>
  import("@/registry/ui/custom-cursor").then((module) => ({
    default: module.Cursor,
  })),
);

/* ------------------------------------------------------------------ */
/*  Browser mockup (inlined from components/home/feature/Browser.tsx)  */
/* ------------------------------------------------------------------ */

type SafariMode = "default" | "simple";

interface BrowserProps extends SVGProps<SVGSVGElement> {
  url?: string;
  imageSrc?: string;
  videoSrc?: string;
  width?: number;
  height?: number;
  mode?: SafariMode;
  children?: React.ReactNode;
}

function Browser({
  imageSrc,
  videoSrc,
  url,
  width = 1203,
  height = 753,
  mode = "default",
  children,
  ...props
}: BrowserProps) {
  return (
    <div className="relative">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g clipPath="url(#path0)">
          <path
            d="M0 52H1202V741C1202 747.627 1196.63 753 1190 753H12C5.37258 753 0 747.627 0 741V52Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 12C0 5.37258 5.37258 0 12 0H1190C1196.63 0 1202 5.37258 1202 12V52H0L0 12Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.06738 12C1.06738 5.92487 5.99225 1 12.0674 1H1189.93C1196.01 1 1200.93 5.92487 1200.93 12V51H1.06738V12Z"
            className="fill-white dark:fill-[#262626]"
          />
          <circle
            cx="27"
            cy="25"
            r="6"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <circle
            cx="47"
            cy="25"
            r="6"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <circle
            cx="67"
            cy="25"
            r="6"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <path
            d="M286 17C286 13.6863 288.686 11 292 11H946C949.314 11 952 13.6863 952 17V35C952 38.3137 949.314 41 946 41H292C288.686 41 286 38.3137 286 35V17Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          <g className="mix-blend-luminosity">
            <path
              d="M566.269 32.0852H572.426C573.277 32.0852 573.696 31.6663 573.696 30.7395V25.9851C573.696 25.1472 573.353 24.7219 572.642 24.6521V23.0842C572.642 20.6721 571.036 19.5105 569.348 19.5105C567.659 19.5105 566.053 20.6721 566.053 23.0842V24.6711C565.393 24.7727 565 25.1917 565 25.9851V30.7395C565 31.6663 565.418 32.0852 566.269 32.0852ZM567.272 22.97C567.272 21.491 568.211 20.6785 569.348 20.6785C570.478 20.6785 571.423 21.491 571.423 22.97V24.6394L567.272 24.6458V22.97Z"
              fill="#A3A3A3"
            />
          </g>
          <g className="mix-blend-luminosity">
            <text
              x="580"
              y="30"
              fill="#A3A3A3"
              fontSize="12"
              fontFamily="Arial, sans-serif"
            >
              {url}
            </text>
          </g>
          {mode === "default" ? (
            <>
              <g className="mix-blend-luminosity">
                <path
                  d="M265.5 33.8984C265.641 33.8984 265.852 33.8516 266.047 33.7422C270.547 31.2969 272.109 30.1641 272.109 27.3203V21.4219C272.109 20.4844 271.742 20.1484 270.961 19.8125C270.094 19.4453 267.18 18.4297 266.328 18.1406C266.07 18.0547 265.766 18 265.5 18C265.234 18 264.93 18.0703 264.672 18.1406C263.82 18.3828 260.906 19.4531 260.039 19.8125C259.258 20.1406 258.891 20.4844 258.891 21.4219V27.3203C258.891 30.1641 260.461 31.2812 264.945 33.7422C265.148 33.8516 265.359 33.8984 265.5 33.8984ZM265.922 19.5781C266.945 19.9766 269.172 20.7656 270.344 21.1875C270.562 21.2656 270.617 21.3828 270.617 21.6641V27.0234C270.617 29.3125 269.469 29.9375 265.945 32.0625C265.727 32.1875 265.617 32.2344 265.508 32.2344V19.4844C265.617 19.4844 265.734 19.5156 265.922 19.5781Z"
                  fill="#A3A3A3"
                />
              </g>
              <g className="mix-blend-luminosity">
                <path
                  d="M936.273 24.9766C936.5 24.9766 936.68 24.9062 936.82 24.7578L940.023 21.5312C940.195 21.3594 940.273 21.1719 940.273 20.9531C940.273 20.7422 940.188 20.5391 940.023 20.3828L936.82 17.125C936.68 16.9688 936.5 16.8906 936.273 16.8906C935.852 16.8906 935.516 17.2422 935.516 17.6719C935.516 17.8828 935.594 18.0547 935.727 18.2031L937.594 20.0312C937.227 19.9766 936.852 19.9453 936.477 19.9453C932.609 19.9453 929.516 23.0391 929.516 26.9141C929.516 30.7891 932.633 33.9062 936.5 33.9062C940.375 33.9062 943.484 30.7891 943.484 26.9141C943.484 26.4453 943.156 26.1094 942.688 26.1094C942.234 26.1094 941.93 26.4453 941.93 26.9141C941.93 29.9297 939.516 32.3516 936.5 32.3516C933.492 32.3516 931.07 29.9297 931.07 26.9141C931.07 23.875 933.469 21.4688 936.477 21.4688C936.984 21.4688 937.453 21.5078 937.867 21.5781L935.734 23.6875C935.594 23.8281 935.516 24 935.516 24.2109C935.516 24.6406 935.852 24.9766 936.273 24.9766Z"
                  fill="#A3A3A3"
                />
              </g>
              <g className="mix-blend-luminosity">
                <path
                  d="M1134 33.0156C1134.49 33.0156 1134.89 32.6094 1134.89 32.1484V27.2578H1139.66C1140.13 27.2578 1140.54 26.8594 1140.54 26.3672C1140.54 25.8828 1140.13 25.4766 1139.66 25.4766H1134.89V20.5859C1134.89 20.1172 1134.49 19.7188 1134 19.7188C1133.52 19.7188 1133.11 20.1172 1133.11 20.5859V25.4766H1128.34C1127.88 25.4766 1127.46 25.8828 1127.46 26.3672C1127.46 26.8594 1127.88 27.2578 1128.34 27.2578H1133.11V32.1484C1133.11 32.6094 1133.52 33.0156 1134 33.0156Z"
                  fill="#A3A3A3"
                />
              </g>
              <g className="mix-blend-luminosity">
                <path
                  d="M1161.8 31.0703H1163.23V32.375C1163.23 34.0547 1164.12 34.9219 1165.81 34.9219H1174.2C1175.89 34.9219 1176.77 34.0547 1176.77 32.3828V24.0469C1176.77 22.375 1175.89 21.5 1174.2 21.5H1172.77V20.2578C1172.77 18.5859 1171.88 17.7109 1170.19 17.7109H1161.8C1160.1 17.7109 1159.23 18.5781 1159.23 20.2578V28.5234C1159.23 30.1953 1160.1 31.0703 1161.8 31.0703ZM1161.9 29.5078C1161.18 29.5078 1160.78 29.1328 1160.78 28.3828V20.3984C1160.78 19.6406 1161.18 19.2656 1161.9 19.2656H1170.09C1170.8 19.2656 1171.2 19.6406 1171.2 20.3984V21.5H1165.81C1164.12 21.5 1163.23 22.375 1163.23 24.0469V29.5078H1161.9ZM1165.91 33.3672C1165.19 33.3672 1164.8 32.9922 1164.8 32.2422V24.1875C1164.8 23.4297 1165.19 23.0625 1165.91 23.0625H1174.1C1174.81 23.0625 1175.21 23.4297 1175.21 24.1875V32.2422C1175.21 32.9922 1174.81 33.3672 1174.1 33.3672H1165.91Z"
                  fill="#A3A3A3"
                />
              </g>
              <g className="mix-blend-luminosity">
                <path
                  d="M1099.51 28.4141C1099.91 28.4141 1100.24 28.0859 1100.24 27.6953V19.8359L1100.18 18.6797L1100.66 19.25L1101.75 20.4141C1101.88 20.5547 1102.06 20.625 1102.24 20.625C1102.6 20.625 1102.9 20.3672 1102.9 20C1102.9 19.8047 1102.82 19.6641 1102.69 19.5312L1100.06 17.0078C1099.88 16.8203 1099.7 16.7578 1099.51 16.7578C1099.32 16.7578 1099.14 16.8203 1098.95 17.0078L1096.33 19.5312C1096.2 19.6641 1096.12 19.8047 1096.12 20C1096.12 20.3672 1096.41 20.625 1096.77 20.625C1096.95 20.625 1097.14 20.5547 1097.27 20.4141L1098.35 19.25L1098.84 18.6719L1098.78 19.8359V27.6953C1098.78 28.0859 1099.11 28.4141 1099.51 28.4141ZM1095 34.6562H1104C1105.7 34.6562 1106.57 33.7812 1106.57 32.1094V24.4297C1106.57 22.7578 1105.7 21.8828 1104 21.8828H1101.89V23.4375H1103.9C1104.61 23.4375 1105.02 23.8125 1105.02 24.5625V31.9688C1105.02 32.7188 1104.61 33.0938 1103.9 33.0938H1095.1C1094.38 33.0938 1093.98 32.7188 1093.98 31.9688V24.5625C1093.98 23.8125 1094.38 23.4375 1095.1 23.4375H1097.13V21.8828H1095C1093.31 21.8828 1092.43 22.75 1092.43 24.4297V32.1094C1092.43 33.7812 1093.31 34.6562 1095 34.6562Z"
                  fill="#A3A3A3"
                />
              </g>
              <g className="mix-blend-luminosity">
                <path
                  d="M99.5703 33.6016H112.938C114.633 33.6016 115.516 32.7266 115.516 31.0547V21.5469C115.516 19.875 114.633 19 112.938 19H99.5703C97.8828 19 97 19.8672 97 21.5469V31.0547C97 32.7266 97.8828 33.6016 99.5703 33.6016ZM99.6719 32.0469C98.9531 32.0469 98.5547 31.6719 98.5547 30.9141V21.6875C98.5547 20.9297 98.9531 20.5547 99.6719 20.5547H103.234V32.0469H99.6719ZM112.836 20.5547C113.555 20.5547 113.953 20.9297 113.953 21.6875V30.9141C113.953 31.6719 113.555 32.0469 112.836 32.0469H104.711V20.5547H112.836ZM101.703 23.4141C101.984 23.4141 102.219 23.1719 102.219 22.9062C102.219 22.6406 101.984 22.4062 101.703 22.4062H100.102C99.8203 22.4062 99.5859 22.6406 99.5859 22.9062C99.5859 23.1719 99.8203 23.4141 100.102 23.4141H101.703ZM101.703 25.5156C101.984 25.5156 102.219 25.2812 102.219 25.0078C102.219 24.7422 101.984 24.5078 101.703 24.5078H100.102C99.8203 24.5078 99.5859 24.7422 99.5859 25.0078C99.5859 25.2812 99.8203 25.5156 100.102 25.5156H101.703ZM101.703 27.6094C101.984 27.6094 102.219 27.3828 102.219 27.1094C102.219 26.8438 101.984 26.6172 101.703 26.6172H100.102C99.8203 26.6172 99.5859 26.8438 99.5859 27.1094C99.5859 27.3828 99.8203 27.6094 100.102 27.6094H101.703Z"
                  fill="#A3A3A3"
                />
              </g>
              <g className="mix-blend-luminosity">
                <path
                  d="M143.914 32.5938C144.094 32.7656 144.312 32.8594 144.562 32.8594C145.086 32.8594 145.492 32.4531 145.492 31.9375C145.492 31.6797 145.391 31.4453 145.211 31.2656L139.742 25.9219L145.211 20.5938C145.391 20.4141 145.492 20.1719 145.492 19.9219C145.492 19.4062 145.086 19 144.562 19C144.312 19 144.094 19.0938 143.922 19.2656L137.844 25.2031C137.625 25.4062 137.516 25.6562 137.516 25.9297C137.516 26.2031 137.625 26.4375 137.836 26.6484L143.914 32.5938Z"
                  fill="#A3A3A3"
                />
              </g>
              <g className="mix-blend-luminosity">
                <path
                  d="M168.422 32.8594C168.68 32.8594 168.891 32.7656 169.07 32.5938L175.148 26.6562C175.359 26.4375 175.469 26.2109 175.469 25.9297C175.469 25.6562 175.367 25.4141 175.148 25.2109L169.07 19.2656C168.891 19.0938 168.68 19 168.422 19C167.898 19 167.492 19.4062 167.492 19.9219C167.492 20.1719 167.602 20.4141 167.773 20.5938L173.25 25.9375L167.773 31.2656C167.594 31.4531 167.492 31.6797 167.492 31.9375C167.492 32.4531 167.898 32.8594 168.422 32.8594Z"
                  fill="#A3A3A3"
                />
              </g>
            </>
          ) : null}
          {imageSrc && (
            <image
              href={imageSrc}
              width="1200"
              height="700"
              x="1"
              y="52"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#roundedBottom)"
            />
          )}
          {videoSrc && (
            <foreignObject
              x="1"
              y="52"
              width="1200"
              height="700"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#roundedBottom)"
            >
              <video
                className="size-full overflow-hidden object-cover"
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
              />
            </foreignObject>
          )}
        </g>
        <defs>
          <clipPath id="path0">
            <rect width={width} height={height} fill="white" />
          </clipPath>
          <clipPath id="roundedBottom">
            <path
              d="M1 52H1201V741C1201 747.075 1196.08 752 1190 752H12C5.92486 752 1 747.075 1 741V52Z"
              fill="white"
            />
          </clipPath>
        </defs>
      </svg>

      {children && (
        <div
          className="absolute"
          style={{
            top: `${(52 / height) * 100}%`,
            left: `${(1 / width) * 100}%`,
            width: `${(1200 / width) * 100}%`,
            height: `${(700 / height) * 100}%`,
            overflow: "hidden",
            borderRadius: "0 0 6px 6px",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CustomPointer (inlined from components/home/feature/CustomPointer) */
/* ------------------------------------------------------------------ */

const CursorLoader = () => (
  <div className="relative flex h-full w-full items-end justify-center !rounded-none animate-pulse">
    <div className="relative h-full w-full overflow-hidden mt-[55px]">
      <div className="relative flex h-full w-full justify-end pt-4">
        <div className="relative z-[1] h-full w-[80%] rounded-tl-xl 2xl:mt-[55px] bg-gray-200 dark:bg-neutral-300 px-6 pt-6 shadow-xl">
          <div className="flex w-full items-center justify-start gap-4">
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
            <div className="w-8 h-8 bg-gray-300 rounded"></div>
          </div>
          <div className="mt-6 md:mt-10">
            <div className="relative max-w-sm h-20 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function CustomPointer() {
  return (
    <div className="flex w-full h-full flex-col justify-between rounded-none bg-blue-200/40 dark:bg-black text-white relative">
      <Suspense fallback={<CursorLoader />}>
        <Cursor
          name="Mihir"
          className="relative flex h-full w-full items-end justify-center !rounded-none"
        >
          <div className="relative h-full w-full overflow-hidden mt-[55px]">
            <div className="relative flex h-full w-full justify-end pt-4">
              <div className="relative z-[1] h-full w-[80%] rounded-tl-xl 2xl:mt-[55px] bg-white dark:bg-neutral-100 px-6 pt-6 shadow-xl">
                <div className="flex w-full items-center justify-start gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={30}
                    height={30}
                    color="#000000"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5 6C5 4.58579 5 3.87868 5.43934 3.43934C5.87868 3 6.58579 3 8 3H12.5789C15.0206 3 17 5.01472 17 7.5C17 9.98528 15.0206 12 12.5789 12H5V6Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.4286 12H13.6667C16.0599 12 18 14.0147 18 16.5C18 18.9853 16.0599 21 13.6667 21H8C6.58579 21 5.87868 21 5.43934 20.5607C5 20.1213 5 19.4142 5 18V12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={30}
                    height={30}
                    color="#000000"
                    fill="none"
                  >
                    <path
                      d="M12 4H19"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 20L16 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M5 20H12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={30}
                    height={30}
                    color="#000000"
                    fill="none"
                  >
                    <path
                      d="M5.5 3V11.5C5.5 15.0899 8.41015 18 12 18C15.5899 18 18.5 15.0899 18.5 11.5V3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 21H21"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="mt-6 md:mt-10 text-7xl font-thin text-black">
                  <div className="relative max-w-sm border-[1.5px] border-blue-400 px-0.5">
                    Build great UI.
                    <div className="absolute bottom-0 right-0 h-1 w-1 translate-x-1/2 translate-y-1/2 rounded-full bg-blue-400" />
                    <div className="absolute bottom-0 left-0 h-1 w-1 -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-400" />
                    <div className="absolute right-0 top-0 h-1 w-1 -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-400" />
                    <div className="absolute left-0 top-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 h-full w-full rounded-full bg-gradient-to-br from-red-500 via-fuchsia-500 to-red-500 opacity-[0.3] blur-3xl" />
        </Cursor>
      </Suspense>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MusicCardThemeCustomizer (inlined from feature/Customize.tsx)      */
/* ------------------------------------------------------------------ */

const MusicPlayerSkeleton = ({ className }: { className?: string }) => (
  <div
    className={`bg-green-50 dark:bg-black text-green-600 dark:text-green-500 border-2 border-green-400/40 shadow-2xl shadow-green-500/20 transition-all duration-500 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg w-full max-w-md mx-auto min-w-0 ${className}`}
  >
    <div className="relative">
      <div className="w-full h-48 md:h-60 relative overflow-hidden bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800">
        <div className="w-full h-full bg-green-300 dark:bg-green-700 flex items-center justify-center">
          <div className="w-20 h-20 bg-green-500 dark:bg-green-400 rounded-full opacity-50"></div>
        </div>
        <div className="absolute top-2 md:top-4 right-2 md:right-4 p-1.5 md:p-2 bg-black/40 rounded-full backdrop-blur-sm">
          <div className="h-3 w-3 md:h-4 md:w-4 bg-white/60 rounded"></div>
        </div>
      </div>
    </div>
    <div className="p-4 md:p-6">
      <div className="flex items-start justify-between mb-4 md:mb-6">
        <div className="flex-1 min-w-0 pr-2 space-y-2">
          <div className="h-5 md:h-6 bg-green-200 dark:bg-green-800 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-green-200 dark:bg-green-800 rounded animate-pulse w-1/2"></div>
        </div>
        <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-green-200 dark:bg-green-800 rounded-full animate-pulse"></div>
          <div className="w-8 h-8 bg-green-200 dark:bg-green-800 rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className="mb-4 md:mb-6">
        <div className="relative h-1.5 md:h-2 bg-green-200/30 dark:bg-green-800/30 rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-green-500 rounded-full w-1/3 animate-pulse"></div>
        </div>
        <div className="flex justify-between mt-1 md:mt-2">
          <div className="h-3 bg-green-200 dark:bg-green-800 rounded animate-pulse w-8"></div>
          <div className="h-3 bg-green-200 dark:bg-green-800 rounded animate-pulse w-8"></div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 md:gap-3 flex-shrink-0">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-green-200 dark:bg-green-800 rounded-full animate-pulse hidden md:block"></div>
          <div className="w-6 h-6 md:w-8 md:h-8 bg-green-200 dark:bg-green-800 rounded-full animate-pulse"></div>
        </div>
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-green-200 dark:bg-green-800 rounded-full animate-pulse"></div>
          <div className="w-12 h-12 md:w-16 md:h-16 bg-green-500 rounded-full animate-pulse"></div>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-green-200 dark:bg-green-800 rounded-full animate-pulse"></div>
        </div>
        <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-green-200 dark:bg-green-800 rounded-full animate-pulse"></div>
          <div className="w-6 h-6 md:w-8 md:h-8 bg-green-200 dark:bg-green-800 rounded-full animate-pulse hidden md:block"></div>
        </div>
      </div>
    </div>
  </div>
);

function MusicCardThemeCustomizer() {
  const [cardTheme, setCardTheme] = useState("spotify");
  const [slideDirection, setSlideDirection] = useState("right");
  const [isAnimating, setIsAnimating] = useState(false);

  const sampleTrack = {
    id: "blinding-lights",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    artwork: "https://placehold.co/400x400/1DB954/white?text=After+Hours",
    duration: 217,
  };

  const themeOptions = [
    {
      name: "Spotify",
      value: "spotify",
      icon: <Volume2 className="h-3.5 w-3.5" />,
      color: "text-green-400",
    },
    {
      name: "Cosmic",
      value: "cosmic",
      icon: <Volume2 className="h-3.5 w-3.5" />,
      color: "text-indigo-400",
    },
    {
      name: "Midnight",
      value: "midnight",
      icon: <Volume2 className="h-3.5 w-3.5" />,
      color: "text-slate-400",
    },
    {
      name: "Default",
      value: "default",
      icon: <Volume2 className="h-3.5 w-3.5" />,
      color: "text-cyan-400",
    },
  ];

  const borderColors: Record<string, string> = {
    spotify: "border-green-400",
    cosmic: "border-indigo-400",
    midnight: "border-slate-400",
    default: "border-cyan-400",
  };

  const handleThemeChange = (newTheme: string) => {
    if (isAnimating || newTheme === cardTheme) return;

    const currentIndex = themeOptions.findIndex(
      (opt) => opt.value === cardTheme,
    );
    const newIndex = themeOptions.findIndex((opt) => opt.value === newTheme);

    setIsAnimating(true);
    setSlideDirection(newIndex > currentIndex ? "right" : "left");
    setCardTheme(newTheme);

    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  const handleArrowNavigation = (direction: "prev" | "next") => {
    if (isAnimating) return;

    const currentIndex = themeOptions.findIndex(
      (opt) => opt.value === cardTheme,
    );

    let newIndex;
    if (direction === "prev") {
      newIndex =
        currentIndex === 0 ? themeOptions.length - 1 : currentIndex - 1;
      setSlideDirection("left");
    } else {
      newIndex =
        currentIndex === themeOptions.length - 1 ? 0 : currentIndex + 1;
      setSlideDirection("right");
    }

    setIsAnimating(true);
    setCardTheme(themeOptions[newIndex].value);

    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  const slideVariants = {
    enterRight: { x: 300, opacity: 0 },
    enterLeft: { x: -300, opacity: 0 },
    center: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 350,
        damping: 30,
        mass: 1,
        duration: 0.4,
      },
    },
    exitRight: {
      x: 300,
      opacity: 0,
      transition: { type: "tween" as const, ease: "easeInOut", duration: 0.3 },
    },
    exitLeft: {
      x: -300,
      opacity: 0,
      transition: { type: "tween" as const, ease: "easeInOut", duration: 0.3 },
    },
  };

  const currentThemeOption = themeOptions.find(
    (opt) => opt.value === cardTheme,
  );

  return (
    <div className="md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Unified layout: arrows on small containers, side panel on large */}
        <div className="flex justify-center items-center lg:gap-4 2xl:gap-12 relative">
          {/* Arrow nav - visible on small to medium containers */}
          <button
            onClick={() => handleArrowNavigation("prev")}
            disabled={isAnimating}
            className="flex lg:hidden 2xl:flex items-center justify-center w-10 h-10 2xl:w-12 2xl:h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <ChevronLeft className="h-5 w-5 2xl:h-6 2xl:w-6 text-neutral-600 dark:text-neutral-400" />
          </button>

          <div className="flex-1 flex items-center justify-center">
            <div
              className="w-full max-w-[380px] h-[400px] relative overflow-hidden"
              style={{ perspective: "1200px" }}
            >
              <AnimatePresence
                initial={false}
                custom={slideDirection}
                mode="popLayout"
              >
                <motion.div
                  key={cardTheme}
                  variants={slideVariants}
                  initial={
                    slideDirection === "right" ? "enterRight" : "enterLeft"
                  }
                  animate="center"
                  exit={slideDirection === "right" ? "exitLeft" : "exitRight"}
                  className="absolute inset-0 will-change-transform"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Suspense
                    fallback={
                      <MusicPlayerSkeleton className="shadow-lg rounded-lg mr-1 scale-80 -mt-12" />
                    }
                  >
                    <MusicPlayer
                      theme={
                        cardTheme as
                          | "default"
                          | "spotify"
                          | "cosmic"
                          | "midnight"
                      }
                      currentTrack={sampleTrack}
                      currentIndex={0}
                      initialTime={45}
                      className="shadow-lg rounded-lg mr-1 scale-80 -mt-12"
                      autoPlay={false}
                      showEqualizer={true}
                    />
                  </Suspense>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Arrow nav right - visible on small to medium containers */}
          <button
            onClick={() => handleArrowNavigation("next")}
            disabled={isAnimating}
            className="flex lg:hidden 2xl:flex items-center justify-center w-10 h-10 2xl:w-12 2xl:h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <ChevronRight className="h-5 w-5 2xl:h-6 2xl:w-6 text-neutral-600 dark:text-neutral-400" />
          </button>

          {/* Theme selector side panel - visible on large containers */}
          <div className="flex-col gap-4 hidden lg:flex 2xl:flex">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Choose Theme
            </h3>
            {themeOptions.map((option) => (
              <button
                key={option.value}
                className={`flex bg-white dark:bg-black items-center gap-3 px-6 py-3 border rounded-xl transition-all duration-200 hover:scale-105 ${
                  cardTheme === option.value
                    ? `${borderColors[option.value] || borderColors.default} ${option.color} shadow-lg scale-105`
                    : "border-gray-300 dark:border-gray-700 opacity-70 hover:opacity-100"
                }`}
                onClick={() => handleThemeChange(option.value)}
                disabled={isAnimating}
              >
                {option.icon}
                <span className="text-base font-medium">{option.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Current theme display for small containers */}
        <div className="flex lg:hidden items-center justify-center gap-4 mt-6 px-4">
          <div
            className={`flex items-center gap-3 px-6 py-3 bg-white dark:bg-black border rounded-xl shadow-md min-w-[140px] justify-center ${borderColors[cardTheme]} ${currentThemeOption?.color}`}
          >
            {currentThemeOption?.icon}
            <span className="text-base font-medium">
              {currentThemeOption?.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Feature block                                                  */
/* ------------------------------------------------------------------ */

export function Feature() {
  return (
    <div className="relative w-full py-20 overflow-hidden px-6 3xl:px-22">
      <div className="relative z-10 mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 lg:py-16 dark:bg-neutral-950 dark:text-white border border-neutral-200 dark:border-neutral-800">
        {/* Corner decorations */}
        <div className="absolute -top-0.5 left-0 w-4 z-12 h-0.5 border-t border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>
        <div className="absolute -top-0.5 -left-0.5 w-0.5 z-12 h-4 border-l border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>
        <div className="absolute -top-0.5 right-0 w-4 z-12 h-0.5 border-t border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>
        <div className="absolute -top-0.5 -right-0.5 w-0.5 z-12 h-4 border-r border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>
        <div className="absolute -bottom-0.5 left-0 w-4 z-12 h-0.5 border-b border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>
        <div className="absolute -bottom-0.5 -left-0.5 w-0.5 z-12 h-4 border-l border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>
        <div className="absolute -bottom-0.5 right-0 w-4 z-12 h-0.5 border-b border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>
        <div className="absolute -bottom-0.5 -right-0.5 w-0.5 z-12 h-4 border-r border-neutral-600 dark:border-neutral-400 bg-neutral-600 dark:bg-neutral-400"></div>

        {/* Two-column grid: switches to side-by-side on large containers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start relative">
          {/* Left Section - Copy/Paste Components */}
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center gap-2 text-neutral-400 text-xs sm:text-sm">
              <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Copy/Paste Components</span>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                Polished{" "}
                <span className="relative inline-block tracking-tight dark:tracking-normal md:tracking-tighter md:dark:tracking-tight">
                  <span className="relative z-0 border border-purple-500 dark:border-purple-900 bg-purple-200 dark:bg-purple-800/40">
                    &lt;Component/&gt;
                    <div className="absolute -top-[2px] -left-[2px] w-1 h-1 bg-purple-600 dark:bg-purple-900 rounded-full"></div>
                    <div className="absolute -top-[2px] -right-[2px] w-1 h-1 bg-purple-600 dark:bg-purple-900 rounded-full"></div>
                    <div className="absolute -bottom-[2px] -left-[2px] w-1 h-1 bg-purple-600 dark:bg-purple-900 rounded-full"></div>
                    <div className="absolute -bottom-[2px] -right-[2px] w-1 h-1 bg-purple-600 dark:bg-purple-900 rounded-full"></div>
                  </span>
                </span>{" "}
                <span className="block sm:inline">
                  for elegant UIs and clean layouts
                </span>
              </h1>
            </div>

            <div className="space-y-4 relative w-full overflow-hidden">
              <Browser
                url="https://nyxui.com/"
                className="w-full h-auto max-w-full"
              >
                <CustomPointer />
              </Browser>
            </div>
          </div>

          {/* Right Section - Development Speed */}
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center gap-2 text-neutral-400 text-xs sm:text-sm">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Development Speed</span>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                <span className="relative inline-block tracking-tight dark:tracking-normal md:tracking-tighter md:dark:tracking-tight">
                  <span className="relative z-0 border border-dashed border-purple-600 dark:border-purple-800 bg-purple-200 dark:bg-purple-950/60">
                    Customize
                    <div className="absolute -top-[2px] -left-[2px] w-1 h-1 bg-purple-600 dark:bg-purple-600 rounded-full"></div>
                    <div className="absolute -top-[2px] -right-[2px] w-1 h-1 bg-purple-600 dark:bg-purple-600 rounded-full"></div>
                    <div className="absolute -bottom-[2px] -left-[2px] w-1 h-1 bg-purple-600 dark:bg-purple-600 rounded-full"></div>
                    <div className="absolute -bottom-[2px] -right-[2px] w-1 h-1 bg-purple-600 dark:bg-purple-600 rounded-full"></div>
                  </span>
                </span>{" "}
                <span className="block sm:inline">
                  with ease. Launch with speed.
                </span>
              </h2>
            </div>

            <div className="w-full overflow-hidden">
              <MusicCardThemeCustomizer />
            </div>
          </div>
        </div>

        {/* Vertical divider - visible on large containers */}
        <div className="hidden lg:block h-full w-[0.5px] bg-neutral-200 dark:bg-neutral-800 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
      </div>
    </div>
  );
}
