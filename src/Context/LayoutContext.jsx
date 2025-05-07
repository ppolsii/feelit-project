// LayoutContext.jsx - Global context to track navbar mode: "inici" or "search"

import { createContext, useContext, useState } from "react";

// Create the layout context
const LayoutContext = createContext();

// Provide layout mode globally to the app
export const LayoutProvider = ({ children }) => {
  const [layoutMode, setLayoutMode] = useState("inici"); // Default mode

  return (
    <LayoutContext.Provider value={{ layoutMode, setLayoutMode }}>
      {children}
    </LayoutContext.Provider>
  );
};

// Hook to use layout context in any component
export const useLayoutContext = () => useContext(LayoutContext);
