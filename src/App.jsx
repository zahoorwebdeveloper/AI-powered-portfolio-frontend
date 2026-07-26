import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ThankYouPage from "./pages/ThankYouPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/thanks" element={<ThankYouPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
