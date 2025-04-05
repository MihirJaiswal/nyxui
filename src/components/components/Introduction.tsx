import Link from "next/link"

export default function IntroductionPage() {
  return (
    <div className="container max-w-4xl py-10 mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Introduction</h1>
          <p className="text-xl text-muted-foreground">
            Create Animated landing pages with components that you can copy and paste into your apps.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <p className="text-lg leading-7">
            Nyx UI is a collection of re-usable components that you can copy and paste into your web apps. It primarily
            features components, blocks, and templates geared towards creating landing pages and user-facing marketing
            materials.
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Philosophy</h2>
            <p className="leading-7">
              I firmly believe that exceptional design is a cornerstone of creating high-quality software. It is one of
              the key factors in building trust between a company and its users, who often start as strangers on the
              internet. In the realm of digital business, establishing trust is paramount because it is the first hurdle
              a potential customer must clear before committing to a purchase or sharing their personal information.
            </p>

            <p className="leading-7">
              Inferior design can damage your reputation. It can come across as unprofessional, unfinished, and
              unreliable, suggesting that the team behind it lacks attention to detail and does not prioritize user
              experience.
            </p>

            <p className="leading-7">
              Conversely, excellent design signifies that the team is meticulous and dedicated. It inspires confidence
              in users, leading them to believe that if the team invests so much effort into the finer details, they
              must also prioritize other crucial aspects of their business, including customer satisfaction.
            </p>

            <p className="leading-7">
              Nyx UI embodies this philosophy by striving to deliver reusable React components that are not only
              functional but also aesthetically pleasing and user-friendly. Our commitment to good design ensures that
              our components are robust, polished, and reliable, ultimately enhancing the overall user experience and
              fostering trust between our clients and their users.
            </p>

            <p className="leading-7">
              In essence, our design ethos at Nyx UI reflects a broader commitment to quality and customer care,
              reassuring users that they are in good hands.
            </p>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              This library is heavily inspired by{" "}
              <Link
                href="https://ui.shadcn.com"
                className="font-medium underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://ui.shadcn.com
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

