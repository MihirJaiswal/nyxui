import React from 'react';

export const Hero = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center">
      <main className="flex-1">
        <section
          className="space-y-6 pb-8 pt-10 md:pb-12 md:pt-16 lg:py-32"
          aria-label="Hero Section"
        >
          <div className="container max-w-4xl mx-auto flex flex-col items-center gap-4 text-center">
            <div className="rounded-full bg-muted px-4 py-1.5 text-sm font-medium">
              v1.0.0 Now Available
            </div>
            <h1
              className="text-4xl sm:text-6xl lg:text-[6rem] font-black font-sans leading-tight md:leading-snug pb-1.5 md:pb-4"
              style={{
                backgroundImage:
                  "url('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXoyMm1teGowOWYzaGp0Y2RhMnFsOHE5MWJsM3p5N2dpNnU4aTJ0eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT4uQz8cFN0dS7BiwM/giphy.gif')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'repeat',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Build Beautiful UI
            </h1>
            <p className="max-w-3xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              A modern UI component library for React applications. Accessible, customizable, and
              developer-friendly.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

