import { createContext, useState } from "react";

export const ListerningContext = createContext();

export function ListerningProvider({ children }) {
  const [data, setData] = useState(null);

  return <ListerningContext.Provider value={{ data, setData }}>{children}</ListerningContext.Provider>;
}
