import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Card } from "./component/ui/Card";
import CreateProductForm from "./component/ui/CreateProductForm";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import Product from "./pages/Products";
import CreatedProducts from "./pages/Seller/CreatedProducts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/product"} element={<Product />}></Route>
          <Route path={"/signup"} element={<SignUp />} />
          <Route path={"/signin"} element={<SignIn />} />
          <Route path={"/createProduct"} element={<CreateProductForm />} />
          <Route path={"/createdProduct"} element={<CreatedProducts />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
