import { BarChart3, ShoppingBag, TableProperties, Clock, DollarSign } from 'lucide-react';
import StatCard from '@/components/StatCard';
import TableCard from '@/components/TableCard';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { toast } = useToast();

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

  // Mock data
  const tables = [
    { id: 1, number: 1, status: 'occupied' as const, items: 4, time: '32m' },
    { id: 2, number: 2, status: 'service' as const, items: 2, time: '12m' },
    { id: 3, number: 3, status: 'available' as const },
    { id: 4, number: 4, status: 'occupied' as const, items: 6, time: '45m' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, here's what's happening today.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Orders" 
          value="124" 
          icon={<ShoppingBag className="text-navy" />} 
          trend={{ value: "12%", positive: true }}
        />
        <StatCard 
          title="Daily Revenue" 
          value="$1,431" 
          icon={<DollarSign className="text-navy" />} 
          trend={{ value: "8%", positive: true }}
        />
        <StatCard 
          title="Active Tables" 
          value="7/12" 
          icon={<TableProperties className="text-navy" />} 
        />
        <StatCard 
          title="Pending Orders" 
          value="3" 
          icon={<Clock className="text-navy" />} 
          trend={{ value: "2", positive: false }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 h-80 overflow-hidden">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-3 pb-4 border-b last:border-0">
                  <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <ShoppingBag size={18} className="text-navy" />
                  </div>
                  <div>
                    <p className="font-medium">New order placed</p>
                    <p className="text-sm text-gray-500">{i * 5} minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Table Status</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tables.map((table) => (
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
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Revenue Overview</h2>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 h-80 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 size={48} className="mx-auto text-gray-300" />
            <p className="mt-2 text-gray-500">Sales analytics will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
