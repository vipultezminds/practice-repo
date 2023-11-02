import { useRoutes } from "react-router-dom";
import DashboardRoutes from "./DashboardRoutes/Index";
import LandingPageRoutes from "./LandingPageRoutes/Index";

export default function ThemeRoutes(){
    return useRoutes([DashboardRoutes,LandingPageRoutes])
}