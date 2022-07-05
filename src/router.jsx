import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Introduce from "./pages/Introduce";
import AuthCheck from "./pages/AuthCheck";
import User from "./pages/User";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/auth" element={<AuthCheck />} />
      <Route path="/home" element={<Home />} />
      <Route path="/user" element={<User />} />

      <Route path="/introduce" element={<Introduce />} />
    </Routes>
  );
}
