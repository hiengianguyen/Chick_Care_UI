import Features from "../Pages/Features/Features";
import DashBoard from "../Pages/DashBoard/DashBoard";
import Home from "../Pages/Home/Home";
import Notifications from "../Pages/Notifications/Notifications";

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
  },
  {
    name: "Notifications",
    component: Notifications,
    path: "/notifications"
  }
];
const privateRouters = [];

export { publicRouters, privateRouters };
