"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import TableCard from '@/components/TableCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Plus, TableProperties, Trash2 } from 'lucide-react';

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
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const [newTableNumber, setNewTableNumber] = useState<string>('');
  const [tables, setTables] = useState<Table[]>([
    { id: 1, number: 1, status: 'occupied', items: 4, time: '32m' },
    { id: 2, number: 2, status: 'service', items: 2, time: '12m' },
    { id: 3, number: 3, status: 'available' },
    { id: 4, number: 4, status: 'occupied', items: 6, time: '45m' },
    { id: 5, number: 5, status: 'available' },
    { id: 6, number: 6, status: 'occupied', items: 3, time: '18m' },
    { id: 7, number: 7, status: 'service', items: 1, time: '5m' },
    { id: 8, number: 8, status: 'available' },
  ]);

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

  const handleToggleAvailability = (tableId: number, available: boolean) => {
    setTables(prevTables => 
      prevTables.map(table => {
        if (table.number === tableId) {
          return { 
            ...table, 
            status: available ? 'available' : 'occupied',
            // Reset items and time if table becomes available
            ...(available && { items: undefined, time: undefined })
          };
        }
        return table;
      })
    );
    
    toast({
      title: available ? "Table Available" : "Table Occupied",
      description: `Table ${tableId} is now ${available ? 'available' : 'occupied'}`,
    });
  };

  const handleDeleteTable = (tableId: number) => {
    setTables(prevTables => prevTables.filter(table => table.number !== tableId));
    
    toast({
      title: "Table Deleted",
      description: `Table ${tableId} has been removed`,
      variant: "destructive",
    });
  };

  const handleAddTable = () => {
    const tableNumber = parseInt(newTableNumber);
    
    if (isNaN(tableNumber) || tableNumber <= 0) {
      toast({
        title: "Invalid Table Number",
        description: "Please enter a valid table number",
        variant: "destructive",
      });
      return;
    }
    
    // Check if table number already exists
    if (tables.some(table => table.number === tableNumber)) {
      toast({
        title: "Table Already Exists",
        description: `Table ${tableNumber} already exists`,
        variant: "destructive",
      });
      return;
    }
    
    // Add new table
    const newTable: Table = {
      id: Date.now(),
      number: tableNumber,
      status: 'available'
    };
    
    setTables(prev => [...prev, newTable]);
    setNewTableNumber('');
    setOpenAddDialog(false);
    
    toast({
      title: "Table Added",
      description: `Table ${tableNumber} has been added`,
    });
  };

  const filterTables = (status: string) => {
    if (status === 'all') return tables;
    return tables.filter(t => t.status === status);
  };

  const filteredTables = filterTables(activeTab);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Tables & Orders</h1>
          <p className="text-gray-500 mt-1">Manage your restaurant tables and active orders</p>
        </div>
        <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-orange hover:bg-orange/90 text-white">
              <Plus size={16} className="mr-2" />
              Add Table
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Table</DialogTitle>
              <DialogDescription>
                Enter the table number to add a new table to your restaurant.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input
                type="number"
                placeholder="Table Number"
                value={newTableNumber}
                onChange={(e) => setNewTableNumber(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTable}>
                Add Table
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
            {tables.map((table) => (
              <TableCard 
                key={table.id}
                tableNumber={table.number}
                status={table.status}
                orderItems={table.items}
                timeElapsed={table.time}
                onViewOrder={() => handleViewOrder(table.number)}
                onGenerateQR={() => handleGenerateQR(table.number)}
                onToggleAvailability={(available) => handleToggleAvailability(table.number, available)}
                onDelete={() => handleDeleteTable(table.number)}
              />
            ))}
          </div>
        </TabsContent>
        
        {['available', 'occupied', 'service'].map((status) => (
          <TabsContent key={status} value={status} className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filterTables(status).map((table) => (
                <TableCard 
                  key={table.id}
                  tableNumber={table.number}
                  status={table.status}
                  orderItems={table.items}
                  timeElapsed={table.time}
                  onViewOrder={() => handleViewOrder(table.number)}
                  onGenerateQR={() => handleGenerateQR(table.number)}
                  onToggleAvailability={(available) => handleToggleAvailability(table.number, available)}
                  onDelete={() => handleDeleteTable(table.number)}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Tables;
