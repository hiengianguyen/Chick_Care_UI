import Features from "../Pages/Features/Features";
import DashBoard from "../Pages/DashBoard/DashBoard";
import Home from "../Pages/Home/Home";

const publicRouters = [
  {
    name: "Home",
    component: Home,
    path: "/"
  },
  {
    name: "DashBoard",
    component: DashBoard,
    path: "/dashboard"
  },
  {
    name: "Feature",
    component: Features,
    path: "/features"
  }
];
const privateRouters = [];

export { publicRouters, privateRouters };
