// import { useState, useEffect } from "react";
// import {
//   BarChart3,
//   FileBarChart,
//   FileText,
//   ArrowDownNarrowWide,
//   Calendar,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import StatCard from "@/components/StatCard";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useToast } from "@/hooks/use-toast";
// import jsPDF from "jspdf";

// // Types
// interface SalesData {
//   date: string;
//   orders: number;
//   revenue: number;
//   avgOrder: number;
// }

// interface PopularItem {
//   name: string;
//   category: string;
//   orders: number;
//   revenue: number;
// }

// interface ReportApiResponse {
//   salesData: SalesData[];
//   popularItems: PopularItem[];
//   timeframeLabel: string;
// }

// // API Base URL (same as Dashboard)
// const API_URL =
//   import.meta.env.VITE_API_BASE || "https://baootamadu.onrender.com";

// const Reports = () => {
//   const { toast } = useToast();
//   const [timeframe, setTimeframe] = useState<"day" | "week" | "month" | "year">("week");
//   const [reportData, setReportData] = useState<ReportApiResponse>({
//     salesData: [],
//     popularItems: [],
//     timeframeLabel: "Last 7 Days",
//   });
//   const [loading, setLoading] = useState<boolean>(true);

//   // Get restaurantId from localStorage (same as Dashboard)
//   const restaurantId = localStorage.getItem("restaurantId") || "";
//   console.log("Reports - Restaurant ID:", restaurantId);

//   if (!restaurantId) {
//     useEffect(() => {
//       toast({
//         title: "Error",
//         description: "Restaurant ID not found. Please log in again.",
//         variant: "destructive",
//       });
//       setLoading(false);
//     }, []);
//   }

//   // Fetch report data
//   useEffect(() => {
//     if (!restaurantId) return;

//     const fetchReportData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(
//           `${API_URL}/api/reports/sales/${restaurantId}?timeframe=${timeframe}`
//         );

//         if (!response.ok) {
//           const error = await response.json().catch(() => ({}));
//           throw new Error(error.message || "Failed to fetch report data");
//         }

//         const result: ReportApiResponse = await response.json();
//         setReportData(result);

//         toast({
//           title: "Success",
//           description: `Loaded ${result.timeframeLabel} analytics.`,
//         });
//       } catch (error: any) {
//         console.error("Error fetching report:", error);
//         toast({
//           title: "Fetch Failed",
//           description: error.message || "Could not load report data.",
//           variant: "destructive",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReportData();
//   }, [restaurantId, timeframe, toast]);

//   // Calculate summary stats
//   const totalRevenue = reportData.salesData.reduce((sum, d) => sum + d.revenue, 0);
//   const totalOrders = reportData.salesData.reduce((sum, d) => sum + d.orders, 0);
//   const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

//   // Generate PDF
//   const generateReport = () => {
//     try {
//       const doc = new jsPDF();
//       let yOffset = 10;

//       doc.setFontSize(18);
//       doc.text("Sales Report", 14, (yOffset += 10));

//       doc.setFontSize(12);
//       doc.text(`Period: ${reportData.timeframeLabel}`, 14, (yOffset += 15));

//       // Sales Table
//       doc.text("Sales Overview", 14, (yOffset += 15));
//       const salesHeaders = ["Date", "Orders", "Revenue", "Avg. Order"];
//       const salesRows = reportData.salesData.map((day) => [
//         day.date,
//         day.orders.toString(),
//         `₹${day.revenue.toFixed(2)}`,
//         `₹${day.avgOrder.toFixed(2)}`,
//       ]);

//       salesHeaders.forEach((header, i) => {
//         doc.text(header, 14 + i * 50, (yOffset += 10));
//       });
//       salesRows.forEach((row) => {
//         row.forEach((cell, i) => {
//           doc.text(cell, 14 + i * 50, (yOffset += 10));
//         });
//       });

//       // Popular Items
//       doc.text("Popular Items", 14, (yOffset += 20));
//       const itemHeaders = ["Item", "Category", "Orders", "Revenue"];
//       const itemRows = reportData.popularItems.map((item) => [
//         item.name,
//         item.category,
//         item.orders.toString(),
//         `₹${item.revenue.toFixed(2)}`,
//       ]);

//       itemHeaders.forEach((header, i) => {
//         doc.text(header, 14 + i * 50, (yOffset += 10));
//       });
//       itemRows.forEach((row) => {
//         row.forEach((cell, i) => {
//           doc.text(cell, 14 + i * 50, (yOffset += 10));
//         });
//       });

//       doc.save(`sales-report-${timeframe}.pdf`);

//       toast({
//         title: "Downloaded",
//         description: "Your report has been saved as PDF.",
//       });
//     } catch (error) {
//       console.error("PDF Generation Error:", error);
//       toast({
//         title: "Failed",
//         description: "Could not generate PDF.",
//         variant: "destructive",
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <p className="text-gray-500">Loading analytics...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold">Reports & Analytics</h1>
//           <p className="text-gray-500 mt-1">Track performance and generate reports</p>
//         </div>
//         <Button variant="outline" className="gap-2" onClick={generateReport}>
//           <FileText size={16} />
//           <span>Export PDF</span>
//         </Button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard
//           title="Total Revenue"
//           value={`₹${totalRevenue.toFixed(2)}`}
//           icon={<BarChart3 className="text-navy" />}
//           trend={{ value: "8.2%", positive: true }}
//         />
//         <StatCard
//           title="Total Orders"
//           value={totalOrders.toString()}
//           icon={<FileBarChart className="text-navy" />}
//           trend={{ value: "5.3%", positive: true }}
//         />
//         <StatCard
//           title="Average Order"
//           value={`₹${avgOrderValue.toFixed(2)}`}
//           icon={<ArrowDownNarrowWide className="text-navy" />}
//           trend={{ value: "2.8%", positive: false }}
//         />
//         <StatCard
//           title="Time Period"
//           value={reportData.timeframeLabel}
//           icon={<Calendar className="text-navy" />}
//         />
//       </div>

//       {/* Tabs */}
//       <Tabs defaultValue="sales" className="w-full">
//         <div className="flex justify-between items-center mb-4">
//           <TabsList>
//             <TabsTrigger value="sales">Sales Overview</TabsTrigger>
//             <TabsTrigger value="items">Popular Items</TabsTrigger>
//           </TabsList>

//           <Select value={timeframe} onValueChange={(value) => setTimeframe(value as any)}>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select timeframe" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="day">Today</SelectItem>
//               <SelectItem value="week">This Week</SelectItem>
//               <SelectItem value="month">This Month</SelectItem>
//               <SelectItem value="year">This Year</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Sales Tab */}
//         <TabsContent value="sales" className="mt-0">
//           <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Date</TableHead>
//                   <TableHead className="text-right">Orders</TableHead>
//                   <TableHead className="text-right">Revenue</TableHead>
//                   <TableHead className="text-right">Avg. Order</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {reportData.salesData.length > 0 ? (
//                   reportData.salesData.map((day) => (
//                     <TableRow key={day.date}>
//                       <TableCell className="font-medium">{day.date}</TableCell>
//                       <TableCell className="text-right">{day.orders}</TableCell>
//                       <TableCell className="text-right">₹{day.revenue.toFixed(2)}</TableCell>
//                       <TableCell className="text-right">₹{day.avgOrder.toFixed(2)}</TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={4} className="text-center py-4 text-gray-500">
//                       No data available
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </TabsContent>

//         {/* Popular Items Tab */}
//         <TabsContent value="items" className="mt-0">
//           <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Item</TableHead>
//                   <TableHead>Category</TableHead>
//                   <TableHead className="text-right">Orders</TableHead>
//                   <TableHead className="text-right">Revenue</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {reportData.popularItems.length > 0 ? (
//                   reportData.popularItems.map((item) => (
//                     <TableRow key={item.name}>
//                       <TableCell className="font-medium">{item.name}</TableCell>
//                       <TableCell>{item.category}</TableCell>
//                       <TableCell className="text-right">{item.orders}</TableCell>
//                       <TableCell className="text-right">₹{item.revenue.toFixed(2)}</TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={4} className="text-center py-4 text-gray-500">
//                       No popular items
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default Reports;

import { useState, useEffect } from "react";
import {
  BarChart3,
  FileBarChart,
  FileText,
  ArrowDownNarrowWide,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatCard from "@/components/StatCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

// Types
interface SalesData {
  date: string;
  orders: number;
  revenue: number;
  avgOrder: number;
}

interface PopularItem {
  name: string;
  category: string;
  orders: number;
  revenue: number;
}

interface ReportApiResponse {
  salesData: SalesData[];
  popularItems: PopularItem[];
  timeframeLabel: string;
}

// API Base URL (same as Dashboard)
const API_URL =
  import.meta.env.VITE_API_BASE || "https://baootamadu.onrender.com";

const Reports = () => {
  const { toast } = useToast();
  const [timeframe, setTimeframe] = useState<"day" | "week" | "month" | "year">(
    "week"
  );
  const [reportData, setReportData] = useState<ReportApiResponse>({
    salesData: [],
    popularItems: [],
    timeframeLabel: "Last 7 Days",
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Get restaurantId from localStorage (same as Dashboard)
  const restaurantId = localStorage.getItem("restaurantId") || "";
  console.log("Reports - Restaurant ID:", restaurantId);

  if (!restaurantId) {
    useEffect(() => {
      toast({
        title: "Error",
        description: "Restaurant ID not found. Please log in again.",
        variant: "destructive",
      });
      setLoading(false);
    }, []);
  }

  // Fetch report data
  useEffect(() => {
    if (!restaurantId) return;

    const fetchReportData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/api/reports/sales/${restaurantId}?timeframe=${timeframe}`
        );

        if (!response.ok) {
          const error = await response.json().catch(() => ({}));
          throw new Error(error.message || "Failed to fetch report data");
        }

        const result: ReportApiResponse = await response.json();
        setReportData(result);

        toast({
          title: "Success",
          description: `Loaded ${result.timeframeLabel} analytics.`,
        });
      } catch (error: any) {
        console.error("Error fetching report:", error);
        toast({
          title: "Fetch Failed",
          description: error.message || "Could not load report data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [restaurantId, timeframe, toast]);

  // Calculate summary stats
  const totalRevenue = reportData.salesData.reduce(
    (sum, d) => sum + d.revenue,
    0
  );
  const totalOrders = reportData.salesData.reduce(
    (sum, d) => sum + d.orders,
    0
  );
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Get dynamic filename based on timeframe and current date
  const getReportFilename = () => {
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD format

    const timeframeMap = {
      day: "daily",
      week: "weekly",
      month: "monthly",
      year: "yearly",
    };

    return `sales-report-${timeframeMap[timeframe]}-${dateStr}.pdf`;
  };

  // Enhanced PDF generation with proper formatting
  // Replace your existing generateReport function with this improved version

  const generateReport = () => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      const margin = 20;
      let yOffset = margin;

      // Helper function for proper text positioning
      const addText = (text, x, y, fontSize = 10, style = "normal") => {
        doc.setFontSize(fontSize);
        doc.setFont("helvetica", style);
        doc.text(text, x, y);
      };

      // Helper function for right-aligned text
      const addRightAlignedText = (text, x, y, fontSize = 10) => {
        doc.setFontSize(fontSize);
        const textWidth = doc.getTextWidth(text);
        doc.text(text, x - textWidth, y);
      };

      // Header Section
      addText("SALES REPORT", margin, yOffset, 18, "bold");
      yOffset += 15;

      addText(
        `Period: ${reportData.timeframeLabel}`,
        margin,
        yOffset,
        12,
        "bold"
      );
      yOffset += 10;

      addText(
        `Generated on: ${new Date().toLocaleDateString("en-IN")}`,
        margin,
        yOffset,
        10
      );
      yOffset += 20;

      // Summary Statistics Box
      doc.setFillColor(245, 245, 245);
      doc.rect(margin, yOffset - 5, pageWidth - margin * 2, 30, "F");
      doc.setDrawColor(200, 200, 200);
      doc.rect(margin, yOffset - 5, pageWidth - margin * 2, 30);

      addText("SUMMARY STATISTICS", margin + 5, yOffset + 5, 12, "bold");
      yOffset += 15;

      addText(
        `Total Revenue: ₹${totalRevenue.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
        })}`,
        margin + 10,
        yOffset
      );
      addText(
        `Total Orders: ${totalOrders.toLocaleString("en-IN")}`,
        margin + 10,
        yOffset + 8
      );
      addText(
        `Average Order: ₹${avgOrderValue.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
        })}`,
        margin + 10,
        yOffset + 16
      );

      yOffset += 35;

      // Sales Data Table
      if (reportData.salesData.length > 0) {
        addText("SALES OVERVIEW", margin, yOffset, 14, "bold");
        yOffset += 15;

        // Table setup
        const tableStartX = margin;
        const colWidths = [50, 35, 45, 45]; // Date, Orders, Revenue, Avg Order
        const totalTableWidth = colWidths.reduce((a, b) => a + b, 0);

        // Table header
        doc.setFillColor(230, 230, 230);
        doc.rect(tableStartX, yOffset - 3, totalTableWidth, 12, "F");
        doc.setDrawColor(180, 180, 180);
        doc.rect(tableStartX, yOffset - 3, totalTableWidth, 12);

        const headers = ["Date", "Orders", "Revenue (₹)", "Avg Order (₹)"];
        let xPos = tableStartX;

        headers.forEach((header, i) => {
          if (i === 0) {
            addText(header, xPos + 2, yOffset + 5, 10, "bold");
          } else {
            addRightAlignedText(
              header,
              xPos + colWidths[i] - 2,
              yOffset + 5,
              10
            );
          }
          xPos += colWidths[i];
        });

        yOffset += 12;

        // Table rows
        reportData.salesData.forEach((row, index) => {
          // Alternate row background
          if (index % 2 === 0) {
            doc.setFillColor(250, 250, 250);
            doc.rect(tableStartX, yOffset - 2, totalTableWidth, 10, "F");
          }

          xPos = tableStartX;

          // Date (left aligned)
          addText(row.date, xPos + 2, yOffset + 5, 9);
          xPos += colWidths[0];

          // Orders (right aligned)
          addRightAlignedText(
            row.orders.toString(),
            xPos + colWidths[1] - 2,
            yOffset + 5,
            9
          );
          xPos += colWidths[1];

          // Revenue (right aligned)
          addRightAlignedText(
            `₹${row.revenue.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}`,
            xPos + colWidths[2] - 2,
            yOffset + 5,
            9
          );
          xPos += colWidths[2];

          // Average Order (right aligned)
          addRightAlignedText(
            `₹${row.avgOrder.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}`,
            xPos + colWidths[3] - 2,
            yOffset + 5,
            9
          );

          yOffset += 10;

          // Check for page break
          if (yOffset > pageHeight - 80) {
            doc.addPage();
            yOffset = margin;
          }
        });

        yOffset += 20;
      }

      // Popular Items Table
      if (reportData.popularItems.length > 0) {
        // Check for page break
        if (yOffset > pageHeight - 100) {
          doc.addPage();
          yOffset = margin;
        }

        addText("POPULAR ITEMS", margin, yOffset, 14, "bold");
        yOffset += 15;

        const itemTableStartX = margin;
        const itemColWidths = [65, 45, 30, 45]; // Item, Category, Orders, Revenue
        const itemTotalWidth = itemColWidths.reduce((a, b) => a + b, 0);

        // Header
        doc.setFillColor(230, 230, 230);
        doc.rect(itemTableStartX, yOffset - 3, itemTotalWidth, 12, "F");
        doc.setDrawColor(180, 180, 180);
        doc.rect(itemTableStartX, yOffset - 3, itemTotalWidth, 12);

        const itemHeaders = ["Item Name", "Category", "Orders", "Revenue (₹)"];
        let xPos = itemTableStartX;

        itemHeaders.forEach((header, i) => {
          if (i < 2) {
            addText(header, xPos + 2, yOffset + 5, 10, "bold");
          } else {
            addRightAlignedText(
              header,
              xPos + itemColWidths[i] - 2,
              yOffset + 5,
              10
            );
          }
          xPos += itemColWidths[i];
        });

        yOffset += 12;

        // Rows
        reportData.popularItems.forEach((item, index) => {
          if (index % 2 === 0) {
            doc.setFillColor(250, 250, 250);
            doc.rect(itemTableStartX, yOffset - 2, itemTotalWidth, 10, "F");
          }

          xPos = itemTableStartX;

          // Item name (truncate if too long)
          const itemName =
            item.name.length > 28
              ? item.name.substring(0, 25) + "..."
              : item.name;
          addText(itemName, xPos + 2, yOffset + 5, 9);
          xPos += itemColWidths[0];

          // Category (truncate if too long)
          const category =
            item.category.length > 18
              ? item.category.substring(0, 15) + "..."
              : item.category;
          addText(category, xPos + 2, yOffset + 5, 9);
          xPos += itemColWidths[1];

          // Orders (right aligned)
          addRightAlignedText(
            item.orders.toString(),
            xPos + itemColWidths[2] - 2,
            yOffset + 5,
            9
          );
          xPos += itemColWidths[2];

          // Revenue (right aligned)
          addRightAlignedText(
            `₹${item.revenue.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}`,
            xPos + itemColWidths[3] - 2,
            yOffset + 5,
            9
          );

          yOffset += 10;

          if (yOffset > pageHeight - 40) {
            doc.addPage();
            yOffset = margin;
          }
        });
      }

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(
        "Generated by Restaurant Management System",
        margin,
        pageHeight - 15
      );
      addRightAlignedText(
        `Page 1 of 1`,
        pageWidth - margin,
        pageHeight - 15,
        8
      );

      // Generate dynamic filename
      const timeframeMap = {
        day: "daily",
        week: "weekly",
        month: "monthly",
        year: "yearly",
      };

      const dateStr = new Date().toISOString().split("T")[0];
      const filename = `sales-report-${timeframeMap[timeframe]}-${dateStr}.pdf`;

      doc.save(filename);

      toast({
        title: "Report Downloaded",
        description: `${
          timeframeMap[timeframe].charAt(0).toUpperCase() +
          timeframeMap[timeframe].slice(1)
        } report has been generated successfully.`,
      });
    } catch (error) {
      console.error("PDF Generation Error:", error);
      toast({
        title: "Generation Failed",
        description: "Could not generate PDF report. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-gray-500 mt-1">
            Track performance and generate reports
          </p>
        </div>
        <Button variant="outline" className="gap-2" onClick={generateReport}>
          <FileText size={16} />
          <span>Export PDF</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`₹${totalRevenue.toFixed(2)}`}
          icon={<BarChart3 className="text-navy" />}
          trend={{ value: "8.2%", positive: true }}
        />
        <StatCard
          title="Total Orders"
          value={totalOrders.toString()}
          icon={<FileBarChart className="text-navy" />}
          trend={{ value: "5.3%", positive: true }}
        />
        <StatCard
          title="Average Order"
          value={`₹${avgOrderValue.toFixed(2)}`}
          icon={<ArrowDownNarrowWide className="text-navy" />}
          trend={{ value: "2.8%", positive: false }}
        />
        <StatCard
          title="Time Period"
          value={reportData.timeframeLabel}
          icon={<Calendar className="text-navy" />}
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="sales" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="sales">Sales Overview</TabsTrigger>
            <TabsTrigger value="items">Popular Items</TabsTrigger>
          </TabsList>

          <Select
            value={timeframe}
            onValueChange={(value) => setTimeframe(value as any)}
          >
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

        {/* Sales Tab */}
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
                {reportData.salesData.length > 0 ? (
                  reportData.salesData.map((day) => (
                    <TableRow key={day.date}>
                      <TableCell className="font-medium">{day.date}</TableCell>
                      <TableCell className="text-right">{day.orders}</TableCell>
                      <TableCell className="text-right">
                        ₹{day.revenue.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        ₹{day.avgOrder.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-4 text-gray-500"
                    >
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Popular Items Tab */}
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
                {reportData.popularItems.length > 0 ? (
                  reportData.popularItems.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className="text-right">
                        {item.orders}
                      </TableCell>
                      <TableCell className="text-right">
                        ₹{item.revenue.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-4 text-gray-500"
                    >
                      No popular items
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
