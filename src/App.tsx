import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import Categories from "./categories/Categories";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute"; // Adjust the path as necessary
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/categories" element={<ProtectedRoute element={<Categories />} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
