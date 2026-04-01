import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { privateRouters, publicRouters } from "./Router";

const App = () => {
  const [mainRouters, setMainrouters] = useState([]);

  useEffect(() => {
    setMainrouters([...publicRouters, ...privateRouters]);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {mainRouters &&
          mainRouters.map((routes, index) => {
            const Page = routes.component;
            return <Route key={index} path={routes.path} element={<Page />} />;
          })}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
