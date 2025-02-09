'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';

import { Button } from './ui/button';

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/95 backdrop-blur-sm">
      <div className="max-w-8xl container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Mobile Menu Button */}
          <button className="text-white lg:hidden">
            <Menu className="size-6" />
          </button>

          {/* Left Navigation */}
          <nav className="hidden lg:block">
            <Link
              href="/emprendimiento"
              className="text-white transition-colors hover:text-gray-300"
            >
              Emprendimiento
            </Link>
          </nav>

          {/* Logo */}
          <div className="flex-1 text-center lg:flex-none">
            <Link href="/" className="text-2xl font-bold text-white">
              <img src="assets/images/Aranexa_logo.svg" alt="Aranexa logo" />
            </Link>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center gap-4">
            <select
              className="cursor-pointer border-none bg-transparent text-white outline-none"
              defaultValue="ESP"
            >
              <option value="ESP" className="bg-black">
                ESP
              </option>
              <option value="ENG" className="bg-black">
                ENG
              </option>
            </select>
            <Button
              variant="outline"
              className="border-white text-black hover:bg-black hover:text-white"
            >
              Contáctanos
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
