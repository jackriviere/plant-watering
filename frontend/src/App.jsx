import React from "react";
import { Routes, Route } from "react-router";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import RequireAuth from "./components/requireAuth";
import UserPage from "./pages/UserPage";
import PersistLogin from "./components/PersistLogin";

const App = () => {
  return (
    <div>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/user" element={<UserPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
