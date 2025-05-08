
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Shorts from "./pages/Shorts";
import Live from "./pages/Live";
import Following from "./pages/Following";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./contexts/ThemeContext";
import AiSummaries from "./pages/AiSummaries";
import ClipCreator from "./pages/ClipCreator";
import MultiStream from "./pages/MultiStream";
import CreatorDashboard from "./pages/CreatorDashboard";
import WatchParty from "./pages/WatchParty";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shorts" element={<Shorts />} />
            <Route path="/live" element={<Live />} />
            <Route path="/following" element={<Following />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ai-summaries" element={<AiSummaries />} />
            <Route path="/clip-creator" element={<ClipCreator />} />
            <Route path="/multi-stream" element={<MultiStream />} />
            <Route path="/creator-dashboard" element={<CreatorDashboard />} />
            <Route path="/watch-party" element={<WatchParty />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
