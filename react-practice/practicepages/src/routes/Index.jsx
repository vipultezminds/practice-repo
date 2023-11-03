import { Dashboard } from "../pages/Dashboard/Index"
import CustomerList from "../pages/CustomerList/Index.js"
import { DASHBOARD, CUSTOMERLIST } from "../config/config"
import { Signup } from "../pages/Signup/Index"
import { Login } from "../pages/Login/Index"

import { useRoutes } from "react-router-dom";

const routes = [
  {
    path: DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: CUSTOMERLIST,
    element: <CustomerList />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Login />,
  },
];

export default function AppRoutes() {
  return useRoutes(routes);
}
