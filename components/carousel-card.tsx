import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CarouselCardItem } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CarouselCardProps {
  item: CarouselCardItem;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function CarouselCard({ item, isSelected = false, onSelect }: CarouselCardProps) {
  return (
    <Card 
      className={cn(
        "min-w-[250px] max-w-[250px] cursor-pointer transition-transform duration-300 flex-shrink-0 flex flex-col",
        isSelected ? "ring-2 ring-primary bg-primary/5 transform scale-105" : "hover:bg-muted/50 hover:transform hover:scale-105 hover:shadow-xl"
      )}
      onClick={onSelect}
    >
      <CardHeader>
        {item.imageUrl && (
          <img src={item.imageUrl} alt={item.title} className="mb-4 h-32 w-full rounded-md object-cover" />
        )}
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button 
          className="w-full transition-all duration-200 bg-primary/10 hover:bg-primary/60 hover:text-white hover:transform hover:scale-110" 
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            window.open(item.actionUrl, '_blank', 'noopener,noreferrer');
          }}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}