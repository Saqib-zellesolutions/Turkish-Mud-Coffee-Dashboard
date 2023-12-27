import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardRoutes from "../../config/dashboardRoutes";
import { BranchFunction, LocalUrl } from "../../config/env";
import {
  Coffee,
  CreditCard,
  Dashboard,
  DeliveryTruck,
  Layer,
  Logout,
  Product,
  Profile,
  Square,
  Variable,
  Writer,
  Sliders,
  TaxIcon,
  ZameerLogo,
} from "../../config/icon";
import "./style.css";
import AllProduct from "../product";
function Dasboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const branch = localStorage.getItem("branchName");
  const isActive = (path) => location.pathname === path;

  let token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  let logout = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${LocalUrl}/Authentication/${BranchFunction(branch)}/SignOut`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        localStorage.removeItem("token");
        navigate("/");
      })
      .catch((error) => console.log("error", error));
  };
  const tabTitles = {
    "/dashboard": "Dashboard",
    "/dashboard/order": "Order",
    "/dashboard/simple-product": "Simple Product",
    "/dashboard/variable-product": "Variable Product",
    "/dashboard/category": "Category",
    "/dashboard/beverages": "Feature Product",
    "/dashboard/shipping": "Shipping",
    "/dashboard/payment": "Payment",
    "/dashboard/content": "Description",
    "/dashboard/slider": "Slider",
    "/dashboard/addBeverages": "Add Feature Product",
    "/dashboard/editBeverages": "Edit Feature Product",
    "/dashboard/product": "Add Simple Product",
    "/dashboard/edit-product": "Edit Simple Product",
    "/dashboard/add-category": "Add Category",
    "/dashboard/edit-category": "Edit Category",
    "/dashboard/add-variableProduct": "Add Variable Product",
    "/dashboard/edit-variableProduct": "Edit Variable Product",
    // Add more titles as needed
  };

  // Set the default title to "Dashboard"
  let activeTabTitle = "Dashboard";
  Object.keys(tabTitles).forEach((path) => {
    if (isActive(path)) {
      activeTabTitle = tabTitles[path];
    }
  });
  return (
    <main className="main-dashbaord">
      <div className="naviation-main-container">
        <nav className="navigation">
          <div className="logo-div">
            <img
              src={require("../../assets/coffeeLogo.jpg")}
              // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbU1IK9aZSLEhdjfimG48GaU6RKmKxGp7UlaNBYMnN-g&s"
              // src={ZameerLogo}
              alt=""
              width={60}
              height={60}
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div className="main-nav">
            <div className="active-border-div">
              <div
                className="nav-tab-div"
                onClick={() => navigate("/dashboard")}
              >
                <img src={Dashboard} alt="" className="navigation-icon" />
                <p>Dashboard</p>
              </div>
              <div
                className={`${
                  isActive("/dashboard") ? "active-border" : "active-border-2"
                }`}
              ></div>
            </div>
            <div className="active-border-div2">
              <div
                className="nav-tab-div-2"
                onClick={() => navigate("/dashboard/order")}
              >
                <img src={Layer} alt="" className="navigation-icon" />
                <p>Order</p>
              </div>
              <div
                className={`${
                  isActive("/dashboard/order")
                    ? "active-border"
                    : "active-border-2"
                }`}
              ></div>
            </div>
            <div className="active-border-div2">
              <div
                className="nav-tab-div-2"
                onClick={() => navigate("/dashboard/simple-product")}
              >
                <img src={Product} alt="" className="navigation-icon" />
                <p>Simple</p>
              </div>
              <div
                className={`${
                  isActive("/dashboard/simple-product")
                    ? "active-border"
                    : "active-border-2"
                }`}
              ></div>
            </div>
            <div className="active-border-div2">
              <div
                className="nav-tab-div-2"
                onClick={() => navigate("/dashboard/variable-product")}
              >
                <img src={Variable} alt="" className="navigation-icon" />
                <p>Variable</p>
              </div>
              <div
                className={`${
                  isActive("/dashboard/variable-product")
                    ? "active-border"
                    : "active-border-2"
                }`}
              ></div>
            </div>
            <div className="active-border-div2">
              <div
                className="nav-tab-div-2"
                onClick={() => navigate("/dashboard/category")}
              >
                <img src={Square} alt="" className="navigation-icon" />
                <p>Category</p>
              </div>
              <div
                className={`${
                  isActive("/dashboard/category")
                    ? "active-border"
                    : "active-border-2"
                }`}
              ></div>
            </div>
            <div className="active-border-div2">
              <div
                className="nav-tab-div-2"
                onClick={() => navigate("/dashboard/beverages")}
              >
                <img src={Coffee} alt="" className="navigation-icon" />
                <p>Feature</p>
              </div>
              <div
                className={`${
                  isActive("/dashboard/beverages")
                    ? "active-border"
                    : "active-border-2"
                }`}
              ></div>
            </div>
            <div className="active-border-div2">
              <div
                className="nav-tab-div-2"
                onClick={() => navigate("/dashboard/shipping")}
              >
                <img src={DeliveryTruck} alt="" className="navigation-icon" />
                <p>Shipping</p>
              </div>
              <div
                className={`${
                  isActive("/dashboard/shipping")
                    ? "active-border"
                    : "active-border-2"
                }`}
              ></div>
            </div>
            <div className="active-border-div2">
              <div
                className="nav-tab-div-2"
                onClick={() => navigate("/dashboard/payment")}
              >
                <img src={CreditCard} alt="" className="navigation-icon" />
                <p>payment</p>
              </div>
              <div
                className={`${
                  isActive("/dashboard/payment")
                    ? "active-border"
                    : "active-border-2"
                }`}
              ></div>
            </div>
            <div className="active-border-div2">
              <div
                className="nav-tab-div-2"
                onClick={() => navigate("/dashboard/content")}
              >
                <img src={Writer} alt="" className="navigation-icon" />
                <p>Description</p>
              </div>
              <div
                className={`${
                  isActive("/dashboard/content")
                    ? "active-border"
                    : "active-border-2"
                }`}
              ></div>
            </div>
            <div className="active-border-div2">
              <div
                className="nav-tab-div-2"
                onClick={() => navigate("/dashboard/slider")}
              >
                <img src={Sliders} alt="" className="navigation-icon" />
                <p>Slider</p>
              </div>
              <div
                className={`${
                  isActive("/dashboard/slider")
                    ? "active-border"
                    : "active-border-2"
                }`}
              ></div>
            </div>
          </div>
          <div className="logout-div" onClick={() => logout()}>
            <img src={Logout} alt="" className="navigation-icon" />
            <p>Logout</p>
          </div>
        </nav>
      </div>
      <section className="main-dashboard-content">
        <header className="dashboard-header">
          <div className="heading-subheading-div">
            {/* <h1>Dashboard</h1> */}
            <h1>{activeTabTitle}</h1>
            <p>Turkish Mud Coffee {branch} Branch </p>
          </div>
          <div className="profile-container">
            <p className="hello">Hello!</p>
            <div className="name-title-div">
              <p className="name">Turkish Mud Coffee</p>
              <p className="title"> Manager</p>
            </div>
            <img src={Profile} alt="" />
          </div>
        </header>
        <DashboardRoutes />
        {/* <AllProduct /> */}
      </section>
    </main>
  );
}
export default Dasboard;
