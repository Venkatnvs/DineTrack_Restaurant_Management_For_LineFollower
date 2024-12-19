import { useEffect, useState } from 'react';
import { TableCard } from './TableCard';
import { TableData, TableOrder } from '@/lib/types';
import { fetchTableData, clearTable } from '@/lib/api';


export function TableGrid() {
  const [tableData, setTableData] = useState<TableData>({});
  const disabledTables = ['T3', 'T4'];

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetchTableData();
      setTableData(data);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleClearTable = async (tableId: string) => {
    await clearTable(tableId);
    const data = await fetchTableData();
    setTableData(data);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {['T1', 'T2', 'T3', 'T4'].map((tableId) => {
        const isDisabled = disabledTables.includes(tableId);
        const items = (tableData[tableId] || []) as unknown as TableOrder['items'];
        const order: TableOrder | null = items.length
          ? {
              id: tableId,
              items: items?.reduce((acc, item) => {
                const existing = acc.find((i) => i.id === item.id);
                if (existing) {
                  existing.quantity += 1;
                  return acc;
                }
                return [...acc, { ...item, quantity: 1 }];
              }, [] as TableOrder['items']),
              status: 'active',
              timestamp: Date.now(),
            }
          : null;

          console.log("order", order);

        return (
          <TableCard
            key={tableId}
            tableId={tableId}
            isDisabled={isDisabled}
            order={order}
            onClear={handleClearTable}
          />
        );
      })}
    </div>
  );
}