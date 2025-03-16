
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string | number;
    positive: boolean;
  };
  className?: string;
}

const StatCard = ({ title, value, icon, trend, className }: StatCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-xl shadow-sm p-5 animated-card card-hover", 
      className
    )}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-xs font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.positive ? '+' : ''}{trend.value}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs yesterday</span>
            </div>
          )}
        </div>
        
        <div className="bg-navy/10 p-3 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
