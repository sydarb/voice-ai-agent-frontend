import * as React from 'react';
import { CarouselCardItem } from '@/lib/types';
import { CarouselCard } from './carousel-card';

interface CarouselProps {
  items: CarouselCardItem[];
}

export function Carousel({ items }: CarouselProps) {
  return (
    <div className="flex space-x-4 overflow-x-auto py-4">
      {items.map((item) => (
        <CarouselCard key={item.actionUrl} item={item} />
      ))}
    </div>
  );
}