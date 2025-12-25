import { Utensils, QrCode, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import QRCodeGenerator from "./QRCodeGenerator";

type TableStatus = "available" | "occupied" | "service";

interface TableCardProps {
  tableId: string;
  tableNumber: number;
  status: TableStatus;
  orderItems?: number;
  className?: string;
  hasOrder?: boolean;
  onViewOrder?: (tableId: string) => void;
  onGenerateQR?: (tableId: string) => void;
  onDelete?: () => void;
  onToggleStatus?: () => void; // ✅ already existed
}

const statusToLabel: Record<TableStatus, string> = {
  available: "Available",
  occupied: "Occupied",
  service: "In Service",
};

const TableCard = ({
  tableId,
  tableNumber,
  status,
  orderItems = 0,
  className,
  hasOrder = false,
  onViewOrder,
  onGenerateQR,
  onDelete,
  onToggleStatus, // ✅ used
}: TableCardProps) => {
  const [openQRDialog, setOpenQRDialog] = useState(false);

  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-sm overflow-hidden animated-card card-hover border border-gray-100",
        className
      )}
    >
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Table {tableNumber}</h3>
          <span className={cn("status-badge", `status-${status}`)}>
            {statusToLabel[status]}
          </span>
        </div>
      </div>

      {status !== "available" && (
        <div className="p-4">
          <div className="flex justify-between mb-3">
            <span className="text-gray-500 text-sm">Order Items:</span>
            <span className="font-medium">{orderItems}</span>
          </div>
        </div>
      )}

      <div className="p-4 bg-gray-50 flex flex-col gap-3">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewOrder && onViewOrder(tableId)}
            className="flex-1 flex items-center gap-1"
          >
            <Utensils size={14} />
            <span>View Order</span>
          </Button>

          <Dialog open={openQRDialog} onOpenChange={setOpenQRDialog}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setOpenQRDialog(true);
                if (onGenerateQR) onGenerateQR(tableId);
              }}
              className="flex items-center gap-1"
            >
              <QrCode size={14} />
            </Button>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>QR Code for Table {tableNumber}</DialogTitle>
              </DialogHeader>
              <QRCodeGenerator tableId={tableId} />
            </DialogContent>
          </Dialog>
        </div>

        {/* ✅ MANUAL OCCUPY / FREE TOGGLE (ONLY ADDITION) */}
        {onToggleStatus && (
          <Button
            size="sm"
            variant={status === "available" ? "default" : "outline"}
            onClick={onToggleStatus}
            className="w-full"
          >
            {status === "available" ? "Mark Occupied" : "Mark Available"}
          </Button>
        )}

        {onDelete && (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-destructive hover:text-destructive"
              onClick={onDelete}
            >
              <Trash2 size={15} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableCard;
