import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Plans from "./pages/Plans";
import PlanDetail from "./pages/PlanDetail";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import LineGateway from "./pages/LineGateway";
import CheckPage from "./pages/CheckPage";
import ChatPage from "./pages/ChatPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/plans" component={Plans} />
      <Route path="/plans/:id" component={PlanDetail} />
      <Route path="/articles" component={Articles} />
      <Route path="/articles/:id" component={ArticleDetail} />
      <Route path="/line" component={LineGateway} />
      <Route path="/check" component={CheckPage} />
      <Route path="/chat" component={ChatPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
