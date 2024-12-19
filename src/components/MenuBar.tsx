import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { MENU_ITEMS } from '@/lib/constants';

export function MenuBar() {
  return (
    <ScrollArea className="w-80 md:w-full whitespace-nowrap rounded-md border">
      <div className="flex space-x-4 p-4 overflow-x-auto">
        {MENU_ITEMS.map((item) => (
          <Card 
            key={item.id} 
            className="w-[200px] sm:w-[250px] lg:w-[300px] shrink-0"
          >
            <div className="relative h-[120px] sm:h-[150px] lg:h-[180px] w-full overflow-hidden rounded-t-lg group">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-full transition-transform group-hover:scale-110 duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm sm:text-base font-semibold">{item.name}</h3>
              <p className="text-xs sm:text-sm font-medium text-orange-600">
                ₹{item.price.toFixed(2)}
              </p>
            </div>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
