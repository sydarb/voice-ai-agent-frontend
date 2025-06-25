import * as React from 'react';
import { CarouselCardItem } from '@/lib/types';
import { CarouselCard } from './carousel-card';
import { Button } from '@/components/ui/button';

interface CarouselProps {
  items: CarouselCardItem[];
  onSelectionChange?: (selectedItem: CarouselCardItem | null) => void;
  onSendToAgent?: (message: string) => void;
  onCarouselMount?: (ref: { items: CarouselCardItem[], selectItem: (index: number) => void }) => void;
}

export function Carousel({ items, onSelectionChange, onSendToAgent, onCarouselMount }: CarouselProps) {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const handleSelect = (item: CarouselCardItem) => {
    if (selectedId) return; // Disable selection if something is already selected
    
    setSelectedId(item.actionUrl);
    onSelectionChange?.(item);
    onSendToAgent?.(`Selected: ${item.title}`);
  };
  
  const selectItemByIndex = (index: number) => {
    if (items[index] && !selectedId) {
      const item = items[index];
      setSelectedId(item.actionUrl);
      onSelectionChange?.(item);
    }
  };

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 270;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  React.useEffect(() => {
    onCarouselMount?.({ items, selectItem: selectItemByIndex });
  }, [items, onCarouselMount]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      checkScrollButtons();
    }, 100);
    
    const handleScroll = () => checkScrollButtons();
    const scrollElement = scrollRef.current;
    
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      clearTimeout(timer);
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [items]);

  return (
    <div className="relative">
      {items.length > 1 && canScrollLeft && (
        <Button
          variant="outline"
          size="sm"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 bg-background hover:bg-muted border-muted/50 shadow-sm rounded-full transition-all duration-200"
          onClick={() => scroll('left')}
        >
          ←
        </Button>
      )}
      
      <div 
        ref={scrollRef}
        className="flex space-x-4 overflow-x-scroll py-4 px-4 min-w-0 scrollbar-hide"
      >
        {items.map((item) => (
          <CarouselCard 
            key={item.actionUrl} 
            item={item} 
            isSelected={selectedId === item.actionUrl}
            onSelect={selectedId ? undefined : () => handleSelect(item)}
          />
        ))}
      </div>
      
      {items.length > 1 && canScrollRight && (
        <Button
          variant="outline"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 bg-background hover:bg-muted border-muted/50 shadow-sm rounded-full transition-all duration-200"
          onClick={() => scroll('right')}
        >
          →
        </Button>
      )}
    </div>
  );
}