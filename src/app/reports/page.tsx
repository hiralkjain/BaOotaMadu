
import { Metadata } from "next";
import dynamic from "next/dynamic";

// Dynamically import the Reports component with SSR disabled
// since it relies on client-side state
const Reports = dynamic(() => import('@/components/Reports'), { ssr: false });

export const metadata: Metadata = {
  title: "Reports & Analytics - MenuZen",
  description: "View and analyze your restaurant performance",
};

export default function ReportsPage() {
  return <Reports />;
}
