"use client";

import { useState } from 'react';
import { BarChart3, FileBarChart, FileText, ArrowDownNarrowWide, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StatCard from '@/components/StatCard';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

const Reports = () => {
  const { toast } = useToast();
  const [timeframe, setTimeframe] = useState('week');

  // Mock sales data
  const salesData = [
    { date: 'Mon, Mar 10', orders: 42, revenue: 789.50, avgOrder: 18.80 },
    { date: 'Tue, Mar 11', orders: 38, revenue: 712.20, avgOrder: 18.74 },
    { date: 'Wed, Mar 12', orders: 45, revenue: 892.75, avgOrder: 19.84 },
    { date: 'Thu, Mar 13', orders: 52, revenue: 1043.65, avgOrder: 20.07 },
    { date: 'Fri, Mar 14', orders: 68, revenue: 1354.45, avgOrder: 19.91 },
    { date: 'Sat, Mar 15', orders: 72, revenue: 1580.90, avgOrder: 21.96 },
    { date: 'Sun, Mar 16', orders: 58, revenue: 1245.80, avgOrder: 21.48 },
  ];

  // Mock popular items
  const popularItems = [
    { name: 'Classic Cheeseburger', category: 'Main Course', orders: 145, revenue: 1885.55 },
    { name: 'Margherita Pizza', category: 'Main Course', orders: 118, revenue: 1769.82 },
    { name: 'Caesar Salad', category: 'Starters', orders: 92, revenue: 827.08 },
    { name: 'Chocolate Brownie', category: 'Desserts', orders: 87, revenue: 608.13 },
    { name: 'Grilled Salmon', category: 'Main Course', orders: 76, revenue: 1519.24 },
  ];

  const generateReport = () => {
    toast({
      title: "Report Generated",
      description: "Your report has been generated and is ready to download",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-gray-500 mt-1">Track performance and generate detailed reports</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={generateReport}
          >
            <FileText size={16} />
            <span>Export PDF</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="$7,619.25" 
          icon={<BarChart3 className="text-navy" />} 
          trend={{ value: "8.2%", positive: true }}
        />
        <StatCard 
          title="Total Orders" 
          value="375" 
          icon={<FileBarChart className="text-navy" />} 
          trend={{ value: "5.3%", positive: true }}
        />
        <StatCard 
          title="Average Order" 
          value="$20.32" 
          icon={<ArrowDownNarrowWide className="text-navy" />} 
          trend={{ value: "2.8%", positive: true }}
        />
        <StatCard 
          title="Time Period" 
          value="Last 7 Days" 
          icon={<Calendar className="text-navy" />} 
        />
      </div>
      
      <div className="flex items-center justify-between">
        <Tabs defaultValue="sales" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="sales">Sales Overview</TabsTrigger>
              <TabsTrigger value="items">Popular Items</TabsTrigger>
            </TabsList>
            
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <TabsContent value="sales" className="mt-0">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Orders</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Avg. Order</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesData.map((day) => (
                    <TableRow key={day.date}>
                      <TableCell className="font-medium">{day.date}</TableCell>
                      <TableCell className="text-right">{day.orders}</TableCell>
                      <TableCell className="text-right">${day.revenue.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${day.avgOrder.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="items" className="mt-0">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Orders</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {popularItems.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="text-right">{item.orders}</TableCell>
                      <TableCell className="text-right">${item.revenue.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Sales Trend</h2>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 h-80 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 size={48} className="mx-auto text-gray-300" />
            <p className="mt-2 text-gray-500">Graph visualization will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
