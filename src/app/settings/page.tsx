
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings - MenuZen",
  description: "Configure your restaurant settings",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500 mt-1">Configure your restaurant settings and preferences</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <p className="text-center text-gray-500">Settings page content will appear here</p>
      </div>
    </div>
  );
}
