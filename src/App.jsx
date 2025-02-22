import { Route, Routes } from "react-router";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DashboradLayout from "./layouts/DashboradLayout";
import Home from "./pages/dashboard/Home";
import Profile from "./pages/dashboard/Profile";
import PrivateRoute from "./routers/PrivateRoute";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="*" element={<NotFound></NotFound>}></Route>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <DashboradLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
