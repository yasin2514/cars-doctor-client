import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/login";
import SignUp from "../Pages/SignUp/SignUp";
import CheckOut from "../Pages/Checkout/CheckOut";
import Bookings from "../Pages/Bookings/Bookings";
import Private from "../Private/Private";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            },

            {
                path: '/checkOut/:id',
                element: <Private><CheckOut></CheckOut></Private>,
                loader: ({ params }) => fetch(`https://car-doctor-server-lake-eta.vercel.app/services/${params.id}`)
            },
            {
                path: '/bookings',
                element: <Private><Bookings></Bookings></Private>
            }


        ]
    },
]);
export default router;