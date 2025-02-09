'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export default function Sponsors() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto max-w-7xl px-4">
        <p className="mb-8 text-center text-gray-600">
          Con el respaldo de{' '}
          <span className="font-medium">incubadoras, institutos</span>
        </p>

        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg"
          >
            <ChevronLeft className="size-6" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg"
          >
            <ChevronRight className="size-6" />
          </button>

          {/* Sponsors Container */}
          <div
            ref={scrollRef}
            className="scrollbar-hide flex items-center gap-8 overflow-x-auto px-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {/* Replace with actual sponsor logos */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((index) => (
              <div
                key={index}
                className="flex h-24 w-48 flex-none items-center justify-center rounded-lg bg-gray-200"
                style={{ scrollSnapAlign: 'start' }}
              >
                Logo {index}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
