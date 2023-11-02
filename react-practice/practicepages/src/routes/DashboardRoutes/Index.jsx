import { Signup } from "../../pages/Signup/Index"
import { Dashboard } from "../../pages/Dashboard/Index"
import CustomerList from "../../pages/CustomerList/Index.js"
import { Login } from "../../pages/Login/Index"

import { useRoutes } from "react-router-dom";

const dashboard = [
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/customer-list",
    element: <CustomerList />,
  },
];

export default function DashboardRoutes() {
  return useRoutes(dashboard);
}
