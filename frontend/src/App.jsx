import Wallet from "./pages/wallet";
import React from "react";
import TrackingUpdate from "./pages/TrackingUpdate";
import UserList from "./pages/UserList";
import OrderTracking from "./pages/OrderTracking";

import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ZeroWaste from "./pages/zerowaste";
import CategoryDetail from "./pages/categoryDetail";

function App() {

  const { authUser } = React.useContext(require('./context/AuthContext').AuthContext);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/zerowaste" element={<ZeroWaste />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/category/:type" element={<CategoryDetail />} />
          <Route path="/order-tracking" element={authUser?.isUser ? <OrderTracking /> : <Navigate to="/" />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/tracking-update" element={authUser?.isVendor ? <TrackingUpdate /> : <Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
