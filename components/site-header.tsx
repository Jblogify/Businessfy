import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Jalal Nasser</span>
          </Link>
        </div>

        <div className="flex-1">
          <MainNav />
        </div>

        <div className="flex items-center">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
