
import { Metadata } from "next";
import dynamic from "next/dynamic";

// Dynamically import the Tables component with SSR disabled
// since it relies on client-side state
const Tables = dynamic(() => import('@/components/Tables'), { ssr: false });

export const metadata: Metadata = {
  title: "Tables & Orders - MenuZen",
  description: "Manage your restaurant tables and active orders",
};

export default function TablesPage() {
  return <Tables />;
}
