import React, { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import BookDetails from "./components/BookDetails/BookDetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
import AllOrders from "./pages/AllOrders";
import AddBooks from "./pages/AddBooks";
import UpdateBook from "./pages/UpdateBook";
import AboutUs from "./pages/AboutUs";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") && 
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);
  return (
    <div>
        <Navbar /> 
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/allBooks" element={<AllBooks />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} >
            {role === "user" ? <Route index element={<Favourites />} /> : <Route index element={<AllOrders />} />}
            {role === "admin" && <Route path="/profile/addBook" element={<AddBooks />} />}
            <Route path="/profile/orderHistory" element={<UserOrderHistory />} />
            <Route path="/profile/settings" element={<Settings />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/updateBook/:id" element={<UpdateBook />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/viewBookDetails/:id" element={<BookDetails />} />
          <Route path="/allBooks/viewBookDetails/:id" element={<BookDetails />} />
        </Routes>
        <Footer />
    </div>
  );
};

export default App;