import { Dashboard } from "../../pages/Dashboard/Index"
import CustomerList from "../../pages/CustomerList/Index.js"
import { DASHBOARD,CUSTOMERLIST} from "../../config/config"


import { useRoutes } from "react-router-dom";

const dashboard = [
  {
    path: DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: CUSTOMERLIST,
    element: <CustomerList />,
  },
];

export default function DashboardRoutes() {
  return useRoutes(dashboard);
}
