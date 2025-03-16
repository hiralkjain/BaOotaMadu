
import NotFound from "@/components/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found - MenuZen",
  description: "The page you are looking for doesn't exist",
};

export default function NotFoundPage() {
  return <NotFound />;
}
