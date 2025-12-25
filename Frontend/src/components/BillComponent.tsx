import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Download, ArrowLeft, Loader2, Printer } from 'lucide-react';
import { Order } from '@/store/slices/tableSlice';
import { useState, useEffect } from 'react';

interface BillComponentProps {
  order: Order;
  tableNumber: number;
  onClose: () => void;
  onPrint: () => void;
}

const BillComponent = ({ order, tableNumber, onClose, onPrint }: BillComponentProps) => {
  const [sending, setSending] = useState(false);

  // Test if component is rendering
  useEffect(() => {
    console.log("🚀 BillComponent mounted and rendered!");
    console.log("Order data:", order);
    console.log("Table number:", tableNumber);
  }, [order, tableNumber]);

  // Simple test function
  const testClick = () => {
    console.log("🎉 Button was clicked!");
    alert("🎉 Button works! Check browser console for details.");
  };

  const handlePrintAndEmail = () => {
    console.log("🎯 HandlePrintAndEmail called");
    console.log("Order:", order);
    console.log("Table:", tableNumber);
    
    // Simple alert first to test if function is called
    alert(`Printing bill for Table ${tableNumber}`);
    
    // Try to print
    try {
      console.log("🖨️ Trying to print...");
      window.print();
      console.log("✅ Print command sent");
    } catch (error) {
      console.error("❌ Print error:", error);
    }
    
    // Try to send email after a delay
    setTimeout(() => {
      sendTestEmail();
    }, 1000);
  };

  const sendTestEmail = () => {
    console.log("📧 Trying to send test email...");
    setSending(true);
    
    // @ts-ignore
    if (typeof Email === 'undefined') {
      console.error("❌ SMTP.js not loaded");
      alert("❌ Email service not available");
      setSending(false);
      return;
    }
    
    //@ts-ignore
    Email.send({
      Host: "smtp.gmail.com",
      Username: "jayanthdn6073@gmail.com",
      Password: "koqcuqdzaofvsmjl",
      To: 'jayanthoffical18@gmail.com',
      From: "jayanthdn6073@gmail.com",
      Subject: "Test Email",
      Body: `<h2>Test from Table ${tableNumber}</h2><p>Order ID: ${order.id}</p>`
    }).then(
      (message: any) => {
        console.log("✅ Email success:", message);
        alert("✅ Email sent!");
        setSending(false);
      },
      (error: any) => {
        console.error("❌ Email error:", error);
        alert(`❌ Email failed: ${JSON.stringify(error)}`);
        setSending(false);
      }
    );
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            Bill - Table {tableNumber}
          </DialogTitle>
        </DialogHeader>

        {/* Test button at the top */}
        <div className="flex gap-2 mb-4">
          <Button onClick={testClick} variant="outline" size="sm">
            Test Click
          </Button>
        </div>

        <div className="space-y-4" id="bill-content">
          {/* Restaurant Header */}
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold">Restaurant Name</h2>
            <p className="text-sm text-gray-600">123 Restaurant Street</p>
            <p className="text-sm text-gray-600">Phone: (555) 123-4567</p>
          </div>

          <Separator />

          {/* Order Details */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Table:</span>
              <span>{tableNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Order ID:</span>
              <span>{order.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Date:</span>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Time:</span>
              <span>{new Date(order.createdAt).toLocaleTimeString()}</span>
            </div>
          </div>

          <Separator />

          {/* Items */}
          <div className="space-y-2">
            <h4 className="font-medium">Items:</h4>
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <div className="flex-1">
                  <span>{item.name}</span>
                  <span className="text-gray-500"> x {item.quantity}</span>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <Separator />

          {/* Total */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tax (10%):</span>
              <span>${(order.total * 0.1).toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${(order.total * 1.1).toFixed(2)}</span>
            </div>
          </div>

          <Separator />

          <div className="text-center text-sm text-gray-600">
            <p>Thank you for dining with us!</p>
            <p>Please come again</p>
          </div>

          <div className="flex gap-2 mt-6">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={sending}
            >
              Back to Order
            </Button>
            <Button
              className="flex-1"
              onClick={handlePrintAndEmail}
              disabled={sending}
            >
              {sending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
              {sending ? 'Sending...' : 'Print & Email Bill'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BillComponent;