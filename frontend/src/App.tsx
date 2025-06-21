import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Card } from "./component/ui/Card";
import CreateProductForm from "./component/ui/CreateProductForm";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import Product from "./pages/Products";
import CreatedProducts from "./pages/Seller/CreatedProducts";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/Home";
import Navbar from "./component/ui/Navbar";
import AdminDashboard from "./pages/Seller/Dashboard";
import CartContextProvider from "./context/CartContextProvider";
import UserContextProvider from "./context/UserContextProvider";
import ProductContextProvider from "./context/ProductContextProvider";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <ProductContextProvider>
        <UserContextProvider>
          <CartContextProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path={"/products"} element={<Product />}></Route>
                <Route path={"/signup"} element={<SignUp />} />
                <Route path={"/dashboard"} element={<AdminDashboard />} />
                <Route path={"/"} element={<HomePage />} />
                <Route path={"/signin"} element={<SignIn />} />
                <Route path={"/cart"} element={<CartPage />} />
                <Route path={"/profile"} element={<Profile />} />
                <Route
                  path={"/createProduct"}
                  element={<CreateProductForm />}
                />
                <Route path={"/createdProduct"} element={<CreatedProducts />} />
              </Routes>
            </BrowserRouter>
          </CartContextProvider>
        </UserContextProvider>
      </ProductContextProvider>
    </>
  );
}

export default App;
