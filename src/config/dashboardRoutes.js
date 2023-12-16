import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import NotFound from "../component/404";
import AddBeverages from "../component/AddBeverages";
import AddCategory from "../component/AddCategory";
import AddVariableProduct from "../component/AddVariableProduct";
import EditBeverages from "../component/EditBeverages";
import EditCategory from "../component/EditCategory";
import EditProduct from "../component/EditProduct";
import AddProduct from "../component/addProduct";
import Beverages from "../component/beverages";
import Category from "../component/category";
import Content from "../component/content";
import Order from "../component/order";
import OrderDetail from "../component/order-detail";
import Payment from "../component/payment";
import Product from "../component/product";
import Shipping from "../component/shipping";
import Slider from "../component/slider";
import VariableProduct from "../component/variableProduct";
import EditVariationProduct from "../component/EditVariableProduct";

function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="/" element={<OrderDetail />} />
        <Route path="order" element={<Order />} />
        <Route path="simple-product" element={<AddProduct />} />
        <Route path="variable-product" element={<VariableProduct />} />
        <Route path="category" element={<Category />} />
        <Route path="beverages" element={<Beverages />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="payment" element={<Payment />} />
        <Route path="content" element={<Content />} />
        <Route path="slider" element={<Slider />} />
        <Route path="product" element={<Product />} />
        <Route path="edit-product" element={<EditProduct />} />
        <Route path="addBeverages" element={<AddBeverages />} />
        <Route path="editBeverages" element={<EditBeverages />} />
        <Route path="add-category" element={<AddCategory />} />
        <Route path="edit-category" element={<EditCategory />} />
        <Route path="add-variableProduct" element={<AddVariableProduct />} />
        <Route path="edit-variableProduct" element={<EditVariationProduct />} />
        {/* <Route path="tax" element={<Tax />} /> */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
export default DashboardRoutes;
