
import { Utensils, QrCode, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

type TableStatus = 'available' | 'occupied' | 'service';

interface TableCardProps {
  tableNumber: number;
  status: TableStatus;
  orderItems?: number;
  timeElapsed?: string;
  className?: string;
  onViewOrder?: () => void;
  onGenerateQR?: () => void;
  onToggleAvailability?: (available: boolean) => void;
  onDelete?: () => void;
}

const statusToLabel: Record<TableStatus, string> = {
  available: 'Available',
  occupied: 'Occupied',
  service: 'In Service'
};

const TableCard = ({
  tableNumber,
  status,
  orderItems = 0,
  timeElapsed,
  className,
  onViewOrder,
  onGenerateQR,
  onToggleAvailability,
  onDelete
}: TableCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-xl shadow-sm overflow-hidden animated-card card-hover border border-gray-100",
      className
    )}>
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Table {tableNumber}</h3>
          <span className={cn(
            "status-badge",
            `status-${status}`
          )}>
            {statusToLabel[status]}
          </span>
        </div>
      </div>

      {status !== 'available' && (
        <div className="p-4">
          <div className="flex justify-between mb-3">
            <span className="text-gray-500 text-sm">Order Items:</span>
            <span className="font-medium">{orderItems}</span>
          </div>
          {timeElapsed && (
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Time:</span>
              <span className="font-medium">{timeElapsed}</span>
            </div>
          )}
        </div>
      )}
      
      <div className="p-4 bg-gray-50 flex flex-col gap-3">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onViewOrder}
            className="flex-1 flex items-center gap-1"
            disabled={status === 'available'}
          >
            <Utensils size={14} />
            <span>View Order</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onGenerateQR}
            className="flex items-center gap-1"
          >
            <QrCode size={14} />
          </Button>
        </div>
        
        <div className="flex justify-between items-center">
          {onToggleAvailability && (
            <div className="flex items-center gap-2">
              <Switch 
                checked={status === 'available'} 
                onCheckedChange={onToggleAvailability}
                disabled={status === 'service'}
              />
              <span className="text-xs text-gray-500">Available</span>
            </div>
          )}
          
          {onDelete && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0 text-destructive hover:text-destructive"
              onClick={onDelete}
            >
              <Trash2 size={15} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableCard;
