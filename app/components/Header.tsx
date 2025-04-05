import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black text-white py-4">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        {/* Left side: Site Title */}
        <div className="font-bold text-xl">AUFGEWARTET ZUM WOHL</div>

        {/* Right side: Navigation Links (if needed) */}
        <ul className="flex space-x-4">
          <li>
            <Link href="/#hero" className="hover:text-yellow-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/menu" passHref  className="hover:text-yellow-300">
              Menu
            </Link>
          </li>
          <li>
            <Link href="#contact"className="hover:text-yellow-300">
             Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
