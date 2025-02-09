import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          {/* Social Media */}
          <div className="flex items-center space-x-4">
            <span className="text-white">Síguenos en</span>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-pink-500 transition-colors hover:text-pink-400"
              >
                <Facebook className="size-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-pink-500 transition-colors hover:text-pink-400"
              >
                <Twitter className="size-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-pink-500 transition-colors hover:text-pink-400"
              >
                <Instagram className="size-6" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-400">
            {/* Logo */}
            <img
              src="assets/images/Aranexa_logo.svg"
              alt="Aranexa logo"
              className="mb-10 h-6 w-auto" // Cambia el tamaño aquí
            />
            Copyright © {currentYear}
          </div>
        </div>
      </div>
    </footer>
  );
}
