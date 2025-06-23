import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CarouselCardItem } from '@/lib/types';

interface CarouselCardProps {
  item: CarouselCardItem;
}

export function CarouselCard({ item }: CarouselCardProps) {
  return (
    <Card className="min-w-[250px] max-w-[250px]">
      <CardHeader>
        {item.imageUrl && (
          <img src={item.imageUrl} alt={item.title} className="mb-4 h-32 w-full rounded-md object-cover" />
        )}
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </CardContent>
      <CardFooter>
        <a href={item.actionUrl} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button className="w-full">View</Button>
        </a>
      </CardFooter>
    </Card>
  );
}