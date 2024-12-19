import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Utensils, Ban, Receipt } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TableOrder } from '@/lib/types';
import { BillModal } from './BillModal';
import { TableScene } from './3d/TableScene';

interface TableCardProps {
  tableId: string;
  isDisabled: boolean;
  order: TableOrder | null;
  onClear: (tableId: string) => Promise<void>;
}

export function TableCard({ tableId, isDisabled, order, onClear }: TableCardProps) {
  const [showBill, setShowBill] = useState(false);

  const totalAmount = order?.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ) ?? 0;

  return (
    <>
      <Card
        className={cn(
          'p-4 transition-all duration-300',
          isDisabled ? 'opacity-50' : 'hover:shadow-lg',
          order ? 'border-orange-500' : 'border-gray-200'
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Table {tableId.slice(1)}</h3>
          {isDisabled ? (
            <Ban className="text-red-500" />
          ) : (
            <Utensils className={order ? 'text-orange-500' : 'text-gray-400'} />
          )}
        </div>

        <TableScene
          tableId={tableId}
          order={order}
          isDisabled={isDisabled}
        />
        
        {!isDisabled && (
          <>
            <div className="min-h-[100px] mb-4 mt-4">
              {order?.items.length ? (
                <ul className="space-y-2">
                  {order.items.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm bg-orange-50 dark:bg-orange-950 p-2 rounded flex justify-between"
                    >
                      <span>{item.name}</span>
                      <span>x{item.quantity}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No active orders</p>
              )}
            </div>
            {order && (
              <div className="mb-4">
                <p className="text-lg font-semibold text-orange-600">
                  Total: ₹{totalAmount.toFixed(2)}
                </p>
              </div>
            )}
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowBill(true)}
                disabled={!order}
              >
                <Receipt className="mr-2 h-4 w-4" />
                View Bill
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onClear(tableId)}
                disabled={!order}
              >
                Clear Table
              </Button>
            </div>
          </>
        )}
      </Card>
      {order && (
        <BillModal
          open={showBill}
          onClose={() => setShowBill(false)}
          order={order}
          tableId={tableId}
        />
      )}
    </>
  );
}