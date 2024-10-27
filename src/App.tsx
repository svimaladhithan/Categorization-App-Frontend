import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./authentication/Register"
import Login from "./authentication/Login"
import Categories from "./categories/Categories"
import Header from "./components/Header"


function App() {

  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App