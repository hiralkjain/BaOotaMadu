
import { Edit, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MenuItemCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  available: boolean;
  image: string;
  className?: string;
  onToggleAvailability: (id: string, available: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const MenuItemCard = ({
  id,
  name,
  category,
  price,
  available,
  image,
  className,
  onToggleAvailability,
  onEdit,
  onDelete
}: MenuItemCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animated-card",
      !available && "opacity-70",
      className
    )}>
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
            <span className="text-xs text-gray-500 uppercase">{category}</span>
          </div>
          <span className="text-lg font-semibold text-navy">${price.toFixed(2)}</span>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Switch 
              checked={available} 
              onCheckedChange={(checked) => onToggleAvailability(id, checked)} 
            />
            <span className="text-sm text-gray-500">Available</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => onEdit(id)}>
              <Edit size={16} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(id)}>
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
