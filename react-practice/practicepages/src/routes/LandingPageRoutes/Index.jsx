import { Signup } from "../../pages/Signup/Index"
import { Login } from "../../pages/Login/Index"

import { useRoutes } from "react-router-dom";

const landingPage = [
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Login />,
  },
];

export default function LandingPageRoutes() {
  return useRoutes(landingPage);
}