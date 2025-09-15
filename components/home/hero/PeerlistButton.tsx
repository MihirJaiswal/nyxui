import { BiUpvote } from "react-icons/bi"
import Link from "next/link"
import Image from "next/image"

export function PeerlistButton() {
  return (
    <div className="inline-block">
      <Link
        href="https://peerlist.io/jaiswalmihir/project/nyx-ui"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative overflow-hidden inline-flex items-center gap-2 bg-gradient-to-br group-first  from-green-900 via-green-950 to-green-800 hover:from-emerald-900 hover:via-green-700 hover:to-emerald-950 text-white font-semibold px-2 py-1 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 border no-underline"
        style={{ backgroundColor: "#059669" }}
      >
        <div className="w-4 h-4 rounded-lg flex items-center justify-center shadow-sm">
          <Image
            src="/assets/images/landing-page/peerlist.png"
            alt="Peerlist"
            width={24}
            height={24}
          />
        </div>

        <span
          className="text-sm font-semibold tracking-wide text-white"
          style={{
            color: "#ffffff",
            textShadow: "0 1px 3px rgba(0,0,0,0.6)", // stronger shadow
          }}
        >
          Live on Peerlist
        </span>

        <div className="transition-all duration-200 group-hover:scale-110">
          <BiUpvote className="w-4 h-4 group-[first]:hover:fill-white" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine" />
      </Link>
    </div>
  )
}
