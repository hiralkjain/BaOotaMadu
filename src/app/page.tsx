
import { Metadata } from "next";
import Dashboard from "@/components/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard - MenuZen",
  description: "Restaurant management dashboard with real-time analytics",
};

export default function Home() {
  return <Dashboard />;
}
