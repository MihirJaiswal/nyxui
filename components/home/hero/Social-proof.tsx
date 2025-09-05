import Image from "next/image"
import img1 from "/public/assets/images/avtars/10.jpg"
import img2 from "/public/assets/images/avtars/4.jpeg"
import img3 from "/public/assets/images/avtars/5.jpeg"
import img4 from "/public/assets/images/avtars/9.jpeg"
import img5 from "/public/assets/images/avtars/6.jpeg"

export default function SocialProof() {
  const avatars = [
    { id: 1, src: img1, alt: "Founder 1" },
    { id: 2, src: img2, alt: "Founder 2" },
    { id: 3, src: img3, alt: "Founder 3" },
    { id: 4, src: img4, alt: "Founder 4" },
    { id: 5, src: img5, alt: "Founder 5" },
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
                  loading='lazy'
                  placeholder="blur"
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
