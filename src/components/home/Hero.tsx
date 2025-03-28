import React from 'react'

export default function Hero() {
  return (
    <div className='flex min-h-screen flex-col justify-center items-center'>
        <main className='flex-1'>
        <section className="space-y-6 pb-8 pt-10 md:pb-12 md:pt-16 lg:py-32">
            <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                <div className="rounded-full bg-muted px-4 py-1.5 text-sm font-medium">v1.0.0 Now Available</div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Build Beautiful Interfaces{" "}
                <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    Effortlessly
                </span>
                </h1>
                <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                A modern UI component library for React applications. Accessible, customizable, and developer-friendly.
                </p>
            </div>
            </section>
        </main>
    </div>
  )
}
