import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import VarianteC from "./pages/VarianteC";
import UeberMich from "./pages/UeberMich";
import DankeLeitfaden from "./pages/DankeLeitfaden";
import DankeUebungsliste from "./pages/DankeUebungsliste";
import Reels from "./pages/Reels";
import ReelSingle from "./pages/ReelSingle";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={VarianteC} />
      <Route path={"/ueber-mich"} component={UeberMich} />
      <Route path={"/danke-leitfaden"} component={DankeLeitfaden} />
      <Route path={"/danke-uebungsliste"} component={DankeUebungsliste} />
      <Route path={"/reels"} component={Reels} />
      {/* Einzelrouten: /reels/tonsillotomie, /reels/tonsillektomie, /reels/adenotomie, /reels/paukenroehrchen */}
      <Route path={"/reels/:slug"} component={ReelSingle} />
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
