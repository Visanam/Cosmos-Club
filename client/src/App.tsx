import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { SiteShell } from "./components/SiteShell";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Values from "./pages/Values";
import WhyVisanam from "./pages/WhyVisanam";
import Characters from "./pages/Characters";
import Oru from "./pages/Oru";
import ParentJourney from "./pages/ParentJourney";
import Pricing from "./pages/Pricing";
import Checkout from "./pages/Checkout";
import Schools from "./pages/Schools";
import Events from "./pages/Events";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import { Legal } from "./pages/Legal";
import StoryNotesAdmin from "./pages/StoryNotesAdmin";
import KeepsakePreview from "./pages/KeepsakePreview";

function Router() {
  return <SiteShell><Switch>
    <Route path="/" component={Home} />
    <Route path="/values" component={Values} />
    <Route path="/why-visanam" component={WhyVisanam} />
    <Route path="/characters" component={Characters} />
    <Route path="/keepsake/:characterId" component={KeepsakePreview} />
    <Route path="/oru" component={Oru} />
    <Route path="/parents" component={ParentJourney} />
    <Route path="/pricing" component={Pricing} />
    <Route path="/checkout" component={Checkout} />
    <Route path="/schools" component={Schools} />
    <Route path="/events" component={Events} />
    <Route path="/faq" component={Faq} />
    <Route path="/contact" component={Contact} />
    <Route path="/terms">{() => <Legal type="terms" />}</Route>
    <Route path="/privacy">{() => <Legal type="privacy" />}</Route>
    <Route path="/refund">{() => <Legal type="refund" />}</Route>
    <Route path="/story-notes" component={StoryNotesAdmin} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch></SiteShell>;
}

function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
