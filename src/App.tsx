
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Tables from "./pages/Tables";
import Menu from "./pages/Menu";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <Layout>
                <Dashboard />
              </Layout>
            } 
          />
          <Route 
            path="/tables" 
            element={
              <Layout>
                <Tables />
              </Layout>
            } 
          />
          <Route 
            path="/menu" 
            element={
              <Layout>
                <Menu />
              </Layout>
            } 
          />
          <Route 
            path="/reports" 
            element={
              <Layout>
                <Reports />
              </Layout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
