import React from "react";
const CampaignGrid = React.lazy(() =>
  import("./components/Campaign/CampaignGrid.jsx")
);
const ErrorBoundary = React.lazy(() =>
  import("./ErrorBoundary.jsx")
);
import { ThemeProvider } from "./ContextApi/ThemeContext.jsx";
import "./App.css";

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <CampaignGrid />
      </ThemeProvider>
    </ErrorBoundary >
  );
}
