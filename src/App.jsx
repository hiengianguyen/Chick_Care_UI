import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { privateRouters, publicRouters } from "./Router";
import { io } from "socket.io-client";
import speak from "./utils/speak";

const socket = io("http://localhost:5000");

const App = () => {
  const [mainRouters, setMainrouters] = useState([]);

  useEffect(() => {
    setMainrouters([...publicRouters, ...privateRouters]);
  }, []);

  useEffect(() => {
    const handler = (data) => {
      const audio = new Audio();
      audio.play().catch(() => {});
      speak(data.title + " " + data.message);
    };
    socket.on("chicken_alert", handler);

    return () => {
      socket.off("chicken_alert", handler);
    };
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
