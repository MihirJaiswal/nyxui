import { Github } from 'lucide-react'
import Link from 'next/link'

const links = [
    {
        group: 'Pages',
        items: [
            {
                title: 'Home',
                href: '/',
            },
            {
                title: 'All Components',
                href: '/components',
            },
            {
                title: 'Documentation',
                href: '/docs',
            },
            {
                title: 'Categories',
                href: '/category',
            },
            {
                title: 'Templates',
                href: '/templates',
            },
            {
                title: 'Playground',
                href: '/playground',
            }
        ],
    },
    {
        group: 'Templates',
        items: [
            {
                title: 'Portfolio',
                href: '/templates/portfolio',
            }
        ],
    },
    {
        group: 'Components',
        items: [
            {
                title: '3D layered Card',
                href: '/components/3d-layered-card',
            },
            {
                title: 'Animated Code Block',
                href: '/components/animated-code-block',
            },
            {
                title: 'Apple Glass Effect',
                href: '/components/apple-glass-effect',
            },
            {
                title: 'More',
                href: '/components',
            },
        ],
    },
    {
        group: 'Blocks',
        items: [
            {
                title: 'Coming Soon',
                href: '/',
            }
        ],
    },
]

export default function FooterSection() {
    return (
        <footer className="border-t bg-white pt-20 dark:bg-neutral-950 z-10 relative">
            <div className=" px-6 xl:px-22 xl:container mx-auto">
                <div className="grid gap-12 md:grid-cols-5">
                    <div className="md:col-span-2">
                        <Link
                            href="/"
                            aria-label="go home"
                            className="block size-fit">
                           <span className="font-bold text-xl">NYX UI</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-3">
                        {links.map((link, index) => (
                            <div
                                key={index}
                                className="space-y-4 text-sm">
                                <span className="block font-medium">{link.group}</span>
                                {link.items.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className="text-muted-foreground hover:text-primary block duration-150">
                                        <span>{item.title}</span>
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t py-6">
                    <span className="text-muted-foreground order-last block text-center text-sm md:order-first">© {new Date().getFullYear()} Nyx UI, All rights reserved</span>
                    <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
                        <Link
                            href="https://x.com/mihir_jaiswal_"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X/Twitter"
                            className="text-primary block rounded-full hover:bg-muted/80 transition-all duration-300 hover:scale-105">
                            <svg
                                className="size-6"
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"></path>
                            </svg>
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/mihir-jaiswal-322898287/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="text-primary block rounded-full hover:bg-muted/80 transition-all duration-300 hover:scale-105">
                            <svg
                                className="size-6"
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"></path>
                            </svg>
                        </Link>
                        <Link
                            href="https://github.com/MihirJaiswal/nyxui"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="text-primary block rounded-full hover:bg-muted/80 transition-all duration-300 hover:scale-105">
                            <Github className='size-6' />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
