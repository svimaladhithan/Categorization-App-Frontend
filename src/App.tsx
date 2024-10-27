import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import Categories from "./categories/Categories";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute"; 
import { AuthProvider } from "./context/AuthContext";
import PageNotFound from "./authentication/PageNotFound";

function App() {
  return (
    <AuthProvider>
      <div>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/categories" element={<ProtectedRoute element={<Categories />} />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
