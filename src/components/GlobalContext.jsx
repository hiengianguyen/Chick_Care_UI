import { createContext, useState } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [data, setData] = useState(null);

  return <GlobalContext.Provider value={{ data, setData }}>{children}</GlobalContext.Provider>;
}
