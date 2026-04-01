import Features from "../Pages/Features/Features";
import Home from "../Pages/Home/Home";

const publicRouters = [
  {
    name: "Home",
    component: Home,
    path: "/"
  },
  {
    name: "Feature",
    component: Features,
    path: "/features"
  }
];
const privateRouters = [];

export { publicRouters, privateRouters };
