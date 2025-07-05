import Image from "next/image"

export default function SocialProof() {
  const avatars = [
    { id: 1, src: "/assets/images/avtars/10.jpg", alt: "Founder 1" },
    { id: 2, src: "/assets/images/avtars/8.jpg", alt: "Founder 2" },
    { id: 3, src: "/assets/images/avtars/4.jpeg", alt: "Founder 3" },
    { id: 4, src: "/assets/images/avtars/5.jpeg", alt: "Founder 4" },
    { id: 6, src: "/assets/images/avtars/9.jpeg", alt: "Founder 6" },
    { id: 7, src: "/assets/images/avtars/6.jpeg", alt: "Founder 7" },
  ]

  return (
    <div>
      <div className="max-w-5xl mx-auto text-center">
        

        <div className="flex justify-center items-center">
          <div className="flex -space-x-3">
            {avatars.map((avatar, index) => (
              <div key={avatar.id} className="relative" style={{ zIndex: avatars.length - index }}>
                <Image
                  src={avatar.src || "/placeholder.svg"}
                  alt={avatar.alt}
                  width={60}
                  height={60}
                  priority
                  className="rounded-full contrast-125 w-14 h-14 border-[2px] object-cover border-gray-200 dark:border-zinc-950"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
