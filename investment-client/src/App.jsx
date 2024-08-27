import "react-alice-carousel/lib/alice-carousel.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { LuLoader2 } from "react-icons/lu";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Security from "./pages/Security/Security";
import NotFound from "./pages/NotFound/NotFound";
import Investment from "./pages/Investment/Investment";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "./Layout/AdminLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import PrivateRoute from "./Routes/PrivateRoute";
import AdminRoute from "./Routes/AdminRoute";
import { useAuth } from "./hooks/useAuth";
import ClientLayout from "./Layout/ClientLayout";
import Deposit from "./pages/ClientPages/Deposit/Deposit";
import Users from "./pages/AdminPages/Users/Users";
import User from "./pages/AdminPages/User/User";
import Invest from "./pages/ClientPages/Invest/Invest";
import Transactions from "./pages/ClientPages/Transactions/Transactions";
import CreatePlan from "./pages/AdminPages/CreatePlan/CreatePlan";
import UpdatePlan from "./pages/AdminPages/UpdatePlan/UpdatePlan";
import Plans from "./pages/AdminPages/Plans/Plans";
import Deposits from "./pages/AdminPages/Deposits/Deposits";
import Withdrawal from "./pages/ClientPages/Withdrawal/Withdrawal";
import Withdrawals from "./pages/AdminPages/Withdrawals/Withdrawals";
import Profile from "./pages/Profile/Profile";
import Referral from "./pages/ClientPages/Referral";
import Numbers from "./pages/AdminPages/Deposits/Numbers";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response) {
      if (error.response.status === 401 && !originalConfig?._retry) {
        originalConfig._retry = true;
        // call refresh token endpoint;
        const { data } = await axios.post(
          `${import.meta.env.VITE_GENERAL_API_ENDPOINT}auth/refresh-token`,
          {}
        );
        const { token } = data.data;
        originalConfig.headers.Authorization = `Bearer ${token}`;
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        return axios(originalConfig);
      }
    }
    // throw error;
    return Promise.reject(error);
  }
);

function App() {
  const { user, refetchUserOnRefresh, appLoading } = useAuth();
  useEffect(() => {
    // function to refetch user
    refetchUserOnRefresh();
  }, [refetchUserOnRefresh]);

  if (appLoading) {
    return (
      <div className="w-screen h-screen bg-slate-900 text-white flex items-center justify-center">
        <div>
          <LuLoader2 size={50} className="text-white animate-spin" />
          <p className="text-xl font-montserrat">Loading appliation</p>
          <p className="text-sm font-montserrat">Please wait.....</p>
        </div>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/security" element={<Security />} />
        <Route path="/investments" element={<Investment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <ProtectedRoutes /> */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/dashboard"
            element={
              user?.role === "admin" ? <AdminLayout /> : <ClientLayout />
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="deposit" element={<Deposit />} />
            <Route path="referral" element={<Referral />} />
            <Route path="buy-plan" element={<Invest />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="withdrawal" element={<Withdrawal />} />
            <Route path="profile" element={<Profile />} />
            <Route element={<AdminRoute />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<User />} />
              <Route path="deposits" element={<Deposits />} />
              <Route path="numbers" element={<Numbers />} />
              <Route path="withdrawals" element={<Withdrawals />} />
              <Route path="plans" element={<Plans />} />
              <Route path="plans/create-plan" element={<CreatePlan />} />
              <Route path="plans/:id" element={<UpdatePlan />} />
            </Route>
          </Route>
        </Route>
        {/* <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
        </Route> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
