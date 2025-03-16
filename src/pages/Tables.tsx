
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import TableCard from '@/components/TableCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Plus, TableProperties } from 'lucide-react';

interface Table {
  id: number;
  number: number;
  status: 'available' | 'occupied' | 'service';
  items?: number;
  time?: string;
}

const Tables = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('all');

  // Mock data
  const allTables: Table[] = [
    { id: 1, number: 1, status: 'occupied', items: 4, time: '32m' },
    { id: 2, number: 2, status: 'service', items: 2, time: '12m' },
    { id: 3, number: 3, status: 'available' },
    { id: 4, number: 4, status: 'occupied', items: 6, time: '45m' },
    { id: 5, number: 5, status: 'available' },
    { id: 6, number: 6, status: 'occupied', items: 3, time: '18m' },
    { id: 7, number: 7, status: 'service', items: 1, time: '5m' },
    { id: 8, number: 8, status: 'available' },
  ];

  const handleViewOrder = (tableId: number) => {
    toast({
      title: "Viewing Order",
      description: `Opening order details for Table ${tableId}`,
    });
  };

  const handleGenerateQR = (tableId: number) => {
    toast({
      title: "QR Code Generated",
      description: `QR code for Table ${tableId} has been generated`,
    });
  };

  const filterTables = (status?: 'available' | 'occupied' | 'service') => {
    if (!status || status === 'all') return allTables;
    return allTables.filter(t => t.status === status);
  };

  const filteredTables = filterTables(activeTab as any);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Tables & Orders</h1>
          <p className="text-gray-500 mt-1">Manage your restaurant tables and active orders</p>
        </div>
        <Button className="bg-orange hover:bg-orange/90 text-white">
          <Plus size={16} className="mr-2" />
          Add Table
        </Button>
      </div>
      
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Tables</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="occupied">Occupied</TabsTrigger>
            <TabsTrigger value="service">In Service</TabsTrigger>
          </TabsList>
          <div className="text-sm text-gray-500">
            {filteredTables.length} table{filteredTables.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allTables.map((table) => (
              <TableCard 
                key={table.id}
                tableNumber={table.number}
                status={table.status}
                orderItems={table.items}
                timeElapsed={table.time}
                onViewOrder={() => handleViewOrder(table.number)}
                onGenerateQR={() => handleGenerateQR(table.number)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="available" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filterTables('available').map((table) => (
              <TableCard 
                key={table.id}
                tableNumber={table.number}
                status={table.status}
                orderItems={table.items}
                timeElapsed={table.time}
                onViewOrder={() => handleViewOrder(table.number)}
                onGenerateQR={() => handleGenerateQR(table.number)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="occupied" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filterTables('occupied').map((table) => (
              <TableCard 
                key={table.id}
                tableNumber={table.number}
                status={table.status}
                orderItems={table.items}
                timeElapsed={table.time}
                onViewOrder={() => handleViewOrder(table.number)}
                onGenerateQR={() => handleGenerateQR(table.number)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="service" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filterTables('service').map((table) => (
              <TableCard 
                key={table.id}
                tableNumber={table.number}
                status={table.status}
                orderItems={table.items}
                timeElapsed={table.time}
                onViewOrder={() => handleViewOrder(table.number)}
                onGenerateQR={() => handleGenerateQR(table.number)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tables;
