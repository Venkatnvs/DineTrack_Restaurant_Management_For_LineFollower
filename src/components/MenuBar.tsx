import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { MENU_ITEMS } from '@/lib/constants';

export function MenuBar() {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {MENU_ITEMS.map((item) => (
          <Card key={item.id} className="w-[250px] shrink-0">
            <div className="relative h-[150px] w-full overflow-hidden rounded-t-lg group">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-full transition-transform group-hover:scale-110 duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm font-medium text-orange-600">₹{item.price.toFixed(2)}</p>
            </div>
          </Card>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}