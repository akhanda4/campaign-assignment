import React from "react";
const CampaignGrid = React.lazy(() =>
  import("./components/Campaign/CampaignGrid.jsx")
);
import { ThemeProvider } from "./ContextApi/ThemeContext.jsx";
import "./App.css";

export default function App() {
  return (
    <ThemeProvider>
      <CampaignGrid />
    </ThemeProvider>
  );
}
