import Link from "next/link";

interface HeaderProps {
  currentPath: string;
}

export function Header({ currentPath }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
      <div className="container flex items-center justify-between h-16 py-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">AI Guru</h1>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-violet-100 text-violet-900">Beta</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className={`text-sm font-medium hover:underline ${
              currentPath === "/" ? "underline" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium hover:underline ${
              currentPath === "/about" ? "underline" : ""
            }`}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
