
import { useState } from 'react';
import { Plus, Search, FilterX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MenuItemCard from '@/components/MenuItemCard';
import { useToast } from '@/hooks/use-toast';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  available: boolean;
  image: string;
}

const Menu = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock data
  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Classic Cheeseburger',
      category: 'Main Course',
      price: 12.99,
      available: true,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1000',
    },
    {
      id: '2',
      name: 'Caesar Salad',
      category: 'Starters',
      price: 8.99,
      available: true,
      image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&q=80&w=1000',
    },
    {
      id: '3',
      name: 'Margherita Pizza',
      category: 'Main Course',
      price: 14.99,
      available: true,
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=1000',
    },
    {
      id: '4',
      name: 'Chocolate Brownie',
      category: 'Desserts',
      price: 6.99,
      available: false,
      image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&q=80&w=1000',
    },
    {
      id: '5',
      name: 'Grilled Salmon',
      category: 'Main Course',
      price: 19.99,
      available: true,
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=1000',
    },
    {
      id: '6',
      name: 'Garlic Bread',
      category: 'Starters',
      price: 4.99,
      available: true,
      image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&q=80&w=1000',
    },
  ];

  const categories = ['All', 'Main Course', 'Starters', 'Desserts'];

  const handleEdit = (id: string) => {
    toast({
      title: "Edit Menu Item",
      description: `Opening edit form for item ${id}`,
    });
  };

  const handleDelete = (id: string) => {
    toast({
      title: "Delete Menu Item",
      description: `Item ${id} will be deleted`,
      variant: "destructive",
    });
  };

  const handleToggleAvailability = (id: string, available: boolean) => {
    toast({
      title: `Item ${available ? 'Available' : 'Unavailable'}`,
      description: `Item ${id} is now ${available ? 'available' : 'unavailable'}`,
    });
  };

  const handleAddMenuItem = () => {
    toast({
      title: "Add Menu Item",
      description: "Opening form to add a new menu item",
    });
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter.toLowerCase() === 'all' || 
                            item.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Menu Management</h1>
          <p className="text-gray-500 mt-1">Add, edit and manage your menu items</p>
        </div>
        <Button className="bg-orange hover:bg-orange/90 text-white" onClick={handleAddMenuItem}>
          <Plus size={16} className="mr-2" />
          Add Item
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search menu items..." 
            className="pl-10" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {(searchQuery || categoryFilter !== 'all') && (
          <Button variant="outline" onClick={() => { 
            setSearchQuery(''); 
            setCategoryFilter('all'); 
          }}>
            <FilterX size={16} className="mr-2" />
            Clear
          </Button>
        )}
      </div>
      
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              id={item.id}
              name={item.name}
              category={item.category}
              price={item.price}
              available={item.available}
              image={item.image}
              onToggleAvailability={handleToggleAvailability}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No menu items found matching your criteria.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => { 
              setSearchQuery(''); 
              setCategoryFilter('all'); 
            }}
          >
            <FilterX size={16} className="mr-2" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Menu;
