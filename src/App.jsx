import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { privateRouters, publicRouters } from "./Router";
import { io } from "socket.io-client";

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

  const speak = (text) => {
    const audio = new Audio(`http://localhost:5000/api/tts?text=${encodeURIComponent(text)}`);
    audio.play();
  };

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
