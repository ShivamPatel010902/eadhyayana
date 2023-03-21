import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home/Home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "./components/Navbar/Navbar";
import Subcategory from "./pages/CourseFilter/Subcategory";

import Footer from "./components/Footer/Footer";

import Login from "./components/body/auth/Login";
import Register from "./components/body/auth/Register";
import ActivationEmail from "./components/body/auth/ActivationEmail";
import axios from "axios";
import {
  dispatchLogin,
  dispatchGetUser,
  fetchUser,
} from "./redux/actions/authAction";

import NotFound from "./components/utils/NotFound/NotFound";
import ForgotPass from "./components/body/auth/ForgotPassword";
import ResetPass from "./components/body/auth/ResetPassword";
import Coursepage from "./pages/Coursepage/Coursepage";
import Cart from "./pages/Cart/Cart";
import Mycourses from "./pages/Mycourses/Mycourses";
import CourseFilter from "./pages/CourseFilter/CourseFilter";
import CheckoutScreen from "./pages/checkout/CheckoutScreen";
import Profile from "./components/body/profile/Profile";
import EditUser from "./components/body/profile/EditUser";
import PlaceOrder from "./pages/Placeorderscreen/PlaceOrder";
import EditCourse from "./components/body/profile/EditCourse";
import OrderScreen from "./pages/Orderscreen/OrderScreen";
import CourseSeacrh from "./pages/CourseSearch/CourseSeacrh";
function App() {
  //Get Acces token
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { isLogged, user, isAdmin } = auth;

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const getToken = async () => {
        // make post request : hey db get me some data and return it to me
        const res = await axios.post("/user/refresh_token", null);
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);
  // when refresh the token exsit but the logged change to false that's we do that

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());
        //Get user infor
        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);
  return (
    <>
      <div className="main">
        <Router>
          <>
            <Navbar />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/courses/:id" element={<Coursepage />} />
              <Route path="/cart/:id?" element={<Cart />} />
              <Route path="/coursesfilter/:topic" element={<CourseFilter />} />
              <Route
                path="/Mycourses"
                element={isLogged ? <Mycourses /> : <NotFound />}
              />
              <Route
                path="/checkout"
                element={isLogged ? <CheckoutScreen /> : <Login />}
              />
              <Route
                path="/placeorder"
                element={isLogged ? <PlaceOrder /> : <Login />}
              />
              <Route
                path="/order/:id"
                element={isLogged ? <OrderScreen /> : <Login />}
              />
              <Route
                exact
                path="/login"
                element={isLogged ? <NotFound /> : <Login />}
              />
              <Route
                exact
                path="/register"
                element={isLogged ? <NotFound /> : <Register />}
              />
              <Route
                exact
                path="/user/activate/:activation_token"
                element={<ActivationEmail />}
              />
              <Route
                exact
                path="/forgot_password"
                element={isLogged ? <NotFound /> : <ForgotPass />}
              />
              <Route
                path="/user/reset/:token"
                element={isLogged ? <NotFound /> : <ResetPass />}
                exact
              />
              <Route
                path="/profile"
                element={isLogged ? <Profile /> : <NotFound />}
                exact
              />
              <Route
                path="/edit_user/:id"
                element={isAdmin ? <EditUser /> : <NotFound />}
                exact
              />
              <Route
                path="/editcourse/:id"
                element={user.Teacher || isAdmin ? <EditCourse /> : <NotFound />}
                exact
              />
              <Route path="/search/:keyword" element={<CourseSeacrh />} />
              <Route path="/subcategory/:subcategory" element={<Subcategory />} />

              <Route element={<NotFound />} />
            </Routes>
          </>
        </Router>
        <Footer />
      </div>
    </>
  );
}

export default App;
