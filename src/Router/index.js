import Features from "../Pages/Features/Features";
import DashBoard from "../Pages/DashBoard/DashBoard";
import Home from "../Pages/Home/Home";
import Notifications from "../Pages/Notifications/Notifications";
import DeletedNotifications from "../Pages/Notifications/DeletedNotifications";

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
  },
  {
    name: "DeletedNotifications",
    component: DeletedNotifications,
    path: "/deleted-notifications"
  }
];
const privateRouters = [];

export { publicRouters, privateRouters };
