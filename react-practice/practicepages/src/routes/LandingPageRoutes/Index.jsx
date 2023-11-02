import { Signup } from "../../pages/Signup/Index"
import { Login } from "../../pages/Login/Index"
import { useRoutes } from "react-router-dom";
import { SIGNUP,LOGIN} from "../../config/config"


const landingPage = [
  {
    path: LOGIN,
    element: <Signup />,
  },
  {
    path: SIGNUP,
    element: <Login />,
  },
];

export default function LandingPageRoutes() {
  return useRoutes(landingPage);
}