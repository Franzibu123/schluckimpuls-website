import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import VarianteC from "./pages/VarianteC";
import UeberMich from "./pages/UeberMich";
import LeadMagnet from "./pages/LeadMagnet";
import DankeCheckliste from "./pages/DankeCheckliste";
import MandelKurs from "./pages/MandelKurs";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={VarianteC} />
      <Route path={"/ueber-mich"} component={UeberMich} />
      <Route path={"/checkliste"} component={LeadMagnet} />
      <Route path={"/danke-checkliste"} component={DankeCheckliste} />
      <Route path={"/mandel-kurs"} component={MandelKurs} />
      <Route path={"/404"} component={NotFound} />
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
