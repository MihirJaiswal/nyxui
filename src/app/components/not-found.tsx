import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

const ComponentNotFound = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative size-8 overflow-hidden rounded-full bg-primary">
                <div className="absolute inset-0 flex items-center justify-center text-primary-foreground">
                  UI
                </div>
              </div>
              <span className="font-bold">Nyx UI</span>
            </Link>
          </div>
        </div>
      </header>
      <main className="container flex flex-1 flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <AlertTriangle className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-4xl font-bold">Component Not Found</h1>
          <p className="max-w-md text-muted-foreground">
            The component you're looking for doesn't exist or hasn't been documented yet.
          </p>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/components">Browse Components</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ComponentNotFound
